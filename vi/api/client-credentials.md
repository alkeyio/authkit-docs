# Client Credentials Grant

<span class="rfc-badge">RFC 6749 §4.4</span> · package `rfc6749/client_credentials`

Implements the Client Credentials Grant, for service-to-service calls where no end user is present. See [OAuth 2.0 Flows](/concepts/oauth2-flows#client-credentials-grant-rfc-6749-4-4).

## Construction

```go
import clientcredentials "github.com/alkeyio/authkit/rfc6749/client_credentials"

flow, err := clientcredentials.Must(
    clientcredentials.NewConfig().
        SetClientManager(clientMgr).
        SetTokenManager(tokenMgr),
)
```

## Required dependencies

| Setter | Manager interface | Purpose |
| --- | --- | --- |
| `SetClientManager` | `ClientManager` | Authenticate the requesting client. |
| `SetTokenManager` | `TokenManager` | Issue and persist access tokens. |

No `AuthCodeManager` or `UserManager` is needed — there is no authorization code step and no user to authenticate.

## Registering with a server

```go
srv := authkit.NewServer()
srv.RegisterGrant(flow)
```

## See also

- [Resource Owner Password Credentials](/api/ropc)
- [JWT Access Tokens](/api/jwt-access-tokens) — commonly paired with Client Credentials for service identity that downstream APIs can verify without a call back to the auth server.
