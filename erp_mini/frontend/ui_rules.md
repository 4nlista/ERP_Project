# UI Rules

## 1. Mục tiêu
- Giao diện rõ ràng.
- Ưu tiên nghiệp vụ hơn hiệu ứng.
- Các màn hình cùng loại phải nhất quán.
- Dễ sử dụng với nhân viên văn phòng và nhân viên kho.

## 2. Layout
- Dùng sidebar cho module chính.
- Dùng header cho user menu và thông báo.
- Nội dung chính có max width hợp lý.
- Không để quá nhiều khoảng trắng vô nghĩa.
- Responsive cho laptop và tablet.

## 3. Page Header
Mỗi page nên có:
- Tên màn hình.
- Mô tả ngắn.
- Breadcrumb nếu cần.
- Nút action chính ở góc phải.

## 4. List Page
Phải có:
- Search.
- Filter.
- Table.
- Pagination.
- Loading state.
- Empty state.
- Error state.
- Nút tạo mới nếu có quyền.

## 5. Detail Page
Nên có:
- Thông tin tổng quan.
- Trạng thái.
- Người tạo.
- Người duyệt.
- Thời gian tạo.
- Action hợp lệ theo trạng thái.
- Lịch sử xử lý.

## 6. Form
- Label đặt trên input.
- Trường bắt buộc có dấu `*`.
- Lỗi hiển thị dưới field.
- Không dùng placeholder thay label.
- Group field theo nghiệp vụ.
- Nút chính rõ ràng.
- Nút hủy có mức ưu tiên thấp hơn.

## 7. Button
- Một vùng chỉ nên có một primary button.
- Action nguy hiểm dùng destructive style.
- Nút không có quyền phải ẩn hoặc disable.
- Nút đang xử lý phải có loading state.

## 8. Table
- Header rõ ràng.
- Căn phải số tiền và số lượng.
- Action đặt ở cột cuối.
- Trạng thái dùng badge.
- Không nhồi quá nhiều cột.
- Dùng tooltip khi nội dung bị cắt.

## 9. Status
- Cùng trạng thái phải dùng cùng nhãn.
- Không hard-code màu ở nhiều nơi.
- Dùng `StatusBadge` dùng chung.
- Nhãn nên có tiếng Việt rõ nghĩa.

## 10. Modal
Dùng cho:
- Xác nhận.
- Từ chối.
- Tạo nhanh dữ liệu nhỏ.
- Không dùng modal cho form quá dài.

## 11. Feedback
- Thành công: toast ngắn.
- Lỗi form: hiển thị tại field.
- Lỗi hệ thống: toast hoặc alert.
- Xóa, hủy, từ chối phải có confirm.
- Không dùng alert trình duyệt mặc định.

## 12. Accessibility
- Input phải có label.
- Button phải có text hoặc aria-label.
- Không chỉ dùng màu để truyền đạt trạng thái.
- Có focus state.
- Hỗ trợ bàn phím với modal và form.

## 13. Responsive
- Table có thể scroll ngang.
- Sidebar thu gọn ở màn hình nhỏ.
- Form một cột trên mobile.
- Không ưu tiên mobile-first quá mức nếu hệ thống chủ yếu dùng desktop.

## 14. Consistency
- Dùng chung spacing.
- Dùng chung font size.
- Dùng chung border radius.
- Dùng chung component.
- Không tự tạo style khác nhau cho cùng một loại màn hình.
