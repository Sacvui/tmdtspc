# 🚀 Setup Vercel từ GitHub - Hướng dẫn chi tiết

## Mục tiêu
Setup Vercel để tự động deploy từ GitHub mà không cần vào Vercel Dashboard để cấu hình Root Directory.

## ✅ Cách 1: Sử dụng Vercel CLI (Khuyến nghị)

### Bước 1: Cài đặt Vercel CLI
```bash
npm install -g vercel
```

### Bước 2: Login vào Vercel
```bash
vercel login
```
- Mở browser và đăng nhập vào Vercel
- Quay lại terminal sau khi đăng nhập thành công

### Bước 3: Link project với Vercel
```bash
# Từ thư mục root của repository (thư mục mẹ của tmdt)
vercel link
```

**Khi được hỏi, trả lời như sau:**
1. **Set up and deploy?** → `Y`
2. **Which scope?** → Chọn scope của bạn (thường là username)
3. **Link to existing project?** → `N` (tạo project mới)
4. **What's your project's name?** → `tmdt`
5. **In which directory is your code located?** → `./` hoặc `tmdt`
6. **Want to override the settings?** → `Y`
7. **Which settings would you like to override?** → Chọn `Root Directory`
8. **What's the Root Directory?** → `tmdt` ⚠️ **QUAN TRỌNG**
9. **Build Command?** → `cd client && npm ci && npm run build`
10. **Output Directory?** → `client/build`
11. **Development Command?** → `cd client && npm start`
12. **Install Command?** → `npm install`

### Bước 4: Kiểm tra file `.vercel`
Sau khi link, sẽ có thư mục `.vercel` được tạo với file `project.json`:
```json
{
  "projectId": "...",
  "orgId": "..."
}
```

### Bước 5: Commit và push
```bash
# Thêm file .vercel vào git (nếu muốn)
git add .vercel
git commit -m "Add Vercel configuration"
git push origin main
```

### Bước 6: Kết nối với GitHub
1. Vào https://vercel.com/dashboard
2. Chọn project `tmdt`
3. Vào **Settings** → **Git**
4. Click **Connect Git Repository**
5. Chọn repository `Sacvui/tmdtspc`
6. Chọn branch `main`
7. **QUAN TRỌNG**: Đảm bảo **Root Directory** = `tmdt` trong phần Settings

---

## ✅ Cách 2: Sử dụng Vercel CLI với flags (Nhanh hơn)

```bash
# Login
vercel login

# Link với các options
vercel link --yes \
  --scope=YOUR_SCOPE \
  --project=tmdt

# Set root directory (sau khi link)
# Vào Vercel Dashboard → Settings → Root Directory = tmdt
```

---

## ✅ Cách 3: Tạo file `.vercel/project.json` thủ công

Nếu bạn đã có Vercel project, có thể tạo file cấu hình:

```bash
mkdir -p .vercel
```

Tạo file `.vercel/project.json`:
```json
{
  "projectId": "YOUR_PROJECT_ID",
  "orgId": "YOUR_ORG_ID"
}
```

**Lấy Project ID và Org ID:**
1. Vào Vercel Dashboard
2. Chọn project
3. Vào Settings → General
4. Copy Project ID và Team ID

**Sau đó set Root Directory:**
- Vào Settings → Build & Development Settings
- Set Root Directory = `tmdt`

---

## ✅ Cách 4: Sử dụng GitHub Actions (Tự động hoàn toàn)

Tạo file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Vercel CLI
        run: npm install -g vercel
      
      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Build Project
        run: |
          cd tmdt
          npm install
          cd client
          npm ci
          npm run build
      
      - name: Deploy Project to Vercel
        run: vercel deploy --prod --token=${{ secrets.VERCEL_TOKEN }}
        working-directory: tmdt
```

**Setup secrets:**
1. Vào GitHub repository → Settings → Secrets → Actions
2. Thêm secret: `VERCEL_TOKEN`
3. Lấy token từ: https://vercel.com/account/tokens

---

## 🔍 Kiểm tra cấu hình

Sau khi setup, kiểm tra:

1. **File `.vercel/project.json`** có tồn tại không
2. **Vercel Dashboard** → Settings → Root Directory = `tmdt`
3. **Build Command** = `cd client && npm ci && npm run build`
4. **Output Directory** = `client/build`

---

## 🚨 Troubleshooting

### Nếu build vẫn fail:
1. Kiểm tra Root Directory đã được set = `tmdt` chưa
2. Kiểm tra Build Command có đúng path không
3. Xem Build Logs trên Vercel để tìm lỗi cụ thể

### Nếu không thấy option Root Directory:
- Có thể cần upgrade plan (nhưng thường free plan cũng có)
- Hoặc thử tạo project mới

### Nếu muốn thay đổi Root Directory sau khi link:
```bash
# Unlink project
vercel unlink

# Link lại với root directory mới
vercel link
# Khi được hỏi Root Directory, nhập: tmdt
```

---

## 📝 Lưu ý quan trọng

1. **Root Directory** phải được set = `tmdt` nếu repository có cấu trúc:
   ```
   repository-root/
     tmdt/
       client/
       package.json
       vercel.json
   ```

2. File `.vercel/project.json` chứa thông tin project, có thể commit vào git hoặc không (tùy chọn)

3. Sau khi link, mọi thay đổi trên GitHub sẽ tự động trigger deploy trên Vercel

---

## ✅ Checklist

- [ ] Đã cài đặt Vercel CLI
- [ ] Đã login vào Vercel
- [ ] Đã link project với Root Directory = `tmdt`
- [ ] Đã kết nối với GitHub repository
- [ ] Đã verify Root Directory = `tmdt` trên Vercel Dashboard
- [ ] Đã test deploy thành công

