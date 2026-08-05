# JWT Access Tokens

Issue access tokens as signed JWTs (RFC 9068) instead of opaque strings, so resource servers can verify them without calling back to the authorization server.

```go
import "github.com/alkeyio/authkit/rfc9068"

jwtGen, _ := rfc9068.MustJWTAccessTokenGenerator(
    rfc9068.NewGeneratorConfig().
        SetIssuer("https://auth.example.com").
        SetAudience("https://api.example.com").
        SetSigningKey(privateKey, jwt.SigningMethodRS256, "key-1"),
)
```

Plug the generator into your `TokenManager` implementation so that whichever grant flow you're running (Client Credentials, Authorization Code, ...) issues JWTs instead of opaque tokens — `rfc9068` produces the token; your `TokenManager` is what stores/returns it as part of the grant's normal token issuance path. See [Models](/vi/api/models) for the `TokenManager` contract.

## On the resource server side

A resource server receiving one of these tokens verifies the signature against your JWKS (built from the same key you passed to `SetSigningKey`) and checks the `iss` and `aud` claims match what it expects — no network call to the authorization server needed for validation. This is the trade-off against [Token Introspection](/vi/examples/introspection): faster and more scalable, at the cost of not being able to revoke a token before it naturally expires unless you also run introspection or issue short-lived tokens.

## Related

- [API Reference: JWT Access Tokens](/vi/api/jwt-access-tokens)
- [Client Credentials example](/vi/examples/client-credentials) — the most common pairing.
