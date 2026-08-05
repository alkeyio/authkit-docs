# Custom Error Handler

Register a callback to hook into whatever your handler methods encounter — for structured logging, custom error response formatting, or forwarding to an observability pipeline.

```go
srv.RegisterErrorHandler(func(r *http.Request, w http.ResponseWriter, err error) error {
    // custom logging, formatting, etc.
    return nil
})
```

This runs whenever a call like `srv.CreateTokenResponse` or `srv.CreateAuthorizationResponse` encounters an error — invalid client, expired code, failed PKCE verification, and so on — giving you one place to centralize error observability across every grant and endpoint you've registered, rather than wrapping each HTTP handler individually.

## Related

- [Server API Reference](/en/api/server)
