## Histórico de Versão:
| Data | Versão | Descrição | Autor |
|---- | ------ | --------- | ----- |
| 20/05/27 | 1.0 | Criação do Documento | Artur Krauspenhar |
| 24/05/27 | 2.0 | Prioriza backlog     | Artur Krauspenhar |

O backlog de produto é uma lista dinâmica e priorizada que contém todos os requisitos, funcionalidades, melhorias e correções que serão necessárias para o desenvolvimento de um produto. Ele funciona como um guia para a equipe de desenvolvimento, servindo de referência para todas as tarefas que precisam ser realizadas ao longo do ciclo de vida do projeto. Essa lista não é fixa, mas sim atualizável conforme o produto evolui e novas necessidades surgem, garantindo que o time esteja sempre alinhado às prioridades e expectativas do projeto.

## 1 - Requisitos Funcionais

| Código | Requisito Funcional                                            |
|--------|----------------------------------------------------------------|
| RF01   | Inserir número de CNPJ                                         |
| RF03   | Consultar dados do CNPJ via API                                |
| RF04   | Exibir dados retornados da consulta ao CNPJ                    |
| RF05   | Armazenar dados do CNPJ                                        |
| RF06   | Editar dados retornados do CNPJ                                |
| RF07   | Listar CNPJs consultados                                       |
| RF08   | Visualizar dados retornados de consultas passadas ao CNPJ      |
| RF09   | Pré-preencher questionário com dados do CNPJ                   |
| RF10   | Associar dados de CNPJ às teses aplicáveis                     |
| RF12   | Criar tese tributária                                          |
| RF13   | Editar tese tributária                                         |
| RF14   | Apagar tese tributária                                         |
| RF15   | Categorizar tese tributária                                    |
| RF16   | Criar categorias de teses                                      |
| RF17   | Visualizar lista de teses                                      |
| RF18   | Pesquisar tese por nome                                        |
| RF19   | Agrupar teses por categorias                                   |
| RF20   | Criar pergunta jurídica                                        |
| RF21   | Editar pergunta jurídica                                       |
| RF22   | Apagar pergunta jurídica                                       |
| RF23   | Visualizar lista de perguntas jurídicas                        |
| RF24   | Relacionar tese a pergunta                                     |
| RF25   | Iniciar questionário com perguntas criadas                     |
| RF26   | Salvar respostas do questionário                               |
| RF27   | Editar resposta salva do questionário                          |
| RF28   | Visualizar relatório de teses aplicáveis                       |
| RF29   | Apagar questionário respondido                                 |
| RF30   | Exportar relatório de teses aplicáveis em PDF                  |
| RF31   | Relacionar pergunta a outras perguntas                         |
| RF32   | Salvar relatório de teses aplicáveis                           |
| RF33   | Editar categoria de teses                                     |
| RF34   | Apagar categoria de teses                                     |
| RF35   | Listar categorias de teses                                     |

## 2 - Requisitos Não Funcionais

| Código  | Requisito Não Funcional                        |
|---------|----------------------------------------------- |
| RNF01   | O sistema deve responder às ações do usuário em até 2 segundos, garantindo uma experiência fluida.                    |
| RNF02   | A geração de relatórios em PDF, como os de teses aplicáveis, deve ser concluída em no máximo 5 segundos.                            |
| RNF03   | Todo o tráfego deve ocorrer via HTTPS, e o sistema deve estar protegido contra injeções SQL (SQLi) e outras ameaças conhecidas (como XSS).                   |
| RNF04   | As credenciais dos usuários devem ser protegidas com hash (ex: bcrypt) e o sistema deve adotar TLS para segurança nas transmissões.                |
| RNF05   | O sistema deve manter logs de erros e acessos dos usuários, permitindo rastreabilidade e diagnóstico de falhas.                        |
| RNF06   | Toda comunicação com APIs externas (ex: consulta de CNPJ) deve utilizar HTTPS para garantir a integridade e confidencialidade dos dados.                  |
| RNF07   | A interface e os textos do sistema devem utilizar linguagem adequada ao público jurídico, evitando termos técnicos de TI ou ambiguidade.            |
| RNF08   | A estrutura do sistema deve permitir que os administradores atualizem facilmente teses tributárias e perguntas jurídicas, sem depender de suporte técnico.            |

