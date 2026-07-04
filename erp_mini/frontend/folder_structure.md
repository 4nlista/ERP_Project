# Frontend Folder Structure

```text
frontend/
├─ frontend_rules.md
├─ ui_rules.md
├─ folder_structure.md
├─ eslint.config.js
├─ index.html
├─ package.json
├─ vite.config.js
├─ public/
└─ src/
   ├─ assets/
   │  ├─ icon/
   │  ├─ images/
   │  └─ styles/
   ├─ components/
   ├─ context/
   ├─ hooks/
   ├─ layouts/
   ├─ pages/
   ├─ routes/
   ├─ services/
   ├─ utils/
   └─ validations/
```

## `public/`
- File tĩnh phục vụ nguyên trạng.
- Favicon.
- Manifest.
- Không đặt secret.

## `src/assets/icon/`
- Icon SVG hoặc PNG.
- Icon riêng của nghiệp vụ.

## `src/assets/images/`
- Logo.
- Ảnh nền.
- Hình minh họa.
- Avatar mặc định.

## `src/assets/styles/`
- Global CSS.
- Variable.
- Typography.
- Style dùng chung.

## `src/components/`
- Component tái sử dụng.
- Button.
- Input.
- Modal.
- Table.
- Pagination.
- StatusBadge.

Có thể chia:
```text
components/
├─ common/
├─ forms/
└─ charts/
```

## `src/context/`
- AuthContext.
- PermissionContext.
- NotificationContext.
- ThemeContext nếu cần.

## `src/hooks/`
- Logic React tái sử dụng.
- `useAuth`.
- `usePermissions`.
- `usePagination`.
- `useDebounce`.

## `src/layouts/`
- AuthLayout.
- DashboardLayout.
- Sidebar.
- Header.
- Footer.

## `src/pages/`
- Mỗi file đại diện cho một màn hình.
- Có thể chia theo nhóm nghiệp vụ.

Ví dụ:
```text
pages/
├─ auth/
├─ users/
├─ products/
├─ suppliers/
├─ purchase/
├─ inventory/
├─ sales/
└─ reports/
```

Đây chỉ là nhóm file, không phải microservice.

## `src/routes/`
- Khai báo route.
- ProtectedRoute.
- PermissionRoute.
- Redirect.
- Route config.

## `src/services/`
- Gọi backend API.
- Cấu hình `apiClient`.
- Xử lý token tập trung.

Ví dụ:
```text
apiClient.js
authService.js
productService.js
purchaseOrderService.js
```

## `src/utils/`
- Format currency.
- Format date.
- Local storage helper.
- Map status label.
- Download file.

## `src/validations/`
- Schema validation form.
- Auth validation.
- Product validation.
- Purchase order validation.
- Sales order validation.

## Folder thêm sau khi cần
```text
constants/
store/
tests/
```

Không tạo folder rỗng nếu chưa dùng.
