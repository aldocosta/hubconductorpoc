# Observability - POC Simples

## O que é?

Observability permite **ver o que está acontecendo** no sistema em tempo real.

### Para HubConductor POC
- **Métricas**: Quantos pagamentos? Qual valor total? Qual taxa de erro?
- **Dashboard**: Visualização em tempo real
- **Alertas**: Detectar problemas rapidamente

## Implementação Rápida

### 1. Instalar Dependências

```bash
npm install prom-client @nestjs/prometheus
```

### 2. Criar Métricas Simples

```typescript
// src/core/services/metrics.service.ts
import { Injectable } from '@nestjs/common';
import { Counter, Histogram } from 'prom-client';

@Injectable()
export class MetricsService {
  private paymentCounter = new Counter({
    name: 'payments_total',
    help: 'Total de pagamentos',
    labelNames: ['provider', 'status', 'error_type', 'instance']
  });

  private paymentAmount = new Counter({
    name: 'payments_amount_total',
    help: 'Valor total transacionado',
    labelNames: ['provider', 'status', 'instance']
  });

  private paymentDuration = new Histogram({
    name: 'payment_duration_seconds',
    help: 'Tempo de resposta',
    labelNames: ['provider', 'status', 'instance']
  });

  recordPayment(provider: string, status: string, amount: number, duration: number, errorType?: string, instance?: string) {
    this.paymentCounter.inc({ 
      provider, 
      status, 
      error_type: errorType || 'none',
      instance: instance || 'monolith'
    });
    
    if (status === 'success') {
      this.paymentAmount.inc({ provider, status, instance: instance || 'monolith' }, amount);
    }
    
    this.paymentDuration.observe({ provider, status, instance: instance || 'monolith' }, duration / 1000);
  }
}
```

### 3. Classificar Erros Simples

```typescript
// src/core/services/error-classifier.ts
export class ErrorClassifier {
  static classifyError(error: any): string {
    if (error.message?.includes('provider') || error.message?.includes('timeout')) {
      return 'provider_error';
    }
    
    if (error.message?.includes('saldo') || error.message?.includes('insufficient')) {
      return 'business_error';
    }
    
    if (error.message?.includes('validation') || error.status === 400) {
      return 'validation_error';
    }
    
    if (error.status === 401 || error.status === 403) {
      return 'auth_error';
    }
    
    return 'unknown_error';
  }
}
```

### 4. Integrar no Controller

```typescript
// src/payments/payments.controller.ts
import { MetricsService } from '../core/services/metrics.service';
import { ErrorClassifier } from '../core/services/error-classifier';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly metricsService: MetricsService,
  ) {}

  @Post('bill')
  async payBill(@Body() data: PayBillRequestDto, @Req() req: any) {
    const startTime = Date.now();
    const amount = data.amount || 0;
    const instance = process.env.INSTANCE_NAME || 'monolith';
    
    try {
      const result = await this.paymentService.payBill(data, req.user.providerId);
      
      const duration = Date.now() - startTime;
      this.metricsService.recordPayment(req.user.providerId, 'success', amount, duration, undefined, instance);
      
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorType = ErrorClassifier.classifyError(error);
      
      this.metricsService.recordPayment(req.user.providerId, 'error', 0, duration, errorType, instance);
      throw error;
    }
  }
}
```

### 5. Atualizar CoreModule

```typescript
// src/core/core.module.ts
import { Module } from '@nestjs/common';
import { PrometheusModule } from '@nestjs/prometheus';
import { MetricsService } from './services/metrics.service';

@Module({
  imports: [
    PrometheusModule.register({
      path: '/metrics',
      defaultMetrics: { enabled: true },
    }),
  ],
  providers: [MetricsService],
  exports: [MetricsService],
})
export class CoreModule {}
```

## Bootstrap Modular - Observabilidade

### Cenário: Módulos Rodando Separadamente

Quando você executa módulos independentemente (ex: `payments.bootstrap.ts`), cada instância roda em uma porta diferente:

- **Monolito**: Porta 3000
- **Payments**: Porta 3001  
- **Transfers**: Porta 3002

### Solução: Prometheus com Múltiplos Targets

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'hubconductor-monolith'
    static_configs:
      - targets: ['hubconductor:3000']
    metrics_path: '/metrics'
    scrape_interval: 30s

  - job_name: 'hubconductor-payments'
    static_configs:
      - targets: ['payments:3001']
    metrics_path: '/metrics'
    scrape_interval: 30s

  - job_name: 'hubconductor-transfers'
    static_configs:
      - targets: ['transfers:3002']
    metrics_path: '/metrics'
    scrape_interval: 30s
```

### Docker Compose para Bootstrap Modular

```yaml
# docker-compose.modular.yml
version: '3.8'

services:
  # Monolito completo
  hubconductor:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - INSTANCE_NAME=monolith
    restart: unless-stopped
    networks:
      - monitoring

  # Módulo de pagamentos isolado
  payments:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=development
      - INSTANCE_NAME=payments
    command: ["npm", "run", "start:payments"]
    restart: unless-stopped
    networks:
      - monitoring

  # Módulo de transferências isolado
  transfers:
    build: .
    ports:
      - "3002:3002"
    environment:
      - NODE_ENV=development
      - INSTANCE_NAME=transfers
    command: ["npm", "run", "start:transfers"]
    restart: unless-stopped
    networks:
      - monitoring

  # Prometheus para múltiplas instâncias
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    restart: unless-stopped
    networks:
      - monitoring

  # Grafana com múltiplos data sources
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3003:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123
      - GF_SECURITY_ADMIN_USER=admin
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana/provisioning:/etc/grafana/provisioning
    restart: unless-stopped
    networks:
      - monitoring

