# HubConductor POC - Documentação de Arquitetura

## Visão Geral

O **HubConductor POC** é uma prova de conceito de um sistema modular monolítico em NestJS para uma fintech que oferece serviços financeiros. O projeto demonstra como implementar funcionalidades como pagamento de contas e transferências DOC através de múltiplos provedores usando injeção de dependência e arquitetura modular.

## Objetivos do Projeto

- Demonstrar arquitetura modular escalável
- Implementar múltiplos provedores de pagamento e transferência
- Usar injeção de dependência para seleção dinâmica de provedores
- Permitir bootstrap independente de módulos
- Manter autenticação stateless com JWT

## Arquitetura Atual

### Estrutura de Módulos

```
src/
├── app.module.ts                 # Módulo raiz da aplicação
├── core/                         # Módulo centralizador (interfaces)
│   ├── core.module.ts
│   ├── interfaces/               # Contratos compartilhados
│   │   ├── payment-provider.interface.ts
│   │   └── doc-provider.interface.ts
│   └── services/                 # Serviços utilitários
│       └── jwt.service.ts        # (Movido para AuthModule)
├── payments/                     # Domínio de Pagamentos
│   ├── payments.module.ts
│   ├── payments.controller.ts
│   ├── payments.bootstrap.ts     # Bootstrap independente
│   ├── dto/                      # DTOs específicos do domínio
│   │   ├── pay-bill-request.dto.ts
│   │   └── pay-bill-response.dto.ts
│   └── services/
│       ├── payment.service.ts
│       └── payment-provider.factory.ts
├── transfers/                    # Domínio de Transferências
│   ├── transfers.module.ts
│   ├── transfers.controller.ts
│   ├── dto/                      # DTOs específicos do domínio
│   │   ├── doc-transfer-request.dto.ts
│   │   └── doc-transfer-response.dto.ts
│   └── services/
│       ├── doc.service.ts
│       └── doc-provider.factory.ts
├── dock/                         # Provedor Dock
│   ├── dock.module.ts
│   ├── dock-payment-provider.service.ts
│   └── dock-doc-provider.service.ts
├── provedor-x/                   # Provedor ProvedorX
│   ├── provedor-x.module.ts
│   ├── provedor-x-payment-provider.service.ts
│   └── provedor-x-doc-provider.service.ts
├── auth/                         # Autenticação
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── dto/
│   │   ├── login-request.dto.ts
│   │   └── login-response.dto.ts
│   └── services/                 # JwtService movido para cá
│       └── jwt.service.ts
└── database/                     # Abstração de banco de dados
    ├── database.module.ts
    ├── interfaces/
    │   └── database-service.interface.ts
    └── services/
        ├── sql-server-mock.service.ts
        └── mongo-mock.service.ts
```

## Análise da Arquitetura Atual

### ✅ Pontos Positivos (Alinhados com as Expectativas)

#### 1. **Modularidade Bem Implementada**
- **Domínios Separados**: Payments e Transfers são módulos independentes
- **Responsabilidade Única**: Cada módulo tem sua responsabilidade específica
- **Baixo Acoplamento**: Módulos se comunicam através de interfaces

#### 2. **Injeção de Dependência Correta**
- **Factory Pattern**: Implementação adequada para seleção de provedores
- **Provider Selection**: Seleção dinâmica baseada no providerId do JWT
- **Modular Dependencies**: Cada módulo importa apenas o que precisa

#### 3. **Autenticação Stateless**
- **JWT com Claims**: providerId embutido no token
- **Sem Estado**: Não há armazenamento de contexto em memória
- **Escalável**: Funciona com múltiplas instâncias

#### 4. **Bootstrap Independente**
- **payments.bootstrap.ts**: Permite executar apenas o módulo de pagamentos
- **Isolamento**: Módulos podem ser executados independentemente
- **Flexibilidade**: Útil para microserviços futuros

#### 5. **Interfaces Bem Definidas**
- **Contratos Claros**: IPaymentProvider e IDocProvider bem definidos
- **Implementação Múltipla**: Cada provedor implementa as interfaces
- **Extensibilidade**: Fácil adicionar novos provedores

#### 6. **Organização de DTOs Correta**
- **DTOs por Domínio**: Cada módulo tem seus próprios DTOs
- **Sem Monstro no Core**: DTOs específicos não estão centralizados
- **Manutenibilidade**: Fácil localizar e modificar DTOs

#### 7. **Organização de Serviços Correta**
- **JwtService no AuthModule**: Serviço de autenticação no módulo correto
- **Sem Duplicação**: Evita múltiplas declarações do mesmo serviço
- **Responsabilidade Clara**: AuthModule gerencia autenticação

### ❌ Pontos que Precisam de Ajuste

#### 1. **PaymentsModule Comentado**
- **Problema**: `PaymentsModule` está comentado no `AppModule`
- **Impacto**: Endpoints de pagamento não estão disponíveis
- **Solução**: Descomentar e testar

#### 2. **Falta de Proteção de Autenticação**
- **Problema**: Controllers não têm Guards de autenticação
- **Impacto**: Endpoints podem ser acessados sem autenticação
- **Solução**: Implementar Guards JWT

#### 3. **Falta de Validação Global**
- **Problema**: DTOs não têm validação automática
- **Impacto**: Dados inválidos podem ser processados
- **Solução**: Configurar ValidationPipe global

