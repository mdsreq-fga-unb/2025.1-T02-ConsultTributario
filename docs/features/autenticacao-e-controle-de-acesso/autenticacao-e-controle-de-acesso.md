# Autenticação e Controle de Acesso

---

## 1. Objetivo

Permitir que apenas usuários autorizados tenham acesso as funcionalidades do sistema. E limitar o acesso de algumas funcionalidades apenas a administradores.

## 2. Escopo → Epics e PBIs

| Épico | Código US             | PBI            |
| ----- | --------------------- | -------------- |
| EP-05 | [**US-20**](us-20.md) | Realizar login |

## 3. Permissões

| Papel            | Acesso        |
| ---------------- | ------------- |
| Qualquer Usuário | Tela de Login |

## 4. Modelo de Dados

### Entidade: User (usuário)

| Campo                     | Tipo     | Regra / Observação                        |
| ------------------------- | -------- | ----------------------------------------- |
| `id`                      | ObjectId | PK (Mongo)                                |
| `email`                   | string   | obrigatório • único • máx 255 • lowercase |
| `password`                | string   | obrigatório • máx 255                     |
| `role`                    | string   | Enum (admin, user) • Default: user        |
| `createdAt` / `updatedAt` | datetime | timestamps                                |

## 5. Wireframes / Protótipos

- **Wireframe:** [Link](https://excalidraw.com/#json=-kfZquwMuu7XXgP899ts1,eLjgZQ4n07oCeVBc26kbaA)

## 6. Histórico de Revisões

| Data       | Versão | Autor             | Alteração            |
| ---------- | ------ | ----------------- | -------------------- |
| 10-06-2025 | 0.1    | Artur Krauspenhar | Criação do documento |
