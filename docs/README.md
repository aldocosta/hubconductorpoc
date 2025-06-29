# Documentação do HubConductor POC

Esta pasta contém toda a documentação técnica do projeto HubConductor POC.

## Arquivos de Documentação

### 📋 [architecture.md](./architecture.md)
Documentação completa da arquitetura atual do projeto, incluindo:
- Análise da estrutura de módulos
- Pontos positivos e pontos de melhoria
- Padrões arquiteturais utilizados
- Fluxo de funcionamento
- Tecnologias utilizadas
- Próximos passos

### 🛡️ [ratelimit.md](./ratelimit.md)
Análise completa sobre Rate Limiting, incluindo:
- Conceitos e objetivos do Rate Limiting
- Comparação entre implementação em infraestrutura vs aplicação
- Implementação detalhada no NestJS
- Configurações avançadas para HubConductor
- Abordagem híbrida recomendada
- Benefícios para sistemas financeiros

### 📊 [observability.md](./observability.md)
Guia completo sobre Observability, incluindo:
- Conceitos dos três pilares (Métricas, Logs, Traces)
- Implementação detalhada do Pilar 1 (Métricas) com Docker
- Configuração Prometheus + Grafana
- Dashboards práticos para HubConductor
- ROI e benefícios para sistemas financeiros
- Próximos passos para Logs e Traces

## Como Usar Esta Documentação

### Para Desenvolvedores
1. **Leia `architecture.md`** para entender a arquitetura atual
2. **Consulte `ratelimit.md`** para implementar proteções de segurança
3. **Siga `observability.md`** para implementar monitoramento
4. **Siga os "Próximos Passos"** para implementar melhorias
5. **Use como referência** para novas implementações

### Para IAs
1. **Analise `architecture.md`** para entender o contexto
2. **Consulte `ratelimit.md`** para implementar segurança
3. **Siga `observability.md`** para implementar monitoramento
4. **Siga os padrões estabelecidos** para novas funcionalidades
5. **Mantenha a documentação atualizada** conforme mudanças

## Convenções de Documentação

### Estrutura de Arquivos
- Use nomes descritivos em inglês
- Mantenha extensão `.md` para Markdown
- Organize por tópicos específicos

### Formatação
- Use headers hierárquicos (`#`, `##`, `###`)
- Destaque código com ``` ```
- Use listas para enumerar pontos
- Use tabelas quando apropriado

### Atualizações
- Documente mudanças arquiteturais
- Mantenha histórico de decisões importantes
- Atualize conforme novas funcionalidades são adicionadas

## Próximas Documentações Planejadas

- [ ] `api-documentation.md` - Documentação detalhada da API
- [ ] `deployment-guide.md` - Guia de deploy e configuração
- [ ] `testing-strategy.md` - Estratégia de testes
- [ ] `security-guidelines.md` - Diretrizes de segurança
- [ ] `performance-optimization.md` - Otimizações de performance
- [ ] `health-checks.md` - Implementação de Health Checks
- [ ] `logging-strategy.md` - Estratégia de logging (Pilar 2)
- [ ] `tracing-strategy.md` - Estratégia de tracing (Pilar 3)
- [ ] `exception-handling.md` - Tratamento de exceções 