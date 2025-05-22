# Política de Branches

| Versão | Data       | Descrição                                                                                  | Autor                                                                              |
| ------ | ---------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| 1.0    | -          | [Equipe ConsultTributário](https://github.com/mdsreq-fga-unb/2025.1-T02-ConsultTributario) | Versão inicial, documentação base herdada.                                         |
| 2.0    | 05/05/2025 | [Vinicius Vieira](https://github.com/viniciusvieira00)                                     | Atualizações da política, baseada nas novas ISSUES e padronizações para o projeto. |
| 3.0    | 22/05/2025 | [Vinicius Vieira](https://github.com/viniciusvieira00)                                     | Atualização da política de Branches para o projeto.|

---

## 1. Estrutura Principal de Branches

O projeto **ConsultTributario** utiliza uma estrutura de branches específica para organizar o desenvolvimento e a documentação.

### 1.1 Branch **main**

Branch principal do repositório, utilizada **apenas** para o README.md com instruções de acesso à documentação e informações gerais do projeto.

**Regras:**
- Só existe uma `main` no projeto
- **Commits não são permitidos diretamente** nessa branch
- Alterações no README ou arquivos essenciais devem ser feitas via Pull Requests

### 1.2 Branch **docs**

Branch onde é desenvolvida toda a documentação do projeto utilizando o framework MkDocs.

**Regras:**
- Utilizada para a escrita e manutenção da documentação
- **Não é** a branch de deploy da documentação (que é a `gh-pages`)
- Alterações complexas devem ser feitas em branches específicas (ex: `doc/X-nome_documento`) e depois integradas via PR

### 1.3 Branch **gh-pages**

Branch utilizada exclusivamente para o deploy automático da documentação.

**Regras:**
- Gerada automaticamente pelo workflow do GitHub Actions ou via CLI do MkDocs
- **Não deve receber commits manuais**
- Contém apenas os arquivos HTML, CSS e JS gerados pelo MkDocs

### 1.4 Branch **backend**

Branch principal para o desenvolvimento do backend da aplicação.

**Regras:**
- Contém o código-fonte da API e serviços (NestJS)
- Novas funcionalidades devem ser desenvolvidas em branches específicas (ex: `back-end/X-nome_funcionalidade`)
- Integrações ocorrem via Pull Requests após revisão

### 1.5 Branch **frontend**

Branch principal para o desenvolvimento do frontend da aplicação.

**Regras:**
- Contém o código-fonte da interface de usuário (Next.js)
- Novas funcionalidades devem ser desenvolvidas em branches específicas (ex: `front-end/X-nome_funcionalidade`)
- Integrações ocorrem via Pull Requests após revisão

---

## 2. Branches de Desenvolvimento

Para o desenvolvimento de novas funcionalidades ou correção de bugs, devem ser criadas branches específicas a partir das branches principais.

### 2.1 Branches de Documentação

Branches para desenvolvimento de documentação específica são criadas a partir de `docs`.

**Padrão de nomenclatura**:
```bash
doc/X-nome_documento
```
**Exemplo**:
```bash
doc/12-guia_contribuicao
```
**Onde**:
- **X**: número da *issue* associada (se houver)
- **nome_documento**: título descritivo do artefato

**Observação importante**: Para evitar conflitos, as branches de documentação **devem sempre** utilizar o prefixo `doc/` (e não `docs/`).

### 2.2 Branches de Backend

Branches para desenvolvimento de funcionalidades no backend são criadas a partir de `backend`.

**Padrão de nomenclatura**:
```bash
back-end/X-nome_da_funcionalidade
```
**Exemplo**:
```bash
back-end/8-criar-crud-clientes
```
**Onde**:
- **X**: número da *issue* associada
- **nome_da_funcionalidade**: título descritivo da funcionalidade

### 2.3 Branches de Frontend

Branches para desenvolvimento de funcionalidades no frontend são criadas a partir de `frontend`.

**Padrão de nomenclatura**:
```bash
front-end/X-nome_da_funcionalidade
```
**Exemplo**:
```bash
front-end/15-implementar-tela-calculo-icms
```
**Onde**:
- **X**: número da *issue* associada
- **nome_da_funcionalidade**: título descritivo da funcionalidade

### 2.4 Branches de Bugfix

Branches para correção de bugs são criadas a partir da branch onde o problema foi identificado.

**Padrão de nomenclatura**:
```bash
bugfix/X-descricao_do_bug
```
**Exemplo**:
```bash
bugfix/23-corrigir-calculo-icms-interestadual
```

**Onde**:
- **X**: número da *issue* associada
- **descricao_do_bug**: descrição breve do problema

### 2.5 Branches de Hotfix

Branches para correções urgentes em produção são criadas a partir de `main`, `backend` ou `frontend`, dependendo do componente afetado.

**Padrão de nomenclatura**:
```bash
hotfix/X-descricao_da_correcao
```
**Exemplo**:
```bash
hotfix/35-corrigir-erro-autenticacao
```

**Onde**:
- **X**: número da *issue* associada
- **descricao_da_correcao**: descrição breve da correção

## 3. Processo de Pull Request e Revisão de Código

### 3.1 Criação do Pull Request

Ao finalizar o trabalho em uma branch, o desenvolvedor deve criar um Pull Request seguindo o template fornecido:

1. Utilizando o template `PULL_REQUEST_TEMPLATE.md`
2. Preenchendo todos os campos obrigatórios:
   - Descrição clara e objetiva do PR
   - Checklist de requisitos completo
   - Issues relacionadas
   - Instruções para teste
   - Capturas de tela (se aplicável)

### 3.2 Processo de Revisão de Código

Cada Pull Request deve passar pelo seguinte processo de revisão:

1. **Revisão Automatizada**:
   - CI/CD executando testes automatizados
   - Verificação de cobertura de código (mínimo 80%)
   - Análise estática de código (linting)

2. **Revisão por Pares**:
   - No mínimo 2 aprovações de revisores
   - Verificação do checklist completo do PR
   - Análise da qualidade do código
   - Validação da documentação

3. **Critérios de Aprovação**:
   - Código segue os padrões de estilo do projeto
   - Testes adequados implementados e passando
   - Funcionalidade validada conforme definido no plano de V&V
   - Não há débitos técnicos relevantes
   - Matriz de rastreabilidade atualizada

### 3.3 Resolução de Conflitos

Em caso de conflitos durante a mesclagem:

1. É responsabilidade do autor do PR resolver os conflitos
2. A resolução de conflitos deve preservar a integridade do código
3. Após resolução, nova revisão é necessária

## 4. Verificação e Validação (V&V)

Cada alteração deve passar por procedimentos de V&V para garantir a qualidade do sistema. Estes procedimentos estão alinhados com o checklist do PR Template.

### 4.1 Verificação

A verificação confirma que o produto foi construído corretamente, seguindo as especificações:

- **Verificação estática**: análise de código, inspeções e revisões de pares
- **Verificação dinâmica**: testes unitários, de integração e sistema

### 4.2 Validação

A validação confirma que o produto atende às necessidades do usuário:

- **Testes de aceitação**: validação com cenários de uso real
- **Testes de usabilidade**: avaliação da experiência do usuário
- **Validação de requisitos**: confirmação de que os requisitos foram atendidos

### 4.3 Critérios para aprovação de V&V

- Cobertura de testes acima de 80%
- Todos os casos de teste passando
- Requisitos funcionais e não-funcionais validados
- Sem problemas críticos ou bloqueadores
- Documentação técnica e de usuário atualizada

## 5. Matriz de Rastreabilidade

A matriz de rastreabilidade é um documento que estabelece a relação entre requisitos, código-fonte e testes. O PR template exige sua atualização a cada alteração.

### 5.1 Elementos da Matriz

A matriz deve rastrear as seguintes relações:

- Requisitos → Código-fonte
- Requisitos → Casos de teste
- Código-fonte → Testes
- Issues → Commits → Pull Requests

### 5.2 Atualização da Matriz

A atualização da matriz deve:

1. Identificar os requisitos afetados pelo PR
2. Atualizar as referências de código implementado
3. Registrar os testes que validam os requisitos
4. Manter referências cruzadas entre documentação e código

## 6. Fluxo Completo de Trabalho

O fluxo de trabalho completo no projeto ConsultTributario, desde a criação da issue até a integração do código, segue as seguintes etapas:

1. **Criação da Issue**
   - Utilizar o template apropriado (`bug_report.md` ou `feature_request.md`)
   - Definir labels e prioridade
   - Atribuir responsável (ou deixar aberto para voluntários)

2. **Desenvolvimento**
   - Criar branch específica a partir da branch base adequada:
     - `doc/X-nome` para documentação (a partir de `docs`)
     - `back-end/X-nome` para backend (a partir de `backend`)
     - `front-end/X-nome` para frontend (a partir de `frontend`)
   - Implementar a solução seguindo os padrões do projeto
   - Realizar commits atômicos e significativos conforme a Política de Commits

3. **Testes e Validação Local**
   - Implementar testes automatizados
   - Validar funcionalidade localmente
   - Verificar cobertura de código

4. **Criação do Pull Request**
   - Utilizar o template PR
   - Referenciar a issue relacionada
   - Fornecer instruções completas para testes

5. **Revisão e Aprovação**
   - Revisão automatizada (CI/CD)
   - Revisão por pares
   - Ajustes conforme feedback (se necessário)

6. **Integração**
   - Merge para a branch destino
   - Verificação final após integração
   - Atualização da matriz de rastreabilidade
   - Fechamento da issue relacionada

7. **Deploy da Documentação** (quando aplicável)
   - Via workflow do GitHub Actions
   - Verificação da publicação em `gh-pages`

### 6.1 Diagrama do Fluxo de Trabalho

```
Issue → Branch Específica → Desenvolvimento → Testes Locais → PR → Revisão → CI/CD → Merge → Integração/Deploy
   ^                                                           |
   |                                                           v
   +-----------------------------Ajustes-----------------------+
```
---

## Referências

> [1] DRIESSEN, Vincent. A successful Git branching model. [S. l.], 5 jan. 2010.  
> Disponível em: [https://nvie.com/posts/a-successful-git-branching-model/](https://nvie.com/posts/a-successful-git-branching-model/)  
> Acesso em: 14/04/2025

> [2] Atlassian Gitflow Workflow  
> Disponível em: [https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)  
> Acesso em: 14/04/2025

> [3] ISO/IEC/IEEE 29119-2:2021 - Software and systems engineering — Software testing  
> Disponível em: [https://www.iso.org/standard/79428.html](https://www.iso.org/standard/79428.html)
> Acesso em: 27/04/2025

