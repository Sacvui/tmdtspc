import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EcommerceFooter = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const footerLinks = {
    'Thông Tin Chung': [
      { label: 'Thông Tin Về Sapharco', path: '/' },
      { label: 'Quy Chế Hoạt Động', path: '/' },
      { label: 'Điều Khoản Sử Dụng', path: '/' },
      { label: 'Chính Sách Bảo Mật', path: '/' },
      { label: 'Chính Sách Bảo Mật Thanh Toán', path: '/' },
      { label: 'Chính Sách Giải Quyết Khiếu Nại', path: '/' },
      { label: 'Chính Sách Đăng Tải Sản Phẩm', path: '/' },
      { label: 'Chính Sách Đổi Trả', path: '/' },
      { label: 'Chính Sách Vận Chuyển', path: '/' }
    ],
    'Hỗ Trợ Người Sử Dụng': [
      { label: 'Câu Hỏi Thường Gặp', path: '/' },
      { label: 'Hướng Dẫn Đăng Tải Sản Phẩm', path: '/' },
      { label: 'Hướng Dẫn Đặt Hàng Và Thanh Toán', path: '/' }
    ]
  };

  return (
    <footer style={{
      background: '#fff',
      color: '#333',
      padding: isMobile ? '50px 20px' : '60px 40px',
      marginTop: 'auto',
      borderTop: '1px solid #e5e7eb'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '2fr 1.5fr 1.5fr',
          gap: isMobile ? '40px' : '50px',
          marginBottom: '50px'
        }}>
          {/* Left Section - Company Info */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '25px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #1a5ca2, #3eb4a8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(26, 92, 162, 0.3)'
              }}>
                <img
                  src="/image/logo.png"
                  alt="Sapharco"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    padding: '10px'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span style="font-size: 28px; color: white;">🏥</span>';
                  }}
                />
              </div>
              <div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '800',
                  color: '#1a5ca2',
                  marginBottom: '5px'
                }}>
                  Sapharco
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#64748b',
                  fontWeight: '600'
                }}>
                  Thương mại điện tử
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div style={{
              marginBottom: '25px'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '15px'
              }}>
                CÔNG TY TNHH MỘT THÀNH VIÊN DƯỢC SÀI GÒN
              </div>
              
              <div style={{
                fontSize: '14px',
                lineHeight: '1.8',
                color: '#475569',
                marginBottom: '12px'
              }}>
                <strong>Địa chỉ:</strong> 18 - 20 Nguyễn Trường Tộ, Phường Xóm Chiếu, TP. Hồ Chí Minh
              </div>
              
              <div style={{
                fontSize: '14px',
                lineHeight: '1.8',
                color: '#475569',
                marginBottom: '12px'
              }}>
                <strong>Điện thoại:</strong> (028) 71079879 ; (028) 39400388<br/>
                <strong>Fax:</strong> (028) 39401975
              </div>
              
              <div style={{
                fontSize: '14px',
                lineHeight: '1.8',
                color: '#475569',
                marginBottom: '12px'
              }}>
                <strong>MST:</strong> 0300523385
              </div>
              
              <div style={{
                fontSize: '14px',
                lineHeight: '1.8',
                color: '#475569',
                marginBottom: '12px'
              }}>
                <strong>Email:</strong> <a href="mailto:contact@sapharco.com" style={{ color: '#1a5ca2', textDecoration: 'none' }}>contact@sapharco.com</a>
              </div>
              
              <div style={{
                fontSize: '14px',
                lineHeight: '1.8',
                color: '#475569'
              }}>
                <strong>Website:</strong> <a href="https://www.sapharco.com" target="_blank" rel="noopener noreferrer" style={{ color: '#1a5ca2', textDecoration: 'none' }}>www.sapharco.com</a>
              </div>
            </div>

            {/* Contact Section */}
            <div style={{
              padding: '20px',
              background: '#f8fafc',
              borderRadius: '12px',
              marginBottom: '25px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                fontSize: '15px',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                📞 Liên Hệ
              </div>
              <div style={{
                fontSize: '14px',
                color: '#475569',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>📧</span>
                <a href="mailto:contact@sapharco.com" style={{ color: '#1a5ca2', textDecoration: 'none', fontWeight: '600' }}>
                  contact@sapharco.com
                </a>
              </div>
              <div style={{
                fontSize: '14px',
                color: '#475569',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>📞</span>
                <span style={{ fontWeight: '600' }}>(028) 71079879</span>
                <span style={{ color: '#94a3b8' }}>|</span>
                <span style={{ fontWeight: '600' }}>(028) 39400388</span>
              </div>
              <div style={{
                fontSize: '12px',
                color: '#64748b',
                marginTop: '8px',
                fontStyle: 'italic'
              }}>
                (Từ T2 đến CN: 8h-20h)
              </div>
            </div>

            {/* Certifications */}
            <div style={{
              display: 'flex',
              gap: '15px',
              flexWrap: 'wrap',
              marginBottom: '25px'
            }}>
              <div style={{
                padding: '10px 15px',
                background: '#fee2e2',
                borderRadius: '8px',
                border: '1px solid #fecaca',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                fontWeight: '600',
                color: '#991b1b'
              }}>
                <span>✓</span>
                <span>ĐÃ ĐĂNG KÝ BỘ CÔNG THƯƠNG</span>
              </div>
            </div>

            {/* Social Media */}
            <div style={{
              display: 'flex',
              gap: '12px'
            }}>
              <a
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  textDecoration: 'none',
                  color: '#1a5ca2',
                  transition: 'all 0.3s',
                  border: '1px solid #e2e8f0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1a5ca2';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f1f5f9';
                  e.currentTarget.style.color = '#1a5ca2';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                📘
              </a>
              <a
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  textDecoration: 'none',
                  color: '#1a5ca2',
                  transition: 'all 0.3s',
                  border: '1px solid #e2e8f0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1a5ca2';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f1f5f9';
                  e.currentTarget.style.color = '#1a5ca2';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                💬
              </a>
              <a
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  textDecoration: 'none',
                  color: '#1a5ca2',
                  transition: 'all 0.3s',
                  border: '1px solid #e2e8f0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1a5ca2';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f1f5f9';
                  e.currentTarget.style.color = '#1a5ca2';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                📷
              </a>
            </div>
          </div>

          {/* Middle Section - Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: '2px solid #e2e8f0'
              }}>
                {title}
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.path}
                      style={{
                        color: '#475569',
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'all 0.2s',
                        display: 'inline-block',
                        fontWeight: '500'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#1a5ca2';
                        e.currentTarget.style.transform = 'translateX(5px)';
                        e.currentTarget.style.fontWeight = '600';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#475569';
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.fontWeight = '500';
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Right Section - Social Media */}
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '2px solid #e2e8f0'
            }}>
              Kết Nối Với Chúng Tôi
            </h3>
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '30px'
            }}>
              <a
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#1877f2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  textDecoration: 'none',
                  color: '#fff',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(24, 119, 242, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                f
              </a>
              <a
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#0068ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  textDecoration: 'none',
                  color: '#fff',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 104, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Z
              </a>
              <a
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#0077b5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  textDecoration: 'none',
                  color: '#fff',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 119, 181, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                in
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '30px',
          borderTop: '2px solid #e2e8f0',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          fontSize: '14px',
          color: '#64748b'
        }}>
          <div style={{
            fontWeight: '600',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            © Bản quyền thuộc CÔNG TY TNHH MỘT THÀNH VIÊN DƯỢC SÀI GÒN - 2025
          </div>
          <div style={{
            fontSize: '13px',
            color: '#94a3b8',
            textAlign: isMobile ? 'center' : 'right',
            fontStyle: 'italic'
          }}>
            Được thiết kế bởi <strong style={{ color: '#1a5ca2' }}>ammedtech</strong>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EcommerceFooter;
