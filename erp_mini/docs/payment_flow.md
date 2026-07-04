# PAYMENT & ACCOUNTS

> B2B nội bộ — KHÔNG payment gateway. Staff xác nhận thủ công mọi khoản.

## TRẠNG THÁI
`PENDING_PAYMENT` → `PAID` | `PARTIALLY_PAID` | `DEBT` | `OVERDUE`

## PATTERN CHUNG (áp dụng cả mua + bán)
- **Tiền mặt:** Staff xác nhận đã nhận/trả tiền → tạo PaymentTransaction(CASH) → PAID
- **Chuyển khoản:** Staff check ngân hàng → xác nhận trên hệ thống → tạo PaymentTransaction(BANK_TRANSFER) → PAID
- **Ghi nợ:** Chọn "Ghi nợ" + dueDate → tạo AccountPayable/Receivable → DEBT → khi trả → tạo phiếu thu/chi → PAID
- **Partial:** Trả < tổng → PARTIALLY_PAID → trả tiếp → khi hết → PAID

## MUA HÀNG (Accounts Payable)
- Trigger: auto tạo phiếu TT sau IS xác nhận nhận hàng
- Thanh toán theo pattern trên. Ghi nợ → AccountPayable(supplierId, amount, dueDate, poId)

## BÁN HÀNG (Accounts Receivable)
- Trigger: auto tạo Invoice(INV-YYYYMM-XXXX) sau IS xác nhận xuất kho
- Thanh toán theo pattern trên. Ghi nợ → AccountReceivable(customerId, amount, dueDate, soId)

## DOANH THU (auto)
```
Doanh thu    = SUM(PaymentTransaction.amount) WHERE type=SALES, status=COMPLETED
Giá vốn      = SUM(SOItem.quantity × Product.costPrice)
Lợi nhuận gộp = Doanh thu (chưa VAT) − Giá vốn
```

## CÔNG NỢ
- Phải trả: bảng NCC, tổng nợ, quá hạn, hạn gần nhất
- Phải thu: bảng KH, tổng nợ, quá hạn, đơn liên quan
- Quá hạn → highlight đỏ dashboard
