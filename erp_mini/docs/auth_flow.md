# AUTH & RBAC

## LOGIN
- Nội bộ: username/email + password (bcrypt). OAuth2: Google
- JWT access 15min + refresh 7d. Mỗi role → sidebar/dashboard riêng
- Quên MK: email → link reset (token 15min) → đặt MK mới
- Đổi MK: MK cũ + MK mới, validate MK cũ đúng + mới ≠ cũ

## USER MGMT (Admin only)
- CRUD tài khoản. Status: `ACTIVE` | `LOCKED` | `INACTIVE`
- Fields: id, username*, email*, password, fullName, phone, gender, dateOfBirth, role, status
- Validation: unique username+email, email format, password ≥ 8 (chữ hoa+số), ≥ 1 role
- Import/Export Excel

## RBAC (Admin only)
- Mỗi role → ma trận quyền: module × hành động (xem|tạo|sửa|xóa|duyệt|xuất)
- Đổi quyền → áp dụng TẤT CẢ user thuộc role → popup cảnh báo
- Role Admin: không xóa. Role có user: không xóa trực tiếp

## PERMISSION MATRIX
| Module | Admin | Manager | PS | IS | SS |
|--------|-------|---------|----|----|-----|
| Tài khoản | CRUD | R | — | — | — |
| Vai trò | CRUD | — | — | — | — |
| Danh mục SP | CRUD | CRUD | — | — | — |
| Sản phẩm | CRUD | CRUD | R | R | R |
| NCC | CRUD | R | CRUD | R | R |
| PO | CRUD | Duyệt+R | CRUD | — | — |
| GR | R | R | — | Confirm | — |
| Tồn kho | R | R | R | CRUD | R |
| Điều chỉnh TK | R | Duyệt | — | Tạo | — |
| SO | CRUD | R+Hủy | — | — | CRUD |
| GI | R | R | — | Confirm | R |
| KH | CRUD | R | — | — | CRUD |
| Công nợ trả | R | Tất toán | R | — | — |
| Công nợ thu | R | Tất toán | — | — | R |
| Báo cáo | Full | Full | — | — | — |
| AI Chatbot | ✓ | ✓ | ✓ | ✓ | ✓ |

## NOTIFICATIONS
| Event | Receiver |
|-------|----------|
| PS tạo PO | Manager |
| Manager duyệt/reject PO | PS |
| Gửi email NCC ok | IS |
| IS confirm nhận hàng | PS, Manager |
| SS confirm SO | IS |
| IS gửi phiếu ĐC | Manager |
| Manager duyệt/reject ĐC | IS |
| Stock = 0 | Manager, PS |
| Công nợ quá hạn | Manager, Admin |
