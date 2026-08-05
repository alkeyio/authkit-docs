# Introduction

AuthKit is a modular OAuth 2.0 / OpenID Connect server library for Go, structured around RFC-named packages. Each package implements a single specification and can be composed independently — bring only the grants and extensions you need.

```go
srv := authkit.NewServer()
srv.RegisterGrant(authCodeFlow)
srv.RegisterEndpoint(introspectionFlow)

srv.CreateAuthorizationResponse(r, w, user)  // GET  /authorize
srv.CreateTokenResponse(r, w)                // POST /token
```

## Why AuthKit

Most Go teams building an authorization server end up in one of two places: hand-rolling RFC 6749 against the spec text, or pulling in a full identity platform when all they needed was the protocol layer. AuthKit sits in between.

- **RFC-scoped packages, not a monolith.** `rfc6749`, `rfc7636`, `rfc7662`, `rfc9068` each do one thing and can be imported independently. You are not forced into a full OP/RP object graph to get PKCE validation.
- **Config + Flow pattern.** Every grant is built the same way — `NewConfig()` → set dependencies → `Must()` — so once you've learned one flow, you've learned them all. See [Config + Flow Pattern](/en/concepts/config-flow-pattern).
- **Extensions instead of inheritance.** PKCE and OIDC ID Token issuance are plain extension interfaces (`AuthorizationRequestValidator`, `TokenProcessor`, etc.) registered onto a base flow, rather than subclassed or forked flow implementations. See [Extension System](/en/concepts/extensions).
- **You own storage.** AuthKit defines the manager interfaces (`ClientManager`, `AuthCodeManager`, `TokenManager`, ...); you implement them against whatever you already use. A reference SQL implementation is included in `integrations/sql`.
- **Fails fast, not at runtime.** `Must()` validates required dependencies at construction time, so a missing `TokenManager` is a startup error, not a 500 in production.

## Who this is for

AuthKit is aimed at teams that need to run their own authorization server — not consume someone else's — and want the protocol correctness of a mature library without adopting an entire identity platform's data model, admin UI, or deployment footprint. If you're evaluating identity providers versus building your own, AuthKit is the "building your own" option done properly: spec-compliant primitives, your storage, your HTTP layer.

## Supported specifications

| Specification  | Package                         | Description                                                                 |
| -------------- | -------------------------------- | ---------------------------------------------------------------------------- |
| RFC 6749 §4.1  | `rfc6749/authorization_code`     | Authorization Code Grant                                                     |
| RFC 6749 §4.3  | `rfc6749/ropc`                   | Resource Owner Password Credentials                                          |
| RFC 6749 §4.4  | `rfc6749/client_credentials`     | Client Credentials Grant                                                     |
| RFC 6749 §2.3  | `rfc6749/client_authentication`  | Client authentication (`client_secret_basic`, `client_secret_post`, `none`)  |
| RFC 6749       | `rfc6749/code_generator`         | Authorization code generation                                                |
| RFC 6750       | `rfc6750`                        | Bearer Token (opaque access + refresh)                                       |
| RFC 7636       | `rfc7636`                        | PKCE (Proof Key for Code Exchange)                                           |
| RFC 7662       | `rfc7662`                        | Token Introspection                                                          |
| RFC 9068       | `rfc9068`                        | JWT Access Tokens                                                            |
| OpenID Connect | `oidc/core/authorization_code`   | ID Token generation                                                          |

Device Authorization Grant (RFC 8628) and Token Revocation (RFC 7009) are on the roadmap — see [Contributing](#contributing).

## Next steps

- [Getting Started](/en/docs/installation) — install AuthKit and wire up your first flow.
- [Architecture](/en/docs/architecture) — how `Server`, `Config`, `Flow`, and extensions fit together.
- [OAuth 2.0 Flows](/en/concepts/oauth2-flows) — a refresher on the grants AuthKit implements.

## Contributing

Issues and pull requests are welcome — especially around new RFC coverage (e.g. RFC 8628 Device Authorization Grant, RFC 7009 Token Revocation), storage backend examples beyond SQL, and real-world usage reports. If you're evaluating AuthKit for a project, opening an issue with your use case helps prioritize the roadmap even if you don't send code.

## License

BSD-3-Clause.
