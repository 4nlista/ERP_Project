# Backend Folder Structure

```text
backend/
├─ backend_rules.md
├─ api_style.md
├─ architecture.md
├─ folder_structure.md
├─ package.json
├─ package-lock.json
├─ server.js
└─ src/
   ├─ config/
   ├─ constants/
   ├─ controllers/
   ├─ middlewares/
   ├─ models/
   ├─ routes/
   ├─ services/
   └─ utils/
```

## `server.js`
- Điểm khởi động backend.
- Kết nối database.
- Khởi động server.
- Đăng ký cấu hình chính.
- Không chứa nghiệp vụ.

## `src/config/`
- Cấu hình ứng dụng.
- Kết nối database.
- Cấu hình CORS.
- Cấu hình email.
- Cấu hình logger.
- Đọc biến môi trường.

Ví dụ:
```text
app.js
database.js
env.js
mail.js
```

## `src/constants/`
- Role.
- Permission.
- Order status.
- Error code.
- Transaction type.
- Message dùng chung.

Ví dụ:
```text
roles.js
permissions.js
orderStatus.js
errorCodes.js
```

## `src/controllers/`
- Nhận request.
- Gọi service.
- Trả response.
- Không chứa nghiệp vụ dài.

Ví dụ:
```text
authController.js
productController.js
purchaseOrderController.js
```

## `src/middlewares/`
- Xác thực.
- Phân quyền.
- Validation.
- Error handling.
- Logging.

Ví dụ:
```text
authenticate.js
authorize.js
validate.js
errorHandler.js
```

## `src/models/`
- Schema.
- Entity.
- Quan hệ.
- Index.
- Constraint.

Ví dụ:
```text
User.js
Product.js
PurchaseOrder.js
Inventory.js
```

## `src/routes/`
- Khai báo endpoint.
- Gắn middleware.
- Gọi controller.

Ví dụ:
```text
authRoutes.js
productRoutes.js
purchaseOrderRoutes.js
```

## `src/services/`
- Business logic.
- Workflow.
- Transaction.
- Gọi model.
- Gọi external service.

Ví dụ:
```text
authService.js
inventoryService.js
purchaseOrderService.js
```

## `src/utils/`
- Hàm dùng chung không mang nghiệp vụ.
- Format ngày.
- Format response.
- Hash password.
- JWT helper.
- Pagination.

Ví dụ:
```text
jwt.js
password.js
pagination.js
dateFormatter.js
```

## Folder thêm sau khi cần
```text
validations/
errors/
repositories/
jobs/
tests/
```

Không tạo folder rỗng nếu chưa sử dụng.
