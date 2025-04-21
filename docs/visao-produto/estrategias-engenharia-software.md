# **3\.  ESTRATÉGIAS DE ENGENHARIA DE SOFTWARE**

**3.1  Estratégia Priorizada**

1. **Abordagem:** Ágil  
2. **Ciclo de vida:** Iterativo Incremental   
3. **Processo:** ScrumXP

**3.2  Quadro Comparativo**

| Critério | ScrumXP | Espiral (adaptado) |
| :---- | :---- | :---- |
| **Abordagem  Geral** | Ágil, baseada em iterações curtas e feedbacks contínuos. | Dirigida por riscos, com ciclos que integram análise, design e construção. |
| **Foco em  Arquitetura** | Evolui conforme o projeto avança. | Planejada antecipadamente, com refinamento por ciclo. |
| **Estrutura de Processos** | Baseado em sprints, backlog, reuniões periódicas, entregas incrementais. | Dividido em ciclos espirais com etapas bem definidas. |
| **Flexibilidade de Requisitos** | Alta \- requisitos podem mudar a cada sprint. | Moderada \- mudanças aceitas entre os ciclos, mas requerem nova análise. |
| **Colaboração com o Cliente** | Intensa e constante; o cliente faz parte do time \- Product Owner. | Colaboração pontual, geralmente ao fim de cada ciclo para validação. |
| **Complexidade do Processo** | Baixa a média \- fácil de adotar com treinamento básico. | Alta \- exige conhecimento prévio e maior planejamento. |
| **Qualidade Técnica** | Alta \- práticas como TDD, integração contínua, refatoração constante. | Variável \- depende da disciplina e práticas aplicadas em cada espiral. |
| **Práticas de Desenvolvimento** | Programação em par,  TDD, design simples, refatoração… | Foca mais em modelagem, análise de riscos, prototipagem… |
| **Controle de  Qualidade** | Automatizado e contínuo durante os sprints. | Formal e planejado por etapa, com validações e revisões em cada ciclo. |
| **Escalabilidade** | Escala com frameworks como SAFe, LeSS, Nexus (requer adaptação) | Escala melhor para projetos grandes e críticos com múltiplos stakeholders |
| **Suporte a  Equipes** | Times pequenos, altamente colaborativos. | Suporta múltiplas equipes e grandes organizações com gestão formal de ciclos. |

**3.3 Justificativa**

A escolha do processo ScrumXP para o projeto ConsultTributário se baseia em quatro pilares principais:

#### 1. **Requisitos em constante evolução** 

O ScrumXP é ideal para ambientes onde os requisitos estão em constante mudança, como é o caso do ConsultTributário. A abordagem iterativa e incremental permite que funcionalidades sejam ajustadas ou redefinidas a cada sprint, sem comprometer o andamento geral do projeto.

#### 2. **Proximidade e feedback contínuo do cliente**

A metodologia ScrumXP valoriza a colaboração constante com o cliente, por meio do papel do Product Owner, que participa ativamente das definições de prioridade e validação de entregas. Essa proximidade facilita o alinhamento do produto às reais necessidades do cliente, garantindo maior valor agregado a cada iteração.

#### 3. **Equipe com nível e conhecimento técnico de baixo a intermediário**

O ScrumXP combina a leveza do Scrum com as práticas técnicas do Extreme Programming (XP), como programação em par, testes automatizados e refatoração contínua. Essas práticas ajudam a elevar gradualmente a qualidade do código e o conhecimento técnico da equipe, sem exigir um domínio avançado prévio das tecnologias envolvidas. Isso o torna adequado ao perfil atual da equipe do projeto.

#### 4. **Adaptação a mudanças e entregas frequentes**

Com ciclos curtos e entregas incrementais, o ScrumXP possibilita a entrega contínua de valor ao cliente. Isso é essencial para o ConsultTributário, permitindo que o sistema seja construído com base no uso real, nos feedbacks rápidos e nas prioridades que emergem ao longo do desenvolvimento.