# Rate Limiting - Análise e Implementação

## Visão Geral

Rate Limiting é uma técnica fundamental para proteger APIs contra abuso, especialmente em sistemas financeiros como o HubConductor. Este documento analisa as diferentes abordagens de implementação e suas implicações.

## O que é Rate Limiting?

Rate Limiting é uma técnica que **limita o número de requisições** que um cliente pode fazer em um determinado período de tempo.

### Objetivos Principais

- **Prevenir abuso**: Evitar ataques de força bruta
- **Proteger recursos**: Evitar sobrecarga do servidor
- **Garantir justiça**: Distribuir recursos igualmente entre usuários
- **Cumprir regulamentações**: Atender requisitos de segurança financeira

### Exemplos de Limites

```
- 100 requests por minuto por IP
- 1000 requests por hora por usuário
- 10 requests por minuto para endpoints sensíveis (pagamentos)
- 5 tentativas de login por minuto por IP
```

## Abordagens de Implementação

### 1. Camada de Infraestrutura (API Gateway/Nginx/Cloudflare)

#### Vantagens

- **Performance**: Processamento em nível de rede, muito mais rápido
- **Escalabilidade**: Funciona independente do número de instâncias
- **Simplicidade**: Configuração centralizada, sem código
- **Custo**: Muitas vezes já incluído no serviço
- **Proteção**: Bloqueia requisições antes de chegar na aplicação
- **Flexibilidade**: Fácil ajustar limites sem deploy

#### Desvantagens

- **Granularidade limitada**: Difícil implementar lógica complexa
- **Contexto de negócio**: Não conhece usuários, provedores, etc.
- **Debugging**: Mais difícil de debugar e monitorar
- **Vendor lock-in**: Dependência de serviços específicos

### 2. Camada de Aplicação (NestJS)

#### Vantagens

- **Lógica complexa**: Rate limiting baseado em contexto de negócio
- **Granularidade**: Limites por usuário, provedor, operação
- **Flexibilidade**: Implementação customizada para regras específicas
- **Monitoramento**: Logs detalhados e métricas de negócio
- **Controle total**: Comportamento exato conforme necessário

#### Desvantagens

- **Performance**: Processamento adicional na aplicação
- **Complexidade**: Mais código para manter
- **Recursos**: Consome CPU/memória da aplicação
- **Escalabilidade**: Precisa de storage compartilhado (Redis)

## Implementação no NestJS

### Configuração Básica

```bash
npm install @nestjs/throttler
```

### Configuração Global

```typescript
// src/app.module.ts
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000, // 1 minuto
      limit: 100, // 100 requests por minuto
    }]),
    // ... outros módulos
  ],
})
export class AppModule {}
```

### Configuração por Endpoint

```typescript
// src/payments/payments.controller.ts
import { Throttle, SkipThrottle } from '@nestjs/throttler';

@Controller('payments')
export class PaymentsController {
  
  @Post('bill')
  @Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 pagamentos por minuto
  async payBill(@Body() data: PayBillRequestDto) {
    // Lógica de pagamento
  }

  @Get('status')
  @SkipThrottle() // Sem limite para consultas
  async getStatus() {
    // Consulta de status
  }
}
```

### Configuração por Usuário

```typescript
// src/auth/auth.controller.ts
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  
  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 tentativas por minuto
  async login(@Body() data: LoginRequestDto) {
    // Lógica de login
  }
}
```

## Implementação Avançada para HubConductor

### Rate Limiting Inteligente por Provedor

```typescript
// src/common/guards/provider-rate-limit.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class ProviderRateLimitGuard extends ThrottlerGuard {
  
  protected getTracker(req: Record<string, any>): string {
    // Combina IP + providerId para limites específicos por provedor
    const providerId = this.extractProviderId(req);
    return `${req.ip}-${providerId}`;
  }

  private extractProviderId(req: any): string {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token) {
      const payload = this.jwtService.verifyToken(token);
      return payload.providerId || 'default';
    }
    return 'anonymous';
  }

  protected async getThrottleOptions(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const providerId = this.extractProviderId(req);
    
    // Limites diferentes por provedor
    const limits = {
      'dock': { limit: 50, ttl: 60000 },      // 50/min para Dock
      'provedorx': { limit: 30, ttl: 60000 }, // 30/min para ProvedorX
      'default': { limit: 10, ttl: 60000 }    // 10/min para outros
    };
    
    return limits[providerId] || limits.default;
  }
}
```

