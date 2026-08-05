# Client Authentication

<span class="rfc-badge">RFC 6749 §2.3</span> · package `rfc6749/client_authentication`

Every grant that involves a confidential client needs a way for that client to authenticate itself at `/token`. This package implements the client authentication methods defined in RFC 6749 §2.3.

## Supported methods

| Method | Description |
| --- | --- |
| `client_secret_basic` | Client ID and secret sent via HTTP Basic Auth on the request. |
| `client_secret_post` | Client ID and secret sent as form parameters in the request body. |
| `none` | No client secret — used for public clients (SPAs, native apps) that instead rely on [PKCE](/en/api/pkce) to prove request integrity. |

## Usage

Client authentication is consumed internally by the grant flows (`authorization_code`, `ropc`, `client_credentials`) through the `ClientManager` you supply — you don't typically call this package directly. It determines how the flow verifies the client identity presented on the `/token` request against what your `ClientManager` returns.

## See also

- [Models](/en/api/models) — `ClientManager` interface reference.
- [PKCE](/en/api/pkce) — the proof mechanism public clients (`none`) use instead of a secret.
