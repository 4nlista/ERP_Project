# RETURNS FLOW

## TRẢ HÀNG NCC (Purchase Return)
- Mã: PR-YYYYMM-XXXX. Điều kiện: PO phải COMPLETED/PARTIAL
- **Flow:** IS tạo (chọn SP, SL, lý do) → PENDING → Manager duyệt → APPROVED → IS gửi trả → RETURNED
- **Auto:** InventoryTransaction(OUT), giảm currentStock, giảm công nợ NCC, giảm VAT đầu vào
- Lý do: `Hàng lỗi` | `Sai spec` | `Hư hỏng` | `Khác`

## TRẢ HÀNG TỪ KH (Sales Return)
- Mã: SR-YYYYMM-XXXX. Điều kiện: SO phải EXPORTED/COMPLETED
- **Flow:** SS tạo → PENDING → Manager duyệt → APPROVED → IS nhận hàng → RECEIVED
- **Auto:** InventoryTransaction(IN), tăng currentStock, giảm VAT đầu ra

**Xử lý sau trả:**
| Hình thức | Action |
|-----------|--------|
| Hoàn tiền | PaymentTransaction(REFUND) |
| Đổi hàng | Tạo SO mới |
| Ghi có | Giảm công nợ KH |
