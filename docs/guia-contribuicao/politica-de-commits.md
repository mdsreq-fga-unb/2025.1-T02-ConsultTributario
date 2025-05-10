# Política de Commits

| Versão | Data | Descrição | Autor |
| ------ | ---- | --------- | ----- |

| 1.0    | -          | [Equipe ConsultTributário](https://github.com/mdsreq-fga-unb/2025.1-T02-ConsultTributario) | Versão inicial, documentação base herdada. |
| 2.0    | 05/05/2025 | [Vinicius Vieira](https://github.com/viniciusvieira00)                                     | Atualizações da política, baseada nas novas ISSUES e padronizações para o projeto. |
---

Este projeto segue as recomendações de [Conventional Commits](https://www.conventionalcommits.org/) para manter um histórico de mudanças claro e padronizado.

## Estrutura do Commit

Cada mensagem de commit é composta por:

```
<tipo>(<escopo opcional>): <título>

<corpo opcional>

<rodapé opcional>
```

### Exemplo Rápido

```bash
feat(frontend): add user registration form

- implementa formulário de registro no front
- refatora componente de input

closes #12
```

### Tipos Aceitáveis

- **build**: alterações que afetam o sistema de build ou dependências externas.  
- **static**: mudanças em arquivos estáticos (por exemplo, JSON, imagens).  
- **ci**: alterações em arquivos/scripts de configuração de Integração Contínua.  
- **cd**: alterações em arquivos/scripts de configuração de Deploy Contínuo.  
- **doc**: somente alterações na documentação (branch `docs`).  
- **feat**: inclusão de uma nova funcionalidade.  
- **fix**: correção de um bug.  
- **perf**: alterações visando melhorar desempenho (sem mudar o comportamento visível).  
- **refactor**: refatoração de código sem alterar funcionalidade ou corrigir bugs.  
- **improve**: melhorias em alguma funcionalidade já existente.  
- **style**: mudanças que não afetam a lógica do código (formatação, espaços, ponto e vírgula etc.).  
- **test**: inclusão ou atualização de testes.  
- **revert**: reverte um commit anterior.

### Cabeçalho (Título)
- Deve ser escrito no **imperativo** e tempo presente;
- Não coloque ponto final;
- Limite sugerido: até 48 caracteres.

### Corpo (opcional)
- Explica **por que** a alteração foi feita;
- Use tom imperativo e limite as linhas a ~72 caracteres;
- Pode conter informações mais técnicas ou detalhes de implementação.

### Rodapé (opcional)
- Pode referenciar issues vinculadas (ex.: `closes #xx`, `fix #xx`);
- É possível adicionar co-autores (`Co-authored-by: Nome <email@dominio.com>`).

### Revertendo Commits

Se o commit reverte um commit anterior, ele deve começar com `revert:`, seguido pelo cabeçalho do commit revertido.

**Exemplo**:

```
revert: feat(frontend): add user registration form

This reverts commit <hash_do_commit>.
```

---

## Boas Práticas e Observações

1. Mantenha **títulos curtos** e descritivos.
2. **Inglês** e **imperativo** são recomendados para facilitar padronização.
3. Use **prefixos** de commit adequados (ex.: `fix:`, `docs:`).
4. Para commits grandes, descreva com clareza no corpo, o que e por que foi mudado.
5. Utilize `closes #xx` no rodapé para fechar automaticamente *issues* correlatas.

## Exemplos Contextualizados para o ConsultTributario

### Implementação de Funcionalidade Tributária
```bash
feat(api): add cálculo de imposto ICMS para operações interestaduais

- implementa regras de cálculo conforme Lei Complementar 87/96
- integra com base de dados de alíquotas por estado
- adiciona validações para itens isentos

closes #45
```

### Correção de Bug em Relatórios
```bash
fix(frontend): corrige cálculo incorreto no relatório de impostos retidos

- corrige fórmula de cálculo de IRRF em serviços
- ajusta exibição de valores negativos
- adiciona tooltips explicativos

fixes #78
```

### Melhoria na Documentação
```bash
doc(api): adiciona documentação para endpoints de consulta tributária

- adiciona exemplos de requisição/resposta para cada endpoint
- atualiza diagrama de fluxo do processo de consulta
- inclui informações sobre limitações e regras de negócio

part of #92
```

## Integração com Pull Requests

Ao criar um Pull Request, a mensagem de commit deve estar alinhada com as informações do PR template:

1. O **título do PR** deve refletir o escopo e finalidade dos commits incluídos
2. Na seção **Descrição do PR**, inclua um resumo dos commits principais
3. Em **Issues Relacionadas**, referencie as mesmas issues mencionadas nos rodapés dos commits
4. O histórico de commits deve demonstrar as etapas lógicas de implementação da funcionalidade ou correção

### Exemplo de Alinhamento Commit-PR

**Commits no Branch:**
```bash
feat(frontend): adiciona tela de configuração fiscal
feat(frontend): implementa seleção de regime tributário
feat(api): cria endpoint para salvar configurações fiscais do usuário
test(api): adiciona testes para validação de configurações fiscais
```

**Título do PR:**
```
[FEATURE] Implementação de Configurações Fiscais do Usuário
```

**Descrição do PR:**
Implementa a funcionalidade completa de configurações fiscais, permitindo ao usuário selecionar seu regime tributário e preferências para cálculos.

## Rastreabilidade entre Commits e Matriz de Requisitos

Para manter a rastreabilidade entre código e requisitos:

1. Sempre referencie o número da issue nos commits (`closes #XX`, `fixes #XX`, `implements #XX`)
2. Para funcionalidades que implementam parcialmente um requisito, use `part of #XX`
3. Para commits que afetam múltiplos requisitos, liste-os separadamente (`closes #XX, relates to #YY`)
4. Ao finalizar uma funcionalidade, atualize a matriz de rastreabilidade conforme indicado no PR template

### Identificadores de Rastreabilidade
- `closes #XX` ou `fixes #XX`: Fecha a issue automaticamente após o merge do PR
- `implements #XX`: Indica implementação de requisito sem fechar automaticamente
- `part of #XX`: Indica contribuição parcial para um requisito maior
- `relates to #XX`: Indica relação sem implicar em implementação ou fechamento
