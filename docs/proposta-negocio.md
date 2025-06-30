# HubConductor POC - Proposta de Reformulação

## 📋 **O que é o Projeto**

O **HubConductor POC** é uma proposta para reformulação do sistema HubConductor atual, demonstrando como seria uma versão modernizada.

---

## ❌ **Problemas Identificados**

O sistema atual apresenta as seguintes limitações:

- **Tecnologia antiga** em uso
- **Sistema amarrado a uma máquina virtual (VM)** específica
- **Microserviços rodando dentro da VM**, criando dependências
- **Codificação com problemas** de qualidade
- **Limitação ao provedor Dock** - não suporta outros facilmente
- **Dificuldade para atualizar versões** dos pacotes e componentes

---

## ✅ **Solução Proposta**

### **Modernização com NestJS**

A proposta é atualizar a tecnologia usando **NestJS**, um framework de Node.js que:

- **Trabalha com TypeScript** - linguagem tipada e mais segura
- **É 100% compatível** com padrões como DDD e Clean Code
- **Força o uso de padrões** de desenvolvimento de mercado
- **Suporta tecnologias atuais** como:
  - Mecanismos de fila (RabbitMQ, Kafka, ServiceBus)
  - Cache (Redis, etc.)
  - Bancos relacionais e não relacionais (SQL Server, MySQL, MongoDB)
  - Documentação (Swagger, etc.)
  - Docker

### **Vantagem Principal do NestJS**
É possível trabalhar desde o **dia 1** do projeto sabendo que, se algum módulo (como pagamentos) se tornar um gargalo, pode ser separado como microserviço **mantendo o mesmo código base**.

### **Observabilidade**
O projeto inclui **observabilidade** - capacidade de "extrair" dados sobre as operações baseado nos 3 padrões:

#### **📊 Métricas** 
- "Taxa de erros"
- "Agência XYZ tem um total X de pagamentos de boletos, TEDs realizadas ou outra funcionalidade realizado em tempo real"

#### **📝 Logs**
- "Erro específico: Provider timeout"

#### **🔍 Rastreabilidade**
- Exemplos...
- "Erro: O timeout acontece na chamada para API do Dock"

---

## 🚀 **O que a POC Contém**

### **Funcionalidades Implementadas:**

1. **API de Login**
   - Identifica o usuário
   - Identifica qual provedor ele tem configurado (Dock, ProvedorX, etc.)

2. **Processamento por Provedor**
   - Realiza **Pagamento de Boletos** conforme o provedor
   - Realiza **TEDs** conforme o provedor

3. **Métricas Coletadas**
   - Ações de login, TED e pagamentos de boletos
   - Cálculo de quantidade e valor
   - Medição de sucesso das operações

4. **Modularidade**
   - Qualquer módulo pode ser separado como microserviço **no dia 1**
   - Reduz esforço de trabalho devido à característica modular do NestJS

---

## 🔧 **Dependências da POC**

### **Prometheus**
Sistema de monitoramento open-source que:
- Coleta e armazena métricas numéricas das aplicações
- Funciona no modelo **pull-based** (puxa dados da aplicação)
- A aplicação expõe um endpoint `/metrics`
- Coleta dados a cada X segundos automaticamente

### **Grafana**
- Conecta no Prometheus
- Cria os indicadores visuais e dashboards

---

## ⚠️ **Desafios Identificados**

### **1. Estrutura de Monitoramento**
- **Analisar** se a estrutura da POC é ideal
- **Avaliar** migração para algum serviço de Scraper (substituto do Prometheus)
- **Usar Redis** para não sobrecarregar a aplicação principal

### **2. Implementação de Métricas**
Em cada local onde métricas são necessárias, deve-se implementá-las. Exemplos:
- Pagamentos
- Recargas  
- Logins
- Erros não previstos
- Erros dos provedores
- Erros de regra de negócio
- **Entender cenários** das métricas e **aplicá-las onde agregam valor**

### **3. Adaptação para Azure**
- A configuração desta estrutura **precisa de análise de viabilidade**
- **Adaptação** para os serviços do Azure

---

## 🎯 **Resumo**

Esta POC demonstra como seria possível:
- Resolver os problemas atuais do HubConductor
- Trabalhar com múltiplos provedores
- Ter visibilidade completa das operações
- Evoluir para microserviços quando necessário
- Usar tecnologias modernas e padrões de mercado

**A POC serve como prova de conceito para validar a viabilidade técnica da modernização proposta.** 