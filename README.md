# Hubconductor - PoC Monolito Modular

Prova de conceito de um monolito modular em NestJS, focado em demonstrar a arquitetura com múltiplos provedores de serviço (mockados) e uma camada de abstração para diferentes tipos de bases de dados (mockadas). O foco principal é a funcionalidade de pagamento de boletos e transferências DOC.

## 🏗️ Arquitetura

### Módulos

- **AppModule**: Módulo principal que orquestra todos os outros módulos
- **CoreModule**: Módulo compartilhado com interfaces (sem DTOs específicos)
- **AuthModule**: Módulo de autenticação com login simulado e JwtService
- **PaymentsModule**: Módulo de pagamentos (apenas boletos)
- **TransfersModule**: Módulo de transferências bancárias (DOC)
- **DockModule**: Provedor de pagamento e DOC mockado da Dock
- **ProvedorXModule**: Provedor de pagamento e DOC mockado do ProvedorX
- **DatabaseModule**: Módulo de banco de dados com implementações mockadas

### Interfaces Principais

- `IPaymentProvider`: Interface para provedores de pagamento de boletos
- `IDocProvider`: Interface para provedores de transferência DOC
- `IDatabaseService`: Interface para serviços de banco de dados

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run start:dev

# Executar em modo produção
npm run build
npm run start:prod
```

### Acesso

- **API**: http://localhost:3000
- **Documentação Swagger**: http://localhost:3000/api

## 📋 Endpoints

### Autenticação

#### POST /auth/login
Realizar login e selecionar provedor de pagamento.

**Credenciais de teste:**
- Email: `admin`
- Senha: `admin123`

**Exemplo de requisição:**
```json
{
  "email": "admin",
  "password": "admin123",
  "providerId": "dock"
}
```

**Provedores disponíveis:**
- `dock`: Provedor Dock (boleto: limite R$ 500, DOC: limite R$ 1000)
- `provedorx`: ProvedorX (boleto: mínimo R$ 10, DOC: mínimo R$ 50 + horário comercial)

### Pagamentos

#### POST /payments/bill
Realizar pagamento de boleto.

**Headers necessários:**
```
Authorization: Bearer <token_do_login>
```

**Exemplo de requisição:**
```json
{
  "barcode": "12345678901234567890123456789012345678901234",
  "amount": 15000,
  "dueDate": "2024-12-31",
  "payerDocument": "12345678901",
  "payerName": "João Silva"
}
```

### Transferências Bancárias

#### POST /transfers/doc
Realizar transferência DOC entre bancos.

**Headers necessários:**
```
Authorization: Bearer <token_do_login>
```

**Exemplo de requisição:**
```json
{
  "amount": 50000,
  "originBank": "001",
  "originAgency": "1234",
  "originAccount": "12345678",
  "originAccountType": "corrente",
  "destinationBank": "341",
  "destinationAgency": "5678",
  "destinationAccount": "87654321",
  "destinationAccountType": "corrente",
  "beneficiaryDocument": "12345678901",
  "beneficiaryName": "João Silva",
  "description": "Pagamento de serviços"
}
```

## 🔧 Lógica dos Provedores Mockados

### Dock
- **Boleto**: Sucesso para valores ≤ R$ 500, erro para valores > R$ 500
- **DOC**: Sucesso para valores ≤ R$ 1000, erro para valores > R$ 1000 ou mesmo banco

### ProvedorX
- **Boleto**: Sucesso para valores ≥ R$ 10, erro para valores < R$ 10
- **DOC**: Sucesso para valores ≥ R$ 50 em horário comercial (9h-17h), agendado fora do horário

## 🗄️ Banco de Dados Mockado

O projeto inclui implementações mockadas de:
- **SQL Server**: Serviço `SqlServerMockService`
- **MongoDB**: Serviço `MongoMockService`

Ambos implementam a interface `IDatabaseService` com operações CRUD básicas.

## 🏛️ Estrutura de Diretórios

```
src/
├── auth/                    # Módulo de autenticação
│   ├── dto/
│   │   ├── login-request.dto.ts
│   │   └── login-response.dto.ts
│   ├── services/
│   │   └── jwt.service.ts   # Serviço JWT movido para cá
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── core/                    # Módulo compartilhado (apenas interfaces)
│   ├── interfaces/
│   │   ├── payment-provider.interface.ts
│   │   └── doc-provider.interface.ts
│   └── core.module.ts
├── database/                # Módulo de banco de dados
│   ├── interfaces/
│   ├── services/
│   └── database.module.ts
├── dock/                    # Provedor Dock
│   ├── dock-payment-provider.service.ts
│   ├── dock-doc-provider.service.ts
│   └── dock.module.ts
├── payments/                # Módulo de pagamentos (boletos)
│   ├── dto/                 # DTOs específicos do domínio
│   │   ├── pay-bill-request.dto.ts
│   │   └── pay-bill-response.dto.ts
│   ├── services/
│   │   ├── payment.service.ts
│   │   └── payment-provider.factory.ts
│   ├── payments.controller.ts
│   ├── payments.module.ts
│   └── payments.bootstrap.ts
├── transfers/               # Módulo de transferências (DOC)
│   ├── dto/                 # DTOs específicos do domínio
│   │   ├── doc-transfer-request.dto.ts
│   │   └── doc-transfer-response.dto.ts
│   ├── services/
│   │   ├── doc.service.ts
│   │   └── doc-provider.factory.ts
│   ├── transfers.controller.ts
│   └── transfers.module.ts
├── provedor-x/              # ProvedorX
│   ├── provedor-x-payment-provider.service.ts
│   ├── provedor-x-doc-provider.service.ts
│   └── provedor-x.module.ts
├── app.module.ts            # Módulo principal
└── main.ts                  # Arquivo de inicialização
```

## 🧪 Testando a API

### 1. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin",
    "password": "admin123",
    "providerId": "dock"
  }'
```

