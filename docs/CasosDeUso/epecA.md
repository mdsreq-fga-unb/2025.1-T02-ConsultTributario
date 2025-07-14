# Especificação de Caso de Uso: Consultar Serviços de Saúde

## Versão

- **1.0**

## Histórico da Revisão

| Data       | Versão | Descrição                                 | Autor              |
|------------|--------|-------------------------------------------|--------------------|
| 07/07/2025 | 1.0    | Criação do documento                      | Artur Krauspenhar  |
| 13/07/2025 | 2.0    | Ajustes após apresentação em sala de aula | Artur Krauspenhar  |

---

## 1. Breve Descrição

Este caso de uso permite que o paciente consulte serviços de saúde disponíveis, como clínicas, hospitais e campanhas de saúde próximas, utilizando filtros como localização, tipo de atendimento e disponibilidade.

---

## 2. Fluxo Básico de Eventos

1. O caso de uso se inicia quando o **Paciente**, já autenticado, seleciona a funcionalidade "Consultar Serviços de Saúde" no portal.
2. O sistema exibe o portal inicial com opções de busca, exibindo os filtros disponíveis:
   - Localização (CEP, cidade ou por proximidade) **[PE02]**
   - Tipo de Serviço (Hospital, Clínica, Laboratório, etc.)
   - Especialidade Médica (Cardiologia, Pediatria, etc.)
   - Disponibilidade (ex: "Atendimento 24h")
3. O sistema apresenta filtros disponíveis (localização, tipo de serviço, disponibilidade).
4. O paciente preenche um ou mais filtros para definir seus critérios de busca.
5. O sistema retorna uma lista de serviços de saúde que correspondem aos critérios.
6. O paciente seleciona um serviço desejado para obter mais informações.
7. O sistema exibe uma página com os detalhes completos do serviço selecionado, incluindo endereço com mapa, telefone de contato, horários de funcionamento, convênios aceitos e lista de profissionais. **[RN02] [PE01]**
8. **O caso de uso chega ao fim.**

---

## 3. Fluxos Alternativos

### A1. Busca por Proximidade (Sem Filtros Manuais)

- No passo 3 do Fluxo Básico, o paciente aciona a busca sem preencher nenhum filtro.
- O sistema utiliza a localização do dispositivo do paciente (mediante permissão) ou seu endereço cadastrado como critério principal.
- O sistema exibe a lista de todos os serviços disponíveis, ordenados do mais próximo ao mais distante.
- O fluxo retorna ao passo 6 do Fluxo Básico.

### A2. Nenhum Serviço Encontrado

- No passo 5 do Fluxo Básico, a busca do sistema não encontra nenhum resultado que corresponda aos filtros aplicados pelo paciente.
- O sistema exibe uma mensagem clara e amigável, como: "Nenhum serviço encontrado para os critérios informados."
- O sistema sugere ações para o paciente, como "Tente ampliar o raio de busca" ou "Revise os filtros selecionados".
- A interface de busca permanece visível, com os filtros anteriores preenchidos, para que o paciente possa modificá-los facilmente e tentar uma nova busca. O caso de uso termina aqui, a menos que o paciente inicie uma nova busca.

---

## 4. Fluxos de Exceção

### Problemas na conexão com a internet

- O sistema notifica o paciente sobre o problema e sugere tentar novamente mais tarde.

---

## 5. Pré-Condições

- O paciente deve estar logado no sistema ConnectCare.

---

## 6. Pós-Condições

- Paciente obtém informações sobre serviços de saúde disponíveis para decisão sobre agendamento.

---

## 7. Pontos de Extensão

### PE01 - Agendamento de consulta

- O paciente pode realizar o agendamento diretamente após a consulta dos serviços.

### PE02 - Visualizar no mapa unidades de saúde

- O paciente pode visualizar no mapa unidades de saúde.

---

## 8. Requisitos Especiais

### RN01 - Informações Mínimas na Lista

A lista de resultados (passo 5) deve exibir, no mínimo, o nome do estabelecimento, o tipo de serviço e a distância ou endereço para cada item.

### RN02 - Atualização das Informações

As informações detalhadas dos serviços de saúde devem ser precisas e atualizadas. Deve haver um processo para garantir a curadoria desses dados.

### RN03 - Desempenho em Conectividade Limitada

O sistema deve ser otimizado para funcionar em dispositivos móveis e redes de baixa velocidade, utilizando técnicas como compressão de dados e carregamento progressivo de imagens (lazy loading).

### RN04 - Acessibilidade

A interface de consulta e seus resultados devem seguir as diretrizes de acessibilidade (WCAG 2.1, Nível AA) para garantir o uso por pessoas com deficiência (ex: leitores de tela, contraste de cores adequado).

---

## 9. Informações Adicionais

- Nenhuma