# PKCE

<span class="rfc-badge">RFC 7636</span> · package `rfc7636`

Implements Proof Key for Code Exchange as an extension for the [Authorization Code flow](/vi/api/authorization-code). See [PKCE](/vi/concepts/pkce) for the conceptual explanation.

## Construction

```go
import "github.com/alkeyio/authkit/rfc7636"

// plain and S256 both accepted by default (RFC 7636)
pkce := rfc7636.New(rfc7636.NewOptions())

// S256-only, per RFC 9700 §2.1 recommendation
pkce := rfc7636.New(
    rfc7636.NewOptions().SetAllowPlain(false),
)
```

## Options

| Method | Default | Effect |
| --- | --- | --- |
| `SetAllowPlain(bool)` | `true` | When `false`, rejects `code_challenge_method=plain` and requires `S256`. |

## Registering

```go
cfg.RegisterExtension(pkce)
```

`rfc7636.New(...)` implements `AuthorizationRequestValidator` (requires and stores the code challenge on `/authorize`) and `TokenRequestValidator` (verifies the code verifier on `/token`). See [Extension System](/vi/concepts/extensions) for how these interfaces are invoked.

## See also

- [OIDC](/vi/api/oidc) — commonly registered alongside PKCE on the same Authorization Code flow.
