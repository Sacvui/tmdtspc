import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const EcommerceHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowMobileMenu(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Trang chủ', icon: '🏠' },
    { path: '/about', label: 'Về Chúng Tôi', icon: 'ℹ️' },
    { path: '/categories', label: 'Danh mục', icon: '📂' },
    { path: '/products', label: 'Sản phẩm', icon: '🛍️' },
    { path: '/cart', label: 'Giỏ hàng', icon: '🛒', badge: cartCount }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: isScrolled ? 'rgba(255, 255, 255, 0.98)' : '#fff',
      backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${isScrolled ? '#e2e8f0' : 'transparent'}`,
      boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: isMobile ? '15px 20px' : '20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '30px'
      }}>
        {/* Logo & Brand */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            textDecoration: 'none',
            color: 'inherit',
            flexShrink: 0
          }}
        >
          <div style={{
            width: isMobile ? '45px' : '55px',
            height: isMobile ? '45px' : '55px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #1a5ca2, #3eb4a8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(26, 92, 162, 0.3)',
            overflow: 'hidden'
          }}>
            <img
              src="/image/logo.png"
              alt="Sapharco"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                padding: '8px'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<span style="font-size: 24px; color: white;">🏥</span>';
              }}
            />
          </div>
          <div>
            <div style={{
              fontSize: isMobile ? '18px' : '22px',
              fontWeight: '800',
              color: '#1a5ca2',
              lineHeight: '1.2',
              marginBottom: '2px'
            }}>
              Sapharco
            </div>
            <div style={{
              fontSize: isMobile ? '11px' : '12px',
              color: '#3eb4a8',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Thương mại điện tử
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flex: 1,
            justifyContent: 'center'
          }}>
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  padding: '12px 20px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: isActive(link.path) ? '#1a5ca2' : '#64748b',
                  fontWeight: isActive(link.path) ? '700' : '600',
                  fontSize: '15px',
                  background: isActive(link.path) ? 'rgba(26, 92, 162, 0.1)' : 'transparent',
                  transition: 'all 0.2s',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  if (!isActive(link.path)) {
                    e.currentTarget.style.background = '#f8fafc';
                    e.currentTarget.style.color = '#1a5ca2';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(link.path)) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#64748b';
                  }
                }}
              >
                <span style={{ fontSize: '18px' }}>{link.icon}</span>
                <span>{link.label}</span>
                {link.badge && link.badge > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    background: '#ef4444',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: '700',
                    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)'
                  }}>
                    {link.badge > 9 ? '9+' : link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        )}

        {/* User Menu */}
        {!isMobile && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            {user ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  padding: '8px 16px',
                  background: '#f1f5f9',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1a5ca2'
                }}>
                  👤 {user.name || user.username || 'Khách hàng'}
                </div>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  style={{
                    padding: '10px 20px',
                    background: 'transparent',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#64748b',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#fee2e2';
                    e.currentTarget.style.borderColor = '#fecaca';
                    e.currentTarget.style.color = '#991b1b';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.color = '#64748b';
                  }}
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #1a5ca2, #3eb4a8)',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '700',
                  boxShadow: '0 4px 12px rgba(26, 92, 162, 0.3)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(26, 92, 162, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(26, 92, 162, 0.3)';
                }}
              >
                Đăng nhập
              </Link>
            )}
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '8px',
              color: '#1a5ca2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {showMobileMenu ? '✕' : '☰'}
          </button>
        )}

        {/* Cart Icon (Mobile) */}
        {isMobile && (
          <Link
            to="/cart"
            style={{
              position: 'relative',
              padding: '10px',
              textDecoration: 'none',
              color: '#1a5ca2',
              fontSize: '24px'
            }}
          >
            🛒
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '0',
                right: '0',
                background: '#ef4444',
                color: '#fff',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: '700',
                boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)'
              }}>
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && showMobileMenu && (
        <div style={{
          background: '#fff',
          borderTop: '1px solid #e2e8f0',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {user ? (
            <div style={{
              padding: '15px',
              background: '#f8fafc',
              borderRadius: '12px',
              marginBottom: '10px',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#1a5ca2',
                marginBottom: '8px'
              }}>
                👤 {user.name || user.username || 'Khách hàng'}
              </div>
              <button
                onClick={() => {
                  logout();
                  setShowMobileMenu(false);
                  navigate('/');
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#fee2e2',
                  border: '1px solid #fecaca',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#991b1b',
                  cursor: 'pointer',
                  marginTop: '8px'
                }}
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setShowMobileMenu(false)}
              style={{
                padding: '15px 20px',
                background: 'linear-gradient(135deg, #1a5ca2, #3eb4a8)',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '700',
                textAlign: 'center',
                marginBottom: '10px'
              }}
            >
              Đăng nhập
            </Link>
          )}
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setShowMobileMenu(false)}
              style={{
                padding: '15px 20px',
                borderRadius: '12px',
                textDecoration: 'none',
                color: isActive(link.path) ? '#1a5ca2' : '#64748b',
                fontWeight: isActive(link.path) ? '700' : '600',
                fontSize: '16px',
                background: isActive(link.path) ? 'rgba(26, 92, 162, 0.1)' : '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ fontSize: '20px' }}>{link.icon}</span>
              <span>{link.label}</span>
              {link.badge && link.badge > 0 && (
                <span style={{
                  marginLeft: 'auto',
                  background: '#ef4444',
                  color: '#fff',
                  borderRadius: '20px',
                  padding: '4px 10px',
                  fontSize: '12px',
                  fontWeight: '700'
                }}>
                  {link.badge > 9 ? '9+' : link.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default EcommerceHeader;

