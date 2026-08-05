# Bearer Token

<span class="rfc-badge">RFC 6750</span> · package `rfc6750`

Implements Bearer Token issuance and presentation — opaque access tokens and refresh tokens, and how they're expected to travel in the `Authorization` header.

## Role in a flow

`rfc6750` provides the token *format* that grant flows (Authorization Code, ROPC, Client Credentials) issue by default. It defines how access and refresh tokens are structured and serialized in the `/token` response — the `token_type: "bearer"` field, `expires_in`, and the refresh token grant handling.

If you need access tokens to be self-contained JWTs that resource servers can verify without a call back to the authorization server, see [JWT Access Tokens](/vi/api/jwt-access-tokens) (RFC 9068) instead — the two are complementary: RFC 9068 defines the *token's internal structure*, RFC 6750 defines how it's *presented and typed* in the response.

## See also

- [Token Introspection](/vi/api/introspection) — how a resource server validates an opaque bearer token.
- [JWT Access Tokens](/vi/api/jwt-access-tokens) — a self-verifying alternative to opaque tokens.
