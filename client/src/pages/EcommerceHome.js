import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CategoryList from '../components/CategoryList';
import ProductCard from '../components/ProductCard';
import ecommerceProducts from '../data/ecommerceProducts.json';

const EcommerceHome = () => {
  // Get featured products (first 8 products)
  const featuredProducts = ecommerceProducts.products.slice(0, 8);
  const bestSellers = ecommerceProducts.products.slice(8, 12);
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc'
    }}>
      {/* Hero Banner - Modern Design */}
      <div style={{
        background: 'linear-gradient(135deg, #1a5ca2 0%, #3eb4a8 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: isMobile ? '40px 16px' : '80px 20px',
        marginBottom: isMobile ? '40px' : '60px'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '30px' : '60px',
          alignItems: 'center'
        }}>
          <div style={{ zIndex: 2, textAlign: isMobile ? 'center' : 'left' }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: isMobile ? '6px 16px' : '8px 20px',
              borderRadius: '30px',
              fontSize: isMobile ? '12px' : '14px',
              color: '#fff',
              marginBottom: isMobile ? '16px' : '20px',
              fontWeight: '600'
            }}>
              🎉 Khuyến mãi đặc biệt
            </div>
            <h1 style={{
              fontSize: isMobile ? '28px' : 'clamp(32px, 5vw, 56px)',
              fontWeight: '800',
              color: '#fff',
              marginBottom: isMobile ? '16px' : '20px',
              lineHeight: '1.2',
              textShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              Sàn Thương Mại Điện Tử<br />Sapharco
            </h1>
            <p style={{
              fontSize: isMobile ? '14px' : 'clamp(16px, 2vw, 20px)',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: isMobile ? '24px' : '35px',
              lineHeight: '1.6'
            }}>
              Mua sắm sản phẩm y tế, dược phẩm chất lượng cao với dịch vụ chuyên nghiệp và giá cả hợp lý
            </p>
            <div style={{
              display: 'flex',
              gap: isMobile ? '12px' : '15px',
              flexWrap: 'wrap',
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}>
              <Link
                to="/categories"
                style={{
                  display: 'inline-block',
                  padding: isMobile ? '14px 24px' : '18px 36px',
                  background: '#fff',
                  color: '#1a5ca2',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: '700',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s',
                  width: isMobile ? '100%' : 'auto',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                  }
                }}
              >
                🛍️ Mua sắm ngay
              </Link>
              <Link
                to="/products"
                style={{
                  display: 'inline-block',
                  padding: isMobile ? '14px 24px' : '18px 36px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: '700',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s',
                  width: isMobile ? '100%' : 'auto',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  }
                }}
              >
                Xem tất cả sản phẩm
              </Link>
            </div>
          </div>
          {!isMobile && (
            <div style={{
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '30px',
                padding: '40px',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <img
                  src="/image/logo.png"
                  alt="Sapharco"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.2))'
                  }}
                />
              </div>
            </div>
          )}
        </div>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '300px',
          height: '300px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-50px',
          left: '-50px',
          width: '250px',
          height: '250px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }} />
      </div>

      {/* Main Container */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: isMobile ? '0 16px' : '0 20px'
      }}>
        {/* Quick Categories */}
        <div style={{ marginBottom: isMobile ? '50px' : '80px' }}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            marginBottom: isMobile ? '24px' : '40px',
            gap: isMobile ? '16px' : '0'
          }}>
            <div>
              <h2 style={{
                fontSize: isMobile ? '24px' : 'clamp(28px, 4vw, 40px)',
                fontWeight: '800',
                color: '#1e293b',
                marginBottom: '10px'
              }}>
                Danh mục sản phẩm
              </h2>
              <p style={{
                fontSize: isMobile ? '14px' : '16px',
                color: '#64748b'
              }}>
                Khám phá các sản phẩm theo danh mục
              </p>
            </div>
            {!isMobile && (
              <Link
                to="/categories"
                style={{
                  padding: '12px 24px',
                  background: '#f1f5f9',
                  color: '#475569',
                  textDecoration: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e2e8f0';
                  e.currentTarget.style.color = '#334155';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f1f5f9';
                  e.currentTarget.style.color = '#475569';
                }}
              >
                Xem tất cả →
              </Link>
            )}
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: isMobile ? '12px' : '24px'
          }}>
            {ecommerceProducts.categories.map(category => (
              <Link
                key={category.id}
                to={`/products/${category.id}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <div style={{
                  background: '#fff',
                  borderRadius: isMobile ? '16px' : '20px',
                  padding: isMobile ? '20px 12px' : '35px 25px',
                  textAlign: 'center',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  height: '100%',
                  border: '1px solid #f1f5f9',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                    e.currentTarget.style.borderColor = '#667eea';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                    e.currentTarget.style.borderColor = '#f1f5f9';
                  }
                }}
                >
                  <div style={{
                    fontSize: isMobile ? '40px' : '64px',
                    marginBottom: isMobile ? '12px' : '20px',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                  }}>
                    {category.icon}
                  </div>
                  <h3 style={{
                    fontSize: isMobile ? '14px' : '18px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: isMobile ? '6px' : '10px',
                    lineHeight: '1.3'
                  }}>
                    {category.name}
                  </h3>
                  <p style={{
                    fontSize: isMobile ? '11px' : '13px',
                    color: '#64748b',
                    margin: 0,
                    lineHeight: '1.4',
                    display: isMobile ? 'none' : 'block'
                  }}>
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div style={{ marginBottom: isMobile ? '50px' : '80px' }}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            marginBottom: isMobile ? '24px' : '40px',
            gap: isMobile ? '16px' : '0'
          }}>
            <div>
              <h2 style={{
                fontSize: isMobile ? '24px' : 'clamp(28px, 4vw, 40px)',
                fontWeight: '800',
                color: '#1e293b',
                marginBottom: '10px'
              }}>
                Sản phẩm nổi bật
              </h2>
              <p style={{
                fontSize: isMobile ? '14px' : '16px',
                color: '#64748b'
              }}>
                Những sản phẩm được yêu thích nhất
              </p>
            </div>
            {!isMobile && (
              <Link
                to="/products"
                style={{
                  padding: '12px 24px',
                  background: '#f1f5f9',
                  color: '#475569',
                  textDecoration: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e2e8f0';
                  e.currentTarget.style.color = '#334155';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f1f5f9';
                  e.currentTarget.style.color = '#475569';
                }}
              >
                Xem tất cả →
              </Link>
            )}
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: isMobile ? '12px' : '28px'
          }}>
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Best Sellers */}
        <div style={{ marginBottom: isMobile ? '50px' : '80px' }}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            marginBottom: isMobile ? '24px' : '40px',
            gap: isMobile ? '16px' : '0'
          }}>
            <div>
              <h2 style={{
                fontSize: isMobile ? '24px' : 'clamp(28px, 4vw, 40px)',
                fontWeight: '800',
                color: '#1e293b',
                marginBottom: '10px'
              }}>
                Bán chạy nhất
              </h2>
              <p style={{
                fontSize: isMobile ? '14px' : '16px',
                color: '#64748b'
              }}>
                Sản phẩm được khách hàng tin tưởng
              </p>
            </div>
            {!isMobile && (
              <Link
                to="/products"
                style={{
                  padding: '12px 24px',
                  background: '#f1f5f9',
                  color: '#475569',
                  textDecoration: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: '600',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e2e8f0';
                  e.currentTarget.style.color = '#334155';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f1f5f9';
                  e.currentTarget.style.color = '#475569';
                }}
              >
                Xem tất cả →
              </Link>
            )}
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: isMobile ? '12px' : '28px'
          }}>
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div style={{
          background: 'linear-gradient(135deg, #1a5ca2 0%, #3eb4a8 100%)',
          borderRadius: isMobile ? '20px' : '30px',
          padding: isMobile ? '40px 20px' : '60px 40px',
          marginBottom: isMobile ? '50px' : '80px',
          color: '#fff'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: isMobile ? '24px' : '40px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: isMobile ? '36px' : '48px',
                marginBottom: isMobile ? '12px' : '20px'
              }}>🚚</div>
              <h3 style={{
                fontSize: isMobile ? '16px' : '20px',
                fontWeight: '700',
                marginBottom: isMobile ? '6px' : '10px'
              }}>
                Giao hàng nhanh
              </h3>
              <p style={{
                fontSize: isMobile ? '12px' : '14px',
                opacity: 0.9,
                margin: 0
              }}>
                Giao hàng trong 24h
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: isMobile ? '36px' : '48px',
                marginBottom: isMobile ? '12px' : '20px'
              }}>🛡️</div>
              <h3 style={{
                fontSize: isMobile ? '16px' : '20px',
                fontWeight: '700',
                marginBottom: isMobile ? '6px' : '10px'
              }}>
                Chất lượng đảm bảo
              </h3>
              <p style={{
                fontSize: isMobile ? '12px' : '14px',
                opacity: 0.9,
                margin: 0
              }}>
                100% chính hãng
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: isMobile ? '36px' : '48px',
                marginBottom: isMobile ? '12px' : '20px'
              }}>💳</div>
              <h3 style={{
                fontSize: isMobile ? '16px' : '20px',
                fontWeight: '700',
                marginBottom: isMobile ? '6px' : '10px'
              }}>
                Thanh toán an toàn
              </h3>
              <p style={{
                fontSize: isMobile ? '12px' : '14px',
                opacity: 0.9,
                margin: 0
              }}>
                Bảo mật tuyệt đối
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: isMobile ? '36px' : '48px',
                marginBottom: isMobile ? '12px' : '20px'
              }}>🎁</div>
              <h3 style={{
                fontSize: isMobile ? '16px' : '20px',
                fontWeight: '700',
                marginBottom: isMobile ? '6px' : '10px'
              }}>
                Khuyến mãi hấp dẫn
              </h3>
              <p style={{
                fontSize: isMobile ? '12px' : '14px',
                opacity: 0.9,
                margin: 0
              }}>
                Nhiều ưu đãi mỗi ngày
              </p>
            </div>
          </div>
        </div>

        {/* Partners Section */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '50px'
          }}>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: '800',
              color: '#1e293b',
              marginBottom: '15px'
            }}>
              Đối Tác Của Chúng Tôi
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Hợp tác với các công ty dược phẩm hàng đầu Việt Nam
            </p>
          </div>

          <div style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '40px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            border: '1px solid #f1f5f9'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '30px',
              alignItems: 'center'
            }}>
              {[
                { name: 'Công Ty Resantis Việt Nam', url: 'https://resantisvietnam.com.vn/', logo: 'https://www.sapharco.com/uploads/logo/cong-ty-roussel-viet-nam-tieng-viet.jpg' },
                { name: 'Công Ty Cổ phần Dược phẩm Dược liệu Pharmedic', url: 'https://www.pharmedic.com.vn/vn/trang-chu.html', logo: 'https://www.sapharco.com/uploads/logo/cong-ty-co-phan-duoc-pham-duoc-lieu-pharmedic-tieng-viet.jpg' },
                { name: 'Công ty Cổ phần Dược phẩm 2/9', url: 'https://www.nadyphar.com.vn/', logo: 'https://www.sapharco.com/uploads/logo/cong-ty-co-phan-duoc-pham-29-tieng-viet.gif' },
                { name: 'Công ty cổ phần Dược phẩm và Sinh học Y Tế', url: 'https://mebiphar.vn/', logo: 'https://www.sapharco.com/uploads/logo/cong-ty-co-phan-duoc-pham-va-sinh-hoc-y-te-tieng-viet.png' },
                { name: 'Công ty Cổ phần Phân phối Dược Sài Gòn', url: 'javascript:void(0);', logo: 'https://www.sapharco.com/uploads/logo/cong-ty-co-phan-phan-phoi-duoc-sai-gon-tieng-viet.jpg' },
                { name: 'Công ty Cổ phần Dược phẩm Quận 3', url: 'javascript:void(0);', logo: 'https://www.sapharco.com/uploads/logo/cong-ty-co-phan-duoc-pham-quan-3-tieng-viet.png' },
                { name: 'Công ty Cổ phần Xuất Nhập khẩu Dược phẩm Chợ Lớn', url: 'javascript:void(0);', logo: 'https://www.sapharco.com/uploads/logo/cong-ty-co-phan-xuat-nhap-khau-duoc-pham-cho-lon-tieng-viet.png' },
                { name: 'Công ty Cổ phần Mắt kính Salenoptic', url: 'https://matkinhsalenoptic.com/', logo: 'https://www.sapharco.com/uploads/logo/cong-ty-co-phan-mat-kinh-salenoptic-tieng-viet.png' },
                { name: 'Công Ty Cổ phần Xuất Nhập Khẩu Y Tế', url: 'https://yteco.vn/', logo: 'https://www.sapharco.com/uploads/logo/cong-ty-co-phan-xuat-nhap-khau-y-te-tieng-viet.jpg' },
                { name: 'Công ty Cổ phần Dược phẩm & Dịch vụ Y tế Khánh Hội', url: 'javascript:void(0);', logo: 'https://www.sapharco.com/uploads/logo/37cong-ty-co-phan-duoc-pham-dich-vu-y-te-khanh-hoi-tieng-viet.JPG' },
                { name: 'Công ty Cổ phần mắt kính Sài Gòn', url: 'https://saigonoptic.com.vn/', logo: 'https://www.sapharco.com/uploads/logo/cong-ty-co-phan-mat-kinh-sai-gon-tieng-viet.gif' },
                { name: 'Công ty Cổ phần Dược phẩm Bến Thành', url: 'javascript:void(0);', logo: 'https://www.sapharco.com/uploads/logo/cong-ty-co-phan-duoc-pham-ben-thanh-tieng-viet.png' },
                { name: 'Công ty Cổ phần Dược phẩm Quận 10', url: 'https://tendiphar.com/', logo: 'https://www.sapharco.com/uploads/logo/cong-ty-co-phan-duoc-pham-quan-10-tieng-viet.png' },
                { name: 'Công ty Cổ phần Dược phẩm 3/2', url: 'https://ft-pharma.com/', logo: 'https://www.sapharco.com/uploads/logo/cong-ty-co-phan-duoc-pham-32-tieng-viet.png' },
                { name: 'Công ty Cổ phần Dược phẩm Gia Định', url: 'javascript:void(0);', logo: 'https://www.sapharco.com/uploads/logo/cong-ty-co-phan-duoc-pham-gia-dinh-tieng-viet.png' },
                { name: 'Công ty Cổ phần Dược phẩm Phú Thọ', url: 'javascript:void(0);', logo: 'https://www.sapharco.com/uploads/logo/cong-ty-co-phan-duoc-pham-phu-tho-tieng-viet.png' },
                { name: 'Công ty Cổ phần Dược phẩm Đông dược 5', url: 'https://fiopharm.com.vn/', logo: 'https://www.sapharco.com/uploads/logo/cong-ty-co-phan-duoc-pham-dong-duoc-5-tieng-viet.jpg' }
              ].map((partner, index) => (
                <a
                  key={index}
                  href={partner.url}
                  target={partner.url.startsWith('javascript:') ? undefined : '_blank'}
                  rel={partner.url.startsWith('javascript:') ? undefined : 'noopener noreferrer'}
                  onClick={(e) => {
                    if (partner.url.startsWith('javascript:')) {
                      e.preventDefault();
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.3s',
                    textDecoration: 'none',
                    height: '120px',
                    cursor: partner.url.startsWith('javascript:') ? 'default' : 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!partner.url.startsWith('javascript:')) {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                      e.currentTarget.style.borderColor = '#1a5ca2';
                      e.currentTarget.style.background = '#fff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!partner.url.startsWith('javascript:')) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.background = '#f8fafc';
                    }
                  }}
                  title={partner.name}
                  aria-label={partner.name}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '80px',
                      objectFit: 'contain',
                      filter: 'grayscale(0.3)',
                      transition: 'filter 0.3s'
                    }}
                    onError={(e) => {
                      e.target.src = '/image/logo.png';
                      e.target.style.filter = 'grayscale(0.5)';
                    }}
                    onMouseEnter={(e) => {
                      if (!partner.url.startsWith('javascript:')) {
                        e.target.style.filter = 'grayscale(0)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.filter = 'grayscale(0.3)';
                    }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcommerceHome;
