# Client Credentials

Service-to-service authentication — no user, no browser, no redirect.

```go
import (
    "github.com/alkeyio/authkit"
    clientcredentials "github.com/alkeyio/authkit/rfc6749/client_credentials"
)

flow, _ := clientcredentials.Must(
    clientcredentials.NewConfig().
        SetClientManager(clientMgr).
        SetTokenManager(tokenMgr),
)

srv := authkit.NewServer()
srv.RegisterGrant(flow)
```

```go
mux.HandleFunc("POST /token", func(w http.ResponseWriter, r *http.Request) {
    srv.CreateTokenResponse(r, w) // grant_type=client_credentials routes here
})
```

## Pairing with JWT access tokens

Client Credentials tokens are usually consumed by other services, which makes them a good fit for [JWT Access Tokens](/vi/api/jwt-access-tokens) — the receiving service can verify the token's signature locally instead of calling back to the authorization server for every request:

```go
jwtGen, _ := rfc9068.MustJWTAccessTokenGenerator(
    rfc9068.NewGeneratorConfig().
        SetIssuer("https://auth.example.com").
        SetAudience("https://api.example.com").
        SetSigningKey(privateKey, jwt.SigningMethodRS256, "key-1"),
)
```

## Related

- [API Reference: Client Credentials](/vi/api/client-credentials)
- [JWT Access Tokens example](/vi/examples/jwt-access-tokens)
