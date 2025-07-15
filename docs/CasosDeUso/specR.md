# **CONSULT TRIBUTÁRIO**

# **Especificação de Caso de Uso: Criar perfil profissional**

# 

# **Versão 1.0**

# **Histórico da Revisão**

| Data | Versão | Descrição  | Autor |
| ----- | ----- | ----- | ----- |
| 07/07/2025 | 1.0 | Adicionando caso de uso no documento | Rafael Welz Schadt |
| 14/07/2025 | 2.0 | Correções após apresentação em aula | Rafael Welz Schadt |

---

### **1\. Breve Descrição**

Este caso de uso descreve o processo pelo qual um Profissional da Saúde cria um perfil profissional no sistema ConnectCare. O objetivo é permitir que o profissional registre suas especializações e horários de disponibilidade, facilitando a integração ao sistema para atender pacientes.

### **2\. Fluxo Básico de Eventos**

1. O sistema exibe a opção de "Criar Perfil Profissional" ao profissional da saúde após autenticação.  
2. O profissional da Saúde preenche os campos com as seguintes informações:                                                                \- Nome                                                                                                                                                                                 \- CRM \[RN01\]                                                                                                                                                                                      \- Especialização(s) \[RN03\]                                                                                                                                \- Agenda de disponibilidade \[RN04\]  
3. O sistema valida os dados inseridos. \[FE01\]  
4. O profissional da Saúde confirma a criação do perfil.  
5. O sistema registra o perfil e associa-o ao usuário autenticado.  
6. O sistema notifica o Profissional da Saúde sobre a criação bem-sucedida do perfil. \[FE02\]  
7. O caso de uso é encerrado.

### **3\. Fluxos Alternativos**

#### **A1. Cancelar a Criação do Perfil**

1. A qualquer momento antes do passo 4 (submissão), o profissional da Saúde pode selecionar a opção "Cancelar" ou "Sair".  
2. O sistema exibe uma caixa de diálogo de confirmação, alertando: "Deseja realmente sair? Todas as informações não salvas serão perdidas."  
3. Se o profissional confirmar, o sistema descarta os dados inseridos.  
4. O fluxo retorna ao passo 1 do Fluxo Básico.

### **4\. Fluxos de Exceção**

**FE01 \- Dados Obrigatórios Ausentes ou Inválidos:**

1. No passo 3 do fluxo básico, a validação do sistema detecta que um ou mais campos obrigatórios não foram preenchidos ou contém um formato inválido.  
2. O sistema impede a submissão, destaca visualmente os campos com erro e exibe mensagens específicas ao lado de cada um  
3. O caso de uso é encerrado sem alteração no sistema.

**FE02 \- Falha Técnica no Registro do Perfil:**

1. No passo 6, ocorre um erro interno do sistema (ex: falha de conexão com o banco de dados) que impede o salvamento do perfil.  
2. O sistema exibe uma mensagem de erro genérica: "Ocorreu um erro ao salvar seu perfil. Por favor, tente novamente em alguns instantes." O sistema deve preservar os dados já inseridos no formulário para que o profissional não precise digitá-los novamente.

### **5\. Pré-Condições**

* O profissional da Saúde deve estar autenticado na plataforma ConnectCare.  
* A conta do usuário deve ter o tipo "Profissional da Saúde" e não possuir um perfil profissional previamente criado.

### **6\. Pós-Condições**

* O perfil profissional é criado e armazenado no sistema.  
* O profissional da Saúde pode acessar a agenda de consultas e gerenciar atendimentos.

### **7\. Pontos de Extensão**

* Não existem pontos de extensão para este caso de uso. 

**8\. Requisitos Especiais**

* **RN01 \- Validação de Dados:** O sistema deve impor máscaras e validações de formato para campos específicos, como o número de inscrição profissional.  
* **RN02 \- Segurança**: Os dados do perfil devem ser criptografados e protegidos conforme regulamentações de proteção de dados.  
* **RN03 \- Padronização de Especialidades:** Para garantir consistência nas buscas, o campo "Especialidades" deve ser um seletor de múltiplas opções, populado a partir de uma lista controlada e padronizada de especialidades reconhecidas.  
* **RN04 \- Interface de Agenda Intuitiva:** A ferramenta de configuração de horários deve ser visual e de fácil utilização, permitindo que o profissional defina rapidamente seus horários recorrentes (ex: "Toda terça e quinta, das 08h às 12h") e bloqueie datas específicas.

### **9\. Informações Adicionais**

* Nenhuma. 