### Rate Limiting por Tipo de Operação

```typescript
// src/common/decorators/rate-limit.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const RATE_LIMIT_KEY = 'rate_limit';
export interface RateLimitOptions {
  limit: number;
  ttl: number;
  scope?: 'user' | 'ip' | 'provider';
}

export const RateLimit = (options: RateLimitOptions) => 
  SetMetadata(RATE_LIMIT_KEY, options);

// Uso nos controllers
@Post('bill')
@RateLimit({ limit: 10, ttl: 60000, scope: 'user' })
async payBill(@Body() data: PayBillRequestDto) {
  // Lógica de pagamento
}

@Post('doc')
@RateLimit({ limit: 5, ttl: 60000, scope: 'user' })
async transferDoc(@Body() data: DocTransferRequestDto) {
  // Lógica de transferência
}
```

### Storage Personalizado (Redis)

```typescript
// src/common/storage/redis-throttler.storage.ts
import { Injectable } from '@nestjs/common';
import { ThrottlerStorage } from '@nestjs/throttler';
import Redis from 'ioredis';

@Injectable()
export class RedisThrottlerStorage implements ThrottlerStorage {
  constructor(private readonly redis: Redis) {}

  async increment(key: string, ttl: number): Promise<{ totalHits: number; timeToExpire: number }> {
    const multi = this.redis.multi();
    multi.incr(key);
    multi.expire(key, ttl);
    
    const [totalHits] = await multi.exec();
    const timeToExpire = await this.redis.ttl(key);
    
    return { totalHits: totalHits[1] as number, timeToExpire };
  }

  async get(key: string): Promise<{ totalHits: number; timeToExpire: number }> {
    const [totalHits, timeToExpire] = await Promise.all([
      this.redis.get(key),
      this.redis.ttl(key)
    ]);
    
    return {
      totalHits: totalHits ? parseInt(totalHits) : 0,
      timeToExpire: timeToExpire || 0
    };
  }
}
```

## Configuração Completa para HubConductor

### Módulo de Rate Limiting

```typescript
// src/common/rate-limiting/rate-limiting.module.ts
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { RedisThrottlerStorage } from '../storage/redis-throttler.storage';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      useFactory: () => ({
        ttl: 60000,
        limit: 100,
        storage: new RedisThrottlerStorage(redis),
        ignoreUserAgents: [/health-check/], // Ignora health checks
        skipIf: (req) => req.path === '/health', // Ignora endpoint de health
      }),
    }),
  ],
  exports: [ThrottlerModule],
})
export class RateLimitingModule {}
```

### Interceptor para Logging

```typescript
// src/common/interceptors/rate-limit-logger.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RateLimitLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;
        console.log(`Rate Limited Request: ${req.method} ${req.path} - ${duration}ms`);
      })
    );
  }
}
```

### Resposta de Rate Limit Personalizada

```typescript
// src/common/filters/rate-limit-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';
import { Response } from 'express';

@Catch(ThrottlerException)
export class RateLimitExceptionFilter implements ExceptionFilter {
  catch(exception: ThrottlerException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    response.status(HttpStatus.TOO_MANY_REQUESTS).json({
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
      message: 'Muitas requisições. Tente novamente em alguns minutos.',
      error: 'Too Many Requests',
      retryAfter: 60, // segundos
      timestamp: new Date().toISOString(),
    });
  }
}
```

## Implementação com Infraestrutura

### Nginx Configuration

```nginx
# nginx.conf
http {
    # Rate limiting por IP
    limit_req_zone $binary_remote_addr zone=api:10m rate=100r/m;
    limit_req_zone $binary_remote_addr zone=payments:10m rate=10r/m;
    limit_req_zone $binary_remote_addr zone=transfers:10m rate=5r/m;
    
    server {
        location /api/payments/ {
            limit_req zone=payments burst=5 nodelay;
            proxy_pass http://backend;
        }
        
        location /api/transfers/ {
            limit_req zone=transfers burst=3 nodelay;
            proxy_pass http://backend;
        }
        
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://backend;
        }
    }
}
```

