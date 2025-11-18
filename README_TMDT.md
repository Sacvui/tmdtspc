# 🛍️ Sàn Thương Mại Điện Tử Sapharco

## 📱 Giới thiệu

Dự án **Sàn Thương Mại Điện Tử Sapharco** là một ứng dụng web e-commerce chuyên bán các sản phẩm y tế, dược phẩm của Sapharco. Dự án được nhân bản từ dự án gốc và chuyển đổi thành một sàn thương mại điện tử hoàn chỉnh.

## ✨ Tính năng chính

### 🛍️ Mua sắm
- **Danh mục sản phẩm**: 5 danh mục chính (Thuốc kê đơn, Thuốc không kê đơn, Thực phẩm chức năng, Dụng cụ y tế, Mỹ phẩm)
- **Danh sách sản phẩm**: Hiển thị sản phẩm theo danh mục với đầy đủ thông tin
- **Tìm kiếm**: Tìm kiếm sản phẩm theo tên hoặc mã sản phẩm
- **Chi tiết sản phẩm**: Xem thông tin chi tiết, giá, đánh giá

### 🛒 Giỏ hàng
- **Thêm/Xóa sản phẩm**: Quản lý sản phẩm trong giỏ hàng
- **Cập nhật số lượng**: Tăng/giảm số lượng sản phẩm
- **Lưu trữ**: Giỏ hàng được lưu trong localStorage
- **Hiển thị tổng tiền**: Tính toán tổng tiền tự động

### 🎁 Khuyến mãi
- **Chiết khấu theo sản phẩm**: Giảm giá khi mua số lượng nhất định
- **Chiết khấu theo đơn hàng**: Giảm giá khi tổng đơn hàng đạt mức nhất định
- **Tặng quà**: Tặng kèm sản phẩm khi đạt điều kiện
- **Tự động tính toán**: Hệ thống tự động áp dụng khuyến mãi phù hợp

### 💳 Thanh toán
- **Form đặt hàng**: Nhập thông tin khách hàng
- **Tóm tắt đơn hàng**: Xem lại sản phẩm và tổng tiền
- **Áp dụng khuyến mãi**: Hiển thị các khuyến mãi đã áp dụng

## 📁 Cấu trúc dự án

```
tmdt/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CategoryList.js      # Danh sách danh mục
│   │   │   ├── ProductCard.js       # Card sản phẩm
│   │   │   └── Navbar.js            # Navbar với icon giỏ hàng
│   │   ├── context/
│   │   │   └── CartContext.js       # Context quản lý giỏ hàng
│   │   ├── data/
│   │   │   └── ecommerceProducts.json  # Data sản phẩm và khuyến mãi
│   │   ├── pages/
│   │   │   ├── EcommerceHome.js     # Trang chủ TMĐT
│   │   │   ├── ProductList.js       # Danh sách sản phẩm
│   │   │   ├── ShoppingCart.js      # Giỏ hàng
│   │   │   └── Checkout.js          # Thanh toán
│   │   └── App.js                   # Routing chính
│   └── package.json
├── vercel.json                      # Cấu hình Vercel
└── README_TMDT.md                   # File này
```

## 🚀 Cài đặt và chạy

### Cài đặt dependencies
```bash
cd tmdt/client
npm install
```

### Chạy development server
```bash
cd tmdt
npm start
```

Ứng dụng sẽ chạy tại `http://localhost:3000` (hoặc port được cấu hình)

## 📦 Data sản phẩm

Dữ liệu sản phẩm được lưu trong `client/src/data/ecommerceProducts.json` với:
- **25 sản phẩm** thuộc 5 danh mục
- Mỗi sản phẩm có: tên, mã, giá, mô tả, hình ảnh, đánh giá
- **Khuyến mãi**: Chiết khấu và tặng quà theo điều kiện

## 🎨 Giao diện

- **Màu sắc**: Sử dụng bảng màu Sapharco (Xanh bích #1a5ca2, Xanh ngọc #3eb4a8, Vàng #e5aa42)
- **Responsive**: Tối ưu cho mobile và desktop
- **UI/UX**: Giao diện hiện đại, dễ sử dụng

## 🚀 Deploy lên Vercel

Dự án đã được cấu hình sẵn để deploy lên Vercel:

1. **Kết nối với GitHub**: Đẩy code lên GitHub repository
2. **Import vào Vercel**: 
   - Vào [vercel.com](https://vercel.com)
   - Import project từ GitHub
   - Chọn thư mục `tmdt` làm root directory
3. **Deploy**: Vercel sẽ tự động build và deploy

Cấu hình trong `vercel.json`:
- Build command: `cd client && npm ci && npm run build`
- Output directory: `client/build`

## 📝 Lưu ý

- Dự án này độc lập với dự án gốc, không ảnh hưởng đến dự án hiện tại
- Logo và branding sử dụng logo Sapharco
- Data sản phẩm là mockup data, có thể thay thế bằng API thực tế
- Giỏ hàng lưu trong localStorage, sẽ mất khi xóa cache trình duyệt

## 🔄 Cập nhật tiếp theo

- [ ] Kết nối API thực tế
- [ ] Tích hợp thanh toán online
- [ ] Quản lý đơn hàng
- [ ] Đánh giá sản phẩm từ người dùng
- [ ] Tìm kiếm nâng cao
- [ ] Lọc sản phẩm theo giá, đánh giá

## 📞 Liên hệ

Dự án được phát triển bởi Sapharco Sales Team

