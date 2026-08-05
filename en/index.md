---
layout: home

hero:
  name: AuthKit
  text: "Native OAuth 2.0 and OpenID Connect for Go."
  tagline: A modular authorization server library for Go. Bring only the grants and extensions you need — no full identity platform required.
  actions:
    - theme: brand
      text: Get Started
      link: /en/docs/introduction
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
    details: Plug in your own storage. Implement a few simple interfaces and AuthKit works with any database you already use. A ready-made SQL implementation is included if you need a head start.
  - icon: ⚡
    title: Fails fast, not at runtime
    details: Must() validates required dependencies at construction time. A missing TokenManager is a startup error, not a 500 in production.
  - icon: 🛡️
    title: Spec coverage that keeps growing
    details: RFC 6749 grants, RFC 6750 bearer tokens, RFC 7636 PKCE, RFC 7662 introspection, RFC 9068 JWT access tokens, and OIDC ID tokens — with Device Authorization Grant and Token Revocation on the roadmap.
---

