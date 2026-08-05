# Token Introspection

<span class="rfc-badge">RFC 7662</span> · package `rfc7662`

Implements Token Introspection — an endpoint a resource server calls to ask the authorization server whether a token is currently valid, and to retrieve its metadata (scope, expiry, subject).

## Construction

```go
import "github.com/alkeyio/authkit/rfc7662"

introspection, err := rfc7662.MustTokenIntrospectionFlow(
    rfc7662.NewConfig().
        SetClientManager(clientMgr).
        SetTokenManager(tokenMgr),
)
```

## Required dependencies

| Setter | Manager interface | Purpose |
| --- | --- | --- |
| `SetClientManager` | `ClientManager` | Authenticate the caller of the introspection endpoint. |
| `SetTokenManager` | `TokenManager` | Look up the token being introspected. |

## Registering as an endpoint

Unlike grant flows, introspection is registered with `RegisterEndpoint` and dispatched by name:

```go
srv.RegisterEndpoint(introspection)

// Handle: POST /introspect
srv.EndpointResponse(r, w, "introspection")
```

## When to use this

Introspection matters most when access tokens are opaque (see [Bearer Token](/api/bearer-token)) — a resource server can't decode an opaque token itself, so it asks the authorization server. If you issue [JWT access tokens](/api/jwt-access-tokens) instead, resource servers can typically verify tokens locally via signature and skip the introspection round-trip, at the cost of not being able to immediately revoke a token before it expires.

## See also

- [JWT Access Tokens](/api/jwt-access-tokens) — the self-verifying alternative.
- [Custom Error Handler example](/examples/custom-error-handler).
