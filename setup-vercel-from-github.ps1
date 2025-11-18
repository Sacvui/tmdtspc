# Setup Vercel từ GitHub - PowerShell Script cho Windows
# Script này sẽ link Vercel project với repository và set root directory = tmdt

Write-Host "🚀 Setup Vercel từ GitHub" -ForegroundColor Cyan
Write-Host "==========================" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra Vercel CLI đã được cài đặt chưa
try {
    $vercelVersion = vercel --version
    Write-Host "✅ Vercel CLI đã sẵn sàng (Version: $vercelVersion)" -ForegroundColor Green
} catch {
    Write-Host "📦 Cài đặt Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
    Write-Host "✅ Vercel CLI đã được cài đặt" -ForegroundColor Green
}

Write-Host ""
Write-Host "🔗 Đang link project với Vercel..." -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Hướng dẫn:" -ForegroundColor Yellow
Write-Host "1. Khi được hỏi 'Set up and deploy?', chọn: Y"
Write-Host "2. Khi được hỏi 'Which scope?', chọn scope của bạn"
Write-Host "3. Khi được hỏi 'Link to existing project?', chọn: N (để tạo project mới)"
Write-Host "4. Khi được hỏi 'What's your project's name?', nhập: tmdt"
Write-Host "5. Khi được hỏi 'In which directory is your code located?', nhập: ./"
Write-Host "6. Khi được hỏi 'Want to override the settings?', chọn: Y"
Write-Host "7. Khi được hỏi 'Which settings would you like to override?', chọn: Root Directory"
Write-Host "8. Khi được hỏi 'What's the Root Directory?', nhập: tmdt" -ForegroundColor Red
Write-Host "9. Các câu hỏi khác giữ nguyên hoặc chọn mặc định"
Write-Host ""
Write-Host "⚠️  LƯU Ý: Nếu repository của bạn đã có thư mục 'tmdt' bên trong," -ForegroundColor Red
Write-Host "   bạn PHẢI set Root Directory = 'tmdt' ở bước 8" -ForegroundColor Red
Write-Host ""
Read-Host "Nhấn Enter để tiếp tục..."

# Chạy Vercel link
vercel link

Write-Host ""
Write-Host "✅ Hoàn tất! Project đã được link với Vercel" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Tiếp theo:" -ForegroundColor Cyan
Write-Host "1. Push code lên GitHub: git push origin main"
Write-Host "2. Vào Vercel Dashboard để kết nối với GitHub repository"
Write-Host "3. Đảm bảo Root Directory = 'tmdt' trong Settings"
Write-Host "4. Vercel sẽ tự động detect và deploy"
Write-Host "5. Kiểm tra deployment tại: https://vercel.com/dashboard"
Write-Host ""

