# Matriz de Rastreabilidade

| Versão | Data       | Descrição                   | Autor                                                  |
| ------ | ---------- | --------------------------- | ------------------------------------------------------ |
| 1.0    | 27/04/2025 | Versão inicial do documento | [Vinicius Vieira](https://github.com/viniciusvieira00) |

---

## 1. Introdução

A matriz de rastreabilidade é uma ferramenta essencial para o gerenciamento de requisitos e o controle de qualidade do projeto **ConsultTributario**. Ela estabelece conexões claras entre os requisitos, o código implementado e os testes, garantindo que todas as funcionalidades estejam devidamente documentadas, implementadas e validadas.

Este documento especifica como a matriz deve ser mantida e atualizada durante o ciclo de desenvolvimento, em conformidade com as práticas de Engenharia de Requisitos e os padrões adotados no projeto.

## 2. Objetivos da Matriz de Rastreabilidade

A matriz de rastreabilidade no projeto ConsultTributario tem como objetivos:

1. **Gerenciamento de Escopo**: Garantir que todos os requisitos sejam atendidos e que funcionalidades não especificadas não sejam implementadas.
2. **Qualidade e Verificação**: Assegurar que cada requisito tenha testes associados.
3. **Análise de Impacto**: Facilitar a compreensão do impacto de mudanças em requisitos.
4. **Auditoria e Compliance**: Permitir a validação das implementações em relação aos requisitos tributários e legais.
5. **Integração com o Processo**: Suportar o fluxo de Pull Requests e validações.

## 3. Estrutura da Matriz

### 3.1 Elementos Rastreados

A matriz de rastreabilidade do ConsultTributario rastreia as seguintes relações:

| De           | Para                  | Descrição                                               |
| ------------ | --------------------- | ------------------------------------------------------- |
| Requisito    | Código-fonte          | Implementação dos requisitos em componentes de software |
| Requisito    | Caso de Teste         | Validação dos requisitos através de testes              |
| Código-fonte | Teste                 | Verificação das implementações específicas              |
| Issue        | Commit                | Histórico de desenvolvimento                            |
| Issue        | Pull Request          | Integração de funcionalidades                           |
| Requisito    | Documento Regulatório | Referência à legislação ou norma tributária             |

### 3.2 Formato da Matriz

A matriz é mantida em formato tabular, com as seguintes informações:

```
| ID Requisito | Descrição | Status | Issues | Commits | PRs | Testes | Documentos Regulatórios |
| ------------ | --------- | ------ | ------ | ------- | --- | ------ | ----------------------- |
| REQ-001      | ...       | ...    | #12    | abc123  | #15 | TC-001 | IN RFB 1234/2022        |
```

- **ID Requisito**: Identificador único do requisito
- **Descrição**: Breve descrição do requisito
- **Status**: Implementado, Em Desenvolvimento, Pendente, etc.
- **Issues**: Referência às issues do GitHub relacionadas
- **Commits**: Identificação dos commits principais que implementam o requisito
- **PRs**: Referência aos Pull Requests relacionados
- **Testes**: Identificadores dos testes que validam o requisito
- **Documentos Regulatórios**: Referências à legislação tributária ou normas relacionadas

## 4. Manutenção da Matriz

### 4.1 Momento de Atualização

A matriz de rastreabilidade deve ser atualizada nos seguintes momentos:

1. **Definição de Requisitos**: Ao criar novas issues ou especificações
2. **Implementação**: Na criação de Pull Requests
3. **Verificação e Validação**: Após a aprovação do código e execução dos testes
4. **Lançamento**: Na preparação de releases

### 4.2 Responsabilidades

- **Analistas de Requisitos**: Criação inicial das entradas na matriz
- **Desenvolvedores**: Atualização das informações de código e implementação
- **QA/Testers**: Inclusão dos resultados e referências de testes
- **Reviewers de PR**: Verificação da correta atualização da matriz

### 4.3 Processo de Atualização

Durante o fluxo de trabalho do projeto, a matriz deve ser atualizada da seguinte forma:

1. **Ao criar uma issue**: Adicionar o requisito à matriz
2. **Ao implementar**: Referenciar código-fonte e commits
3. **Ao criar testes**: Referenciar os testes associados
4. **Ao criar um PR**: Verificar e atualizar a matriz como parte do checklist
5. **Após aprovação do PR**: Confirmar atualizações e status

## 5. Integração com Pull Requests

Como parte do checklist do template de Pull Request, a matriz de rastreabilidade deve ser verificada e atualizada:

```markdown
- [ ] Todos os requisitos afetados foram atualizados na matriz de rastreabilidade.
```

Para cumprir este item do checklist, o desenvolvedor deve:

1. Identificar os requisitos impactados pelo PR
2. Atualizar o status destes requisitos na matriz
3. Incluir referências aos commits e PRs relevantes
4. Documentar os testes associados
5. Incluir na descrição do PR as atualizações realizadas

## 6. Exemplo Prático

Abaixo, um exemplo de como uma entrada da matriz deve evoluir durante o desenvolvimento:

### 6.1 Após a criação da issue:

```
| ID Requisito | Descrição                      | Status   | Issues | Commits | PRs | Testes | Documentos Regulatórios |
| ------------ | ------------------------------ | -------- | ------ | ------- | --- | ------ | ----------------------- |
| REQ-045      | Cálculo de ICMS interestaduais | Pendente | #45    | -       | -   | -      | LC 87/96                |
```

### 6.2 Durante o desenvolvimento:

```
| ID Requisito | Descrição                      | Status             | Issues | Commits        | PRs | Testes | Documentos Regulatórios |
| ------------ | ------------------------------ | ------------------ | ------ | -------------- | --- | ------ | ----------------------- |
| REQ-045      | Cálculo de ICMS interestaduais | Em Desenvolvimento | #45    | abc123, def456 | -   | TC-045 | LC 87/96                |
```

### 6.3 Após o PR:

```
| ID Requisito | Descrição                      | Status       | Issues | Commits        | PRs | Testes         | Documentos Regulatórios |
| ------------ | ------------------------------ | ------------ | ------ | -------------- | --- | -------------- | ----------------------- |
| REQ-045      | Cálculo de ICMS interestaduais | Implementado | #45    | abc123, def456 | #60 | TC-045, TC-046 | LC 87/96                |
```

## 7. Considerações Adicionais

### 7.1 Rastreabilidade Reversa

A matriz também deve permitir a rastreabilidade reversa, isto é:
- De código para requisitos
- De testes para requisitos
- De PRs para issues

### 7.2 Visualização

Para facilitar a visualização e manutenção, a matriz é mantida em dois formatos:
- Planilha colaborativa acessível a todos os membros da equipe
- Versão Markdown no repositório de documentação

### 7.3 Automação

Sempre que possível, a atualização da matriz deve ser automatizada através de:
- Scripts que identificam issues e PRs relacionados
- Integração com ferramentas de CI/CD
- Análise automatizada de cobertura de código

---

## 8. Referências

> [1] IEEE Std 830-1998 - Recommended Practice for Software Requirements Specifications  
> Disponível em: [https://standards.ieee.org/standard/830-1998.html](https://standards.ieee.org/standard/830-1998.html)  
> Acesso em: 27/04/2025

> [2] SWEBOK v3.0 - Guide to the Software Engineering Body of Knowledge  
> Disponível em: [https://www.computer.org/education/bodies-of-knowledge/software-engineering](https://www.computer.org/education/bodies-of-knowledge/software-engineering)  
> Acesso em: 27/04/2025 