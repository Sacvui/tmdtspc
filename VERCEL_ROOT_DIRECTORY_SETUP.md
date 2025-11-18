# 🔧 Hướng dẫn thiết lập Root Directory cho Vercel

## Vấn đề
Vercel đang build từ thư mục mẹ thay vì thư mục `tmdt` chứa dự án.

## ✅ Giải pháp: Cấu hình Root Directory trên Vercel Dashboard

### Bước 1: Truy cập Vercel Dashboard
1. Đi tới: https://vercel.com/dashboard
2. Chọn project của bạn (tmdt hoặc tmdtspc)

### Bước 2: Vào Settings
1. Click vào tab **"Settings"** ở trên cùng
2. Scroll xuống phần **"Build & Development Settings"**

### Bước 3: Cấu hình Root Directory
1. Tìm phần **"Root Directory"**
2. Click vào nút **"Edit"**
3. Nhập: `tmdt`
4. Click **"Save"**

### Bước 4: Cập nhật Build Settings (nếu cần)
Sau khi set Root Directory, đảm bảo Build Settings như sau:

```
Framework Preset: Other
Root Directory: tmdt
Build Command: cd client && npm ci && npm run build
Output Directory: client/build
Install Command: npm install
```

### Bước 5: Redeploy
1. Vào tab **"Deployments"**
2. Click vào deployment mới nhất
3. Click **"Redeploy"** → **"Use existing Build Cache"** (hoặc **"Clear cache and redeploy"**)

---

## 📝 Lưu ý quan trọng

### Nếu repository GitHub đang ở thư mục mẹ:
- ✅ **Cách 1 (Khuyến nghị)**: Set Root Directory = `tmdt` trên Vercel Dashboard
- ✅ **Cách 2**: Di chuyển toàn bộ code lên root của repository (không khuyến nghị nếu có nhiều dự án)

### Nếu repository GitHub đã ở trong thư mục `tmdt`:
- Không cần cấu hình gì thêm, Vercel sẽ tự động nhận

---

## 🔍 Kiểm tra cấu hình

Sau khi cấu hình, kiểm tra:
1. Vào Vercel Dashboard → Project Settings
2. Xem phần "Root Directory" phải hiển thị: `tmdt`
3. Xem Build Logs để đảm bảo build command chạy đúng từ thư mục `tmdt`

---

## 🚨 Troubleshooting

### Nếu build vẫn fail:
1. Kiểm tra Root Directory đã được set đúng chưa
2. Kiểm tra Build Command có đúng path không
3. Clear cache và redeploy lại
4. Kiểm tra file `vercel.json` có trong thư mục `tmdt` không

### Nếu không thấy option Root Directory:
- Có thể cần upgrade plan (nhưng thường free plan cũng có)
- Hoặc thử tạo project mới và import lại từ GitHub