### Cloudflare Configuration

```javascript
// Cloudflare Workers
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Rate limiting por IP
  const clientIP = request.headers.get('CF-Connecting-IP')
  const rateLimitKey = `rate_limit:${clientIP}`
  
  const currentCount = await caches.default.match(rateLimitKey)
  if (currentCount && parseInt(currentCount) > 100) {
    return new Response('Rate limit exceeded', { status: 429 })
  }
  
  // Increment counter
  await caches.default.put(rateLimitKey, 
    new Response((parseInt(currentCount) || 0) + 1),
    { expirationTtl: 60 }
  )
  
  return fetch(request)
}
```

## Abordagem Híbrida Recomendada

### Arquitetura em Camadas

```
Cliente → Cloudflare/Nginx → API Gateway → NestJS App
   ↓           ↓                ↓            ↓
Rate Limit   Rate Limit     Rate Limit   Rate Limit
  Básico      Intermédio     Avançado     Business
```

### Distribuição de Responsabilidades

#### 1. Cloudflare/Nginx (Primeira Linha)

**Responsabilidades:**
- ✅ Bloqueio de IPs maliciosos
- ✅ Rate limiting básico por IP
- ✅ Proteção contra DDoS
- ✅ Cache de respostas estáticas

#### 2. API Gateway (Segunda Linha)

**Responsabilidades:**
- ✅ Rate limiting por API key
- ✅ Autenticação básica
- ✅ Roteamento inteligente
- ✅ Logs de acesso

#### 3. NestJS (Terceira Linha)

**Responsabilidades:**
- ✅ Rate limiting por usuário
- ✅ Limites por provedor (Dock vs ProvedorX)
- ✅ Limites por tipo de operação (pagamento vs transferência)
- ✅ Lógica de negócio específica

## Benefícios para HubConductor

### Segurança

- **Previne ataques**: Brute force, DDoS
- **Protege recursos**: Evita sobrecarga dos provedores
- **Cumpre regulamentações**: Atende requisitos de segurança financeira

### Justiça

- **Distribuição equitativa**: Recursos para todos os usuários
- **Prevenção de abuso**: Usuários não podem monopolizar recursos
- **Qualidade de serviço**: Melhor experiência para todos

### Monitoramento

- **Métricas de uso**: Identificar padrões de abuso
- **Alertas automáticos**: Notificar sobre ataques
- **Análise de comportamento**: Detectar atividades suspeitas

### Business

- **Proteção de custos**: Evita gastos desnecessários com provedores
- **SLA compliance**: Garante qualidade de serviço
- **Reputação**: Mantém confiança dos clientes

## Considerações de Implementação

### Para POC

**Implementar apenas na camada de aplicação** com NestJS porque:
- ✅ Mais simples de configurar
- ✅ Demonstra conceitos arquiteturais
- ✅ Fácil de testar e debugar
- ✅ Controle total sobre a lógica

### Para Produção

**Implementar abordagem híbrida** porque:
- ✅ Melhor performance
- ✅ Proteção em múltiplas camadas
- ✅ Escalabilidade superior
- ✅ Custo-benefício otimizado

### Plano de Implementação

#### Fase 1: POC
```typescript
// Rate limiting básico no NestJS
ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }])
```

#### Fase 2: Evolução
```typescript
// Rate limiting de negócio
@Throttle({ limit: 10, ttl: 60000 })
```

#### Fase 3: Produção
```nginx
# Nginx + NestJS híbrido
limit_req zone=api:10m rate=100r/m;
```

## Conclusão

Rate Limiting é essencial para sistemas financeiros como o HubConductor. A escolha entre implementação na infraestrutura ou aplicação depende do contexto, mas a abordagem híbrida oferece o melhor equilíbrio entre performance, segurança e flexibilidade.

Para o POC, a implementação em NestJS é adequada, mas para produção, a combinação de infraestrutura + aplicação oferece proteção mais robusta e escalável. 