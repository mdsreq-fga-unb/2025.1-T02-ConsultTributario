# Gerenciar Perguntas Tributárias

---

## 1. Objetivo

Permitir que o **Administrador** crie, edite e exclua perguntas jurídicas com rapidez e consistência, garantindo que qualquer mudança em uma pergunta reflita no questionários de diagnóstico.

## 2. Escopo → Epics e PBIs

| Épico | Código US             | PBI                                        |
| ----- | --------------------- | ------------------------------------------ |
| EP-04 | [**US-08**](us-08.md) | Criar pergunta jurídica                    |
|       | [**US-09**](us-09.md) | Editar pergunta jurídica                   |
|       | [**US-10**](us-10.md) | Excluir pergunta jurídica                  |
|       | [**US-11**](us-11.md) | Visualizar perguntas jurídicas cadastradas |

## 3. Permissões

| Papel | Acesso                                       |
| ----- | -------------------------------------------- |
| admin | CRUD completo e visualização (US-08 a US-11) |

## 4. Modelo de Dados

### Entidade: Question (Pergunta)

| Campo                     | Tipo        | Regra / Observação                              |
| ------------------------- | ----------- | ----------------------------------------------- |
| `id`                      | ObjectId    | PK (Mongo)                                      |
| `label`                   | string      | obrigatório • único • máx 150                   |
| `tooltip`                 | string      | opcional • máx 500                              |
| `isActive`                | boolean     | default: true                                   |
| `relatedQuestions`        | array<UUID> | Referencia ao ID de outras perguntas (opcional) |
| `createdAt` / `updatedAt` | datetime    | timestamps                                      |

## 5. Wireframes / Protótipos

- **Wireframe:** [Link](https://excalidraw.com/#json=uzeZOcOtPKE5hVSiMwpbg,8IjQKNJVapnkd55dPgTC6g)

## 6. Histórico de Revisões

| Data       | Versão | Autor             | Alteração            |
| ---------- | ------ | ----------------- | -------------------- |
| 19-06-2025 | 0.1    | Artur Krauspenhar | Criação do documento |
