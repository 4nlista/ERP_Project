# TAX VAT

## NGUYÊN TẮC
- VAT = thuế gián thu, DN thu hộ nộp hộ. Tồn kho = giá chưa VAT
- Mức thuế: `0%` | `5%` | `8%` | `10%`

## CÔNG THỨC (mỗi dòng PO/SO)
```
lineTax    = quantity × unitPrice × taxRate
subtotal   = SUM(quantity × unitPrice)
totalTax   = SUM(lineTax)
grandTotal = subtotal + totalTax
```

## VÍ DỤ
```
MUA 100 bút × 10k × 10%  → VAT vào = 100k (khấu trừ), trả NCC = 1,100k, TK = 10k/bút
BÁN 100 bút × 15k × 10%  → VAT ra = 150k (phải nộp), KH trả = 1,650k
THUẾ NỘP = VAT ra − VAT vào = 150k − 100k = 50k
LÃI GỘP  = 1,500k − 1,000k = 500k (không liên quan VAT)
```

## CẤU HÌNH
- Entity TaxConfig: `name`, `rate`, `appliedTo` (PURCHASE|SALES|BOTH), `isActive`
- Default: danh mục SP → SP → dòng PO/SO (cho phép override từng cấp)

## KHI TRẢ HÀNG
- Trả NCC → giảm VAT đầu vào. Trả KH → giảm VAT đầu ra
