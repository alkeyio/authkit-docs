# Config + Flow Pattern

Every grant flow and endpoint in AuthKit is constructed the same way, regardless of which RFC it implements:

```go
cfg := somegrant.NewConfig().
    SetClientManager(clientMgr).
    SetTokenManager(tokenMgr).
    RegisterExtension(someExtension)

flow, err := somegrant.Must(cfg)
```

## Why a separate Config type

Splitting configuration from the flow itself gives AuthKit a place to validate before anything runs. `Config` accumulates dependencies (`SetClientManager`, `SetTokenManager`, extensions) with a fluent, chainable API. Nothing is checked until you call `Must()` (or `New()`, where you'd rather handle the error yourself) — at which point AuthKit verifies every required manager was set and every extension is compatible with the flow.

## Why `Must()`

`Must()` follows the same convention as `regexp.MustCompile` or `template.Must` in the Go standard library: it panics on invalid configuration instead of returning an error. The intent is that a misconfigured flow — a `TokenManager` you forgot to set — is a **programming error**, not a runtime condition your handler needs to recover from. You want to find out when your program starts, in a log line, not the first time a real user hits `/token` and gets a 500.

If you need to construct a flow conditionally, or you're building something like a plugin system where a bad config genuinely is recoverable, use the non-panicking constructor and check the error yourself:

```go
flow, err := somegrant.New(cfg)
if err != nil {
    // handle: log, retry with different config, exit cleanly, etc.
}
```

## Why this is consistent across grants

Because `authorization_code`, `ropc`, `client_credentials`, and `rfc7662` (introspection) all follow the identical `NewConfig()` → set dependencies → `Must()` shape, once you've wired up one flow, reading (or writing) any other flow's setup code requires no new mental model — only the specific managers and extensions differ. Compare:

```go
// Authorization Code
flow, _ := authorizationcode.Must(
    authorizationcode.NewConfig().
        SetClientManager(clientMgr).
        SetAuthCodeManager(authCodeMgr).
        SetTokenManager(tokenMgr),
)

// Client Credentials
flow, _ := clientcredentials.Must(
    clientcredentials.NewConfig().
        SetClientManager(clientMgr).
        SetTokenManager(tokenMgr),
)
```

Same pattern, fewer managers, because Client Credentials has no user and no authorization code step.

## Where this fits

- [Extension System](/concepts/extensions) covers what you register onto a `Config` beyond managers.
- [Models](/api/models) is the reference for what each `Set*Manager` call expects.
