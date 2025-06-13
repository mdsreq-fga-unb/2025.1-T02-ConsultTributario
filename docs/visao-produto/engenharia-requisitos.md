## Histórico de Versão:

| Data     | Versão | Descrição                                                      | Autor                     |
| -------- | ------ | -------------------------------------------------------------- | ------------------------- |
| 26/05/25 | 1.0    | Criação do Documento                                           | Artur Krauspenhar e Diogo |
| 26/05/25 | 2.0    | Adição de tabela de mapeamento das atividades de ER no ScrumXP | Vinicius Vieira           |
| 13/06/25 | 3.0    | Correção da tabela das atividades de ER                        | Artur Krauspenhar         |

# Engenharia de Requisitos

## Atividades técnicas de ER

- **Elicitação e Descoberta:**

  - _Entrevistas com os Stakeholders_: Entrevistas abertas com o cliente ajuda a compreender suas visões e expectativas, garantindo que o produto seja desenvolvido de acordo com as suas necessidades e expectativas.
  - _Análise da Concorrência_: A análise da concorrência permite identificar as estratégias adotadas por outros semelhantes, avaliando pontos fortes e fracos em áreas como design da interface ou funcionalidades. Isso ajuda a reconhecer features que deram certo, evitar erros comuns e definir requisitos que agreguem valor ao produto.

- **Análise e Consenso:**

  - _MoSCoW_: Técnica utilizada para priorizar funcionalidades em "Must Have", "Should Have", "Could Have" e "Won't Have", garantindo foco nas entregas essenciais e de maior valor.
  - _Workshop de Requisitos_: Técnica utilizada para resolver conflitos a respeito do escopo do projeto a fim de definir os critérios de priorização.

- **Declaração:**

  - _Épicos e User Stories_: A estruturação de épicos e histórias de usuário é fundamental para organizar os requisitos em níveis distintos de granularidade. Isso facilita a visualização do escopo do projeto e contribui para uma compreensão mais precisa das funcionalidades que precisam ser implementadas na plataforma ConsulTributário.

- **Representação**

  - _Protótipos, Wireframes_: Criar protótipos e wireframes para as novas páginas do ConsultTributário, como a página de criação de teses ajuda a equipe a visualizar como as funcionalidades serão implementadas e facilita o alinhamento com os stakeholders.

- **Verificação e Validação:**

  - _Validação de Requisitos_: estabelecimento e aplicação dos conceitos de DoR (Definitionof Ready) e DoD (Definition of Done)
  - _Coleta de Feedback_: Coletar feedback do cliente durante iteração ajuda a verificar se as funcionalidades entregues estão alinhadas com as suas expectativas e se há necessidade de ajustes ou melhorias.

- **Organização e Atualização de Requisitos**

  - _Backlog de Requisitos_: Após a coleta de feedbacks, o backlog será ajustado com base nos novos critérios definidos.
  - _Pontos por Histórias_: As User Stories serão reavaliadas e pontuadas conforme o esforço necessário, garantindo uma organização eficiente para a próxima iteração.

## Mapeamento das Atividades de ER no ScrumXP

| Fase do ScrumXP                     | Atividades da ER          | Prática                             | Técnica                                                                              | Resultado Esperado                                                                          |
| :---------------------------------- | :------------------------ | :---------------------------------- | :----------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| **Planejamento do Release**         | Elicitação e Descoberta   | Levantamento de Requisitos          | Entrevistas com stakeholders, Análise de Concorrentes, Análise de Domínio de Negócio | Identificação de requisitos presentes dentro do projeto                                     |
|                                     | Análise e Consenso        | Priorização dos Requisitos          | Priorização MoSCoW                                                                   | Escopo e funcionalidades críticas priorizadas e acordadas                                   |
|                                     | Declaração                | Registro dos Requisitos             | Épicos e User Stories                                                                | User stories registradas que descrevem os requisitos da release de forma clara e concisa    |
| **Planejamento da Sprint**          | Elicitação e Descoberta   | Refinamento de Requisitos           | Entrevistas, Análise Documental                                                      | Requisitos refinados e específicos para o desenvolvimento da sprint                         |
|                                     | Análise e Consenso        | Análise de Dependências             | Discussões em Equipe, Análise de Tarefas                                             | Consenso sobre a viabilidade técnica e priorização dos requisitos                           |
|                                     | Declaração                | Definição de Critérios de Aceitação | Critérios de Aceitação Detalhados, Definition of Ready (DoR)                         | User stories com critérios de aceitação claros e objetivos bem definidos                    |
|                                     | Organização e Atualização | Refinamento dos requisitos          | Grooming do Backlog                                                                  | Requisitos refinados no backlog                                                             |
| **Desenvolvimento da Sprint**       | Representação             | Criação de Protótipos               | Wireframes                                                                           | Wireframes que orientam a equipe de desenvolvimento e facilitam a implementação             |
|                                     | Verificação e Validação   | Validação de Requisitos             | Checklist, Revisão de Critérios de Aceitação                                         | Validação de que os requisitos atendem aos critérios de aceitação e qualidade estabelecidos |
|                                     | Organização e Atualização | Revisão do Backlog                  | Revisão do Backlog da Sprint, DEEP                                                   | Backlog atualizado e alinhado com os objetivos da sprint em andamento                       |
| **Revisão da Sprint**               | Verificação e Validação   | Demonstração ao Cliente             | Coleta de Feedback                                                                   | Funcionalidades verificadas com o cliente e feedback coletado                               |
|                                     | Declaração                | Atualização de User Stories         | Incorporar Feedback, Negociação                                                      | User stories ajustadas conforme feedback recebido durante a revisão da sprint               |
| **Retrospectiva da Sprint**         | Análise e Organização     | Revisão do Processo                 | Discussões em grupo                                                                  | Melhorias identificadas e aplicáveis ao processo de engenharia de requisitos                |
|                                     | Atualização do Processo   | Ajustes no Workflow de Requisitos   | Atualização do Workflow, Resolução de Conflito                                       | Ajustes implementados para aumentar a eficiência e melhorar a qualidade do processo de ER   |
| **Planejamento da Próxima Release** | Elicitação e Descoberta   | Levantamento de Novos Requisitos    | Coleta de Feedbacks, Análise de Domínio de Negócio                                   | Requisitos revisados e atualizados com base no feedback dos usuários e nas novas demandas   |
|                                     | Análise e Consenso        | Priorização dos Requisitos          | Priorização MoSCoW, Mapeamento de Valor                                              | Requisitos priorizados para atender às necessidades estratégicas da próxima release         |
|                                     | Declaração                | Registro dos Requisitos             | Épicos e User Stories                                                                | User stories claramente definidas e vinculadas aos objetivos da próxima release             |
|                                     | Organização e Atualização | Revisão do Backlog                  | Revisão do Backlog da Release, DEEP                                                  | Backlog da release atualizado e preparado para o início da próxima fase                     |
