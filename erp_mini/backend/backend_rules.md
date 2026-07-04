# Backend Rules

## 1. Mục tiêu
- Backend dùng Node.js + Express theo Layered Architecture (kiến trúc phân lớp).
- Toàn bộ hệ thống nằm trong một backend duy nhất.
- Không tách Product, Supplier, User thành microservice.
- Mỗi layer phải có trách nhiệm rõ ràng.
- Không viết toàn bộ logic vào một file.

## 2. Luồng xử lý chuẩn
```text
Client
  → Route
  → Middleware
  → Controller
  → Service
  → Model
  → Database
```

## 3. Route
- Khai báo HTTP method và endpoint.
- Gắn middleware xác thực.
- Gắn middleware phân quyền.
- Gắn middleware validation.
- Chuyển request tới controller.
- Không truy vấn database.
- Không chứa business logic (logic nghiệp vụ).

Ví dụ:
```js
router.post(
  "/purchase-orders",
  authenticate,
  authorize("PURCHASE_ORDER_CREATE"),
  validate(createPurchaseOrderSchema),
  purchaseOrderController.create
);
```

## 4. Middleware
- Xác thực access token.
- Kiểm tra quyền truy cập.
- Validate request.
- Ghi log request.
- Xử lý lỗi chung.
- Không duyệt đơn.
- Không tính tiền.
- Không cập nhật tồn kho.

## 5. Controller
- Nhận dữ liệu từ `req.params`, `req.query`, `req.body`.
- Lấy người dùng hiện tại từ `req.user`.
- Gọi service.
- Trả HTTP status và JSON response.
- Không viết truy vấn database.
- Không chứa nghiệp vụ dài.
- Không tự chuyển trạng thái đơn.

Ví dụ:
```js
const create = async (req, res, next) => {
  try {
    const result = await purchaseOrderService.create({
      payload: req.body,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Purchase order created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
```

## 6. Service
- Chứa business logic (logic nghiệp vụ).
- Kiểm tra business rule (quy tắc nghiệp vụ).
- Gọi model hoặc repository.
- Điều phối nhiều model.
- Quản lý database transaction.
- Chuyển trạng thái đơn.
- Tạo giao dịch tồn kho.
- Không dùng `req` hoặc `res`.
- Không trả HTTP response trực tiếp.

## 7. Model
- Khai báo schema hoặc entity.
- Khai báo field và kiểu dữ liệu.
- Khai báo index và unique constraint.
- Khai báo quan hệ.
- Chỉ chứa validation dữ liệu cơ bản.
- Không chứa toàn bộ nghiệp vụ.

## 8. Validation
- Không cho phép trường bắt buộc bị trống.
- Không chấp nhận chuỗi chỉ có khoảng trắng.
- Email phải đúng định dạng.
- Số điện thoại chỉ chứa chữ số và đúng độ dài.
- Số lượng phải lớn hơn 0.
- Đơn giá không được âm.
- ID phải đúng định dạng.
- Backend luôn validate lại dữ liệu từ frontend.

## 9. Authentication và Authorization
- Mật khẩu phải được hash.
- Không lưu mật khẩu dạng plain text.
- Mỗi endpoint riêng tư phải kiểm tra token.
- Mỗi action quan trọng phải kiểm tra permission.
- Không tin quyền gửi từ frontend.
- Tài khoản bị khóa không được đăng nhập.

## 10. Inventory Rules
- Không cập nhật tồn kho trực tiếp từ frontend.
- Mọi thay đổi tồn kho phải tạo InventoryTransaction.
- Chỉ nhận hàng đã xác nhận mới làm tăng tồn kho.
- Chỉ xuất kho đã xác nhận mới làm giảm tồn kho.
- Không cho xuất vượt tồn kho khả dụng.
- Điều chỉnh tồn kho phải có lý do.
- Mọi giao dịch kho phải lưu người thực hiện và thời gian.

## 11. Order Rules
- Đơn mua mới bắt đầu ở trạng thái `DRAFT`.
- Chỉ đơn hợp lệ mới được gửi duyệt.
- Chỉ `PENDING_APPROVAL` mới được duyệt hoặc từ chối.
- Chỉ đơn đã duyệt mới được gửi nhà cung cấp.
- Đơn đã nhận hàng không được hủy trực tiếp.
- Đơn bán chỉ được xác nhận khi đủ tồn kho.
- Chỉ đơn bán đã xác nhận mới được tạo phiếu xuất.

## 12. Error Handling
- Mọi lỗi phải đi qua error middleware.
- Không trả stack trace cho client ở production.
- Dùng error code thống nhất.
- Dùng status code đúng ngữ nghĩa.
- Không `console.log` dữ liệu nhạy cảm.

## 13. Response Format
Thành công:
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

Lỗi:
```json
{
  "success": false,
  "message": "Validation failed",
  "code": "VALIDATION_ERROR",
  "errors": {}
}
```

## 14. Naming
- File: `purchaseOrderService.js`
- Function: `approvePurchaseOrder`
- Variable: `purchaseOrderId`
- Constant: `PURCHASE_ORDER_STATUS`
- Endpoint dùng danh từ số nhiều.
- Tên phải mô tả đúng nghiệp vụ.

## 15. AI Rules
- Đọc file này trước khi code backend.
- Đọc thêm file nghiệp vụ liên quan trong `docs/`.
- Trước khi code, liệt kê file cần tạo hoặc sửa.
- Không tự thêm business rule chưa được yêu cầu.
- Không chuyển logic sang sai layer.
- Không sửa file ngoài phạm vi nếu không cần.
- Mọi input mới phải có validation.
- Mọi endpoint mới phải có phân quyền phù hợp.
