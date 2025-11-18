#!/bin/bash

# Setup Vercel từ GitHub - Tự động cấu hình Root Directory
# Script này sẽ link Vercel project với repository và set root directory = tmdt

echo "🚀 Setup Vercel từ GitHub"
echo "=========================="
echo ""

# Kiểm tra Vercel CLI đã được cài đặt chưa
if ! command -v vercel &> /dev/null; then
    echo "📦 Cài đặt Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI đã sẵn sàng"
echo ""

# Link project với Vercel
echo "🔗 Đang link project với Vercel..."
echo ""
echo "📋 Hướng dẫn:"
echo "1. Khi được hỏi 'Set up and deploy?', chọn: Y"
echo "2. Khi được hỏi 'Which scope?', chọn scope của bạn"
echo "3. Khi được hỏi 'Link to existing project?', chọn: N (để tạo project mới)"
echo "4. Khi được hỏi 'What's your project's name?', nhập: tmdt"
echo "5. Khi được hỏi 'In which directory is your code located?', nhập: ./"
echo "6. Khi được hỏi 'Want to override the settings?', chọn: Y"
echo "7. Khi được hỏi 'Which settings would you like to override?', chọn: Root Directory"
echo "8. Khi được hỏi 'What's the Root Directory?', nhập: tmdt"
echo "9. Các câu hỏi khác giữ nguyên hoặc chọn mặc định"
echo ""
echo "⚠️  LƯU Ý: Nếu repository của bạn đã có thư mục 'tmdt' bên trong,"
echo "   bạn PHẢI set Root Directory = 'tmdt' ở bước 8"
echo ""
read -p "Nhấn Enter để tiếp tục..."

# Chạy Vercel link
vercel link

echo ""
echo "✅ Hoàn tất! Project đã được link với Vercel"
echo ""
echo "📝 Tiếp theo:"
echo "1. Push code lên GitHub: git push origin main"
echo "2. Vercel sẽ tự động detect và deploy"
echo "3. Kiểm tra deployment tại: https://vercel.com/dashboard"
echo ""

