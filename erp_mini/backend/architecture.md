# Backend Architecture

## 1. Kiến trúc
Backend sử dụng:

- Layered Architecture (kiến trúc phân lớp).
- Modular Monolith (khối nguyên mô-đun).
- Một server duy nhất.
- Một database chính.
- Các module nghiệp vụ dùng chung cùng hạ tầng.

Đây không phải Microservices Architecture (kiến trúc vi dịch vụ).

## 2. Layer
```text
Route Layer
Middleware Layer
Controller Layer
Service Layer
Model Layer
Database
```

## 3. Route Layer
Trách nhiệm:
- Khai báo endpoint.
- Gắn middleware.
- Gọi controller.

Không chịu trách nhiệm:
- Nghiệp vụ.
- Database query.
- Xử lý response phức tạp.

## 4. Middleware Layer
Trách nhiệm:
- Authentication (xác thực).
- Authorization (phân quyền).
- Validation (kiểm tra dữ liệu).
- Logging (ghi log).
- Error handling (xử lý lỗi).

## 5. Controller Layer
Trách nhiệm:
- Nhận request.
- Gọi service.
- Trả response.

Controller phải mỏng.

## 6. Service Layer
Trách nhiệm:
- Business logic.
- Business rule.
- Workflow.
- Transaction.
- Phối hợp model.
- Tích hợp email hoặc dịch vụ ngoài.

Service là nơi chứa phần lớn nghiệp vụ.

## 7. Model Layer
Trách nhiệm:
- Schema.
- Entity.
- Index.
- Constraint.
- Database access cơ bản.

## 8. Module Naming
Các module có thể gồm:

```text
auth
users
roles
products
categories
suppliers
customers
purchase-orders
goods-receipts
sales-orders
stock-issues
inventory
reports
chatbot
```

Tên module không đồng nghĩa với microservice.

## 9. Dependency Rule
Cho phép:
```text
Route → Controller
Controller → Service
Service → Model
Service → Utility
Middleware → Service hoặc Utility khi cần
```

Không cho phép:
```text
Model → Controller
Service → Controller
Route → Model
Controller → Route
```

## 10. Transaction Rule
Dùng database transaction khi một nghiệp vụ cập nhật nhiều bảng.

Ví dụ xác nhận nhận hàng:
```text
Update GoodsReceipt
Create InventoryTransaction
Increase Inventory
Update PurchaseOrder status
```

Nếu một bước lỗi, toàn bộ thao tác phải rollback.

## 11. Inventory Consistency
- Inventory là số tồn hiện tại.
- InventoryTransaction là lịch sử thay đổi.
- Không thay đổi Inventory mà không có InventoryTransaction.
- Số lượng trước và sau giao dịch phải truy vết được.

## 12. Status Transition
Mọi thay đổi trạng thái phải:
- Kiểm tra trạng thái hiện tại.
- Kiểm tra quyền.
- Kiểm tra điều kiện nghiệp vụ.
- Ghi người thực hiện.
- Ghi thời gian thực hiện.

## 13. External Services
Email, AI, file storage và dịch vụ ngoài phải:
- Được cấu hình trong `config/`.
- Được gọi từ service.
- Có timeout.
- Có xử lý lỗi.
- Không đặt trực tiếp trong controller.

## 14. Scaling Direction
Khi dự án lớn hơn có thể bổ sung:
```text
repositories/
jobs/
events/
tests/
```

Không chuyển sang microservice nếu chưa có lý do rõ ràng.
