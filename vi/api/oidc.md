# OIDC — ID Tokens

<span class="rfc-badge">OpenID Connect Core</span> · package `oidc/core/authorization_code`

Implements ID Token generation as an extension for the [Authorization Code flow](/vi/api/authorization-code). See [OpenID Connect](/vi/concepts/oidc) for the conceptual explanation of what an ID Token is and when you need one.

## Construction

```go
import oidcflow "github.com/alkeyio/authkit/oidc/core/authorization_code"

oidc, err := oidcflow.Must(
    oidcflow.NewConfig().
        SetIssuer("https://auth.example.com").
        SetSigningKey(privateKey, jwt.SigningMethodRS256, "key-1"),
)
```

## Configuration

| Setter | Purpose |
| --- | --- |
| `SetIssuer` | Sets the `iss` claim on every issued ID Token. |
| `SetSigningKey` | Private key, signing method, and key ID (`kid`) used to sign ID Tokens. |

## Registering

```go
cfg.RegisterExtension(oidc)
```

This implements `TokenProcessor`: after the base Authorization Code flow prepares its token response, the OIDC extension attaches a signed `id_token`. See [Extension System](/vi/concepts/extensions).

## See also

- [PKCE](/vi/api/pkce) — typically registered alongside OIDC on the same flow.
- [JWT Access Tokens](/vi/api/jwt-access-tokens) — a related but distinct JWT: this issues the *ID Token*, RFC 9068 issues the *access token*.