## Épicos

| Código  | Título do Épico                                |
|---------|----------------------------------------------- |
| EP-01   | Gerenciamento de Teses Jurídicas               |
| EP-02   | Gerenciamento de Perguntas                     |
| EP-03   | Questionário de Diagnóstico Tributário         |
| EP-04   | Geração de Relatório de Teses Aplicáveis       |
| EP-05   | Gerenciamento de CNPJ                          |

## Histórias de Usuário

- **US-01:** Inserir número de CNPJ para análise  
  *Como usuário, quero inserir o número de CNPJ de uma empresa para análise, para ser feita a consulta de informações automaticamente.*

- **US-03:** Consultar dados públicos do CNPJ via API  
  *Como usuário, quero obter os dados de uma empresa pelo CNPJ de forma rápida, para evitar a pesquisa por informações em sites externos.*

- **US-04:** Exibir informações públicas do CNPJ  
  *Como usuário, quero visualizar os dados obtidos do CNPJ, para entender melhor o perfil da empresa consultada e verificar dados retornados.*

- **US-05:** Armazenar temporariamente dados do CNPJ para uso interno  
  *Como usuário, quero armazenar os dados do CNPJ consultado, para utilizá-los em outras funcionalidades.*

- **US-06:** Editar manualmente dados do CNPJ  
  *Como usuário, quero revisar e corrigir manualmente os dados do CNPJ consultado, para garantir que estejam corretos antes de usar em análises.*

- **US-07:** Listar empresas já consultadas  
  *Como usuário, quero visualizar uma lista de empresas cujos CNPJs já foram consultados, para reutilizar informações sem precisar fazer uma nova consulta.*

- **US-08:** Pré-preencher campos do questionário com dados do CNPJ  
  *Como usuário, quero que os dados do CNPJ preencham automaticamente os campos do questionário, para economizar tempo.*

- **US-09:** Associar informações do CNPJ às teses aplicáveis  
  *Como usuário, quero associar os dados do CNPJ às teses tributárias relevantes, para facilitar a geração de diagnósticos.*

- **US-10:** Visualizar dados retornados de consultas passadas ao CNPJ  
  *Como usuário, quero visualizar os dados obtidos em uma consulta anterior de CNPJ, para analisar novamente sem precisar consultar outra vez.*

- **US-11:** Atualizar dados de um CNPJ  
  *Como usuário, quero atualizar os dados de um CNPJ já consultado, para garantir que estou utilizando informações recentes na análise.*

- **US-12:** Criar tese tributária  
  *Como advogado, quero cadastrar novas teses tributárias no sistema, para ampliar a base de conhecimento jurídico da plataforma.*

- **US-13:** Editar tese tributária existente  
  *Como advogado, quero editar as teses tributárias já cadastradas, para manter as informações sempre atualizadas e corretas.*

- **US-14:** Excluir tese tributária  
  *Como advogado, quero excluir uma tese tributária do sistema, para remover conteúdos desatualizados ou incorretos.*

- **US-15:** Categorizar tese tributária  
  *Como advogado, quero associar categorias às teses tributárias, para facilitar sua organização e pesquisa.*

- **US-16:** Criar categorias de teses  
  *Como advogado, quero criar novas categorias para agrupar teses tributárias, para manter a base de dados organizada.*

- **US-17:** Visualizar lista de teses cadastradas  
  *Como usuário, quero ver todas as teses tributárias cadastradas, para consultar e aplicar nos casos que estou analisando.*

- **US-18:** Pesquisar tese por nome, palavra-chave ou categoria  
  *Como usuário, quero buscar teses tributárias usando filtros e palavras-chave, para encontrar rapidamente as mais relevantes.*

- **US-19:** Agrupar teses por categorias  
  *Como usuário, quero agrupar teses tributárias por categorias, para organizar melhor a base de conhecimento e facilitar a busca por temas específicos.*

