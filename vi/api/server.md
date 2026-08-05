# Server

<span class="rfc-badge">package authkit</span>

`Server` is the central dispatcher of an AuthKit deployment. Register grant flows and endpoints against it before serving traffic, then call its handler methods from your HTTP routes.

## Constructing

```go
srv := authkit.NewServer()
```

## Registration

### `RegisterGrant(flow)`

Registers a grant flow (Authorization Code, ROPC, Client Credentials, ...) with the server, making it available at the `/authorize` and/or `/token` handler methods below.

```go
srv.RegisterGrant(authCodeFlow)
srv.RegisterGrant(ropcFlow)
```

### `RegisterEndpoint(flow)`

Registers a non-grant endpoint — currently Token Introspection (`rfc7662`) — identified by name for dispatch via `EndpointResponse`.

```go
srv.RegisterEndpoint(introspectionFlow)
```

### `RegisterErrorHandler(fn)`

Registers a callback invoked whenever a handler method encounters an error, for custom logging or response formatting.

```go
srv.RegisterErrorHandler(func(r *http.Request, w http.ResponseWriter, err error) error {
    // custom logging, formatting, etc.
    return nil
})
```

## Combined handler methods

These validate a request and write the appropriate HTTP response in one call — the usual entry point from your route handlers.

| Method | Route | Purpose |
| --- | --- | --- |
| `CreateAuthorizationResponse(r, w, user)` | `GET /authorize` | Validates the authorization request and redirects with a code (or renders/errors as appropriate). |
| `CreateConsentResponse(r, w, user)` | `POST /authorize` | Handles the consent step of the authorization request. |
| `CreateTokenResponse(r, w)` | `POST /token` | Validates the token request and writes the token response. |
| `EndpointResponse(r, w, name)` | e.g. `POST /introspect` | Dispatches to a registered endpoint flow by name. |

```go
srv.CreateAuthorizationResponse(r, w, user)  // GET  /authorize
srv.CreateConsentResponse(r, w, user)         // POST /authorize (consent step)
srv.CreateTokenResponse(r, w)                 // POST /token
srv.EndpointResponse(r, w, "introspection")   // POST /introspect
```

## Split validate/respond methods

For finer control — for example, rendering a custom consent screen after validation but before committing a response — use the split methods to inspect a request before responding:

| Method | Returns |
| --- | --- |
| `ValidateAuthorizationRequest(r, user)` | `(grant, req, err)` |
| `ValidateConsentRequest(r, user)` | `(grant, req, err)` |
| `ValidateTokenRequest(r)` | `(grant, req, err)` |

```go
grant, req, err := srv.ValidateAuthorizationRequest(r, user)
grant, req, err := srv.ValidateConsentRequest(r, user)
grant, req, err := srv.ValidateTokenRequest(r)
```

## See also

- [Guide: Getting Started](/vi/docs/installation)
- [Guide: Architecture](/vi/docs/architecture)
