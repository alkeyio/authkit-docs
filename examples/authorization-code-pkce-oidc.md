# Authorization Code + PKCE + OIDC

The most common integration: a client with a browser, protected by PKCE, issuing both an access token and an OIDC ID Token.

```go
import (
    "github.com/alkeyio/authkit"
    authorizationcode "github.com/alkeyio/authkit/rfc6749/authorization_code"
    "github.com/alkeyio/authkit/rfc7636"
    oidcflow "github.com/alkeyio/authkit/oidc/core/authorization_code"
)

// PKCE — plain and S256 both accepted by default (RFC 7636).
// To enforce S256-only per RFC 9700 §2.1, set AllowPlain to false.
pkce := rfc7636.New(
    rfc7636.NewOptions().SetAllowPlain(false),
)

// OIDC ID Token
oidc, _ := oidcflow.Must(
    oidcflow.NewConfig().
        SetIssuer("https://auth.example.com").
        SetSigningKey(privateKey, jwt.SigningMethodRS256, "key-1"),
)

// Authorization Code flow
flow, _ := authorizationcode.Must(
    authorizationcode.NewConfig().
        SetClientManager(clientMgr).
        SetAuthCodeManager(authCodeMgr).
        SetTokenManager(tokenMgr).
        RegisterExtension(pkce).
        RegisterExtension(oidc),
)

srv := authkit.NewServer()
srv.RegisterGrant(flow)
```

Wire the server into your HTTP routes:

```go
mux.HandleFunc("GET /authorize", func(w http.ResponseWriter, r *http.Request) {
    user := currentUser(r) // your own session lookup
    srv.CreateAuthorizationResponse(r, w, user)
})

mux.HandleFunc("POST /authorize", func(w http.ResponseWriter, r *http.Request) {
    user := currentUser(r)
    srv.CreateConsentResponse(r, w, user) // consent step
})

mux.HandleFunc("POST /token", func(w http.ResponseWriter, r *http.Request) {
    srv.CreateTokenResponse(r, w)
})
```

## What each piece is doing

- `clientMgr`, `authCodeMgr`, `tokenMgr` are your implementations of the `ClientManager`, `AuthCodeManager`, and `TokenManager` interfaces from [Models](/api/models).
- `pkce` requires and validates a `code_challenge`/`code_verifier` pair per [PKCE](/concepts/pkce). Setting `AllowPlain(false)` enforces `S256`.
- `oidc` attaches a signed `id_token` to the token response when the client requests the `openid` scope — see [OpenID Connect](/concepts/oidc).

## Related

- [Getting Started](/guide/getting-started) — the same flow, explained step by step.
- [Client Credentials](/examples/client-credentials) — for machine-to-machine calls instead.
