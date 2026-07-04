# INVENTORY

## QUY TẮC CỐT LÕI
- Tồn kho **KHÔNG BAO GIỜ** âm
- Mọi thay đổi → tạo InventoryTransaction (bất biến, không xóa/sửa)
- 3 nguồn thay đổi: `IN` (nhận) | `OUT` (xuất) | `ADJUST` (điều chỉnh)
- Giá trị TK = giá chưa VAT

## DASHBOARD KHO
- Tổng giá trị = `SUM(costPrice × currentStock)`
- Đủ hàng = `COUNT(currentStock > minStock)`
- Sắp hết = `COUNT(0 < currentStock <= minStock)`
- Hết hàng = `COUNT(currentStock = 0)`

## LỊCH SỬ GD KHO
- Bảng BẤT BIẾN. Cột: mã GD, loại (IN/OUT/ADJUST), SP, SL (+/−), TK sau GD, nguồn (link PO/SO/DC), người thực hiện, thời gian

## PHIẾU NHẬN HÀNG (GR)
- Auto tạo khi PS gửi email NCC thành công (xem `purchase_flow.md`)
- IS nhập SL thực nhận → xác nhận → auto: InventoryTransaction(IN) + tăng TK + tạo phiếu TT

## PHIẾU XUẤT KHO (GI)
- Auto tạo khi SS xác nhận SO (xem `sales_flow.md`)
- IS xác nhận xuất → auto: InventoryTransaction(OUT) + giảm TK + tạo Invoice

## ĐIỀU CHỈNH TỒN KHO (Maker-Checker)

**Phân quyền:**
| | IS | Manager |
|---|---|---|
| Tạo phiếu | ✓ | ✓ |
| Tự duyệt | ✗ | ✓ (popup xác nhận 2 lần) |
| Duyệt IS | ✗ | ✓ |

**Form:** SP, mã DC auto, TK hệ thống (readonly), SL thực tế (input), chênh lệch (auto = thực tế − hệ thống), lý do (dropdown: `Hàng hỏng`|`Mất mát`|`Sai lệch`|`Khác`), ghi chú
- Chênh lệch > 20% → cảnh báo bất thường

**Luồng IS:** tạo → PENDING_APPROVAL (TK chưa đổi) → Manager duyệt → TK cập nhật + InventoryTransaction(ADJUST)
**Luồng Manager:** tạo → popup "Tự duyệt?" → xác nhận → TK cập nhật ngay
