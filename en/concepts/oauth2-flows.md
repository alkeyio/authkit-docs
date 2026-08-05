# OAuth 2.0 Flows

AuthKit implements four grant types from RFC 6749, plus the extensions and adjacent RFCs that make them production-ready. This page is a conceptual refresher; see [API Reference](/en/api/authorization-code) for the exact Go types.

## Authorization Code Grant (RFC 6749 §4.1)

The flow for anything with a browser in front of a user: web apps, native apps via a system browser, single-page apps. The client redirects the user to `/authorize`, the user authenticates and consents, and the authorization server redirects back with a short-lived `code`. The client exchanges that code for tokens at `/token` — server-to-server, so the code never touches the browser's token storage.

```
User          Client              Auth Server
 │               │                     │
 │──login──────► │                     │
 │               │──GET /authorize────►│
 │◄──────────────────consent screen────│
 │──approve────────────────────────────►│
 │               │◄──redirect w/ code──│
 │               │──POST /token───────►│
 │               │◄──access + refresh──│
```

In AuthKit, this is `rfc6749/authorization_code`. It is almost always paired with [PKCE](/en/concepts/pkce) and, if you need identity rather than just authorization, [OIDC](/en/concepts/oidc).

## Resource Owner Password Credentials (RFC 6749 §4.3)

The client collects the user's username and password directly and exchanges them for a token at `/token` — no redirect, no browser involved. RFC 6749 itself and later guidance (RFC 9700) discourage ROPC for anything but tightly-controlled first-party clients, since it trains users to hand credentials to arbitrary apps and gives the client full custody of the password. AuthKit implements it (`rfc6749/ropc`) for the cases where that trade-off is deliberate — legacy migrations, CLI tools you control end to end — not as a default recommendation.

## Client Credentials Grant (RFC 6749 §4.4)

No user in the loop at all: a service authenticates as itself and gets a token representing its own identity, typically to call another service. This is the grant for machine-to-machine traffic — a backend job, a cron task, one microservice calling another. AuthKit implements it as `rfc6749/client_credentials`.

## Client authentication (RFC 6749 §2.3)

Every grant that involves a confidential client needs a way for that client to prove who it is at `/token`. AuthKit's `rfc6749/client_authentication` package covers `client_secret_basic`, `client_secret_post`, and `none` (for public clients, where PKCE carries the proof burden instead).

## Choosing a flow

| Situation                                            | Grant                  |
| ------------------------------------------------------ | ------------------------ |
| Web, mobile, or SPA app acting on behalf of a user      | Authorization Code + PKCE |
| Same, and you also need the user's identity (name, email) | Authorization Code + PKCE + OIDC |
| Legacy first-party client migrating off password auth   | ROPC (transitional only) |
| Service-to-service call with no user present            | Client Credentials      |

## Beyond the grant: tokens and validation

Issuing a token is only half the protocol. AuthKit separately covers:

- [RFC 6750](/en/api/bearer-token) — how bearer tokens are formatted and presented.
- [RFC 9068](/en/api/jwt-access-tokens) — issuing access tokens as JWTs instead of opaque strings.
- [RFC 7662](/en/api/introspection) — letting a resource server ask the authorization server whether a token is still valid.
