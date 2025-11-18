import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const partners = [
    { name: 'Công Ty Resantis Việt Nam', url: 'https://resantisvietnam.com.vn/', logo: 'https://sapharco.com/uploads/logo/cong-ty-roussel-viet-nam-tieng-viet.jpg' },
    { name: 'Công Ty Cổ phần Dược phẩm Dược liệu Pharmedic', url: 'https://www.pharmedic.com.vn/vn/trang-chu.html', logo: 'https://sapharco.com/uploads/logo/cong-ty-co-phan-duoc-pham-duoc-lieu-pharmedic-tieng-viet.jpg' },
    { name: 'Công ty Cổ phần Dược phẩm 2/9', url: 'https://www.nadyphar.com.vn/', logo: 'https://sapharco.com/uploads/logo/cong-ty-co-phan-duoc-pham-29-tieng-viet.gif' },
    { name: 'Công ty cổ phần Dược phẩm và Sinh học Y Tế', url: 'https://mebiphar.vn/', logo: 'https://sapharco.com/uploads/logo/cong-ty-co-phan-duoc-pham-va-sinh-hoc-y-te-tieng-viet.png' },
    { name: 'Công ty Cổ phần Phân phối Dược Sài Gòn', url: 'javascript:void(0);', logo: 'https://sapharco.com/uploads/logo/cong-ty-co-phan-phan-phoi-duoc-sai-gon-tieng-viet.jpg' },
    { name: 'Công ty Cổ phần Dược phẩm Quận 3', url: 'javascript:void(0);', logo: 'https://sapharco.com/uploads/logo/cong-ty-co-phan-duoc-pham-quan-3-tieng-viet.png' },
    { name: 'Công ty Cổ phần Xuất Nhập khẩu Dược phẩm Chợ Lớn', url: 'javascript:void(0);', logo: 'https://sapharco.com/uploads/logo/cong-ty-co-phan-xuat-nhap-khau-duoc-pham-cho-lon-tieng-viet.png' },
    { name: 'Công ty Cổ phần Mắt kính Salenoptic', url: 'https://matkinhsalenoptic.com/', logo: 'https://sapharco.com/uploads/logo/cong-ty-co-phan-mat-kinh-salenoptic-tieng-viet.png' },
    { name: 'Công Ty Cổ phần Xuất Nhập Khẩu Y Tế', url: 'https://yteco.vn/', logo: 'https://sapharco.com/uploads/logo/cong-ty-co-phan-xuat-nhap-khau-y-te-tieng-viet.jpg' },
    { name: 'Công ty Cổ phần Dược phẩm & Dịch vụ Y tế Khánh Hội', url: 'javascript:void(0);', logo: 'https://sapharco.com/uploads/logo/37cong-ty-co-phan-duoc-pham-dich-vu-y-te-khanh-hoi-tieng-viet.JPG' },
    { name: 'Công ty Cổ phần mắt kính Sài Gòn', url: 'https://saigonoptic.com.vn/', logo: 'https://sapharco.com/uploads/logo/cong-ty-co-phan-mat-kinh-sai-gon-tieng-viet.gif' },
    { name: 'Công ty Cổ phần Dược phẩm Bến Thành', url: 'javascript:void(0);', logo: 'https://sapharco.com/uploads/logo/cong-ty-co-phan-duoc-pham-ben-thanh-tieng-viet.png' },
    { name: 'Công ty Cổ phần Dược phẩm Quận 10', url: 'https://tendiphar.com/', logo: 'https://sapharco.com/uploads/logo/cong-ty-co-phan-duoc-pham-quan-10-tieng-viet.png' },
    { name: 'Công ty Cổ phần Dược phẩm 3/2', url: 'https://ft-pharma.com/', logo: 'https://sapharco.com/uploads/logo/cong-ty-co-phan-duoc-pham-32-tieng-viet.png' },
    { name: 'Công ty Cổ phần Dược phẩm Gia Định', url: 'javascript:void(0);', logo: 'https://sapharco.com/uploads/logo/cong-ty-co-phan-duoc-pham-gia-dinh-tieng-viet.png' },
    { name: 'Công ty Cổ phần Dược phẩm Phú Thọ', url: 'javascript:void(0);', logo: 'https://sapharco.com/uploads/logo/cong-ty-co-phan-duoc-pham-phu-tho-tieng-viet.png' },
    { name: 'Công ty Cổ phần Dược phẩm Đông dược 5', url: 'https://fiopharm.com.vn/', logo: 'https://sapharco.com/uploads/logo/cong-ty-co-phan-duoc-pham-dong-duoc-5-tieng-viet.jpg' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      padding: isDesktop ? '60px 20px' : '40px 15px',
      paddingBottom: '80px'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Breadcrumb */}
        <div style={{
          marginBottom: '30px',
          fontSize: '14px',
          color: '#64748b'
        }}>
          <Link to="/" style={{ color: '#1a5ca2', textDecoration: 'none' }}>Trang chủ</Link>
          {' / '}
          <span style={{ color: '#1e293b', fontWeight: '600' }}>Về chúng tôi</span>
        </div>

        {/* Main Content */}
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          padding: isDesktop ? '60px' : '30px',
          marginBottom: '60px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #f1f5f9'
        }}>
          <h1 style={{
            fontSize: isDesktop ? '42px' : '32px',
            fontWeight: '800',
            color: '#1e293b',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            Về chúng tôi
          </h1>

          <div style={{
            fontSize: '16px',
            lineHeight: '1.8',
            color: '#374151',
            marginBottom: '40px',
            textAlign: 'justify'
          }}>
            <p style={{ marginBottom: '20px' }}>
              Công ty TNHH MTV Dược Sài Gòn (Sapharco) là doanh nghiệp 100% vốn Nhà nước thuộc Ủy ban nhân dân thành phố Hồ Chí Minh, hoạt động theo mô hình Công ty mẹ - con, gồm các đơn vị trực thuộc và 16 công ty liên kết có phần góp vốn của Công ty mẹ dưới 50%. Ngành nghề kinh doanh chính là sản xuất và kinh doanh thuốc, thực phẩm chức năng, nguyên liệu sản xuất thuốc; dịch vụ bảo quản và kiểm nghiệm thuốc; dịch vụ khai thuê hải quan. Ngành nghề kinh doanh phụ trợ: sản xuất, kinh doanh kính mắt và dụng cụ quang học về mắt; kinh doanh máy móc, thiết bị, vật tư ngành y tế, vaccine, sản phẩm sinh học, mỹ phẩm, sản phẩm vệ sinh cá nhân; dịch vụ giao nhận, vận chuyển, đóng gói bao bì;…
            </p>
            <p>
              Với đội ngũ cán bộ công nhân viên có trình độ chuyên môn cao, hệ thống trang thiết bị theo công nghệ mới, hiện đại đảm bảo sản xuất và phân phối một cách chuyên nghiệp. Sapharco luôn thực hiện thành công mọi kế hoạch đề ra theo đúng chỉ đạo của Bộ Y tế, UBND TPHCM, tham gia góp phần ổn định việc cung ứng thuốc cùng các sản phẩm thiết yếu liên quan đến việc chăm sóc sức khỏe Nhân dân.
            </p>
          </div>

          {/* Services Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : '1fr',
            gap: '30px',
            marginBottom: '60px'
          }}>
            {/* Sản Xuất */}
            <div style={{
              background: 'linear-gradient(135deg, #e0f2fe 0%, #bfdbfe 100%)',
              borderRadius: '20px',
              padding: '40px 30px',
              border: '1px solid #93c5fd',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(26, 92, 162, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{
                fontSize: '48px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                🏭
              </div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '800',
                color: '#1a5ca2',
                marginBottom: '15px',
                textAlign: 'center'
              }}>
                SẢN XUẤT
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.7',
                color: '#1e293b',
                textAlign: 'justify',
                marginBottom: '15px'
              }}>
                Một trong những đơn vị trực thuộc của Sapharco là Chi nhánh Resantis Việt Nam, tiền thân là Công ty Roussel Việt Nam. Thương hiệu Roussel Việt Nam đã được khẳng định trên thị trường Dược cả nước với nhà máy Roussel Việt Nam đạt chuẩn GMP-WHO.
              </p>
              <div style={{
                textAlign: 'center',
                marginTop: '20px'
              }}>
                <span style={{
                  fontSize: '14px',
                  color: '#1a5ca2',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Xem thêm &gt;&gt;
                </span>
              </div>
            </div>

            {/* Logistics */}
            <div style={{
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              borderRadius: '20px',
              padding: '40px 30px',
              border: '1px solid #93c5fd',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(26, 92, 162, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{
                fontSize: '48px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                🚚
              </div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '800',
                color: '#1a5ca2',
                marginBottom: '15px',
                textAlign: 'center'
              }}>
                LOGISTICS
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.7',
                color: '#1e293b',
                textAlign: 'justify',
                marginBottom: '15px'
              }}>
                Sapharco là một trong những công ty hàng đầu trong việc cung ứng dịch vụ logistic ngành dược với hơn 40 năm kinh nghiệm với Nhân sự và hệ thống quản lý chuyên nghiệp, cơ sở vật chất hiện đại đạt tiêu chuẩn.
              </p>
              <div style={{
                textAlign: 'center',
                marginTop: '20px'
              }}>
                <span style={{
                  fontSize: '14px',
                  color: '#1a5ca2',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Xem thêm &gt;&gt;
                </span>
              </div>
            </div>

            {/* Kinh Doanh & Phân Phối */}
            <div style={{
              background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
              borderRadius: '20px',
              padding: '40px 30px',
              border: '1px solid #a5b4fc',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(26, 92, 162, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{
                fontSize: '48px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                📦
              </div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '800',
                color: '#1a5ca2',
                marginBottom: '15px',
                textAlign: 'center'
              }}>
                KINH DOANH & PHÂN PHỐI
              </h2>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.7',
                color: '#1e293b',
                textAlign: 'justify',
                marginBottom: '15px'
              }}>
                Sau hơn 49 năm hoạt động và liên tục phát triển, đến nay công ty đã thiết lập được một hệ thống phân phối rộng lớn gồm các chi nhánh, cửa hàng bán sỉ và lẻ dược phẩm và trang thiết bị y tế tại các thành phố trên cả nước...
              </p>
              <div style={{
                textAlign: 'center',
                marginTop: '20px'
              }}>
                <span style={{
                  fontSize: '14px',
                  color: '#1a5ca2',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Xem thêm &gt;&gt;
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Các Công Ty Trong Hệ Thống */}
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          padding: isDesktop ? '60px' : '30px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #f1f5f9'
        }}>
          <h2 style={{
            fontSize: isDesktop ? '36px' : '28px',
            fontWeight: '800',
            color: '#1e293b',
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            Các Công Ty Trong Hệ Thống
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#64748b',
            textAlign: 'center',
            marginBottom: '50px',
            maxWidth: '600px',
            margin: '0 auto 50px auto'
          }}>
            Hệ thống các công ty liên kết và đối tác của Sapharco
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isDesktop ? 'repeat(auto-fill, minmax(180px, 1fr))' : 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '30px',
            alignItems: 'center'
          }}>
            {partners.map((partner, index) => (
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
  );
};

export default AboutUs;

