# Processo de Verificação e Validação (V&V)

| Versão | Data       | Descrição                   | Autor                                                  |
| ------ | ---------- | --------------------------- | ------------------------------------------------------ |
| 1.0    | 27/04/2025 | Versão inicial do documento | [Vinicius Vieira](https://github.com/viniciusvieira00) |

---

## 1. Introdução

O Processo de Verificação e Validação (V&V) do projeto **ConsultTributario** estabelece práticas e procedimentos sistemáticos para garantir que o software desenvolvido esteja em conformidade com os requisitos especificados e atenda às necessidades dos usuários. Este documento detalha as atividades, responsabilidades e critérios relacionados ao V&V, servindo como referência para toda a equipe de desenvolvimento.

## 2. Definições Fundamentais

### 2.1 Verificação

A **verificação** responde à pergunta: "**Estamos construindo o produto corretamente?**"

Refere-se ao conjunto de atividades que garantem que o software implementa uma função específica corretamente. É o processo de avaliação de artefatos (documentos, código, testes) para determinar se atendem às especificações.

### 2.2 Validação

A **validação** responde à pergunta: "**Estamos construindo o produto correto?**"

Refere-se ao conjunto de atividades que garantem que o software construído atende aos requisitos do usuário. É o processo de avaliar o sistema para determinar se ele satisfaz as necessidades e expectativas das partes interessadas.

## 3. Processo de V&V no Ciclo de Desenvolvimento

### 3.1 Diagrama do Processo

```
Requisitos → Projeto → Implementação → Testes → Implantação
    ↑         ↑          ↑              ↑           ↑
    |         |          |              |           |
Verificação Verificação Verificação  Verificação Verificação
Validação   Validação   Validação    Validação   Validação
```

### 3.2 Atividades por Fase

#### 3.2.1 Fase de Requisitos

**Verificação**:
- Revisão de requisitos para consistência e completude
- Análise de rastreabilidade
- Verificação de conformidade com padrões e regulamentações tributárias

**Validação**:
- Validação com partes interessadas
- Prototipagem para validação de requisitos
- Revisão de requisitos por especialistas do domínio tributário

#### 3.2.2 Fase de Projeto

**Verificação**:
- Revisão de design
- Análise estática da arquitetura
- Verificação de conformidade com padrões de projeto

**Validação**:
- Avaliação da arquitetura em relação aos requisitos não-funcionais
- Revisões técnicas com especialistas
- Prototipagem de interface

#### 3.2.3 Fase de Implementação

**Verificação**:
- Análise estática de código
- Revisão de código por pares
- Verificação de conformidade com padrões de codificação

**Validação**:
- Testes unitários
- Testes de integração
- Verificação de cobertura de código

#### 3.2.4 Fase de Testes

**Verificação**:
- Verificação dos casos de teste
- Revisão dos resultados dos testes
- Análise de cobertura de requisitos

**Validação**:
- Testes de sistema
- Testes de aceitação
- Testes de usuário
- Testes de regressão

#### 3.2.5 Fase de Implantação

**Verificação**:
- Verificação da integridade do build
- Verificação da configuração do ambiente
- Análise de segurança

**Validação**:
- Testes em ambiente de homologação
- Validação final com usuários
- Testes de aceitação operacional

## 4. Técnicas e Métodos de V&V

### 4.1 Técnicas de Verificação

#### 4.1.1 Análise Estática
- **Revisões**: Inspeções formais, walkthrough, revisão técnica
- **Análise de Código**: Linters, análise de complexidade, detecção de vulnerabilidades
- **Verificação Formal**: Para componentes críticos relacionados a cálculos tributários

#### 4.1.2 Análise Dinâmica
- **Testes Unitários**: Verificação de componentes isolados
- **Testes de Integração**: Verificação da interação entre componentes
- **Testes de Desempenho**: Análise de tempos de resposta e recursos
- **Testes de Segurança**: Identificação de vulnerabilidades

### 4.2 Técnicas de Validação

#### 4.2.1 Validação de Requisitos
- **Prototipagem**: Avaliação de interfaces e fluxos de trabalho
- **Revisão por Stakeholders**: Feedback dos usuários e especialistas em tributação
- **Análise de Casos de Uso**: Simulação de cenários reais

#### 4.2.2 Validação de Sistema
- **Testes Funcionais**: Verificação do comportamento do sistema
- **Testes de Aceitação**: Validação dos critérios de aceitação
- **Testes de Usabilidade**: Avaliação da experiência do usuário
- **Testes de Conformidade**: Validação contra regulamentações tributárias

## 5. Métricas e Critérios de V&V

### 5.1 Métricas de Verificação

| Métrica                  | Descrição                                     | Meta  |
| ------------------------ | --------------------------------------------- | ----- |
| Cobertura de Código      | Percentual de código executado durante testes | ≥ 80% |
| Densidade de Defeitos    | Número de defeitos por KLOC                   | < 5   |
| Complexidade Ciclomática | Complexidade do código                        | ≤ 10  |
| Violações de Padrão      | Número de violações de padrão de código       | 0     |
| Dívida Técnica           | Tempo estimado para corrigir problemas        | < 5%  |

### 5.2 Métricas de Validação

| Métrica                 | Descrição                                      | Meta  |
| ----------------------- | ---------------------------------------------- | ----- |
| Satisfação do Usuário   | Avaliação do usuário (1-5)                     | ≥ 4   |
| Cobertura de Requisitos | Percentual de requisitos validados             | 100%  |
| Taxa de Sucesso         | Percentual de operações concluídas com sucesso | ≥ 95% |
| Precisão                | Exatidão dos cálculos tributários              | 100%  |
| Tempo de Resposta       | Tempo médio de resposta do sistema             | ≤ 2s  |

### 5.3 Critérios de Aceitação

Para que uma alteração seja considerada verificada e validada, os seguintes critérios devem ser atendidos:

1. **Critérios de Verificação**:
   - Todos os testes automatizados passam
   - Cobertura de código ≥ 80%
   - Sem violações críticas nos linters
   - Revisão de código aprovada por pelo menos 2 revisores

2. **Critérios de Validação**:
   - Todos os critérios de aceitação atendidos
   - Testes de aceitação aprovados
   - Sem desvios em relação à legislação tributária aplicável
   - Validação pelo Product Owner/stakeholders

## 6. Integração com o Processo de Pull Request

O processo de V&V está diretamente integrado ao fluxo de trabalho de Pull Requests, conforme indicado no template PR. 

### 6.1 Checklist de V&V no PR Template

```markdown
- [ ] O código segue os padrões de estilo definidos no projeto.
- [ ] Foram adicionados testes unitários e/ou de integração relevantes.
- [ ] A cobertura de testes permanece acima de 80%.
- [ ] Documentação atualizada conforme necessário.
- [ ] Todos os requisitos afetados foram atualizados na matriz de rastreabilidade.
- [ ] As alterações foram validadas conforme o plano de Verificação & Validação (V&V).
```

### 6.2 Responsabilidades

- **Autor do PR**: Executar verificações iniciais e validações
- **Revisores**: Verificar a conformidade com os critérios de V&V
- **QA**: Validar requisitos funcionais e não-funcionais
- **Product Owner**: Validar atendimento às necessidades do negócio

### 6.3 Evidências de V&V

Para cada PR, o desenvolvedor deve fornecer evidências de que o processo de V&V foi seguido:

1. **Resultados dos Testes**: Capturas de tela ou logs dos testes executados
2. **Relatório de Cobertura**: Evidência da cobertura de código
3. **Checklist Completo**: Todos os itens do checklist de V&V marcados
4. **Documentação Atualizada**: Referências à documentação atualizada

## 7. Ferramentas de Suporte ao V&V

### 7.1 Ferramentas de Verificação

| Categoria            | Ferramentas        |
| -------------------- | ------------------ |
| Análise Estática     | ESLint, TypeScript |
| Testes Unitários     | Jest               |
| Testes de Integração | Supertest, Cypress |
| Cobertura de Código  | Jest Coverage      |
| CI/CD                | GitHub Actions     |

### 7.2 Ferramentas de Validação

| Categoria            | Ferramentas                              |
| -------------------- | ---------------------------------------- |
| Testes de Aceitação  | Cucumber                                 |
| Testes de UI         | Cypress                                  |
| Testes de Desempenho | JMeter                                   |
| Gestão de Requisitos | GitHub Issues, Matriz de Rastreabilidade |

## 8. Tratamento de Não-Conformidades

Quando problemas são identificados durante o processo de V&V:

1. **Registro**: Documentar o problema no sistema de rastreamento (GitHub Issues)
2. **Classificação**: Categorizar por severidade e impacto
3. **Análise**: Determinar causa raiz e impacto
4. **Correção**: Implementar solução seguindo o processo normal de desenvolvimento
5. **Verificação**: Retestar para confirmar que o problema foi resolvido
6. **Prevenção**: Atualizar processos para evitar problemas similares no futuro

---

## 9. Referências

> [1] ISO/IEC/IEEE 29119 - Software and Systems Engineering - Software Testing  
> Disponível em: [https://www.iso.org/standard/79428.html](https://www.iso.org/standard/79428.html)  
> Acesso em: 27/04/2025

> [2] IEEE Standard 1012-2016 - IEEE Standard for System, Software, and Hardware Verification and Validation  
> Disponível em: [https://standards.ieee.org/standard/1012-2016.html](https://standards.ieee.org/standard/1012-2016.html)  
> Acesso em: 27/04/2025

> [3] SWEBOK v3.0 - Guide to the Software Engineering Body of Knowledge  
> Disponível em: [https://www.computer.org/education/bodies-of-knowledge/software-engineering](https://www.computer.org/education/bodies-of-knowledge/software-engineering)  
> Acesso em: 27/04/2025 