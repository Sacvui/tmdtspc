# 🔧 Fix Git Repository - Di chuyển Git vào thư mục tmdt

## Vấn đề
- Git repository đang ở thư mục mẹ (`sacVui`)
- Khi push lên GitHub, nó push toàn bộ thư mục mẹ
- Các file trong `tmdt` được track với prefix `tmdt/`
- Repository GitHub mong đợi chỉ có thư mục `tmdt`

## ✅ Giải pháp: Di chuyển .git vào thư mục tmdt

### Cách 1: Sử dụng script (Khuyến nghị)

**Bước 1: Chạy script**
```powershell
# Từ thư mục tmdt
.\fix-git-repository.ps1
```

**Bước 2: Kiểm tra**
```powershell
git status
git log --oneline -5
```

**Bước 3: Commit và push**
```powershell
git add .
git commit -m "Move git repository to tmdt folder"
git push origin main
```

---

### Cách 2: Thủ công

**Bước 1: Backup .git từ thư mục mẹ**
```powershell
# Từ thư mục mẹ (sacVui)
Copy-Item -Path .git -Destination .\tmdt\.git -Recurse -Force
```

**Bước 2: Vào thư mục tmdt**
```powershell
cd tmdt
```

**Bước 3: Cập nhật Git index**
```powershell
# Remove prefix "tmdt/" từ tất cả files
git reset
git add .
```

**Bước 4: Commit và push**
```powershell
git commit -m "Move git repository to tmdt folder"
git push origin main
```

---

### Cách 3: Tạo Git mới trong tmdt (Nếu muốn bắt đầu lại)

**Bước 1: Xóa .git ở thư mục mẹ (nếu không cần)**
```powershell
# Từ thư mục mẹ
Remove-Item -Recurse -Force .git
```

**Bước 2: Tạo Git mới trong tmdt**
```powershell
cd tmdt
git init
git remote add origin git@github.com:Sacvui/tmdtspc.git
git add .
git commit -m "Initial commit - TMDT project"
git push -u origin main --force
```

⚠️ **CẢNH BÁO**: Cách này sẽ ghi đè lên repository GitHub. Chỉ dùng nếu bạn chắc chắn.

---

## 🔍 Kiểm tra sau khi fix

```powershell
# Kiểm tra Git root
git rev-parse --show-toplevel
# Phải trả về: .../tmdt

# Kiểm tra files được track
git ls-files | Select-Object -First 10
# Không nên có prefix "tmdt/"

# Kiểm tra remote
git remote -v
# Phải trả về: git@github.com:Sacvui/tmdtspc.git
```

---

## 📝 Lưu ý

1. **Backup trước**: Đảm bảo đã backup code trước khi thực hiện
2. **Xóa .git ở thư mục mẹ**: Sau khi đã push thành công, có thể xóa .git ở thư mục mẹ
3. **Vercel**: Sau khi fix, Vercel sẽ không cần Root Directory = `tmdt` nữa vì repository đã ở đúng chỗ

---

## 🚨 Troubleshooting

### Nếu push bị lỗi "refusing to merge unrelated histories":
```powershell
git pull origin main --allow-unrelated-histories
git push origin main
```

### Nếu muốn giữ lại lịch sử commit:
- Sử dụng Cách 1 hoặc Cách 2 (di chuyển .git)
- Không dùng Cách 3 (tạo mới)

### Nếu có conflict:
```powershell
git status
# Xem các file conflict
git add .
git commit -m "Resolve conflicts"
git push origin main
```

