---
layout: home

hero:
  name: AuthKit
  text: OAuth 2.0 / OIDC, RFC by RFC.
  tagline: A modular authorization server library for Go. Bring only the grants and extensions you need — no full identity platform required.
  image:
    src: /logo.svg
    alt: AuthKit
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Why AuthKit
      link: /guide/introduction
    - theme: alt
      text: View on GitHub
      link: https://github.com/alkeyio/authkit

features:
  - icon: 📦
    title: RFC-scoped packages, not a monolith
    details: rfc6749, rfc7636, rfc7662, and rfc9068 each implement one spec and import independently. Get PKCE validation without a full OP/RP object graph.
  - icon: 🧩
    title: Config + Flow pattern
    details: Every grant is built the same way — NewConfig() → set dependencies → Must(). Learn one flow, you've learned them all.
  - icon: 🔌
    title: Extensions, not inheritance
    details: PKCE and OIDC ID Token issuance are plain extension interfaces registered onto a base flow — not subclassed or forked implementations.
  - icon: 🗄️
    title: You own storage
    details: AuthKit defines the manager interfaces (ClientManager, AuthCodeManager, TokenManager...); implement them against whatever you already use. A reference SQL implementation ships in integrations/sql.
  - icon: ⚡
    title: Fails fast, not at runtime
    details: Must() validates required dependencies at construction time. A missing TokenManager is a startup error, not a 500 in production.
  - icon: 🛡️
    title: Spec coverage that keeps growing
    details: RFC 6749 grants, RFC 6750 bearer tokens, RFC 7636 PKCE, RFC 7662 introspection, RFC 9068 JWT access tokens, and OIDC ID tokens — with Device Authorization Grant and Token Revocation on the roadmap.
---

<div class="ak-quickstart">

## At a glance

```go
srv := authkit.NewServer()
srv.RegisterGrant(authCodeFlow)
srv.RegisterEndpoint(introspectionFlow)

srv.CreateAuthorizationResponse(r, w, user)  // GET  /authorize
srv.CreateTokenResponse(r, w)                // POST /token
```

```bash
go get github.com/alkeyio/authkit
```

Requires **Go 1.23+**. See the [Getting Started](/guide/getting-started) guide to wire up your first Authorization Code + PKCE + OIDC flow.

</div>

<style>
.ak-quickstart {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 24px 64px;
}
.ak-quickstart h2 {
  border-top: none;
}
</style>
