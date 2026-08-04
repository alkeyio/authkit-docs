# Getting Started

This page walks through installing AuthKit and standing up an Authorization Code flow with PKCE and OIDC — the combination most first-time integrations reach for.

## Requirements

- Go 1.23+

## Installation

```bash
go get github.com/alkeyio/authkit
```

## 1. Implement the manager interfaces

AuthKit does not persist anything for you. Every flow depends on one or more manager interfaces defined in the [`models`](/api/models) package — `ClientManager`, `AuthCodeManager`, `TokenManager`, and so on. Implement them against whatever storage you already use (Postgres, Redis, in-memory for a prototype). A reference SQL implementation ships in `integrations/sql` if you want a starting point to read or fork.

```go
type ClientManager interface {
    GetByID(ctx context.Context, clientID string) (*models.Client, error)
    // ...
}
```

## 2. Build a grant flow

Every flow follows the same `Config` + `Flow` pattern: construct a config, set your managers on it, register any extensions, then call `Must()` to get a validated flow.

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
```

`Must()` fails fast: if a required dependency (like `TokenManager`) is missing, your program panics at startup rather than serving a broken `/token` endpoint in production. If you'd rather handle the error yourself, use the equivalent `New()` constructor where available and check the returned error.

## 3. Register the flow with a server

```go
srv := authkit.NewServer()
srv.RegisterGrant(flow)
```

`Server` is the central dispatcher. Register every grant flow and endpoint you want to support before serving traffic.

## 4. Wire up your HTTP routes

```go
// In your HTTP handlers:
srv.CreateAuthorizationResponse(r, w, user)   // GET  /authorize
srv.CreateConsentResponse(r, w, user)         // POST /authorize (consent step)
srv.CreateTokenResponse(r, w)                 // POST /token
srv.EndpointResponse(r, w, "introspection")   // POST /introspect
```

For finer control — for example, to render a consent screen after validating a request but before committing a response — use the split validate/respond methods:

```go
grant, req, err := srv.ValidateAuthorizationRequest(r, user)
grant, req, err := srv.ValidateConsentRequest(r, user)
grant, req, err := srv.ValidateTokenRequest(r)
```

See [Server](/api/server) for the full method reference.

## 5. Handle errors

```go
srv.RegisterErrorHandler(func(r *http.Request, w http.ResponseWriter, err error) error {
    // custom logging, formatting, etc.
    return nil
})
```

## Next steps

- [Authorization Code + PKCE + OIDC example](/examples/authorization-code-pkce-oidc) — the full runnable version of what's above.
- [Extension System](/concepts/extensions) — how PKCE and OIDC plug into a base flow, and how to add your own extension (custom claims, audience restriction, rate limiting).
- [Models](/api/models) — the complete manager interface reference.

## Running the test suite

If you're contributing to AuthKit itself:

```bash
# All tests
go test ./...

# Specific package
go test ./rfc6749/authorization_code/...

# Single test
go test -run TestFunctionName ./path/to/package/...
```

Mocks are generated with [mockery](https://github.com/vektra/mockery); configuration lives in `.mockery.yaml`. Regenerate with:

```bash
mockery
```
