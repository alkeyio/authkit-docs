# Token Introspection

Lets a resource server ask the authorization server whether a token is still valid — the usual companion to opaque bearer tokens.

```go
import "github.com/alkeyio/authkit/rfc7662"

introspection, _ := rfc7662.MustTokenIntrospectionFlow(
    rfc7662.NewConfig().
        SetClientManager(clientMgr).
        SetTokenManager(tokenMgr),
)

srv.RegisterEndpoint(introspection)
```

```go
mux.HandleFunc("POST /introspect", func(w http.ResponseWriter, r *http.Request) {
    srv.EndpointResponse(r, w, "introspection")
})
```

## Who calls this

Resource servers, not end-user clients. A resource server that receives a bearer token on an incoming request calls `/introspect` (authenticating itself via the same `ClientManager` mechanism as any other client) to learn whether the token is active and what scope/subject it carries, before honoring the request.

## Related

- [API Reference: Token Introspection](/vi/api/introspection)
- [JWT Access Tokens example](/vi/examples/jwt-access-tokens) — an alternative that avoids the introspection round-trip.
