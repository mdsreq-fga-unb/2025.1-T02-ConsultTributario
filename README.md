# 📊 ConsultTributário

Projeto desenvolvido pelo **Grupo 07** para a disciplina de Métodos de Desenvolvimento de Software na Universidade de Brasília (UnB).

## 📝 Sobre o Projeto

O **ConsultTributário** é uma aplicação web que visa facilitar a consulta de informações tributárias e fiscais, proporcionando uma experiência simplificada para contribuintes e profissionais da área.

## 📚 Documentação

A documentação do projeto é gerenciada com [MkDocs](https://www.mkdocs.org/) e está disponível em: 
**[https://mdsreq-fga-unb.github.io/2025.1-T02-ConsultTributario/](https://mdsreq-fga-unb.github.io/2025.1-T02-ConsultTributario/)**

### 🌿 Branch `docs`

A branch `docs` é dedicada exclusivamente para desenvolvimento e atualização da documentação do projeto. 

- Todas as alterações na documentação devem ser feitas nesta branch
- PRs relacionados à documentação devem ter `doc` como branch alvo

### 🔄 Workflow de Deploy

O projeto utiliza GitHub Actions para automatizar o deploy da documentação:

- O workflow é acionado automaticamente quando:
  - Ocorre um push para a branch `docs` (afetando arquivos em `docs/` ou `mkdocs.yml`)
  - Um PR é aberto/atualizado para a branch `docs` (afetando arquivos em `docs/` ou `mkdocs.yml`)
  - Acionado manualmente através da interface do GitHub (Actions → Workflows → Deploy Documentação → Run workflow)

- O resultado do deploy é publicado na branch `gh-pages` e disponibilizado através do GitHub Pages

## 🚀 Executando a Documentação Localmente

Para visualizar a documentação em seu ambiente local:

1. Clone o repositório:
   ```bash
   git clone https://github.com/mdsreq-fga-unb/2025.1-T02-ConsultTributario.git
   cd 2025.1-T02-ConsultTributario
   ```

2. Crie e ative um ambiente virtual:
   ```bash
   # No Linux/macOS
   python -m venv .venv
   source .venv/bin/activate

   # No Windows
   python -m venv .venv
   .venv\Scripts\activate
   ```

3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```

4. Execute o servidor MkDocs:
   ```bash
   mkdocs serve
   ```
   
5. O terminal fornecerá um link (geralmente http://127.0.0.1:8000). Clique nele ou copie para seu navegador.

## 👥 Contribuição

Para contribuir com a documentação:

1. Crie um branch a partir de `docs`:
   ```bash
   git checkout docs
   git pull
   git checkout -b doc/sua-alteracao
   ```

2. Faça suas alterações e commit:
   ```bash
   git add .
   git commit -m "docs: descrição da alteração"
   git push origin doc/sua-alteracao
   ```

3. Abra um Pull Request para a branch `docs`

## 👥 Equipe
<table>
  <tr>
    <td align="center"><a href="https://github.com/RafaelSchadt"><img style="border-radius: 50%;" src="https://github.com/RafaelSchadt.png" width="100px;" alt=""/><br/><sub><b>Rafael Schadt</b></sub></a><br/>
    <td align="center"><a href="https://github.com/viniciusvieira00"><img style="border-radius: 50%;" src="https://github.com/viniciusvieira00.png" width="100px;" alt=""/><br/><sub><b>Vinicius Vieira</b></sub></a><br/>
    <td align="center"><a href="https://github.com/paulocerqr"><img style="border-radius: 50%;" src="https://github.com/paulocerqr.png" width="100px;" alt=""/><br/><sub><b>Paulo Cerqueira</b></sub></a><br/>
    <td align="center"><a href="https://github.com/fdiogo1"><img style="border-radius: 50%;" src="https://github.com/fdiogo1.png" width="100px;" alt=""/><br/><sub><b>Diogo Ferreira</b></sub></a><br/>
    <td align="center"><a href="https://github.com/Mach1r0"><img style="border-radius: 50%;" src="https://github.com/Mach1r0.png" width="100px;" alt=""/><br/><sub><b>Daniel Ferreira</b></sub></a><br/>
    <td align="center"><a href="https://github.com/Arturhk05"><img style="border-radius: 50%;" src="https://github.com/Arturhk05.png" width="100px;" alt=""/><br/><sub><b>Artur H. Krauspenhar</b></sub></a><br/>
  </tr>
  </tr>
