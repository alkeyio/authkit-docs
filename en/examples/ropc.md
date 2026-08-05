# Resource Owner Password Credentials

::: warning
ROPC is intended for tightly-controlled, first-party clients only — legacy migrations, internal CLI tools — not as a general-purpose login flow. See [OAuth 2.0 Flows](/en/concepts/oauth2-flows) for why.
:::

```go
import (
    "github.com/alkeyio/authkit"
    "github.com/alkeyio/authkit/rfc6749/ropc"
)

flow, _ := ropc.Must(
    ropc.NewConfig().
        SetClientManager(clientMgr).
        SetUserManager(userMgr).
        SetTokenManager(tokenMgr),
)

srv := authkit.NewServer()
srv.RegisterGrant(flow)
```

Handle it at `/token` like any other grant — the request's `grant_type=password` field is what routes it to this flow internally:

```go
mux.HandleFunc("POST /token", func(w http.ResponseWriter, r *http.Request) {
    srv.CreateTokenResponse(r, w)
})
```

## What each piece is doing

- `userMgr` implements the `UserManager` interface — it's responsible for verifying the submitted username and password against your user store. See [Models](/en/api/models).
- No `AuthCodeManager` is needed: there's no redirect or authorization code in this grant.

## Related

- [API Reference: ROPC](/en/api/ropc)
- [Authorization Code + PKCE + OIDC](/en/examples/authorization-code-pkce-oidc) — the preferred alternative wherever a browser is available.
