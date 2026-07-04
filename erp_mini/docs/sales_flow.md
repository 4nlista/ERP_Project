# SALES ORDER (SO)

> Hệ thống B2B nội bộ. KH không đăng nhập — staff thao tác thay.

## STATE MACHINE
```
DRAFT → CONFIRMED → WAITING_EXPORT → EXPORTED → COMPLETED
  │                                      │
  └─ CANCELLED                          └─ (không hủy)
```
| Status | Trigger |
|--------|---------|
| DRAFT | SS tạo (default) |
| CONFIRMED | SS xác nhận + TK đủ |
| WAITING_EXPORT | Auto tạo GI |
| EXPORTED | IS xác nhận xuất kho |
| COMPLETED | Xuất kho + thanh toán xong |
| CANCELLED | SS/Manager hủy trước EXPORTED |

## TẠO SO (SS)
- Form: chọn KH, SP + SL + đơn giá bán + taxRate, ghi chú
- Summary auto: Tạm tính + VAT đầu ra + Tổng
- Lưu → DRAFT, mã auto SO-YYYYMM-XXXX

## XÁC NHẬN (SS)
- Check TỪNG SP: `orderedQty <= currentStock`
- Bất kỳ SP thiếu → lỗi 400 + danh sách SKU thiếu → khóa nút
- Đủ → CONFIRMED → **auto tạo GI** → WAITING_EXPORT → notification IS

## XUẤT KHO (IS)
- IS xác nhận xuất → **auto:** tạo InventoryTransaction(OUT), giảm currentStock, SO = EXPORTED, tạo Invoice → `payment_flow.md`

## HỦY
- Chỉ DRAFT/CONFIRMED/WAITING_EXPORT. Trả hàng sau xuất → `returns_flow.md`

## CUSTOMER
- Fields: tên, sđt, email, diaChi, daiDien, status. Chỉ là data record, không có account
