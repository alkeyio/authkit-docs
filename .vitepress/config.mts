import { defineConfig } from 'vitepress'

const enNav = [
  { text: 'Docs', link: '/en/docs/introduction' },
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
          { text: 'Introduction', link: '/en/docs/introduction' },
          { text: 'Installation', link: '/en/docs/installation' },
        ],
      },
      { text: 'Architecture', link: '/en/docs/architecture' },
    ],
  },
  {
    text: 'Core Concepts',
    collapsed: true,
    items: [
      { text: 'OAuth 2.0 Flows', link: '/en/concepts/oauth2-flows' },
      { text: 'Config + Flow Pattern', link: '/en/concepts/config-flow-pattern' },
      { text: 'Extension System', link: '/en/concepts/extensions' },
      { text: 'PKCE', link: '/en/concepts/pkce' },
      { text: 'OpenID Connect', link: '/en/concepts/oidc' },
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
          { text: 'Server', link: '/en/api/server' },
          { text: 'Models', link: '/en/api/models' },
        ],
      },
      {
        text: 'RFC 6749 — Core Grants',
        collapsed: true,
        items: [
          { text: 'Authorization Code', link: '/en/api/authorization-code' },
          { text: 'Resource Owner Password Credentials', link: '/en/api/ropc' },
          { text: 'Client Credentials', link: '/en/api/client-credentials' },
          { text: 'Client Authentication', link: '/en/api/client-authentication' },
        ],
      },
      {
        text: 'Extensions & Related RFCs',
        collapsed: true,
        items: [
          { text: 'RFC 6750 — Bearer Token', link: '/en/api/bearer-token' },
          { text: 'RFC 7636 — PKCE', link: '/en/api/pkce' },
          { text: 'RFC 7662 — Token Introspection', link: '/en/api/introspection' },
          { text: 'RFC 9068 — JWT Access Tokens', link: '/en/api/jwt-access-tokens' },
          { text: 'OIDC — ID Tokens', link: '/en/api/oidc' },
        ],
      },
    ],
  },
  {
    text: 'Examples',
    collapsed: true,
    items: [
      { text: 'Authorization Code + PKCE + OIDC', link: '/en/examples/authorization-code-pkce-oidc' },
      { text: 'Resource Owner Password Credentials', link: '/en/examples/ropc' },
      { text: 'Client Credentials', link: '/en/examples/client-credentials' },
      { text: 'JWT Access Tokens', link: '/en/examples/jwt-access-tokens' },
      { text: 'Token Introspection', link: '/en/examples/introspection' },
      { text: 'Custom Error Handler', link: '/en/examples/custom-error-handler' },
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
  '/en/docs/': docsSidebar,
  '/en/concepts/': docsSidebar,
  '/en/api/': docsSidebar,
  '/en/examples/': docsSidebar,
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
      lang: 'en-US',
      link: '/en/',
    },
    en: {
      label: '🇺🇸 English',
      lang: 'en-US',
      themeConfig: {
        nav: enNav,
        sidebar: enSidebar,
        editLink: {
          pattern: 'https://github.com/alkeyio/authkit-docs/edit/main/:path',
          text: 'Edit this page on GitHub',
        },
        footer: {
          message: 'Released under the BSD-3-Clause License.',
          copyright: 'Copyright © 2026-present alkey.io',
        },
      },
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

    socialLinks: [
      { icon: 'github', link: 'https://github.com/alkeyio/authkit' },
    ],

    search: {
      provider: 'local',
    },
  },
})
