# Models

<span class="rfc-badge">package models</span>

AuthKit does not persist anything itself. Every grant flow and endpoint depends on one or more **manager interfaces** defined in the `models` package. Implement them against whatever storage you already use — Postgres, MySQL, Redis, in-memory for a prototype — and pass them to a flow's `Config` via the corresponding `Set*Manager` method.

## Manager interfaces by flow

| Manager | Used by | Purpose |
| --- | --- | --- |
| `ClientManager` | All grants, introspection | Look up registered OAuth clients, their redirect URIs, and authentication method. |
| `AuthCodeManager` | Authorization Code | Persist an issued authorization code and redeem it exactly once. |
| `TokenManager` | All grants, introspection | Issue, persist, and look up access and refresh tokens. |
| `UserManager` | ROPC | Verify submitted username/password credentials. |

## Reference implementation

A reference SQL implementation of these interfaces is included in `integrations/sql` — useful as a starting point to read or fork rather than a required dependency. AuthKit itself has no opinion on your schema or database engine; the SQL package is one example, not the contract.

## Where to start

If you're implementing these for the first time, start with `ClientManager` and `TokenManager` — every grant needs both. Add `AuthCodeManager` if you're using [Authorization Code](/vi/api/authorization-code), or `UserManager` if you're using [ROPC](/vi/api/ropc).

For the exact method signatures, see [`models/README.md`](https://github.com/alkeyio/authkit/blob/main/models/README.md) and [`integrations/sql/`](https://github.com/alkeyio/authkit/blob/main/integrations/sql) in the repository.
