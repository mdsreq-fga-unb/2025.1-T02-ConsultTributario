# **ESTRATÉGIAS DE ENGENHARIA DE SOFTWARE**

| Versão | Data       | Autor                                                                                      | Alterações                                 |
| ------ | ---------- | ------------------------------------------------------------------------------------------ | ------------------------------------------ |
| 0.0    | -          | [Equipe ConsultTributário](https://github.com/mdsreq-fga-unb/2025.1-T02-ConsultTributario) | Versão inicial, documentação base herdada. |
| 1.0    | 05/05/2025 | [Vinicius Vieira](https://github.com/viniciusvieira00)                                     | Versão inicial, documentação base herdada. |


---

## Estratégia Priorizada

- **Abordagem:** Ágil  
- **Ciclo de vida:** Iterativo Incremental  
- **Processo:** ScrumXP

## Quadro Comparativo

| Critério                         | ScrumXP                                                                    | Espiral (adaptado)                                               |
| -------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **Modelo de Ciclo de Vida**      | Iterativo-Incremental com sprints de 1–2 semanas                           | Iterativo cíclico dirigido por análise de risco                  |
| **Tempo Médio de Feedback**      | ≤ 10 dias (revisões por sprint + integrações automatizadas)                | ≥ 30 dias (feedback consolidado por ciclo completo)              |
| **Gerenciamento de Requisitos**  | Refinamento contínuo no backlog; alterações aceitas entre sprints          | Mudanças analisadas por impacto entre os ciclos                  |
| **Colaboração com Stakeholders** | Presença ativa via Product Owner e reviews a cada entrega                  | Participação pontual em checkpoints definidos                    |
| **Validação Arquitetural**       | Spikes, DoD com protótipos e CI com testes ≥ 80%                           | Planejamento arquitetural por ciclo; validação formal por etapa  |
| **Escalabilidade**               | Times pequenos (≤ 9 pessoas); uso opcional de frameworks de escala         | Naturalmente estruturado para grandes times e múltiplos domínios |
| **Risco Técnico com APIs**       | Mocks + testes de contrato automatizados garantem robustez nas integrações | Gerência de risco antecipada e simulações formais                |

## Justificativa

A adoção do ScrumXP no projeto ConsultTributário é motivada pela natureza dinâmica do domínio tributário. A legislação fiscal brasileira está em constante atualização, e decisões judiciais podem alterar a aplicabilidade de teses tributárias com frequência. O ScrumXP permite responder a essas mudanças com ciclos curtos (sprints de até 2 semanas), backlog refinado continuamente e atuação ativa do Product Owner, garantindo alinhamento contínuo com as novas oportunidades jurídicas e as necessidades dos usuários finais.

Apesar do foco em entregas incrementais, o ScrumXP não descarta a validação arquitetural. O projeto adota **spikes de arquitetura** para investigar soluções técnicas críticas (ex.: comunicação com APIs públicas como a BrasilAPI), bem como critérios claros na **Definition of Done**: testes automatizados, prova de conceito funcional para integrações e cobertura mínima de testes ≥ 80%. A **integração contínua** (CI) é aplicada desde os primeiros ciclos, assegurando builds estáveis e feedback rápido. Para mitigar riscos com APIs externas, o projeto incorpora **mocks de terceiros e testes de contrato automatizados**, permitindo isolar falhas e validar a aderência a esquemas esperados, mesmo na ausência de resposta real.