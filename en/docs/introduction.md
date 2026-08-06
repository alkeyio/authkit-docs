# Introduction

AuthKit is a [Go](https://go.dev/) library for building [OAuth 2.0](https://oauth.net/2/) and [OpenID Connect](https://openid.net/) Authorization Servers. It is built around modular, RFC-based packages. Each package implements a single RFC specification and can be composed independently, so you only include the grants and extensions your Authorization Server needs.

## Why AuthKit?

Every Authorization Server has different requirements. Some applications only need a handful of standard grants. Others need to add custom claims to tokens, while some require custom grants, extensions, or authentication flows tailored to their business logic.

AuthKit is designed with extensibility and composability at its core. The library is split into modular packages, with each package implementing a single RFC specification. This lets you build an Authorization Server with only the grants and extensions your application needs — without being tied to a monolithic implementation.

For example, the Authorization Code Grant exposes extension points throughout the entire flow. You can hook into request validation, authorization code processing, token request validation, token generation, and more:

```go
import (
    "github.com/alkeyio/authkit/models"
    "github.com/alkeyio/authkit/requests"
)

// Implement only the interfaces you need—there is no need to implement them all.
type myExt struct{}

func (e *myExt) ValidateAuthorizationRequest(ctx context.Context, r *requests.AuthorizationRequest) error {
    // Validate, reject, or log the request before the authorization code is issued.
}

func (e *myExt) ValidateConsentRequest(r *requests.AuthorizationRequest) error {
    // Validate or reject the consent request before the authorization code is created.
}

func (e *myExt) ProcessAuthorizationCode(r *requests.AuthorizationRequest, authCode models.AuthorizationCode, params map[string]interface{}) error {
    // Attach additional metadata to the authorization code before it is stored.
}

func (e *myExt) ValidateTokenRequest(ctx context.Context, r *requests.TokenRequest) error {
    // Validate, reject, or log the request before tokens are issued.
}

func (e *myExt) ProcessToken(r *requests.TokenRequest, token models.Token, data map[string]interface{}) error {
    // Add custom claims to the token response.
}

// Register once—AuthKit automatically detects the interfaces implemented by myExt.
cfg.RegisterExtension(&myExt{})
```

Need an extension point that isn't available yet? Open a [GitHub Issue](https://github.com/alkeyio/authkit/issues) and let us know. We welcome feedback and are always looking for ways to make AuthKit more flexible for real-world use cases.

## Who this is for

AuthKit is built for teams that want to own their Authorization Server instead of relying on a third-party identity platform. It provides OAuth 2.0 and OpenID Connect compliant building blocks without imposing a data model, or deployment architecture. You're free to choose your storage, HTTP framework, and how AuthKit fits into your existing application.

## Supported specifications

| Specification  | Package                         | Description                                                                 |
| -------------- | -------------------------------- | ---------------------------------------------------------------------------- |
| RFC 6749 §4.1  | `rfc6749/authorization_code`     | Authorization Code Grant                                                     |
| RFC 6749 §4.3  | `rfc6749/ropc`                   | Resource Owner Password Credentials                                          |
| RFC 6749 §4.4  | `rfc6749/client_credentials`     | Client Credentials Grant                                                     |
| RFC 6749 §2.3  | `rfc6749/client_authentication`  | Client authentication (`client_secret_basic`, `client_secret_post`, `none`)  |
| RFC 6749       | `rfc6749/code_generator`         | Authorization code generation                                                |
| RFC 6750       | `rfc6750`                        | Bearer Token (opaque access + refresh)                                       |
| RFC 7636       | `rfc7636`                        | PKCE (Proof Key for Code Exchange)                                           |
| RFC 7662       | `rfc7662`                        | Token Introspection                                                          |
| RFC 9068       | `rfc9068`                        | JWT Access Tokens                                                            |
| OpenID Connect | `oidc/core/authorization_code`   | Authorization Code Flow with OpenID Connect                                  |

## Next steps

- [Getting Started](/en/docs/installation) — Install AuthKit and build your first OAuth flow.

## Contributing

Contributions are always welcome. Whether you're fixing a bug, improving the documentation, implementing a new RFC, or sharing how you're using AuthKit, we'd love to hear from you.

Don't have a Pull Request yet? That's okay. Opening an [Issue](https://github.com/alkeyio/authkit/issues) to share your use case or ideas is just as valuable—it helps us build a better AuthKit for everyone.

## License

AuthKit is licensed under the BSD 3-Clause License. See the [LICENSE](https://github.com/alkeyio/authkit?tab=BSD-3-Clause-1-ov-file) file for details.
