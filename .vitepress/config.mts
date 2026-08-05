import { defineConfig } from 'vitepress'

const enNav = [
  { text: 'Docs', link: '/docs/introduction' },
  {
    text: 'v0.x',
    items: [
      { text: 'Changelog', link: 'https://github.com/alkeyio/authkit/releases' },
      { text: 'Roadmap', link: 'https://github.com/alkeyio/authkit/issues' },
    ],
  },
]

const viNav = [
  { text: 'Tài liệu', link: '/vi/docs/introduction' },
  {
    text: 'v0.x',
    items: [
      { text: 'Changelog', link: 'https://github.com/alkeyio/authkit/releases' },
      { text: 'Roadmap', link: 'https://github.com/alkeyio/authkit/issues' },
    ],
  },
]

const docsSidebar = [
  {
    text: 'Documentation',
    collapsed: true,
    items: [
      {
        text: 'Getting Started',
        collapsed: true,
        items: [
          { text: 'Introduction', link: '/docs/introduction' },
          { text: 'Installation', link: '/docs/installation' },
        ],
      },
      { text: 'Architecture', link: '/docs/architecture' },
    ],
  },
  {
    text: 'Core Concepts',
    collapsed: true,
    items: [
      { text: 'OAuth 2.0 Flows', link: '/concepts/oauth2-flows' },
      { text: 'Config + Flow Pattern', link: '/concepts/config-flow-pattern' },
      { text: 'Extension System', link: '/concepts/extensions' },
      { text: 'PKCE', link: '/concepts/pkce' },
      { text: 'OpenID Connect', link: '/concepts/oidc' },
    ],
  },
  {
    text: 'API Reference',
    collapsed: true,
    items: [
      {
        text: 'Core',
        collapsed: true,
        items: [
          { text: 'Server', link: '/api/server' },
          { text: 'Models', link: '/api/models' },
        ],
      },
      {
        text: 'RFC 6749 — Core Grants',
        collapsed: true,
        items: [
          { text: 'Authorization Code', link: '/api/authorization-code' },
          { text: 'Resource Owner Password Credentials', link: '/api/ropc' },
          { text: 'Client Credentials', link: '/api/client-credentials' },
          { text: 'Client Authentication', link: '/api/client-authentication' },
        ],
      },
      {
        text: 'Extensions & Related RFCs',
        collapsed: true,
        items: [
          { text: 'RFC 6750 — Bearer Token', link: '/api/bearer-token' },
          { text: 'RFC 7636 — PKCE', link: '/api/pkce' },
          { text: 'RFC 7662 — Token Introspection', link: '/api/introspection' },
          { text: 'RFC 9068 — JWT Access Tokens', link: '/api/jwt-access-tokens' },
          { text: 'OIDC — ID Tokens', link: '/api/oidc' },
        ],
      },
    ],
  },
  {
    text: 'Examples',
    collapsed: true,
    items: [
      { text: 'Authorization Code + PKCE + OIDC', link: '/examples/authorization-code-pkce-oidc' },
      { text: 'Resource Owner Password Credentials', link: '/examples/ropc' },
      { text: 'Client Credentials', link: '/examples/client-credentials' },
      { text: 'JWT Access Tokens', link: '/examples/jwt-access-tokens' },
      { text: 'Token Introspection', link: '/examples/introspection' },
      { text: 'Custom Error Handler', link: '/examples/custom-error-handler' },
    ],
  },
]

const viDocsSidebar = [
  {
    text: 'Tài liệu',
    collapsed: true,
    items: [
      {
        text: 'Bắt đầu',
        collapsed: true,
        items: [
          { text: 'Giới thiệu', link: '/vi/docs/introduction' },
          { text: 'Cài đặt', link: '/vi/docs/installation' },
        ],
      },
      { text: 'Kiến trúc', link: '/vi/docs/architecture' },
    ],
  },
  {
    text: 'Khái niệm',
    collapsed: true,
    items: [
      { text: 'OAuth 2.0 Flows', link: '/vi/concepts/oauth2-flows' },
      { text: 'Config + Flow Pattern', link: '/vi/concepts/config-flow-pattern' },
      { text: 'Extension System', link: '/vi/concepts/extensions' },
      { text: 'PKCE', link: '/vi/concepts/pkce' },
      { text: 'OpenID Connect', link: '/vi/concepts/oidc' },
    ],
  },
  {
    text: 'Tham chiếu API',
    collapsed: true,
    items: [
      {
        text: 'Core',
        collapsed: true,
        items: [
          { text: 'Server', link: '/vi/api/server' },
          { text: 'Models', link: '/vi/api/models' },
        ],
      },
      {
        text: 'RFC 6749 — Core Grants',
        collapsed: true,
        items: [
          { text: 'Authorization Code', link: '/vi/api/authorization-code' },
          { text: 'Resource Owner Password Credentials', link: '/vi/api/ropc' },
          { text: 'Client Credentials', link: '/vi/api/client-credentials' },
          { text: 'Client Authentication', link: '/vi/api/client-authentication' },
        ],
      },
      {
        text: 'Extensions & Related RFCs',
        collapsed: true,
        items: [
          { text: 'RFC 6750 — Bearer Token', link: '/vi/api/bearer-token' },
          { text: 'RFC 7636 — PKCE', link: '/vi/api/pkce' },
          { text: 'RFC 7662 — Token Introspection', link: '/vi/api/introspection' },
          { text: 'RFC 9068 — JWT Access Tokens', link: '/vi/api/jwt-access-tokens' },
          { text: 'OIDC — ID Tokens', link: '/vi/api/oidc' },
        ],
      },
    ],
  },
  {
    text: 'Ví dụ',
    collapsed: true,
    items: [
      { text: 'Authorization Code + PKCE + OIDC', link: '/vi/examples/authorization-code-pkce-oidc' },
      { text: 'Resource Owner Password Credentials', link: '/vi/examples/ropc' },
      { text: 'Client Credentials', link: '/vi/examples/client-credentials' },
      { text: 'JWT Access Tokens', link: '/vi/examples/jwt-access-tokens' },
      { text: 'Token Introspection', link: '/vi/examples/introspection' },
      { text: 'Custom Error Handler', link: '/vi/examples/custom-error-handler' },
    ],
  },
]

const enSidebar = {
  '/docs/': docsSidebar,
  '/concepts/': docsSidebar,
  '/api/': docsSidebar,
  '/examples/': docsSidebar,
}

const viSidebar = {
  '/vi/docs/': viDocsSidebar,
  '/vi/concepts/': viDocsSidebar,
  '/vi/api/': viDocsSidebar,
  '/vi/examples/': viDocsSidebar,
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
      label: '🇺🇸 English',
      lang: 'en-US',
    },
    vi: {
      label: '🇻🇳 Tiếng Việt',
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
