# Resource Owner Password Credentials

<span class="rfc-badge">RFC 6749 §4.3</span> · package `rfc6749/ropc`

Implements the Resource Owner Password Credentials (ROPC) grant. See [OAuth 2.0 Flows](/concepts/oauth2-flows#resource-owner-password-credentials-rfc-6749-4-3) for when (and whether) to use this grant — it's intended for tightly-controlled, first-party clients only.

## Construction

```go
import "github.com/alkeyio/authkit/rfc6749/ropc"

flow, err := ropc.Must(
    ropc.NewConfig().
        SetClientManager(clientMgr).
        SetUserManager(userMgr).
        SetTokenManager(tokenMgr),
)
```

## Required dependencies

| Setter | Manager interface | Purpose |
| --- | --- | --- |
| `SetClientManager` | `ClientManager` | Authenticate the requesting client. |
| `SetUserManager` | `UserManager` | Verify the submitted username/password against your user store. |
| `SetTokenManager` | `TokenManager` | Issue and persist access/refresh tokens. |

See [Models](/api/models) for the full interface definitions.

## Registering with a server

```go
srv := authkit.NewServer()
srv.RegisterGrant(flow)
```

## See also

- [Client Credentials](/api/client-credentials) — for machine-to-machine calls with no user.
- [Authorization Code](/api/authorization-code) — the preferred grant for anything with a browser available.
