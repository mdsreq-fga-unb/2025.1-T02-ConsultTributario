# Gerenciar Teses Tributárias

---

## 1. Objetivo

Permitir que o **Administrador** crie, edite, exclua e categorize **teses tributárias** (claims) com rapidez e consistência, garantindo que qualquer mudança reflita imediatamente nos diagnósticos e relatórios gerados pelo sistema.

## 2. Escopo → Epics e PBIs

| Épico | Código US | PBI                                                   |
| ----- | --------- | ----------------------------------------------------- |
| EP-01 | [**US-03**](us-03.md) | Criar tese tributária                                 |
|       | [**US-04**](us-04.md) | Editar tese tributária                                |
|       | [**US-05**](us-05.md) | Excluir tese tributária                               |
|       | [**US-07**](us-07.md) | Visualizar teses tributárias cadastradas              |
|       | [**US-06**](us-06.md) | Criar categorias de teses tributárias                 |
|       | [**US-17**](us-17.md) | Editar categoria de teses tributária                  |
|       | [**US-18**](us-18.md) | Apagar categoria de teses tributária                  |
|       | [**US-19**](us-19.md) | Visualizar categorias de teses tributária cadastradas |

## 3. Permissões

| Papel     | Acesso                                             |
| --------- | -------------------------------------------------- |
| **admin** | US‑03, US‑04, US‑05, US‑06, US‑17, US‑18, US-19    |
| **user**  | Somente visualização das teses cadastradas (US-07) |

## 4. Modelo de Dados

### Entidade: Claim (Tese Tributária)

| Campo                     | Tipo                | Regra / Observação                          |
| ------------------------- | ------------------- | ------------------------------------------- |
| `id`                      | ObjectId            | PK (Mongo)                                  |
| `title`                   | string              | obrigatório • único • máx 150               |
| `objective`               | string              | obrigatório • máx 1000                      |
| `summary`                 | string              | obrigatório • máx 5000                      |
| `recoverable_period`      | string              | obrigatório • máx 1000                      |
| `recoverable_value`       | string              | obrigatório • máx 1000                      |
| `relatedQuestion`         | ObjectId → Question | Referencia ao ID de uma pergunta (opcional) |
| `taxType`                 | ObjectId → TaxType  | obrigatório                                 |
| `createdAt` / `updatedAt` | datetime            | timestamps                                  |

### Entidade: TaxType (Categoria de Tese)

| Campo                     | Tipo     | Regra / Observação           |
| ------------------------- | -------- | ---------------------------- |
| `id`                      | ObjectId | PK (Mongo)                   |
| `name`                    | string   | obrigatório • único • máx 30 |
| `createdAt` / `updatedAt` | datetime | timestamps                   |

## 5. Wireframes / Protótipos

- **Wireframe:** [Link]()

## 6. Histórico de Revisões

| Data       | Versão | Autor             | Alteração            |
| ---------- | ------ | ----------------- | -------------------- |
| 2025-06-19 | 0.1    | Artur Krauspenhar | Criação do documento |
