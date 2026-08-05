# PKCE (Proof Key for Code Exchange)

PKCE, defined in RFC 7636, closes a gap in the Authorization Code Grant for clients that can't hold a secret — single-page apps, mobile and native apps, anything running on a device you don't control. Without it, an attacker who intercepts the authorization `code` (via a malicious app registered on the same custom URL scheme, for instance) can redeem it for tokens themselves.

## How it works

1. Before redirecting to `/authorize`, the client generates a random `code_verifier` and derives a `code_challenge` from it (either the verifier itself, `plain`, or its SHA-256 hash, `S256`).
2. The client sends `code_challenge` and `code_challenge_method` on the `/authorize` request. The authorization server stores them alongside the issued code.
3. When redeeming the code at `/token`, the client sends the original `code_verifier`. The server re-derives the challenge from it and checks it matches what was stored.

An attacker who only intercepts the `code` from the redirect can't complete step 3 without the `code_verifier`, which never left the original client.

## PKCE in AuthKit

PKCE is implemented as an extension (`rfc7636`) rather than being hard-wired into the Authorization Code flow — see [Extension System](/vi/concepts/extensions) for why. It implements `AuthorizationRequestValidator` (to require and store the challenge) and `TokenRequestValidator` (to verify the verifier at redemption).

```go
pkce := rfc7636.New(
    rfc7636.NewOptions().SetAllowPlain(false),
)

flow, _ := authorizationcode.Must(
    authorizationcode.NewConfig().
        SetClientManager(clientMgr).
        SetAuthCodeManager(authCodeMgr).
        SetTokenManager(tokenMgr).
        RegisterExtension(pkce),
)
```

## `plain` vs `S256`

RFC 7636 allows both the `plain` method (challenge equals verifier) and `S256` (challenge is the SHA-256 hash of the verifier). AuthKit accepts both by default. `plain` exists mostly for constrained clients that can't compute SHA-256, and offers weaker protection since the challenge and verifier are identical — anyone who observes the `/authorize` request sees the value they'd need at `/token`.

**RFC 9700** (OAuth 2.0 Security Best Current Practice) recommends requiring `S256` and rejecting `plain` outright. To do that in AuthKit:

```go
pkce := rfc7636.New(
    rfc7636.NewOptions().SetAllowPlain(false),
)
```

Unless you have a specific client that genuinely cannot compute SHA-256, set `AllowPlain(false)`.

## Should confidential clients use PKCE too?

RFC 9700 recommends PKCE for **all** Authorization Code clients, not only public ones — it protects against authorization code injection regardless of whether the client can also authenticate with a secret. There's no reason to register the extension conditionally based on client type; register it once for the flow and let every client go through it.

## See also

- [OpenID Connect](/vi/concepts/oidc) — PKCE and OIDC are commonly registered together on the same flow.
- [RFC 7636 API Reference](/vi/api/pkce) — package-level type reference.
