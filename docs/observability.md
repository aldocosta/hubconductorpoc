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

### 2. Métricas por Módulo

#### PaymentsModule - Métricas de Pagamento

```typescript
// src/payments/services/payment-metrics.service.ts
import { Injectable } from '@nestjs/common';
import { Counter, Histogram } from 'prom-client';

@Injectable()
export class PaymentMetricsService {
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

#### TransfersModule - Métricas de Transferência

```typescript
// src/transfers/services/transfer-metrics.service.ts
import { Injectable } from '@nestjs/common';
import { Counter, Histogram } from 'prom-client';

@Injectable()
export class TransferMetricsService {
  private transferCounter = new Counter({
    name: 'transfers_total',
    help: 'Total de transferências',
    labelNames: ['provider', 'status', 'error_type', 'instance']
  });

  private transferAmount = new Counter({
    name: 'transfers_amount_total',
    help: 'Valor total transferido',
    labelNames: ['provider', 'status', 'instance']
  });

  private transferDuration = new Histogram({
    name: 'transfer_duration_seconds',
    help: 'Tempo de resposta',
    labelNames: ['provider', 'status', 'instance']
  });

  recordTransfer(provider: string, status: string, amount: number, duration: number, errorType?: string, instance?: string) {
    this.transferCounter.inc({ 
      provider, 
      status, 
      error_type: errorType || 'none',
      instance: instance || 'monolith'
    });
    
    if (status === 'success') {
      this.transferAmount.inc({ provider, status, instance: instance || 'monolith' }, amount);
    }
    
    this.transferDuration.observe({ provider, status, instance: instance || 'monolith' }, duration / 1000);
  }
}
```

### 3. Classificadores de Erro Específicos

#### PaymentErrorClassifier

```typescript
// src/payments/services/payment-error-classifier.ts
export class PaymentErrorClassifier {
  static classifyError(error: any): string {
    if (error.message?.includes('provider') || error.message?.includes('timeout')) {
      return 'payment_provider_error';
    }
    
    if (error.message?.includes('saldo') || error.message?.includes('insufficient')) {
      return 'payment_business_error';
    }
    
    if (error.message?.includes('validation') || error.status === 400) {
      return 'payment_validation_error';
    }
    
    if (error.status === 401 || error.status === 403) {
      return 'payment_auth_error';
    }
    
    if (error.message?.includes('boleto') || error.message?.includes('bill')) {
      return 'payment_bill_error';
    }
    
    return 'payment_unknown_error';
  }
}
```

#### TransferErrorClassifier

```typescript
// src/transfers/services/transfer-error-classifier.ts
export class TransferErrorClassifier {
  static classifyError(error: any): string {
    if (error.message?.includes('provider') || error.message?.includes('timeout')) {
      return 'transfer_provider_error';
    }
    
    if (error.message?.includes('saldo') || error.message?.includes('insufficient')) {
      return 'transfer_business_error';
    }
    
    if (error.message?.includes('validation') || error.status === 400) {
      return 'transfer_validation_error';
    }
    
    if (error.status === 401 || error.status === 403) {
      return 'transfer_auth_error';
    }
    
    if (error.message?.includes('conta') || error.message?.includes('account')) {
      return 'transfer_account_error';
    }
    
    if (error.message?.includes('doc') || error.message?.includes('transfer')) {
      return 'transfer_doc_error';
    }
    
    return 'transfer_unknown_error';
  }
}
```

### 4. Integração nos Controllers

#### PaymentsController

```typescript
// src/payments/payments.controller.ts
import { PaymentMetricsService } from './services/payment-metrics.service';
import { PaymentErrorClassifier } from './services/payment-error-classifier';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly metricsService: PaymentMetricsService,
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
      const errorType = PaymentErrorClassifier.classifyError(error);
      
      this.metricsService.recordPayment(req.user.providerId, 'error', 0, duration, errorType, instance);
      throw error;
    }
  }
}
```

#### TransfersController

```typescript
// src/transfers/transfers.controller.ts
import { TransferMetricsService } from './services/transfer-metrics.service';
import { TransferErrorClassifier } from './services/transfer-error-classifier';

@Controller('transfers')
export class TransfersController {
  constructor(
    private readonly docService: DocService,
    private readonly metricsService: TransferMetricsService,
  ) {}