- **US-20:** Criar pergunta jurídica  
  *Como advogado, quero cadastrar novas perguntas jurídicas, para usá-las nos questionários e relacioná-las a teses.*

- **US-21:** Relacionar tese a perguntas jurídicas  
  *Como advogado, quero vincular teses tributárias às perguntas jurídicas, para construir diagnósticos automatizados e contextualizados.*

- **US-22:** Iniciar e responder questionário jurídico  
  *Como usuário, quero iniciar e responder um questionário jurídico, para avaliar a aplicabilidade de teses tributárias ao meu caso.*

- **US-23:** Salvar respostas de questionário  
  *Como usuário, quero salvar as respostas de um questionário, para continuar posteriormente ou manter um histórico da análise.*

- **US-24:** Editar respostas salvas de questionários anteriores  
  *Como usuário, quero editar as respostas de questionários já preenchidos, para corrigir ou atualizar as informações fornecidas.*

- **US-25:** Visualizar relatório de teses aplicáveis  
  *Como usuário, quero visualizar um relatório com as teses tributárias aplicáveis com base nas respostas do questionário, para facilitar a tomada de decisão.*

- **US-26:** Excluir questionário respondido  
  *Como usuário, quero excluir um questionário que já respondi, para manter meu histórico limpo e relevante.*

- **US-27:** Exportar relatório de teses em PDF  
  *Como usuário, quero exportar o relatório de teses aplicáveis em formato PDF, para compartilhamento ou impressão.*

- **US-28:** Relacionar pergunta jurídica a outras perguntas  
  *Como advogado, quero relacionar perguntas jurídicas entre si, para criar lógicas de dependência ou encadeamento nos questionários.*

- **US-29:** Exibir lista de perguntas cadastradas  
  *Como advogado, quero visualizar todas as perguntas jurídicas disponíveis, para entender as opções que podem ser usadas em diagnósticos.*

- **US-30:** Editar pergunta jurídica  
  *Como advogado, quero editar perguntas jurídicas já cadastradas, para ajustar seu conteúdo conforme necessário.*

- **US-31:** Excluir pergunta jurídica  
  *Como advogado, quero excluir perguntas jurídicas do sistema, para remover aquelas que não são mais úteis ou estão desatualizadas.*

- **US-32:** Salvar relatório de teses aplicáveis  
  *Como usuário, quero salvar o relatório de teses tributárias aplicáveis gerado a partir de um questionário, para poder acessá-lo posteriormente sem precisar refazer a análise.*

- **US-33:**  Editar categorias de teses tributárias 
  *Como advogado, quero editar o nome de uma categoria de tese tributária, para manter a organização da base de dados e corrigir erros ou padronizar nomenclaturas.*

- **US-34:** Apagar categorias de teses tributárias  
  *Como advogado, quero poder apagar uma categoria de tese tributária, para remover agrupamentos que não fazem mais sentido ou foram criados incorretamente.*

- **US-35:** Visualizar lista de categorias de teses tributárias  
  *Como advogado, quero visualizar uma lista com todas as categorias de teses tributárias cadastradas no sistema, para entender como as teses estão organizadas e facilitar a navegação e o filtro por temas.*

