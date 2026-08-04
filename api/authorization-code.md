# Authorization Code Grant

<span class="rfc-badge">RFC 6749 §4.1</span> · package `rfc6749/authorization_code`

Implements the Authorization Code Grant. See [OAuth 2.0 Flows](/concepts/oauth2-flows) for how this grant works conceptually, and [Config + Flow Pattern](/concepts/config-flow-pattern) for the general construction shape used here.

## Construction

```go
import authorizationcode "github.com/alkeyio/authkit/rfc6749/authorization_code"

cfg := authorizationcode.NewConfig().
    SetClientManager(clientMgr).
    SetAuthCodeManager(authCodeMgr).
    SetTokenManager(tokenMgr)

flow, err := authorizationcode.Must(cfg)
```

## Required dependencies

| Setter | Manager interface | Purpose |
| --- | --- | --- |
| `SetClientManager` | `ClientManager` | Look up registered clients and their redirect URIs. |
| `SetAuthCodeManager` | `AuthCodeManager` | Persist and redeem issued authorization codes. |
| `SetTokenManager` | `TokenManager` | Issue and persist access/refresh tokens. |

See [Models](/api/models) for the full interface definitions.

## Extensions

Register any combination of extensions that implement the relevant interfaces (see [Extension System](/concepts/extensions)):

```go
cfg.RegisterExtension(pkce) // github.com/alkeyio/authkit/rfc7636
cfg.RegisterExtension(oidc) // github.com/alkeyio/authkit/oidc/core/authorization_code
```

Most deployments register both — see the [full example](/examples/authorization-code-pkce-oidc).

## Registering with a server

```go
srv := authkit.NewServer()
srv.RegisterGrant(flow)
```

This makes the flow available through `srv.CreateAuthorizationResponse`, `srv.CreateConsentResponse`, and `srv.CreateTokenResponse`. See [Server](/api/server).
