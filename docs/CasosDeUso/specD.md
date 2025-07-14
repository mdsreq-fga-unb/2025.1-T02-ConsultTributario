# Especificação de Caso de Uso: Responder Usuários da Plataforma

## Versão

- **1.0**

## Histórico da Revisão

| Data       | Versão | Descrição                                 | Autor                  |
|------------|--------|-------------------------------------------|------------------------|
| 07/07/2025 | 1.0    | Adicionando caso de uso no documento      | Daniel Ferreira Nunes  |
| 13/07/2025 | 2.0    | Ajustes após apresentação em sala de aula | Daniel Ferreira Nunes  |

---

## 1. Breve Descrição

Este caso de uso detalha como o **Administrador do Sistema** gerencia as dúvidas e reclamações dos usuários na plataforma. O administrador pode visualizar solicitações pendentes, responder a elas, marcá-las como resolvidas ou solicitar informações adicionais, assegurando a resolução eficaz das questões dos usuários.

---

## 2. Fluxo Básico de Eventos

1. O sistema apresenta ao Administrador uma lista de dúvidas e reclamações pendentes.
2. O Administrador seleciona uma solicitação para tratamento.
3. O sistema exibe os detalhes completos da solicitação selecionada.
4. *(Ponto de Início dos Fluxos Alternativos)* Após análise, o Administrador decide responder diretamente à solicitação. (Para outras ações, consultar Fluxos Alternativos A1 e A2).
5. O Administrador insere a resposta no campo designado e aciona o envio. **[RN02] [FE01]**
6. O sistema registra a resposta, vincula-a à solicitação original e notifica o usuário remetente. **[FE02]**
7. O status da solicitação é atualizado para "Respondida".
8. O caso de uso chega ao fim.

---

## 3. Fluxos Alternativos

### A1. Marcar Solicitação como Resolvida

1. Após revisar a solicitação, o Administrador determina que a questão já foi solucionada ou não necessita de uma resposta textual.
2. O Administrador seleciona a opção "Marcar como resolvida".
3. O sistema exibe uma caixa de diálogo de confirmação.
4. O sistema atualiza o status da solicitação e registra a ação.
5. O administrador volta para o passo 1 do fluxo básico.

### A2. Solicitar Mais Informações ao Usuário

1. Este fluxo é acionado quando a solicitação original carece de detalhes suficientes para sua resolução.
2. O Administrador seleciona a opção "Pedir mais informações", que altera o status da solicitação para "Aguardando Usuário" e notifica o usuário para que forneça os dados necessários. **[RN04] [RN05]**
3. O sistema atualiza o status da solicitação e registra a ação.
4. O administrador volta para o passo 1 do fluxo básico.

---

## 4. Fluxos de Exceção

- **FE01 – Resposta em Branco:** Se o Administrador tentar enviar uma resposta vazia (passo 4 do Fluxo Básico), o sistema impedirá o envio e exibirá uma mensagem de erro, solicitando o preenchimento do campo.
- **FE02 – Falha no Envio da Resposta:** Caso ocorra um erro técnico (ex: falha de conexão com o banco de dados) que impeça o registro da resposta no passo 5 do Fluxo Básico, o sistema exibirá uma mensagem de falha. A resposta não será enviada e o status da solicitação permanecerá inalterado.

---

## 5. Pré-Condições

- O Administrador do Sistema deve estar autenticado na plataforma.
- Deve haver pelo menos uma dúvida ou reclamação de usuário registrada no sistema.

---

## 6. Pós-Condições

- O status da solicitação do usuário é atualizado para "Respondida" ou "Resolvida".
- O usuário que originou a solicitação recebe uma notificação contendo a resposta ou o resultado do tratamento.

---

## 7. Pontos de Extensão

- Não há pontos de extensão para este caso de uso.

---

## 8. Requisitos Especiais

- **RN01 – Tempo Máximo de Resposta:** As solicitações dos usuários devem ser respondidas em até 48 horas após o registro.
- **RN02 – Validação de Resposta:** O conteúdo da resposta do Administrador não pode ser nulo ou vazio.
- **RN03 – Histórico de Interações:** O sistema deve manter um registro persistente de todas as perguntas, reclamações e suas respectivas respostas para consulta e auditoria futuras.
- **RN04 – Campo de Texto Obrigatório:** Ao selecionar "Pedir mais informações", o sistema deve exibir um campo de texto obrigatório para o administrador detalhar exatamente quais informações são necessárias. O conteúdo deste campo será enviado na notificação ao usuário.
- **RN05 – Pausa no Cronômetro:** Ao alterar o status para "Aguardando Usuário", o cronômetro do tempo de resposta (definido em RN01 – 48 horas) deve ser pausado. O cronômetro deve ser retomado automaticamente assim que o usuário enviar as informações solicitadas.
- **RN06 – Fechamento Automático por Inatividade:** Se o usuário não fornecer as informações solicitadas dentro de um prazo pré-determinado (ex: 5 dias úteis), o sistema deve enviar um lembrete automático. Se após um segundo prazo (ex: mais 2 dias úteis) não houver resposta, o sistema deve marcar a solicitação como "Fechada por inatividade" e notificar o usuário.

---

## 9. Informações Adicionais

- [x] ~~Referências~~
- [x] ~~Regra de negócio mais abrangente~~
- [x] ~~Regra de negócio de validação~~
- [x] ~~Empresa volta para um passo e não para uma página~~
- [x] ~~Regra de negócio de visualização~~
- [x] ~~Regra de negócio de edição~~
- [x] ~~Dizer onde pontos de extensão podem ser estendidos~~