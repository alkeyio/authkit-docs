# Giới thiệu

AuthKit là thư viện giúp bạn xây dựng Authorization Server theo chuẩn [OAuth 2.0](https://oauth.net/2/) và [OpenID Connect](https://openid.net/) cho [Go](https://go.dev/). Thư viện được tổ chức thành các package, mỗi package hiện thực một đặc tả RFC. Các package có thể được kết hợp linh hoạt, giúp bạn chỉ cần tích hợp các grant và extension mà Authorization Server của mình thực sự cần.

## Tại sao là AuthKit?

Mỗi Authorization Server đều có những yêu cầu riêng. Một số hệ thống chỉ cần vài grant tiêu chuẩn. Một số cần bổ sung claim vào token. Một số khác cần grant, extension, hoặc quy trình xác thực được thiết kế riêng cho nghiệp vụ của mình.

AuthKit được xây dựng với khả năng mở rộng và tính linh hoạt là nguyên tắc thiết kế cốt lõi. Thư viện được chia thành các package nhỏ, mỗi package hiện thực một đặc tả RFC. Nhờ vậy, bạn có thể xây dựng Authorization Server của riêng bạn, với những grant và extension mà bạn thực sự cần.

Ví dụ, với Authorization Code Grant, bạn có thể đăng ký extension để can thiệp vào bất kỳ điểm nào trong quy trình — từ lúc nhận Authorization Request, xử lý Authorization Code, xác thực Token Request, đến khi bổ sung dữ liệu vào token trước khi phát hành:

```go
import (
    "github.com/alkeyio/authkit/models"
    "github.com/alkeyio/authkit/requests"
)

// Implement bất kỳ interface nào bạn cần — không cần thiết phải implement tất cả.
type myExt struct{}

func (e *myExt) ValidateAuthorizationRequest(ctx context.Context, r *requests.AuthorizationRequest) error {
    // Kiểm tra, từ chối hoặc ghi log trước khi auth code được phát hành.
}

func (e *myExt) ValidateConsentRequest(r *requests.AuthorizationRequest) error {
    // Kiểm tra hoặc từ chối ở bước consent trước khi auth code được tạo.
}

func (e *myExt) ProcessAuthorizationCode(r *requests.AuthorizationRequest, authCode models.AuthorizationCode, params map[string]interface{}) error {
    // Gắn thêm metadata vào auth code trước khi lưu.
}

func (e *myExt) ValidateTokenRequest(ctx context.Context, r *requests.TokenRequest) error {
    // Kiểm tra, từ chối hoặc ghi log trước khi token được phát hành.
}

func (e *myExt) ProcessToken(r *requests.TokenRequest, token models.Token, data map[string]interface{}) error {
    // Bổ sung custom claims vào token response.
}

// Đăng ký một lần — AuthKit tự phát hiện interface nào myExt implement.
cfg.RegisterExtension(&myExt{})
```

Nếu AuthKit chưa hỗ trợ điểm mở rộng mà bạn cần, hãy tạo một [GitHub Issue](https://github.com/alkeyio/authkit/issues). Chúng tôi luôn lắng nghe phản hồi và sẵn sàng bổ sung thêm tính năng phù hợp.

## Đối tượng sử dụng

AuthKit dành cho các đội ngũ muốn tự xây dựng và vận hành Authorization Server của riêng mình, thay vì phụ thuộc vào dịch vụ hoặc giải pháp của bên thứ ba. Thư viện cung cấp các thành phần tuân thủ đặc tả OAuth 2.0 và OpenID Connect, nhưng không áp đặt mô hình dữ liệu, hay kiến trúc triển khai cụ thể nào. Bạn toàn quyền quyết định storage, HTTP framework, và cách tích hợp AuthKit vào hệ thống hiện có của mình.

## Các đặc tả được hỗ trợ

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
| OpenID Connect | `oidc/core/authorization_code`   | ID Token generation                                                          |

## Tiếp theo

- [Bắt đầu](/vi/docs/installation) — Cài đặt AuthKit và xây dựng luồng OAuth đầu tiên của bạn.

## Tham gia phát triển

Chúng tôi luôn chào đón mọi **Issue** và **Pull Request** từ cộng đồng, đặc biệt là các đóng góp về việc hỗ trợ thêm các RFC mới (chẳng hạn **RFC 8628 – Device Authorization Grant**, **RFC 7009 – Token Revocation**), các ví dụ tích hợp với những **storage backend** ngoài SQL hoặc chia sẻ kinh nghiệm triển khai AuthKit trong thực tế.

Nếu bạn đang cân nhắc sử dụng AuthKit cho dự án của mình, hãy tạo một **Issue** để chia sẻ nhu cầu hoặc trường hợp sử dụng. Ngay cả khi chưa có Pull Request, những phản hồi này vẫn giúp chúng tôi hiểu rõ hơn nhu cầu của cộng đồng và ưu tiên lộ trình phát triển của AuthKit.

## Giấy phép

AuthKit được phát hành theo giấy phép BSD 3-Clause. Xem tệp LICENSE để biết thêm chi tiết.
