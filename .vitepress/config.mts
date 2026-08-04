import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/authkit-docs/',
  title: 'AuthKit',
  description: 'A modular OAuth 2.0 / OpenID Connect server library for Go, structured around RFC-named packages.',
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', href: '/authkit-docs/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#111111' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: false,

    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Concepts', link: '/concepts/oauth2-flows' },
      { text: 'API Reference', link: '/api/server' },
      { text: 'Examples', link: '/examples/authorization-code-pkce-oidc' },
      {
        text: 'v0.x',
        items: [
          { text: 'Changelog', link: 'https://github.com/alkeyio/authkit/releases' },
          { text: 'Roadmap', link: 'https://github.com/alkeyio/authkit/issues' },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Architecture', link: '/guide/architecture' },
          ],
        },
      ],
      '/concepts/': [
        {
          text: 'Concepts',
          items: [
            { text: 'OAuth 2.0 Flows', link: '/concepts/oauth2-flows' },
            { text: 'Config + Flow Pattern', link: '/concepts/config-flow-pattern' },
            { text: 'Extension System', link: '/concepts/extensions' },
            { text: 'PKCE', link: '/concepts/pkce' },
            { text: 'OpenID Connect', link: '/concepts/oidc' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'Core',
          items: [
            { text: 'Server', link: '/api/server' },
            { text: 'Models', link: '/api/models' },
          ],
        },
        {
          text: 'RFC 6749 — Core Grants',
          items: [
            { text: 'Authorization Code', link: '/api/authorization-code' },
            { text: 'Resource Owner Password Credentials', link: '/api/ropc' },
            { text: 'Client Credentials', link: '/api/client-credentials' },
            { text: 'Client Authentication', link: '/api/client-authentication' },
          ],
        },
        {
          text: 'Extensions & Related RFCs',
          items: [
            { text: 'RFC 6750 — Bearer Token', link: '/api/bearer-token' },
            { text: 'RFC 7636 — PKCE', link: '/api/pkce' },
            { text: 'RFC 7662 — Token Introspection', link: '/api/introspection' },
            { text: 'RFC 9068 — JWT Access Tokens', link: '/api/jwt-access-tokens' },
            { text: 'OIDC — ID Tokens', link: '/api/oidc' },
          ],
        },
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Authorization Code + PKCE + OIDC', link: '/examples/authorization-code-pkce-oidc' },
            { text: 'Resource Owner Password Credentials', link: '/examples/ropc' },
            { text: 'Client Credentials', link: '/examples/client-credentials' },
            { text: 'JWT Access Tokens', link: '/examples/jwt-access-tokens' },
            { text: 'Token Introspection', link: '/examples/introspection' },
            { text: 'Custom Error Handler', link: '/examples/custom-error-handler' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/alkeyio/authkit' },
    ],

    editLink: {
      pattern: 'https://github.com/alkeyio/authkit-docs/edit/main/:path',
      text: 'Edit this page on GitHub',
    },

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the BSD-3-Clause License.',
      copyright: 'Copyright © 2026-present alkeyio',
    },
  },
})
