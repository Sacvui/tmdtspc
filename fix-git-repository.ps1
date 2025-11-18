# Fix Git Repository - Di chuyển Git vào thư mục tmdt
# Script này sẽ di chuyển .git từ thư mục mẹ vào thư mục tmdt

Write-Host "🔧 Fix Git Repository Structure" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra đang ở đâu
$currentDir = Get-Location
Write-Host "Thư mục hiện tại: $currentDir" -ForegroundColor Yellow

# Kiểm tra có .git ở thư mục mẹ không
$parentGit = Join-Path (Split-Path $currentDir -Parent) ".git"
$currentGit = Join-Path $currentDir ".git"

if (Test-Path $parentGit) {
    Write-Host "✅ Tìm thấy .git ở thư mục mẹ" -ForegroundColor Green
    Write-Host "   Path: $parentGit" -ForegroundColor Gray
    
    # Kiểm tra xem đã có .git trong tmdt chưa
    if (Test-Path $currentGit) {
        Write-Host ""
        Write-Host "⚠️  CẢNH BÁO: Đã có .git trong thư mục tmdt!" -ForegroundColor Red
        Write-Host "   Bạn có muốn xóa .git cũ và di chuyển từ thư mục mẹ không?" -ForegroundColor Yellow
        $confirm = Read-Host "Nhập 'yes' để tiếp tục"
        if ($confirm -ne "yes") {
            Write-Host "Đã hủy." -ForegroundColor Yellow
            exit
        }
        Remove-Item -Recurse -Force $currentGit
        Write-Host "✅ Đã xóa .git cũ" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "📦 Đang di chuyển .git vào thư mục tmdt..." -ForegroundColor Cyan
    
    # Di chuyển .git
    $parentDir = Split-Path $currentDir -Parent
    $gitSource = Join-Path $parentDir ".git"
    $gitDest = Join-Path $currentDir ".git"
    
    Copy-Item -Path $gitSource -Destination $gitDest -Recurse -Force
    Write-Host "✅ Đã copy .git vào thư mục tmdt" -ForegroundColor Green
    
    # Cập nhật git config để remove prefix "tmdt/"
    Write-Host ""
    Write-Host "🔄 Đang cập nhật Git index..." -ForegroundColor Cyan
    
    Set-Location $currentDir
    git reset
    git add .
    
    Write-Host ""
    Write-Host "✅ Hoàn tất!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Tiếp theo:" -ForegroundColor Cyan
    Write-Host "1. Kiểm tra: git status"
    Write-Host "2. Commit nếu có thay đổi: git commit -m 'Move git repository to tmdt folder'"
    Write-Host "3. Push: git push origin main"
    Write-Host ""
    Write-Host "⚠️  LƯU Ý: Bạn có thể xóa .git ở thư mục mẹ sau khi đã push thành công" -ForegroundColor Yellow
    
} else {
    Write-Host "❌ Không tìm thấy .git ở thư mục mẹ" -ForegroundColor Red
    Write-Host "   Kiểm tra lại cấu trúc thư mục" -ForegroundColor Yellow
}

