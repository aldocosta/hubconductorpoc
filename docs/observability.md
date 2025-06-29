# Observability - POC Simples

## O que é?

Observability permite **ver o que está acontecendo** no sistema em tempo real.

### Para HubConductor POC
- **Métricas**: Quantos pagamentos? Qual valor total? Qual taxa de erro?
- **Dashboard**: Visualização em tempo real
- **Alertas**: Detectar problemas rapidamente

## Implementação no Código

### 1. Dependências (já instaladas)

```bash
npm install prom-client
```

### 2. Métricas Service (já implementado)

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

### 3. Error Classifier (já implementado)

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

### 4. Integração nos Controllers (já implementado)

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

### 5. Health Controller (já implementado)

```typescript
// src/health/health.controller.ts
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { register } from 'prom-client';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('metrics')
  async getMetrics(@Res() res: Response) {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  }
}
```

## Setup Docker

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

  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'
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

### 2. Prometheus Configuration

```yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"

scrape_configs:
  - job_name: 'hubconductor'
    static_configs:
      - targets: ['hubconductor:3000']
    metrics_path: '/health/metrics'
    scrape_interval: 5s
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
3. URL: `do`
4. Save & Test

### 3. Importar Dashboard

O projeto já inclui um dashboard configurado em `grafana/dashboards/hubconductor-dashboard.json`.

Para importar:
1. Dashboards → Import
2. Upload JSON file
3. Selecionar o arquivo `grafana/dashboards/hubconductor-dashboard.json`
4. Import

### 4. Dashboard Incluído

O dashboard já configurado inclui:

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
curl http://localhost:3000/health/metrics
```

### 2. Verificar Prometheus
```bash
curl http://localhost:9090/api/v1/targets
```

### 3. Fazer Pagamentos
```bash
# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin", "password": "admin123", "providerId": "provedorx"}'

# Pagamento
curl -X POST http://localhost:3000/payments/bill \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"barcode": "12345678901234567890123456789012345678901234", "amount": 15000, "dueDate": "2024-12-31", "payerDocument": "12345678901", "payerName": "João Silva"}'
```

### 4. Ver Dashboard
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

# Verificar containers
docker-compose ps
```

## O que Você Vê

### Métricas Básicas
```bash
# Total de pagamentos
payments_total{provider="provedorx",status="success",instance="monolith"} 2

# Valor transacionado
payments_amount_total{provider="provedorx",status="success",instance="monolith"} 40000

# Tempo de resposta
payment_duration_seconds{provider="provedorx",status="success",instance="monolith"} 0.5
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

1. ✅ **Implementar métricas** no código
2. ✅ **Subir containers** com Docker
3. ✅ **Configurar dashboard** no Grafana
4. ✅ **Testar** com algumas transações
5. ✅ **Demonstrar** em tempo real

**Resultado:** POC com observabilidade funcional! 🚀 