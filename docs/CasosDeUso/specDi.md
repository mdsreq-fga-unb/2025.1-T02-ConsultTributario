# Especificação de Caso de Uso: Registrar Visita Domiciliar

## Versão

- **1.0**

## Histórico da Revisão

| Data       | Versão | Descrição                                 | Autor           |
|------------|--------|-------------------------------------------|-----------------|
| 07/07/2025 | 1.0    | Adicionando caso de uso no documento      | Diogo Ferreira  |
| 14/07/2025 | 2.0    | Ajustes após apresentação em sala de aula | Diogo Ferreira  |

---

## 1. Breve Descrição

Por meio da plataforma ConnectCare, o agente comunitário pode registrar uma visita domiciliar realizada a um paciente. Durante esse processo, é possível preencher dados sobre as condições de saúde observadas, indicar tratamentos sugeridos e registrar eventuais encaminhamentos. Essa funcionalidade tem como propósito assegurar o monitoramento contínuo do paciente e manter seu prontuário digital sempre atualizado.

---

## 2. Atores

- Agente comunitário responsável por realizar as visitas.

---

## 3. Condições Prévias

- O ator deve estar cadastrado e autenticado no sistema.

---

## 4. Fluxo Básico

1. O ator seleciona a opção "Registrar Visita Domiciliar" no menu.
2. O sistema apresenta as opções:
   - Consultar pacientes
   - Registrar novo paciente [FA01]
   - Emergência [FA02] [RN03]
3. O sistema exibe a lista de pacientes cadastrados ou permite a busca por nome, CPF ou endereço.
4. O agente seleciona o paciente que recebeu a visita.
5. O sistema exibe o prontuário digital do paciente, incluindo informações médicas anteriores. [RN01]
6. O agente insere os dados coletados durante a visita, como sintomas observados, condições do paciente e orientações que foram passadas. [RN04]
7. O agente confirma o registro da visita.
8. O sistema armazena os dados no prontuário digital do paciente e gera um relatório para acompanhamento. [RN02]
9. O agente recebe uma confirmação da operação bem-sucedida.
10. O caso de uso se encerra.

---

## 5. Fluxos Alternativos

### FA01 – Selecionar “Registrar novo paciente”

1. O agente seleciona a opção de registrar um novo paciente.
2. O sistema solicita os dados básicos do paciente (nome, CPF, data de nascimento, endereço, etc.).
3. O sistema valida as informações e cadastra o paciente.
4. O sistema emite uma mensagem de sucesso.
5. O sistema retorna para o passo 2 do fluxo básico.

### FA02 – Selecionar “Emergência”

1. O agente acessa a opção de emergência na plataforma.
2. O sistema exibe um menu de serviços de urgência disponíveis.
3. O agente seleciona a opção adequada (ex.: SAMU, hospital de referência, contato com médico responsável).
4. O sistema registra a ação no prontuário do paciente e disponibiliza um canal para comunicação rápida.
5. O fluxo retorna ao passo 7 do fluxo básico, permitindo que o agente registre a visita, incluindo a emergência relatada.

---

## 6. Fluxos de Exceção

- **FE01 – Informações obrigatórias não preenchidas:** Todos os campos obrigatórios devem ser preenchidos antes de concluir o registro da visita. O caso de uso retorna ao passo 6 do fluxo básico.
- **FE02 – Paciente não encontrado no sistema:** "Paciente não encontrado. Por favor, verifique os dados inseridos ou cadastre um novo paciente." O caso de uso retorna ao passo 2 do fluxo básico.

---

## 7. Regras de Negócio (RN)

- **RN01 – Disponibilidade dos registros:** Caso existam, os registros das visitas devem poder ser acessados posteriormente por profissionais de saúde devidamente autorizados, assegurando a rastreabilidade e a continuidade do acompanhamento do paciente.
- **RN02 – Segurança e privacidade dos dados:** As informações coletadas durante a visita devem ser armazenadas em conformidade com a LGPD, assegurando que o acesso seja restrito exclusivamente a usuários com as devidas permissões.
- **RN03 – Registro de emergência:** Se for detectada uma situação de emergência durante a visita, o agente deve priorizar o acionamento dos serviços adequados e registrar a ocorrência antes de finalizar o atendimento, conforme descrito no fluxo alternativo [FA02].
- **RN04 – O registro da visita deve conter informações obrigatórias:** A conclusão do registro da visita está condicionada ao preenchimento de todos os campos obrigatórios, incluindo os sintomas observados, o estado clínico do paciente e as orientações repassadas durante o atendimento.

---

## 8. Pós-Condições

- A visita domiciliar é registrada no prontuário digital do paciente.
- Encaminhamentos e solicitações de exames ficam disponíveis para análise dos profissionais de saúde.

---

## 9. Pontos de Extensão

- Nenhum ponto de extensão.
