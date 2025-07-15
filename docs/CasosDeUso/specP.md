# Especificação de Caso de Uso: Gerenciar eventos de saúde

## Versão

- **2.0**

## Histórico da Revisão

| Data       | Versão | Descrição                                 | Autor            |
|------------|--------|-------------------------------------------|------------------|
| 07/07/2025 | 1.0    | Adicionando caso de uso no documento      | Paulo Cerqueira  |
| 12/07/2025 | 2.0    | Ajustes após apresentação em sala de aula | Paulo Cerqueira  |

---

## 1. Breve Descrição

Este caso de uso permite que as organizações parceiras criem, editem e encerrem os seus eventos de saúde.

---

## 2. Fluxo Básico de Eventos

1. A organização parceira acessa a plataforma.
2. A organização parceira acessa o portal de gerenciamento de seus eventos de saúde.
3. No portal de gerenciamento, a organização tem acesso às seguintes opções:
   - Criar evento
   - Visualizar evento
   - Editar evento
   - Encerrar evento
4. A organização seleciona a opção de criar evento.
5. A organização preenche os campos contendo as informações do novo evento a ser criado:
   - Tipo de evento. **[RN04]**
   - Descrição do evento. **[RN01] [FE01]**
   - Público alvo que o evento irá conter. **[RN05]**
   - Local que o evento ocorrerá.
   - Data do evento (início e fim). **[RN03]**
   - Status do evento.
6. A organização salva e confirma a criação do novo evento.
7. Fim do caso de uso.

---

## 3. Fluxos Alternativos

### A1. Visualizar Evento

1. A organização seleciona a opção de visualizar o evento.
2. A organização pode visualizar todos os eventos criados. **[RN07] [FE04] [PE01] [PE02]**
3. A organização seleciona um evento para visualização.
4. A organização volta para o ponto 2 no fluxo básico.

### A2. Editar Evento

1. A organização seleciona um evento existente para fazer alterações.
2. A organização altera um ou mais campos de informação que o evento possui. **[RN06] [FE02]**
3. A organização confirma o aviso de alterações feitas nas informações do evento.
4. A organização volta para o ponto 2 no fluxo básico.

### A3. Encerrar Evento

1. A organização seleciona um evento que foi concluído, assim ele pode encerrar esse evento.
2. A organização volta para o ponto 2 no fluxo básico.

---

## 4. Fluxos de Exceção

- **FE01 – Limite de caracteres:** No ponto 5 do fluxo básico, na opção de preencher as informações, o campo "descrição" deve respeitar os limites de caracteres definidos pelo RN01.
- **FE02 – Alteração do status do evento:** No ponto 2 do fluxo alternativo 3, a organização pode receber um aviso de bloqueio se tentar alterar o status de um evento antes das 24h, de acordo com o RN02.
- **FE03 – Datas do evento incorretas:** No ponto 5 do fluxo básico e do fluxo alternativo 2, se as datas inicial e final do evento não respeitarem o RN03, o organizador será informado que as datas estão erradas.
- **FE04 – Nenhum evento encontrado no portal de gerenciamento de evento:** No fluxo alternativo 1 o organizador será informado caso não exista nenhum evento.

---

## 5. Regras de Negócio (RN)

- **RN01 – Limite de caracteres no campo DESCRIÇÃO:** O campo DESCRIÇÃO deve possuir o limite mínimo de 100 caracteres e o máximo de 500 caracteres.
- **RN02 – Alteração no status do evento:** Um evento que sofreu alteração de status só poderá alterar de novo o status após 24h da última alteração.
- **RN03 – Validação de Datas em Eventos:** No cadastro e atualização de um evento, as datas devem respeitar as seguintes regras:
  - A data de início do evento não pode ser anterior à data do cadastro.
  - A data de início só poderá ser atualizada se ainda não tiver ocorrido (ou seja, se a data atual for anterior à data de início).
  - A data final deve ser, no mínimo, uma hora posterior à data de início do evento.
- **RN04 – Tipos de Eventos:** Os tipos de evento são limitados às seguintes opções: Campanhas de vacinação, Mutirão de atendimento, Ação educativa e Evento de exames gratuitos.
- **RN05 – Público alvo:** Os públicos alvos são limitados às seguintes opções: Crianças, Adolescentes, Adultos e Idosos. Além disso, é possível concatenar as opções e escolher todas se necessário.
- **RN06 – Campos que podem ser editados:** Somente os seguintes campos podem ser editados no Fluxo Alternativo A2:
  - Local que o evento ocorrerá
  - Data do evento (início e fim)
  - Status do evento
- **RN07 – Visualização de Eventos:** No fluxo alternativo A1, a organização pode visualizar somente os seus eventos.

---

## 6. Pré-Condições

- A plataforma deve estar disponível para o organizador acessar.
- A organização precisa ter feito o login na plataforma.

---

## 7. Pós-Condições

- Ao final deste caso de uso, o evento criado/editado deve ser disponibilizado para a comunidade.

---

## 8. Pontos de Extensão

### PE01 – Promover evento de saúde

- **Ponto de Extensão:** Após a criação do evento.
- **Descrição:** Esta extensão tem como objetivo engajar o público-alvo do evento, utilizando dados de localização do evento, faixa etária e outras informações pertinentes para direcionar a comunicação ao público que participará do evento.

### PE02 – Gerar relatório do evento

- **Ponto de Extensão:** Após conclusão do evento.
- **Descrição:** Esta extensão tem como objetivo entender o impacto do evento, através desse relatório contendo métricas importantes do evento, como quantidade de participantes, se o público alvo foi atingido, etc.

