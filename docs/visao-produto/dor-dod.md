## Histórico de Versão:
| Data | Versão | Descrição | Autor |
|---- | ------ | --------- | ----- |
| 17/05/27 | 1.0 | Criação do Documento | Artur Krauspenhar |

# 8. DoR e DoD

## 8.1 Definiton of Ready (DoR)
A Definition of Ready (DoR) é um conjunto de critérios que um item ou uma User Story do Backlog deve atender para ser considerando pronto para iniciar o trabalho desse item. Assim que um item do Backlog atende a esses critérios, ele é puxado para ser trabalhado durante a Sprint. Para que um item possa ser considerado 'Ready', ele precisa atender aos seguintes critérios:

- **A História de Usuário foi construída no formato "Eu como [Ator], devo ser capaz de [o que fazer], para que [objetivo]"?**
- **O requisito está completo e não possui ambiguidade?** Ou seja, os detalhes devem ser suficientes para que a equipe de desenvolvimento entenda o que precisa ser feito sem que haja outras interpretações para o lado dos desenvolvedores ou stakeholders.
- **O requisito cabe em uma Sprint?** Ele deve ser suficientemente pequeno e bem delimitado para ser concluído dentro de uma única Sprint.
- **O requisito está coberto por critérios de aceitação?** Os critérios devem estar claramente definidos, garantindo que todos saibam o que é necessário para considerar o requisito completo.
- **Todas as dependências externas estão identificadas e tratadas?**
- **O requisito está bem alinhado com o cliente?** O requisito deve estar bem entendido entre o cliente e a equipe, para que assim o processo de desenvolvimento possa começar com ambas as partes em acordo.

## 8.2 Definition of Done (DoD)
Se a DoR é um conjunto de critérios para que um item seja considerado adequado para começar a se trabalhar nele, então a Definition of Done (DoD) é o conjunto de critérios que um item precisa ter para ser considerado como terminado. Sendo esse conjunto de critérios descritos abaixo:

- **Os critérios de aceitação definidos com os stakeholders foram atendidos?** O requisito deve conter todas as ações e comportamentos esperados pelos stakeholders, assim como foi definido anteriormente.
- **O backend foi integrado ao frontend (Caso necessário)?** Backend e frontend devem ser integrados corretamete.
- **Todo o código passou por revisão de pares para garantir qualidade e aderência aos padrões do projeto, isto é, 2 revisores aprovaram o código?** Pelo processo de desenvolvimento de software aderido, ScrumXP, a revisão é feita também em pares.
- **O código possui cobertura de testes de no mínimo 80%?**
- **A funcionalidade foi integrada ao branch principal sem conflitos?** A funcionalidade não pode conter conflitos ou interferir de alguma forma no funcionamento de outra funcionalidade ou do projeto como um todo.
- **A funcionalidade está disponível em um ambiente de homologação ou produção, pronta para validação?** A cada entrega, o ambiente que contém as funcionalidades desenvolvidas deve estar disponível para que as stakeholdes possam ter acesso.