#### 4. **Falta de Tratamento de Erros**
- **Problema**: Não há Exception Filters padronizados
- **Impacto**: Respostas de erro inconsistentes
- **Solução**: Implementar Exception Filters

#### 5. **Falta de Configuração**
- **Problema**: Não há configuração por ambiente
- **Impacto**: Dificuldade para deploy em diferentes ambientes
- **Solução**: Implementar ConfigModule

#### 6. **Falta de Health Checks**
- **Problema**: Não há monitoramento da aplicação
- **Impacto**: Dificuldade para detectar problemas operacionais
- **Solução**: Implementar Health Checks

#### 7. **Falta de Rate Limiting**
- **Problema**: Não há proteção contra abuso
- **Impacto**: Vulnerabilidade a ataques de força bruta
- **Solução**: Implementar Rate Limiting

#### 8. **Falta de CORS**
- **Problema**: Não há configuração para APIs web
- **Impacto**: Problemas de integração com frontend
- **Solução**: Configurar CORS

#### 9. **Falta de Logging**
- **Problema**: Não há sistema de logs estruturado
- **Impacto**: Dificuldade para debugging e monitoramento
- **Solução**: Implementar sistema de logging

#### 10. **Swagger Incompleto**
- **Problema**: Documentação da API não está completa
- **Impacto**: Dificuldade para integração
- **Solução**: Configurar Swagger adequadamente

## Padrões Arquiteturais Utilizados

### 1. **Modular Monolith**
- **Conceito**: Monolito dividido em módulos bem definidos
- **Benefício**: Facilita migração para microserviços
- **Implementação**: Módulos NestJS com responsabilidades específicas

### 2. **Factory Pattern**
- **Conceito**: Criação dinâmica de objetos baseada em parâmetros
- **Benefício**: Flexibilidade na seleção de implementações
- **Implementação**: PaymentProviderFactory e DocProviderFactory

### 3. **Dependency Injection**
- **Conceito**: Inversão de controle para gerenciamento de dependências
- **Benefício**: Baixo acoplamento e testabilidade
- **Implementação**: Sistema de DI nativo do NestJS

### 4. **Interface Segregation**
- **Conceito**: Interfaces específicas para cada domínio
- **Benefício**: Contratos claros e extensibilidade
- **Implementação**: IPaymentProvider e IDocProvider

### 5. **Stateless Authentication**
- **Conceito**: Autenticação sem armazenamento de estado
- **Benefício**: Escalabilidade e simplicidade
- **Implementação**: JWT com claims

## Fluxo de Funcionamento

### 1. **Autenticação**
```
1. Cliente faz POST /auth/login com providerId
2. AuthService valida credenciais
3. JwtService gera token com providerId nos claims
4. Retorna token para o cliente
```

### 2. **Pagamento de Boleto**
```
1. Cliente faz POST /payments/bill com token JWT
2. PaymentsController extrai providerId do token
3. PaymentService usa PaymentProviderFactory
4. Factory retorna provedor correto (Dock/ProvedorX)
5. Provedor processa pagamento
6. Retorna resposta padronizada
```

### 3. **Transferência DOC**
```
1. Cliente faz POST /transfers/doc com token JWT
2. TransfersController extrai providerId do token
3. DocService usa DocProviderFactory
4. Factory retorna provedor correto (Dock/ProvedorX)
5. Provedor processa transferência
6. Retorna resposta padronizada
```

## Tecnologias Utilizadas

### **Framework**
- **NestJS**: Framework Node.js para aplicações escaláveis
- **TypeScript**: Linguagem tipada para maior segurança

### **Autenticação**
- **JWT**: JSON Web Tokens para autenticação stateless
- **jsonwebtoken**: Biblioteca para manipulação de JWT

### **Validação**
- **class-validator**: Validação de DTOs
- **class-transformer**: Transformação de objetos

### **Documentação**
- **@nestjs/swagger**: Documentação automática da API

### **Desenvolvimento**
- **@nestjs/cli**: CLI para desenvolvimento
- **ts-node**: Execução de TypeScript
- **Jest**: Framework de testes

## Próximos Passos

### **Prioridade Alta**
1. Descomentar PaymentsModule no AppModule
2. Implementar Guards de autenticação
3. Configurar validação global de DTOs
4. Implementar Exception Filters

### **Prioridade Média**
1. Implementar Health Checks
2. Configurar sistema de logging
3. Implementar Rate Limiting
4. Configurar CORS

### **Prioridade Baixa**
1. Implementar configuração por ambiente
2. Melhorar documentação Swagger
3. Implementar testes automatizados
4. Configurar CI/CD

## Conclusão

A arquitetura atual do HubConductor POC demonstra uma base sólida para um sistema modular escalável. Os pontos positivos superam os pontos de melhoria, e com as correções sugeridas, o projeto estará pronto para produção.

A modularidade implementada facilita futuras expansões e migração para microserviços, enquanto a injeção de dependência e autenticação stateless garantem escalabilidade e manutenibilidade.

## Mudanças Recentes

### **Refatoração de JwtService (Solução B)**
- **Problema**: JwtService estava sendo declarado em múltiplos módulos
- **Solução**: Movido JwtService para AuthModule e exportado para outros módulos
- **Benefício**: Elimina duplicação de providers e melhora organização
- **Impacto**: PaymentsModule e TransfersModule agora importam AuthModule ao invés de CoreModule 