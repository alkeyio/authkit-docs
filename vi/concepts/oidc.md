# OpenID Connect

OAuth 2.0 answers "is this client allowed to access this resource" — it has no built-in concept of *who the user is*. OpenID Connect (OIDC) is a thin identity layer on top of OAuth 2.0 that adds exactly that: an **ID Token**, a signed JWT asserting who authenticated and when.

## OAuth 2.0 vs OIDC, concretely

| | OAuth 2.0 alone | + OIDC |
| --- | --- | --- |
| Token issued | Access token (opaque or JWT) | Access token **+ ID Token** |
| What it proves | The bearer may call the API | The specified user authenticated at this time |
| Typical consumer | Resource server | The client application itself |
| Contains user identity claims (`sub`, `name`, `email`...) | No | Yes, in the ID Token |

If your client only ever calls your own API on the user's behalf, plain OAuth 2.0 is enough. If the client itself needs to know *who is logged in* — to render a name, gate a UI, or establish a session — you need the ID Token OIDC adds.

## OIDC in AuthKit

AuthKit implements the OIDC Authorization Code flow's ID Token issuance as an extension (`oidc/core/authorization_code`) on top of the base Authorization Code grant, following the same pattern as [PKCE](/vi/concepts/pkce) — see [Extension System](/vi/concepts/extensions).

```go
oidc, _ := oidcflow.Must(
    oidcflow.NewConfig().
        SetIssuer("https://auth.example.com").
        SetSigningKey(privateKey, jwt.SigningMethodRS256, "key-1"),
)

flow, _ := authorizationcode.Must(
    authorizationcode.NewConfig().
        SetClientManager(clientMgr).
        SetAuthCodeManager(authCodeMgr).
        SetTokenManager(tokenMgr).
        RegisterExtension(oidc),
)
```

The extension implements `TokenProcessor`: after the base flow validates the token request and prepares the access token, the OIDC extension attaches a signed `id_token` to the same response.

## Issuer and signing keys

`SetIssuer` sets the `iss` claim every ID Token will carry — it should be the canonical URL of your authorization server, matching what clients expect during token validation. `SetSigningKey` takes a private key, a signing method (e.g. `jwt.SigningMethodRS256`), and a key ID (`kid`) so clients can pick the right key out of your JWKS if you rotate keys over time.

## Requesting an ID Token

A client asks for OIDC behavior by including the `openid` scope in its `/authorize` request, per the OIDC Core spec — AuthKit's extension follows this convention rather than issuing an ID Token unconditionally for every Authorization Code request.

## See also

- [PKCE](/vi/concepts/pkce) — almost always registered alongside OIDC on the same flow.
- [Authorization Code + PKCE + OIDC example](/vi/examples/authorization-code-pkce-oidc) — full runnable setup.