| Código US | Código RF              | Épico Relacionado   |
|-----------|------------------------|---------------------|
| US-01     | RF01                   | EP-03               |
| US-03     | RF03                   | EP-05               | 
| US-04     | RF04                   | EP-05               | 
| US-05     | RF05                   | EP-05               | 
| US-06     | RF06                   | EP-05               | 
| US-07     | RF07                   | EP-05               | 
| US-08     | RF09                   | EP-05               | 
| US-09     | RF10                   | EP-05               | 
| US-10     | RF08                   | EP-05               | 
| US-11     | RF03, RF04, RF05       | EP-05               | 
| US-32     | RF32                   | EP-05               | 
| US-12     | RF12                   | EP-01               | 
| US-13     | RF13                   | EP-01               | 
| US-14     | RF14                   | EP-01               | 
| US-15     | RF15                   | EP-01               | 
| US-16     | RF16                   | EP-01               | 
| US-17     | RF17                   | EP-01               | 
| US-18     | RF18                   | EP-01               | 
| US-19     | RF19                   | EP-01               | 
| US-20     | RF20                   | EP-02               | 
| US-21     | RF24                   | EP-01               | 
| US-22     | RF25                   | EP-03               | 
| US-23     | RF26                   | EP-03               | 
| US-24     | RF27                   | EP-03               | 
| US-25     | RF28                   | EP-03               | 
| US-26     | RF29                   | EP-03               | 
| US-27     | RF30                   | EP-04               | 
| US-28     | RF31                   | EP-02               | 
| US-29     | RF23                   | EP-02               | 
| US-30     | RF21                   | EP-02               | 
| US-31     | RF22                   | EP-02               | 
| US-32     | RF32                   | EP-03               | 
| US-33     | RF33                   | EP-01               | 
| US-34     | RF34                   | EP-01               |
| US-35     | RF35                   | EP-01               | 


## Priorização do Backlog

| Código US | Descrição                                                  | Prioridade   | MVP      |
|-----------|------------------------------------------------------------|--------------|----------|
| US-12     | Criar tese tributária                                      | Must have    |    X     |
| US-13     | Editar tese tributária existente                           | Must have    |    X     |
| US-14     | Excluir tese tributária                                    | Must have    |    X     |
| US-17     | Visualizar lista de teses cadastradas                      | Must have    |    X     |
| US-20     | Criar pergunta jurídica                                    | Must have    |    X     |
| US-21     | Relacionar tese a perguntas jurídicas                      | Must have    |    X     |
| US-22     | Iniciar e responder questionário jurídico                  | Must have    |    X     |
| US-28     | Relacionar pergunta jurídica a outras perguntas            | Must have    |    X     |
| US-29     | Exibir lista de perguntas cadastradas                      | Must have    |    X     |
| US-30     | Editar pergunta jurídica                                   | Must have    |    X     |
| US-31     | Excluir pergunta jurídica                                  | Must have    |    X     |
| US-25     | Visualizar relatório de teses aplicáveis                   | Must have    |    X     |
| US-01     | Inserir número de CNPJ para análise                        | Must have    |    X     |
| US-32     | Salvar relatório de teses aplicáveis                       | Must have    |    X     |
| US-16     | Criar categorias de teses                                  | Should have  |    X     |
| US-15     | Categorizar tese tributária                                | Should have  |    X     |
| US-19     | Agrupar teses por categorias                               | Should have  |    X     |
| US-03     | Consultar dados públicos do CNPJ via API                   | Should have  |    X     |
| US-04     | Exibir informações públicas do CNPJ                        | Should have  |    X     |
| US-33     | Editar categorias de teses tributárias                     | Should have  |    X     |
| US-35     | Visualizar lista de categorias de teses tributárias        | Should have  |    X     |
| US-09     | Associar informações do CNPJ às teses aplicáveis           | Should have  |          |
| US-23     | Salvar respostas de questionário                           | Should have  |          |
| US-24     | Editar respostas salvas de questionários anteriore         | Should have  |          |
| US-26     | Excluir questionário respondido                            | Should have  |          |
| US-06     | Editar manualmente dados do CNPJ                           | Could have   |          |
| US-10     | Visualizar dados retornados de consultas passadas ao CNPJ  | Could have   |          |
| US-11     | Atualizar dados de um CNPJ                                 | Could have   |          |
| US-18     | Pesquisar tese por nome, palavra-chave ou categoria        | Could have   |          |
| US-05     | Armazenar temporariamente dados do CNPJ para uso interno   | Could have   |          |
| US-07     | Listar empresas já consultadas                             | Could have   |          |
| US-08     | Pré-preencher campos do questionário com dados do CNPJ     | Could have   |          |
| US-27     | Exportar relatório de teses em PDF                         | Could have   |          |
| US-34     | Apagar categorias de teses tributárias                     | Could have   |          |