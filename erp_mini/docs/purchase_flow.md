# PURCHASE ORDER (PO)

## STATE MACHINE
```
PENDING → APPROVED → SENT → PARTIAL → COMPLETED
  │          │         │        │
  └─CANCELLED └─REJECTED └─CANCELLED └─CLOSED
```
| Status | Trigger |
|--------|---------|
| PENDING | PS tạo (default) |
| APPROVED | Manager duyệt |
| REJECTED | Manager từ chối + lý do bắt buộc |
| SENT | PS gửi email NCC thành công |
| PARTIAL | IS xác nhận SL nhận < SL đặt |
| COMPLETED | IS xác nhận SL nhận = SL đặt |
| CLOSED | PS đóng đơn PARTIAL (chấp nhận thiếu) |
| CANCELLED | PS hủy khi PENDING/APPROVED/SENT |

## TẠO PO (PS)
- Form: NCC (dropdown + Tạo nhanh NCC modal), bảng SP (SKU, tên, đơn vị, đơn giá, SL, taxRate, thành tiền), ngày đặt, ngày giao dự kiến, ghi chú
- Summary auto: Tạm tính + VAT đầu vào + Tổng
- Lưu → PENDING, mã auto PO-YYYYMM-XXXX

## DUYỆT (Manager)
- Duyệt → APPROVED. Từ chối → REJECTED + lý do bắt buộc
- Notification cho PS cả 2 trường hợp

## GỬI NCC (PS)
- Điều kiện: APPROVED. PS click gửi email
- Thành công → SENT → **auto tạo GR** → notification IS
- Thất bại → hiện lỗi, cho thử lại

## NHẬN HÀNG (IS)
- IS nhập SL thực nhận vào GR → xác nhận
- **Auto:** tạo InventoryTransaction(IN), tăng currentStock, tạo phiếu thanh toán → `payment_flow.md`

## NGOẠI LỆ
- Hủy: chỉ PENDING/APPROVED/SENT. Trả hàng lỗi → `returns_flow.md`