  @Post('doc')
  async transferDoc(@Body() data: DocTransferRequestDto, @Req() req: any) {
    const startTime = Date.now();
    const amount = data.amount || 0;
    const instance = process.env.INSTANCE_NAME || 'monolith';
    
    try {
      const result = await this.docService.transferDoc(data, req.user.providerId);
      
      const duration = Date.now() - startTime;
      this.metricsService.recordTransfer(req.user.providerId, 'success', amount, duration, undefined, instance);
      
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorType = TransferErrorClassifier.classifyError(error);
      
      this.metricsService.recordTransfer(req.user.providerId, 'error', 0, duration, errorType, instance);
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
3. URL: `http://prometheus:9090`
4. Save & Test

### 3. Criar Dashboard

Criar painéis com as seguintes queries:

**Painel 1: Total de Pagamentos**
```
Query: payments_total
```

**Painel 2: Total de Transferências**
```
Query: transfers_total
```

**Painel 3: Valor Total Transacionado**
```
Query: payments_amount_total{status="success"}
```

**Painel 4: Valor Total Transferido**
```
Query: transfers_amount_total{status="success"}
```

**Painel 5: Taxa de Sucesso - Pagamentos**
```
Query: rate(payments_total{status="success"}[5m]) / rate(payments_total[5m]) * 100
```

**Painel 6: Taxa de Sucesso - Transferências**
```
Query: rate(transfers_total{status="success"}[5m]) / rate(transfers_total[5m]) * 100
```

**Painel 7: Erros por Tipo - Pagamentos**
```
Query: rate(payments_total{status="error"}[5m])
```

**Painel 8: Erros por Tipo - Transferências**
```
Query: rate(transfers_total{status="error"}[5m])
```

**Painel 9: Tempo de Resposta - Pagamentos**
```
Query: histogram_quantile(0.95, rate(payment_duration_seconds_bucket[5m]))
```

**Painel 10: Tempo de Resposta - Transferências**
```
Query: histogram_quantile(0.95, rate(transfer_duration_seconds_bucket[5m]))
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

### 4. Fazer Transferências
```bash
# Transferência DOC
curl -X POST http://localhost:3000/transfers/doc \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"amount": 5000, "sourceAccount": "123456", "destinationAccount": "789012", "bankCode": "001"}'
```

### 5. Ver Dashboard
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

### Métricas de Pagamentos
```bash
# Total de pagamentos
payments_total{provider="provedorx",status="success",instance="monolith"} 2

# Valor transacionado
payments_amount_total{provider="provedorx",status="success",instance="monolith"} 40000

# Tempo de resposta
payment_duration_seconds{provider="provedorx",status="success",instance="monolith"} 0.5
```

### Métricas de Transferências
```bash
# Total de transferências
transfers_total{provider="provedorx",status="success",instance="monolith"} 1

# Valor transferido
transfers_amount_total{provider="provedorx",status="success",instance="monolith"} 5000

# Tempo de resposta
transfer_duration_seconds{provider="provedorx",status="success",instance="monolith"} 0.3
```

### Queries Úteis
```promql
# Valor total transacionado
payments_amount_total{status="success"}

# Valor total transferido
transfers_amount_total{status="success"}

# Taxa de erro - Pagamentos
rate(payments_total{status="error"}[5m])

# Taxa de erro - Transferências
rate(transfers_total{status="error"}[5m])

# Erros por tipo - Pagamentos
sum by (error_type) (rate(payments_total{status="error"}[5m]))

# Erros por tipo - Transferências
sum by (error_type) (rate(transfers_total{status="error"}[5m]))

# Performance por instância
sum by (instance) (payments_total)
sum by (instance) (transfers_total)
```

## Benefícios da Arquitetura Modular

### ✅ **Separação de Responsabilidades**
- Cada módulo gerencia suas próprias métricas
- Erros específicos por domínio
- Fácil manutenção e evolução

### ✅ **Escalabilidade**
- Métricas independentes por módulo
- Fácil adicionar novos tipos de métricas
- Suporte a bootstrap modular

### ✅ **Observabilidade Granular**
- Métricas específicas por domínio
- Labels específicos por contexto
- Queries mais precisas

### ✅ **Manutenibilidade**
- Código organizado por domínio
- Fácil encontrar e modificar métricas
- Baixo acoplamento entre módulos

## Próximos Passos

1. ✅ **Implementar métricas** no código
2. ✅ **Organizar por módulos** específicos
3. ✅ **Subir containers** com Docker
4. ✅ **Configurar dashboard** no Grafana
5. ✅ **Testar** com algumas transações
6. ✅ **Demonstrar** em tempo real

**Resultado:** POC com observabilidade modular e funcional! 🚀 