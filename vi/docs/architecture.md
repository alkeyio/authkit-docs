# Architecture

AuthKit has three layers that compose upward: **managers** (your storage), **flows** (one per grant or endpoint), and the **server** (the dispatcher your HTTP handlers call into).

```
┌─────────────────────────────────────────────┐
│                   Server                     │
│   RegisterGrant · RegisterEndpoint           │
│   CreateAuthorizationResponse / TokenResponse│
└───────────────┬───────────────────┬─────────┘
                │                   │
        ┌───────▼──────┐    ┌───────▼────────┐
        │  Grant Flow   │    │    Endpoint     │
        │ (e.g. auth    │    │ (e.g. token     │
        │  code, ropc)  │    │  introspection) │
        └───────┬──────┘    └───────┬────────┘
                │                   │
        ┌───────▼───────────────────▼────────┐
        │            Extensions               │
        │   PKCE · OIDC ID Token · (yours)    │
        └───────┬─────────────────────────────┘
                │
        ┌───────▼──────────────────────────────┐
        │          Manager interfaces           │
        │  ClientManager · TokenManager · ...   │
        │        (implemented by you)           │
        └────────────────────────────────────────┘
```

## Server

`Server` is the central dispatcher. Register grant flows and endpoints before use, then call its handler methods from your HTTP routes.

```go
srv := authkit.NewServer()
srv.RegisterGrant(authCodeFlow)
srv.RegisterGrant(ropcFlow)
srv.RegisterEndpoint(introspectionFlow)

// In your HTTP handlers:
srv.CreateAuthorizationResponse(r, w, user)  // GET  /authorize
srv.CreateConsentResponse(r, w, user)         // POST /authorize (consent step)
srv.CreateTokenResponse(r, w)                 // POST /token
srv.EndpointResponse(r, w, "introspection")   // POST /introspect
```

For finer control, use the split validate/respond methods to inspect a request before committing a response:

```go
grant, req, err := srv.ValidateAuthorizationRequest(r, user)
grant, req, err := srv.ValidateConsentRequest(r, user)
grant, req, err := srv.ValidateTokenRequest(r)
```

## Grant Flow pattern

Every flow follows the same `Config` + `Flow` pattern:

```go
// 1. Build config
cfg := authorizationcode.NewConfig().
    SetClientManager(myClientManager).
    SetAuthCodeManager(myAuthCodeManager).
    SetTokenManager(myTokenManager)

// 2. Register optional extensions (PKCE, OIDC, etc.)
cfg.RegisterExtension(pkceFlow)
cfg.RegisterExtension(oidcFlow)

// 3. Instantiate — validates config, fails fast on missing dependencies
flow, err := authorizationcode.Must(cfg)

// 4. Register with server
srv.RegisterGrant(flow)
```

This same shape applies to `ropc`, `client_credentials`, `rfc7662` (introspection), and every other flow — learn it once. See [Config + Flow Pattern](/concepts/config-flow-pattern) for the reasoning behind it.

## Extension system

A single object can implement multiple extension interfaces and be registered once via `RegisterExtension`. Extensions are called in registration order.

| Interface                       | Called when                          |
| -------------------------------- | -------------------------------------- |
| `AuthorizationRequestValidator`  | Validating `/authorize` request       |
| `ConsentRequestValidator`        | Validating the consent step           |
| `AuthCodeProcessor`              | Before saving the authorization code  |
| `TokenRequestValidator`          | Validating `/token` request           |
| `TokenProcessor`                 | Before writing the token response     |

PKCE (`rfc7636`) and OIDC (`oidc/core/authorization_code`) are implemented as extensions and plug into the Authorization Code flow via `RegisterExtension` — a useful pattern to follow if you need to add custom claims, audience restriction, or rate limiting at the same integration points. See [Extension System](/concepts/extensions).

## Models

Implement the interfaces in the `models` package with your own data layer. See [Models](/api/models) for the full interface reference and `integrations/sql/` for example SQL-backed implementations.
