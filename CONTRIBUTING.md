# Guia de Contribuição - REQ Consult Frontend

## 🚀 Começando

### Pré-requisitos

- Node.js 20+
- npm ou yarn
- Git

### Instalação

```bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre no diretório
cd front-end

# Instale as dependências
npm install

# Configure os hooks do git
npm run prepare
```

## 📝 Padrões de Commit

Utilizamos [Conventional Commits](https://www.conventionalcommits.org/) com os seguintes tipos:

| Tipo       | Descrição               |
| ---------- | ----------------------- |
| `feat`     | Nova funcionalidade     |
| `fix`      | Correção de bug         |
| `docs`     | Documentação            |
| `style`    | Formatação (sem lógica) |
| `refactor` | Refatoração             |
| `perf`     | Performance             |
| `test`     | Testes                  |
| `build`    | Build/ferramentas       |
| `ci`       | Integração contínua     |
| `cd`       | Entrega contínua        |
| `improve`  | Melhorias gerais        |
| `revert`   | Reverter commit         |

### Como fazer commits

#### Opção 1: Usando Commitizen (Recomendado)

```bash
npm run commit
```

O Commitizen irá guiá-lo através do processo de criação de um commit padronizado.

#### Opção 2: Commit manual

```bash
git commit -m "tipo(escopo): descrição"
```

Exemplo:

```bash
git commit -m "feat(auth): add login with Google"
```

## 🌳 Fluxo de Branches

### Branches Permanentes

| Branch     | Propósito                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------- |
| `main`     | README.md e arquivos essenciais do repositório (commits diretos proibidos, apenas via PR) |
| `frontend` | Branch principal de desenvolvimento frontend                                              |
| `backend`  | Branch principal de desenvolvimento backend                                               |
| `docs`     | Documentação técnica e de requisitos                                                      |
| `gh-pages` | Website público do projeto                                                                |

### ⚠️ Regras Importantes sobre a Branch Main

- **Nunca** faça commits diretos na `main`
- **Nunca** crie branches de desenvolvimento a partir da `main`
- Use a `main` **apenas** para:
  - Atualizar README.md principal
  - Modificar LICENSE
  - Ajustar workflows essenciais do GitHub
  - Configurar arquivos do repositório (.gitignore global)
- Todas as alterações na `main` requerem Pull Request com 2 aprovações mínimas

### Branches Temporárias

```bash
feature/<nome>      # Nova funcionalidade
fix/<nome>          # Correção de bug
improve/<nome>      # Melhoria contínua
refactor/<nome>     # Refatoração
perf/<nome>         # Performance
style/<nome>        # Formatação/estilo
test/<nome>         # Testes
build/<nome>        # Ajustes de build
ci/<nome>           # Ajustes de CI
cd/<nome>           # Ajustes de CD
docs/<nome>         # Documentação
release/vX.Y.Z      # Preparação de versão
hotfix/vX.Y.Z       # Patch crítico
```

### Workflow de desenvolvimento

1. **Criar branch**

   ```bash
   # IMPORTANTE: Sempre crie branches a partir da branch de desenvolvimento apropriada
   git checkout frontend  # ou backend/docs conforme o contexto
   git pull origin frontend
   git checkout -b feature/nova-funcionalidade
   ```

2. **Fazer commits**

   ```bash
   npm run commit
   ```

3. **Push e PR**

   ```bash
   git push -u origin feature/nova-funcionalidade
   ```

4. **Criar Pull Request**
   - Use o template fornecido
   - Direcione o PR para a branch correta (frontend/backend/docs)
   - Preencha todos os campos necessários
   - Aguarde aprovação

### Workflow para alterações na Main

Para alterações no README.md ou arquivos de configuração do repositório:

1. **Criar branch específica**

   ```bash
   git checkout main
   git pull origin main
   git checkout -b docs/update-readme
   ```

2. **Fazer alterações e commit**

   ```bash
   git add README.md
   npm run commit  # ou git commit -m "docs: update installation instructions"
   ```

3. **Criar PR direcionado à main**

   ```bash
   git push -u origin docs/update-readme
   # No GitHub, criar PR para main com no mínimo 2 revisores
   ```

## 🧪 Qualidade de Código

### Executar linting

```bash
npm run lint        # Verificar problemas
npm run lint:fix    # Corrigir automaticamente
```

### Formatar código

```bash
npm run prettier       # Verificar formatação
npm run prettier:fix   # Formatar automaticamente
```

### Hooks automáticos

O projeto está configurado com Husky para executar automaticamente:

- **pre-commit**: Lint e formatação nos arquivos modificados
- **commit-msg**: Validação da mensagem de commit

## 🔒 Proteção de Branches

### Branch Main

- ⛔ **Commits diretos proibidos**: Todas as alterações via Pull Request
- 👥 **Aprovações obrigatórias**: Mínimo 2 revisores
- ✅ **CI obrigatório**: Todos os checks devem passar
- 🔄 **Atualização necessária**: Branch deve estar sincronizada

### Branches de Desenvolvimento (frontend/backend/docs)

- 📝 **Pull requests obrigatórios**: Para garantir qualidade
- 👤 **Aprovações mínimas**: 1 revisor + validação CI
- 🤖 **Build automatizado**: Testes e lint devem passar
- 🔗 **Integração contínua**: Deploy automático em desenvolvimento

## 🛠️ Comandos Úteis

| Comando                | Descrição                          |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Inicia servidor de desenvolvimento |
| `npm run build`        | Build de produção                  |
| `npm run start`        | Inicia servidor de produção        |
| `npm run lint`         | Verifica problemas de linting      |
| `npm run lint:fix`     | Corrige problemas de linting       |
| `npm run prettier`     | Verifica formatação                |
| `npm run prettier:fix` | Formata código                     |
| `npm run commit`       | Cria commit com Commitizen         |

## 📋 Checklist antes do PR

- [ ] Código segue os padrões do projeto
- [ ] Commits seguem Conventional Commits
- [ ] Testes passam localmente
- [ ] Sem `console.log` ou debuggers
- [ ] Documentação atualizada (se necessário)
- [ ] PR template preenchido completamente

## 🤝 Código de Conduta

- Seja respeitoso e profissional
- Aceite feedback construtivo
- Foque na qualidade e manutenibilidade
- Comunique-se claramente
- Ajude outros contribuidores

## 📚 Recursos Adicionais

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
