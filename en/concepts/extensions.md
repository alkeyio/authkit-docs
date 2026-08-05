# Extension System

AuthKit's grant flows are intentionally minimal — an Authorization Code flow, on its own, does exactly what RFC 6749 §4.1 requires and nothing more. PKCE, OIDC ID Tokens, custom claims, audience restriction, rate limiting — anything beyond the base spec is added through **extensions**, not by subclassing or forking the flow.

## The interfaces

An extension is any type that implements one or more of these interfaces. A single object can implement several and be registered once.

| Interface                       | Called when                          |
| -------------------------------- | -------------------------------------- |
| `AuthorizationRequestValidator`  | Validating the `/authorize` request    |
| `ConsentRequestValidator`        | Validating the consent step            |
| `AuthCodeProcessor`              | Before saving the authorization code   |
| `TokenRequestValidator`          | Validating the `/token` request        |
| `TokenProcessor`                 | Before writing the token response      |

Extensions run in **registration order**, so if two extensions both touch the token response, the order you call `RegisterExtension` in is the order they execute.

## Built-in extensions

AuthKit ships two extensions for the Authorization Code flow, and both are ordinary implementations of the table above — there's no special-casing for "official" extensions versus your own:

- **PKCE** (`rfc7636`) implements `AuthorizationRequestValidator` and `TokenRequestValidator` to enforce the code challenge/verifier dance.
- **OIDC ID Token** (`oidc/core/authorization_code`) implements `TokenProcessor` to attach an `id_token` to the token response.

```go
pkce := rfc7636.New(rfc7636.NewOptions().SetAllowPlain(false))
oidc, _ := oidcflow.Must(oidcflow.NewConfig().SetIssuer("https://auth.example.com") /* ... */)

cfg.RegisterExtension(pkce)
cfg.RegisterExtension(oidc)
```

## Writing your own extension

Because the interfaces are small and single-purpose, most custom behavior is a short struct plus one or two methods. A few motivating examples:

**Custom claims on the ID token or access token** — implement `TokenProcessor`, look up whatever claims your resource servers need (roles, tenant ID, feature flags), and attach them before the response is written.

**Audience restriction** — implement `TokenRequestValidator` to reject a token request if the requested `resource` or `scope` doesn't match what the authenticated client is allowed to ask for.

**Rate limiting** — implement `AuthorizationRequestValidator` and `TokenRequestValidator` on the same struct, backed by whatever limiter you already run, and reject requests that exceed it before AuthKit does any further work.

The shape is always the same: implement the interface(s) for the point in the request lifecycle you care about, then `RegisterExtension` it alongside PKCE and OIDC. AuthKit doesn't distinguish between "built-in" and "custom" extensions at the type level — `rfc7636.New(...)` and your rate limiter are both just values that satisfy an interface.

## See also

- [PKCE](/en/concepts/pkce) — what the built-in PKCE extension actually validates.
- [OpenID Connect](/en/concepts/oidc) — what the OIDC extension adds to a token response.
- [Architecture](/en/docs/architecture) — how extensions fit between `Config` and `Server`.
