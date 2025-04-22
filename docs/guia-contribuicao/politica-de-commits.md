# Política de Commits

| Versão | Data       | Descrição                             | Autor                               |
|------- |----------- | ------------------------------------- | ----------------------------------- |
| 1.0    | 21/04/2025 | Versão inicial do documento (commits) | Equipe ConsultTributario - Grupo 07 |
| 1.1    | 21/04/2025 | Revisões e melhorias gerais           | Equipe ConsultTributario - Grupo 07 |

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
