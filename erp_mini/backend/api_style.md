# API Style Guide

## 1. Base URL
```text
/api
```

Ví dụ:
```text
/api/products
/api/purchase-orders
/api/inventory-transactions
```

## 2. Quy tắc endpoint
- Dùng danh từ, không dùng động từ cho CRUD thông thường.
- Dùng danh từ số nhiều.
- Dùng kebab-case cho URL.
- Không dùng tên như `/getAllProducts`.
- Không dùng query parameter để thay cho path parameter khi lấy một bản ghi.

Đúng:
```text
GET /api/products
GET /api/products/:id
```

Không nên:
```text
GET /api/products/all
GET /api/products?productId=123
```

## 3. HTTP Methods
```text
GET     Đọc dữ liệu
POST    Tạo mới hoặc thực hiện action
PATCH   Cập nhật một phần
PUT     Thay thế toàn bộ
DELETE  Xóa hoặc vô hiệu hóa
```

## 4. CRUD Endpoint
```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PATCH  /api/products/:id
DELETE /api/products/:id
```

## 5. Business Action Endpoint
Dùng POST cho action làm thay đổi trạng thái.

```text
POST /api/purchase-orders/:id/submit
POST /api/purchase-orders/:id/approve
POST /api/purchase-orders/:id/reject
POST /api/purchase-orders/:id/send
POST /api/goods-receipts/:id/confirm
POST /api/sales-orders/:id/confirm
POST /api/stock-issues/:id/confirm
```

## 6. Query Parameters
Danh sách:
```text
GET /api/products?page=1&limit=20
```

Tìm kiếm:
```text
GET /api/products?keyword=keyboard
```

Lọc:
```text
GET /api/purchase-orders?status=PENDING_APPROVAL
```

Sắp xếp:
```text
GET /api/products?sortBy=createdAt&sortOrder=desc
```

## 7. Pagination Response
```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalItems": 100,
    "totalPages": 5
  }
}
```

## 8. Status Codes
```text
200 OK
201 Created
204 No Content
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
422 Unprocessable Entity
500 Internal Server Error
```

## 9. Error Format
```json
{
  "success": false,
  "message": "SKU already exists",
  "code": "SKU_ALREADY_EXISTS",
  "errors": {
    "sku": "SKU must be unique"
  }
}
```

## 10. Request Rules
- Body dùng JSON.
- ID nằm trong path.
- Filter nằm trong query.
- Không gửi userId nếu backend đã lấy được từ token.
- Không gửi role hoặc permission từ frontend để backend tin theo.

## 11. Security
- API riêng tư phải yêu cầu access token.
- Kiểm tra permission ở backend.
- Không trả password hash.
- Không trả secret hoặc token nội bộ.
- Validate mọi input.

## 12. Versioning
Khi cần version:
```text
/api/v1/products
```

Chưa cần version nếu dự án vẫn ở giai đoạn đầu.
