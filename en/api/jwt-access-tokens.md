# JWT Access Tokens

<span class="rfc-badge">RFC 9068</span> · package `rfc9068`

Implements RFC 9068's JWT profile for OAuth 2.0 access tokens — a standard structure for issuing access tokens as signed JWTs instead of opaque strings, so resource servers can verify them locally.

## Construction

```go
import "github.com/alkeyio/authkit/rfc9068"

jwtGen, err := rfc9068.MustJWTAccessTokenGenerator(
    rfc9068.NewGeneratorConfig().
        SetIssuer("https://auth.example.com").
        SetAudience("https://api.example.com").
        SetSigningKey(privateKey, jwt.SigningMethodRS256, "key-1"),
)
```

## Configuration

| Setter | Purpose |
| --- | --- |
| `SetIssuer` | Sets the `iss` claim — your authorization server's canonical URL. |
| `SetAudience` | Sets the `aud` claim — the resource server(s) this token is valid for. |
| `SetSigningKey` | Private key, JWT signing method, and key ID (`kid`) used to sign issued tokens. |

## Opaque vs JWT access tokens

| | Opaque (default, RFC 6750) | JWT (RFC 9068) |
| --- | --- | --- |
| Resource server can verify without a call back | No — needs [introspection](/en/api/introspection) | Yes — verifies the signature locally |
| Immediate revocation before expiry | Yes, since the auth server is always consulted | Only if you also run introspection or short expiries |
| Token size | Small | Larger (carries claims) |

Choose JWT access tokens when you want resource servers to validate tokens without network calls to the authorization server — most useful for [Client Credentials](/en/api/client-credentials) service-to-service tokens and high-throughput resource servers.

## See also

- [OIDC](/en/api/oidc) — a related but distinct token: the ID Token identifies the *user*, RFC 9068 tokens authorize *API access*.
- [Token Introspection](/en/api/introspection) — the opaque-token alternative to local verification.
