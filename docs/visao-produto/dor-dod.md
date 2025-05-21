## Histórico de Versão:
| Data | Versão | Descrição | Autor |
|---- | ------ | --------- | ----- |
| 17/05/27 | 1.0 | Criação do Documento | Artur Krauspenhar |

# 8. DoR e DoD

## 8.1 Definiton of Ready (DoR)
A Definition of Ready (DoR) é um conjunto de critérios que um item ou uma User Story do Backlog deve atender para ser considerando pronto para iniciar o trabalho desse item. Assim que um item do Backlog atende a esses critérios, ele é puxado para ser trabalhado durante a Sprint. Para que um item possa ser considerado 'Ready', ele precisa atender aos seguintes critérios:

- **A História de Usuário foi construída no formato "Eu como [Ator], devo ser capaz de [o que fazer], para que [objetivo]"?**
- **O requisito não possui ambiguidade?** Ou seja, se a história de usuário e o seu título não possui outras interpretações para o lado dos desenvolvedores e stakeholders.
- **As stakeholders passaram os Critérios de Aceitação?** Ou seja, as ações e comportamentos que eles testarão e esperam que deverá ocorrer no software.
- **Todas as dependências externas estão identificadas e tratadas?**
- **O requisito relacionado foi validado e priorizado?** Ou seja, se o requisito foi aprovado, garantindo que ele esteja em conformidade com os padrões de qualidade estabelecidos, incluindo clareza, viabilidade técnica, e documentação completa e sem ambiguidades.

## 8.2 Definition of Done (DoD)
Se a DoR é um conjunto de critérios para que um item seja considerado adequado para começar a se trabalhar nele, então a Definition of Done (DoD) é o conjunto de critérios que um item precisa ter para ser considerado como terminado. Sendo esse conjunto de critérios descritos abaixo:

- **Os critérios de aceitação definidos com os stakeholders foram atendidos?** O requisito deve conter todas as ações e comportamentos esperados pelas stakeholders, assim como foi definido anteriormente.
- **O backend foi integrado ao frontend (Caso necessário)?** Backend e frontend devem ser integrados corretamete.
- **Todo o código passou por revisão de pares para garantir qualidade e aderência aos padrões do projeto, isto é, 2 revisores aprovaram o código?** Pelo processo de desenvolvimento de software aderido, ScrumXP, a revisão é feita também em pares.
- **Documentação atualizada (Caso necessário)?** README / Docs / Swagger atualizados?
- **O código possui cobertura de testes de no mínimo 80%?**
- **A funcionalidade foi integrada ao branch principal sem conflitos?** A funcionalidade não pode conter conflitos ou interferir de alguma forma no funcionamento de outra funcionalidade ou do projeto como um todo.
- **PO aceitou a entrega e marcou como “Concluído” no board?**
- **A funcionalidade está disponível em um ambiente de homologação ou produção, pronta para validação?** A cada entrega, o ambiente que contém as funcionalidades desenvolvidas deve estar disponível para que as stakeholdes possam ter acesso.