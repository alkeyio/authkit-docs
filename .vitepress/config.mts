import { defineConfig } from 'vitepress'

const enNav = [
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
]

const viNav = [
  { text: 'Hướng dẫn', link: '/vi/guide/introduction' },
  { text: 'Khái niệm', link: '/vi/concepts/oauth2-flows' },
  { text: 'API Reference', link: '/vi/api/server' },
  { text: 'Ví dụ', link: '/vi/examples/authorization-code-pkce-oidc' },
  {
    text: 'v0.x',
    items: [
      { text: 'Changelog', link: 'https://github.com/alkeyio/authkit/releases' },
      { text: 'Roadmap', link: 'https://github.com/alkeyio/authkit/issues' },
    ],
  },
]

const enSidebar = {
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
}

const viSidebar = {
  '/vi/guide/': [
    {
      text: 'Hướng dẫn',
      items: [
        { text: 'Giới thiệu', link: '/vi/guide/introduction' },
        { text: 'Bắt đầu', link: '/vi/guide/getting-started' },
        { text: 'Kiến trúc', link: '/vi/guide/architecture' },
      ],
    },
  ],
  '/vi/concepts/': [
    {
      text: 'Khái niệm',
      items: [
        { text: 'OAuth 2.0 Flows', link: '/vi/concepts/oauth2-flows' },
        { text: 'Config + Flow Pattern', link: '/vi/concepts/config-flow-pattern' },
        { text: 'Extension System', link: '/vi/concepts/extensions' },
        { text: 'PKCE', link: '/vi/concepts/pkce' },
        { text: 'OpenID Connect', link: '/vi/concepts/oidc' },
      ],
    },
  ],
  '/vi/api/': [
    {
      text: 'Core',
      items: [
        { text: 'Server', link: '/vi/api/server' },
        { text: 'Models', link: '/vi/api/models' },
      ],
    },
    {
      text: 'RFC 6749 — Core Grants',
      items: [
        { text: 'Authorization Code', link: '/vi/api/authorization-code' },
        { text: 'Resource Owner Password Credentials', link: '/vi/api/ropc' },
        { text: 'Client Credentials', link: '/vi/api/client-credentials' },
        { text: 'Client Authentication', link: '/vi/api/client-authentication' },
      ],
    },
    {
      text: 'Extensions & Related RFCs',
      items: [
        { text: 'RFC 6750 — Bearer Token', link: '/vi/api/bearer-token' },
        { text: 'RFC 7636 — PKCE', link: '/vi/api/pkce' },
        { text: 'RFC 7662 — Token Introspection', link: '/vi/api/introspection' },
        { text: 'RFC 9068 — JWT Access Tokens', link: '/vi/api/jwt-access-tokens' },
        { text: 'OIDC — ID Tokens', link: '/vi/api/oidc' },
      ],
    },
  ],
  '/vi/examples/': [
    {
      text: 'Ví dụ',
      items: [
        { text: 'Authorization Code + PKCE + OIDC', link: '/vi/examples/authorization-code-pkce-oidc' },
        { text: 'Resource Owner Password Credentials', link: '/vi/examples/ropc' },
        { text: 'Client Credentials', link: '/vi/examples/client-credentials' },
        { text: 'JWT Access Tokens', link: '/vi/examples/jwt-access-tokens' },
        { text: 'Token Introspection', link: '/vi/examples/introspection' },
        { text: 'Custom Error Handler', link: '/vi/examples/custom-error-handler' },
      ],
    },
  ],
}

export default defineConfig({
  base: '/',
  title: 'AuthKit',
  description: 'A modular OAuth 2.0 / OpenID Connect server library for Go, structured around RFC-named packages.',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#111111' }],
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
    },
    vi: {
      label: 'Tiếng Việt',
      lang: 'vi-VN',
      themeConfig: {
        nav: viNav,
        sidebar: viSidebar,
        editLink: {
          pattern: 'https://github.com/alkeyio/authkit-docs/edit/main/:path',
          text: 'Chỉnh sửa trang này trên GitHub',
        },
        footer: {
          message: 'Phát hành theo giấy phép BSD-3-Clause.',
          copyright: 'Bản quyền © 2026-present alkey.io',
        },
      },
    },
  },

  themeConfig: {
    logo: { light: '/logo-light.svg', dark: '/logo.svg' },
    siteTitle: false,

    nav: enNav,
    sidebar: enSidebar,

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
      copyright: 'Copyright © 2026-present alkey.io',
    },
  },
})
