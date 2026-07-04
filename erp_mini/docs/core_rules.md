# CORE SYSTEM RULES & AUTO CODE GENERATORS

## 1. ĐỊNH DẠNG MÃ TỰ ĐỘNG (Auto-Generate Format)
Tất cả mã chứng từ và thực thể tạo mới bắt buộc phải tuân theo tiền tố định dạng thời gian sau:
- Mã sản phẩm: SP-XXXX (Ví dụ: ĐT-1001)
- Mã nhà cung cấp: NCC-XXXX (Ví dụ: NCC-5018)
- Mã khách hàng: KH-XXXX (Ví dụ: KH-0001)
- Đơn mua hàng: PO-YYYYMM-XXXX (Ví dụ: PO-202605-0089)
- Phiếu nhận hàng: GR-YYYYMM-XXXX (Ví dụ: GR-202605-0015)
- Phiếu xuất kho: GI-YYYYMM-XXXX (Ví dụ: GI-202605-0008)

## 2. CHUẨN CƠ SỞ DỮ LIỆU
- Sử dụng Mongoose Schema, luôn bật trường `{ timestamps: true }`.
- Tên các trường dữ liệu dùng kiểu camelCase (ví dụ: totalAmount, supplierId).