### 2. Pagamento de Boleto
```bash
curl -X POST http://localhost:3000/payments/bill \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_do_login>" \
  -d '{
    "barcode": "12345678901234567890123456789012345678901234",
    "amount": 15000,
    "dueDate": "2024-12-31",
    "payerDocument": "12345678901",
    "payerName": "João Silva"
  }'
```

### 3. Transferência DOC
```bash
curl -X POST http://localhost:3000/transfers/doc \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_do_login>" \
  -d '{
    "amount": 50000,
    "originBank": "001",
    "originAgency": "1234",
    "originAccount": "12345678",
    "originAccountType": "corrente",
    "destinationBank": "341",
    "destinationAgency": "5678",
    "destinationAccount": "87654321",
    "destinationAccountType": "corrente",
    "beneficiaryDocument": "12345678901",
    "beneficiaryName": "João Silva",
    "description": "Pagamento de serviços"
  }'
```

## 🎯 Objetivos da PoC

✅ **Modularidade**: Estrutura modular com separação clara de responsabilidades
✅ **Injeção de Dependência**: Uso correto das práticas do NestJS
✅ **Provedores Múltiplos**: Interface comum com implementações específicas
✅ **Banco de Dados Abstrato**: Interface comum para diferentes tipos de BD
✅ **Documentação**: Swagger configurado e funcional
✅ **Validação**: DTOs com validação automática
✅ **Autenticação JWT**: Sem estado, escalável
✅ **Separação de Domínios**: Pagamentos e transferências em módulos separados
✅ **Múltiplos Serviços**: Boleto e DOC com provedores independentes
✅ **Simplicidade**: Implementação enxuta focada no conceito

## 🔄 Próximos Passos

Para evoluir esta PoC para produção:

1. **Autenticação Real**: Implementar JWT com refresh tokens
2. **Provedores Reais**: Integrar com APIs reais de pagamento e DOC
3. **Banco de Dados Real**: Conectar com PostgreSQL, MongoDB, etc.
4. **Logs e Monitoramento**: Adicionar Winston, Prometheus, etc.
5. **Testes**: Implementar testes unitários e de integração
6. **Deploy**: Configurar Docker e CI/CD
7. **Rate Limiting**: Implementar limites de requisições
8. **Auditoria**: Logs de todas as transações 