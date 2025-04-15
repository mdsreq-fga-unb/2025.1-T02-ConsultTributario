# Política de Branches

| Versão | Data       | Descrição                         | Autor                               |
|------- |----------- | --------------------------------- | ----------------------------------- |
| 1.0    | dd/mm/yyyy | Versão inicial do documento       | Equipe ConsultTributario - Grupo 07 |
| 1.1    | dd/mm/yyyy | Revisões gerais                   | Equipe ConsultTributario - Grupo 07 |

---

## 1. Repositório de **Documentação**

### 1.1 Branch **main**
Branch principal do repositório de documentação, contendo a versão estável para o usuário final.

**Regras:**
- Só existe uma `main` no projeto;
- **Commits não são permitidos diretamente** nessa branch;
- Todo novo conteúdo deve ser integrado via *Pull Requests* de branches específicas (por exemplo, `doc/X-nome_documento` ou `hotfix`).

### 1.2 Branch **docs**
As branches para documentação são criadas a partir de `main`, seguindo um padrão para melhor organização.

**Padrão de nomenclatura**:
```bash
doc/X-nome_documento
```
**Exemplo**:
```bash
doc/1-guia_contribuicao
```
**Onde**:
- **X**: número da *issue* associada (se houver).
- **nome_documento**: título descritivo do artefato (ex.: guia_contribuicao, arquitetura_geral, etc).

### 1.3 Branch **hotfix** (Documentação)
Destinada a corrigir incidentes ou erros urgentes na documentação já lançada em `main`.

**Regras**:
- Deve ser derivada de `main`;
- Deve ser mesclada a `main` após concluída;

**Padrão de nomenclatura**:
```bash
hotfix/nome_documento
```
**Exemplo**:
```bash
hotfix/guia_contribuicao
```

---

## 2. Repositórios de **Desenvolvimento**

### 2.1 Branch **main/master**
Branch principal que contém o código estável e pronto para uso em produção.

**Regras**:
- Só existe uma `main` (ou `master`) no projeto;
- Commits **não** são permitidos diretamente nessa branch;
- Toda alteração deve chegar via Pull Requests, vindos de `release` ou `hotfix`.

### 2.2 Branch **develop**
Branch destinada ao desenvolvimento, onde as funcionalidades e correções são reunidas antes de serem lançadas.

**Regras**:
- Só existe uma `develop` no projeto;
- Deve ser derivada de `main/master`;
- Deve se manter sincronizada constantemente com as demais branches (feature, bugfix etc.).

### 2.3 Branch **feature**
Branch dedicada a implementar novas funcionalidades.

**Regras**:
- Deve ser derivada de `develop`;
- Deve ser mesclada de volta à `develop` após a conclusão da funcionalidade;
- Cada funcionalidade tem a sua própria branch.

**Padrão de nomenclatura**:
```bash
feature/X-nome_da_funcionalidade
```
**Exemplo**:
```bash
feature/2-crud_usuarios
```
**Onde**:
- **X**: número da *issue* associada.
- **nome_da_funcionalidade**: um título curto que descreve a funcionalidade (ex.: crud_usuarios, gerar_relatorio, etc.).

### 2.4 Branch **release**
Branch para agrupar um conjunto de funcionalidades prontas, que serão lançadas na `main`.

**Regras**:
- Deve ser derivada de `develop`;
- Após concluída, deve ser mesclada na `main/master`;
- Não se adicionam novas funcionalidades diretamente aqui, apenas correções (bugfix).

**Padrão de nomenclatura**:
```bash
release/vX.Y.Z
```
**Exemplo**:
```bash
release/v1.0.28
```
**Onde**:
- **vX.Y.Z**: versionamento semântico, conforme a política de versão do projeto.

### 2.5 Branch **bugfix**
Branch para correções de erros descobertos durante o ciclo de release.

**Regras**:
- Deve ser derivada de `release`;
- Deve ser mesclada de volta à `release` após a correção concluída.

**Padrão de nomenclatura**:
```bash
bugfix/X-nome_do_bugfix
```
**Exemplo**:
```bash
bugfix/32-corrige_erro_listagem_usuarios
```
**Onde**:
- **X**: número da *issue* associada.
- **nome_do_bugfix**: curto e descritivo (ex.: corrige_erro_listagem_usuarios).

### 2.6 Branch **hotfix** (Código em produção)
Usada para resolver incidentes urgentes em produção.

**Regras**:
- Deve ser derivada de `main/master`;
- Deve ser mesclada à `main/master` assim que a correção estiver pronta;
- Deve-se atualizar a versão do produto (patch version) ao finalizar.

**Padrão de nomenclatura**:
```bash
hotfix/vX.Y.Z
```
**Exemplo**:
```bash
hotfix/v2.4.3
```
---

## Referências

> [1] DRIESSEN, Vincent. A successful Git branching model. [S. l.], 5 jan. 2010.  
> Disponível em: [https://nvie.com/posts/a-successful-git-branching-model/](https://nvie.com/posts/a-successful-git-branching-model/)  
> Acesso em: 14/04/2025

> [2] Atlassian Gitflow Workflow  
> Disponível em: [https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)  
> Acesso em: 14/04/2025

