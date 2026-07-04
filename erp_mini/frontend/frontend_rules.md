# Frontend Rules

## 1. Mục tiêu
- Frontend dùng React + Vite.
- Tổ chức theo Component-Based Architecture (kiến trúc hướng thành phần).
- Có phân tách page, component, service, hook và validation.
- Không chia thành microservice.
- Không viết toàn bộ giao diện trong một file.

## 2. Luồng chuẩn
```text
User Action
  → Page
  → Component hoặc Hook
  → Service
  → Backend API
  → Update State
  → Render UI
```

## 3. Page
- Đại diện cho một màn hình hoặc route.
- Quản lý state của màn hình.
- Gọi service hoặc custom hook.
- Điều phối component.
- Xử lý loading, error và empty state.
- Không viết component quá lớn.
- Không gọi axios trực tiếp nếu đã có service.

## 4. Component
- Có một trách nhiệm chính.
- Nhận dữ liệu qua props.
- Phát sự kiện qua callback.
- Ưu tiên tái sử dụng.
- Không chứa business logic lớn.
- Không hard-code quyền.

## 5. Service
- Chứa toàn bộ lời gọi API.
- Dùng chung `apiClient`.
- Không xử lý JSX.
- Không hiển thị modal.
- Không hard-code token ở từng function.

Ví dụ:
```js
export const getProducts = (params) =>
  apiClient.get("/products", { params });
```

## 6. Hook
- Tái sử dụng logic React.
- Có tiền tố `use`.
- Không chứa JSX lớn.
- Không thay thế service layer.

Ví dụ:
```text
useAuth
usePermissions
usePagination
useDebounce
```

## 7. Context
Dùng cho global state:
- User đang đăng nhập.
- Token.
- Role và permission.
- Theme.
- Notification toàn cục.

Không dùng context cho:
- State của một modal.
- Dữ liệu form cục bộ.
- State chỉ dùng trong một page.

## 8. Validation
- Không cho bỏ trống trường bắt buộc.
- Không chấp nhận chỉ nhập khoảng trắng.
- Email phải đúng định dạng.
- Số điện thoại hợp lệ.
- Số lượng lớn hơn 0.
- Đơn giá không âm.
- Ngày giao hàng hợp lệ.
- Đơn hàng phải có ít nhất một sản phẩm.
- Backend vẫn phải validate lại.

## 9. Permission
Frontend kiểm tra permission để:
- Hiển thị menu.
- Hiển thị nút.
- Bảo vệ route.
- Disable action không hợp lệ.

Ví dụ:
```jsx
{can("PURCHASE_ORDER_APPROVE") && (
  <Button onClick={handleApprove}>Duyệt</Button>
)}
```

Ẩn nút không thay thế phân quyền backend.

## 10. API State
Mọi request phải xử lý:
```text
loading
success
error
empty
```

Mọi form phải xử lý:
```text
submitting
validation error
server error
success
```

Không cho submit nhiều lần khi đang gửi.

## 11. Table
Màn hình danh sách nên có:
- Search.
- Filter.
- Sort.
- Pagination.
- Loading.
- Empty state.
- Error state.
- Action theo permission.

## 12. Form
- Label rõ ràng.
- Hiển thị lỗi ngay dưới field.
- Không mất dữ liệu khi server trả lỗi.
- Disable nút submit khi đang gửi.
- Có confirm với thao tác nguy hiểm.
- Chuẩn hóa dữ liệu trước khi gửi.

## 13. Naming
- Component: `ProductTable.jsx`
- Page: `ProductListPage.jsx`
- Hook: `usePagination.js`
- Service: `purchaseOrderService.js`
- Handler: `handleSubmit`
- Boolean: `isLoading`, `isOpen`, `hasPermission`

## 14. Environment
```env
VITE_API_BASE_URL=http://localhost:9999/api
```

- Không đặt secret backend trong frontend.
- Không commit `.env` thật.
- Chỉ dùng biến bắt đầu bằng `VITE_`.

## 15. Error Handling
- Hiển thị thông báo dễ hiểu.
- Không hiển thị stack trace.
- Xử lý lỗi 401 tập trung.
- Xử lý lỗi validation theo từng field.
- Có fallback khi API lỗi.

## 16. AI Rules
- Đọc file này trước khi code frontend.
- Đọc thêm tài liệu nghiệp vụ liên quan.
- Trước khi code, liệt kê page, component, service cần sửa.
- Không gọi API trực tiếp rải rác.
- Không tạo component khổng lồ.
- Không tự đổi response format backend.
- Mọi form mới phải có validation.
- Mọi action phải kiểm tra permission.
- Mọi request phải có loading và error state.
- Không sửa file ngoài phạm vi nếu không cần.
