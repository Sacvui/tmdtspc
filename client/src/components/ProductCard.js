import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const isLoggedIn = !!user;
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    // Show toast notification instead of alert
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      z-index: 10000;
      animation: slideIn 0.3s ease;
      font-weight: 600;
    `;
    toast.textContent = `✓ Đã thêm ${product.name} vào giỏ hàng!`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }
      `}</style>
      <Link
        to={`/product/${product.id}`}
        style={{
          textDecoration: 'none',
          color: 'inherit'
        }}
      >
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #f1f5f9',
          position: 'relative'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-12px)';
          e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.15)';
          e.currentTarget.style.borderColor = '#e2e8f0';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
          e.currentTarget.style.borderColor = '#f1f5f9';
        }}
        >
          {/* Product Image */}
          <div style={{
            width: '100%',
            height: '280px',
            background: 'linear-gradient(135deg, #1a5ca2 0%, #3eb4a8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)'
            }} />
            <img
              src={product.image || '/image/logo.png'}
              alt={product.name}
              style={{
                maxWidth: '85%',
                maxHeight: '85%',
                objectFit: 'contain',
                transition: 'transform 0.4s',
                position: 'relative',
                zIndex: 1
              }}
              onError={(e) => {
                e.target.src = '/image/logo.png';
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
            {hasDiscount && (
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                color: '#fff',
                padding: isMobile ? '6px 10px' : '8px 14px',
                borderRadius: '30px',
                fontSize: isMobile ? '11px' : '13px',
                fontWeight: '700',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
                zIndex: 2,
                whiteSpace: 'nowrap',
                minWidth: isMobile ? '45px' : 'auto'
              }}>
                -{discountPercent}%
              </div>
            )}
            {product.promotions && product.promotions.length > 0 && (
              <div style={{
                position: 'absolute',
                top: hasDiscount ? (isMobile ? '48px' : '50px') : '16px',
                left: '16px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                color: '#f59e0b',
                padding: isMobile ? '4px 8px' : '6px 12px',
                borderRadius: '20px',
                fontSize: isMobile ? '10px' : '11px',
                fontWeight: '700',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                maxWidth: hasDiscount ? (isMobile ? 'calc(100% - 90px)' : 'calc(100% - 100px)') : (isMobile ? 'calc(100% - 80px)' : 'calc(100% - 100px)'),
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                🎁 {isMobile ? 'KM' : 'Khuyến mãi'}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div style={{
            padding: '24px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              fontSize: '12px',
              color: '#94a3b8',
              marginBottom: '8px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {product.code}
            </div>
            
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#1e293b',
              margin: '0 0 12px 0',
              lineHeight: '1.4',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '50px'
            }}>
              {product.name}
            </h3>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <StarRating rating={product.rating} />
              <span style={{
                fontSize: '13px',
                color: '#64748b',
                marginLeft: '4px',
                fontWeight: '500'
              }}>
                ({product.reviews})
              </span>
            </div>

            {/* Price Section */}
            <div style={{
              marginBottom: '20px',
              paddingTop: '16px',
              borderTop: '1px solid #f1f5f9'
            }}>
              {isLoggedIn ? (
                <>
                  {hasDiscount && (
                    <div style={{
                      fontSize: '14px',
                      color: '#94a3b8',
                      textDecoration: 'line-through',
                      marginBottom: '6px',
                      fontWeight: '500'
                    }}>
                      {formatCurrency(product.originalPrice)}
                    </div>
                  )}
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: isMobile ? '6px' : '8px',
                    marginBottom: '6px',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      fontSize: isMobile ? '20px' : '24px',
                      fontWeight: '800',
                      color: '#1a5ca2',
                      lineHeight: '1.2'
                    }}>
                      {formatCurrency(product.price)}
                    </span>
                    <span style={{
                      fontSize: isMobile ? '12px' : '14px',
                      color: '#64748b',
                      fontWeight: '500',
                      whiteSpace: 'nowrap'
                    }}>
                      / {product.unit}
                    </span>
                  </div>
                  {product.promotions && product.promotions.length > 0 && (
                    <div style={{
                      fontSize: isMobile ? '11px' : '12px',
                      color: '#f59e0b',
                      fontWeight: '600',
                      marginTop: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      flexWrap: 'wrap'
                    }}>
                      <span>🎁</span>
                      <span>{isMobile ? 'KM' : 'Khuyến mãi'}: {product.promotions[0]?.description || 'Đặc biệt'}</span>
                    </div>
                  )}
                </>
              ) : (
                <div style={{
                  padding: '16px',
                  background: 'linear-gradient(135deg, #e0f2fe, #bfdbfe)',
                  borderRadius: '12px',
                  textAlign: 'center',
                  border: '1px solid #93c5fd'
                }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#1a5ca2',
                    marginBottom: '8px'
                  }}>
                    🔒 Đăng nhập để xem giá
                  </div>
                  <Link
                    to="/login"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      fontSize: '14px',
                      color: '#1a5ca2',
                      textDecoration: 'none',
                      fontWeight: '600',
                      display: 'inline-block',
                      marginTop: '4px'
                    }}
                  >
                    Đăng nhập ngay →
                  </Link>
                </div>
              )}
            </div>

            {/* Add to Cart Button */}
            {isLoggedIn ? (
              <button
                onClick={handleAddToCart}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'linear-gradient(135deg, #1a5ca2, #3eb4a8)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 12px rgba(26, 92, 162, 0.3)',
                  position: 'relative',
                  overflow: 'hidden'
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
                <span style={{ position: 'relative', zIndex: 1 }}>
                  🛒 Thêm vào giỏ
                </span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'linear-gradient(135deg, #1a5ca2, #3eb4a8)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 12px rgba(26, 92, 162, 0.3)',
                  textDecoration: 'none',
                  display: 'block',
                  textAlign: 'center'
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
                🔐 Đăng nhập để mua
              </Link>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