volumes:
  grafana_data:

networks:
  monitoring:
    driver: bridge
```

### Grafana com Múltiplos Data Sources

O Grafana **suporta múltiplos data sources** nativamente. Você pode:

1. **Data Source Único**: Um Prometheus que coleta de todos os targets
2. **Data Sources Separados**: Um Prometheus por instância

#### Opção 1: Data Source Único (Recomendado)

```yaml
# grafana/provisioning/datasources/prometheus.yml
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
```

#### Opção 2: Data Sources Separados

```yaml
# grafana/provisioning/datasources/datasources.yml
apiVersion: 1

datasources:
  - name: Monolith
    type: prometheus
    access: proxy
    url: http://hubconductor:3000
    isDefault: true

  - name: Payments
    type: prometheus
    access: proxy
    url: http://payments:3001

  - name: Transfers
    type: prometheus
    access: proxy
    url: http://transfers:3002
```

### Queries para Múltiplas Instâncias

```promql
# Total de pagamentos por instância
sum by (instance) (payments_total)

# Valor transacionado por instância
sum by (instance) (payments_amount_total{status="success"})

# Taxa de erro por instância
rate(payments_total{status="error"}[5m])

# Comparar performance entre instâncias
histogram_quantile(0.95, rate(payment_duration_seconds_bucket[5m]))
```

### Dashboard com Múltiplas Instâncias

**Painel 1: Total por Instância**
```
Query: sum by (instance) (payments_total)
```

**Painel 2: Valor por Instância**
```
Query: sum by (instance) (payments_amount_total{status="success"})
```

**Painel 3: Taxa de Erro por Instância**
```
Query: rate(payments_total{status="error"}[5m])
```

**Painel 4: Performance por Instância**
```
Query: histogram_quantile(0.95, rate(payment_duration_seconds_bucket[5m]))
```

## Setup Docker Simples

### 1. Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  hubconductor:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    restart: unless-stopped
    networks:
      - monitoring

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123
      - GF_SECURITY_ADMIN_USER=admin
    volumes:
      - grafana_data:/var/lib/grafana
    restart: unless-stopped
    networks:
      - monitoring

volumes:
  grafana_data:

networks:
  monitoring:
    driver: bridge
```

### 2. Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:dev"]
```

### 3. Subir

```bash
docker-compose up -d
```

## Configurar Grafana

### 1. Acessar
```
URL: http://localhost:3001
Login: admin
Senha: admin123
```

### 2. Adicionar Prometheus
1. Settings → Data Sources
2. Add data source → Prometheus
3. URL: `http://hubconductor:3000`
4. Save & Test

### 3. Criar Dashboard Simples

**Painel 1: Total de Pagamentos**
```
Query: payments_total
```

**Painel 2: Valor Total Transacionado**
```
Query: payments_amount_total{status="success"}
```

**Painel 3: Taxa de Sucesso**
```
Query: rate(payments_total{status="success"}[5m]) / rate(payments_total[5m]) * 100
```

**Painel 4: Erros por Tipo**
```
Query: rate(payments_total{status="error"}[5m])
```

**Painel 5: Tempo de Resposta**
```
Query: histogram_quantile(0.95, rate(payment_duration_seconds_bucket[5m]))
```

## Testar

### 1. Verificar Métricas
```bash
curl http://localhost:3000/metrics
```

### 2. Fazer Pagamentos
```bash
# Fazer alguns pagamentos via API
curl -X POST http://localhost:3000/payments/bill \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"amount": 100.50, "billCode": "123456"}'
```

### 3. Ver Dashboard
- Acessar http://localhost:3001
- Ver métricas em tempo real

## Comandos Úteis

```bash
# Ver logs
docker-compose logs -f

# Parar
docker-compose down

# Rebuild
docker-compose up -d --build
```

## O que Você Vê

### Métricas Básicas
```bash
# Total de pagamentos
payments_total{provider="dock",status="success",instance="monolith"} 150
payments_total{provider="dock",status="error",error_type="business_error",instance="payments"} 5

# Valor transacionado
payments_amount_total{provider="dock",status="success",instance="monolith"} 15000.50

# Tempo de resposta
payment_duration_seconds{provider="dock",status="success",instance="payments"} 0.5
```

### Queries Úteis
```promql
# Valor total transacionado
payments_amount_total{status="success"}

# Taxa de erro
rate(payments_total{status="error"}[5m])

# Erros por tipo
sum by (error_type) (rate(payments_total{status="error"}[5m]))

# Performance por instância
sum by (instance) (payments_total)
```

## Benefícios para POC

### ✅ **Demonstração**
- Dashboard visual impressionante
- Métricas em tempo real
- Fácil de explicar

### ✅ **Operacional**
- Ver quantos pagamentos estão sendo feitos
- Identificar problemas rapidamente
- Monitorar performance

### ✅ **Business**
- Valor total transacionado
- Taxa de sucesso
- Comparação entre provedores

### ✅ **Bootstrap Modular**
- Métricas por instância
- Comparação de performance
- Visibilidade completa

## Próximos Passos

1. **Implementar métricas** no código
2. **Subir containers** com Docker
3. **Configurar dashboard** no Grafana
4. **Testar** com algumas transações
5. **Demonstrar** em tempo real

**Resultado:** POC com observabilidade funcional em 30 minutos! 