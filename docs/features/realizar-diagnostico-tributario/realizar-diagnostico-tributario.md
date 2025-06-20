# Realizar Diagnóstico Tributário

---

## 1. Objetivo

Permitir que usuários **(advogados, contadores ou departamentos jurídicos)** respondam a um questionário tributário, salvando as respostas e gerando a base para o relatório de teses aplicáveis.

## 2. Escopo → Epics e PBIs

| Épico | Código US             | PBI                                                         |
| ----- | --------------------- | ----------------------------------------------------------- |
| EP-04 | [**US-12**](us-12.md) | Realizar questionário de diagnóstico tributário             |
|       | [**US-13**](us-13.md) | Editar respostas preenchidas no questionário de diagnóstico |
|       | [**US-14**](us-14.md) | Visualizar relatório de teses tributárias aplicáveis        |
|       | [**US-15**](us-15.md) | Apagar questionário de diagnóstico já preenchido            |
|       | [**US-16**](us-16.md) | Exportar relatório de teses aplicáveis em PDF               |

## 3. Permissões

| Papel    | Acesso                                                                                                     |
| -------- | ---------------------------------------------------------------------------------------------------------- |
| **user** | Criar, editar, apagar e exportar **apenas** seus próprios diagnósticos (US-12, US-13, US-14, US-15, US-16) |

## 4. Modelo de Dados

### Entidade: Diagnosis

| Campo                     | Tipo                    | Regra / Observação       |
| ------------------------- | ----------------------- | ------------------------ |
| `id`                      | ObjectId                | PK (Mongo)               |
| `clientName`              | string                  | obrigatório              |
| `questionResponses`       | array<QuestionResponse> | min 1 item               |
| `createdAt` / `updatedAt` | datetime                | timestamps pelo Mongoose |

**Embedded**: QuestionResponse

| Sub‑campo    | Tipo                            | Regra / Observação |
| ------------ | ------------------------------- | ------------------ |
| `questionId` | ObjectId → Question             | obrigatório        |
| `answer`     | enum { **yes, dont_know, no** } | obrigatório        |

## 5. Wireframes / Protótipos

- **Wireframes:** [Link]()

## 6. Histórico de Revisões

| Data       | Versão | Autor             | Alteração            |
| ---------- | ------ | ----------------- | -------------------- |
| 2025-06-19 | 0.1    | Artur Krauspenhar | Criação do documento |
