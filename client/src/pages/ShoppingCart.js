import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import ecommerceProducts from '../data/ecommerceProducts.json';

const ShoppingCart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    calculatePromotions
  } = useCart();
  const navigate = useNavigate();
  const [showPromotions, setShowPromotions] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const calculation = calculatePromotions(cartItems, ecommerceProducts.promotions);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng trống!');
      return;
    }
    navigate('/checkout', { state: { calculation } });
  };

  if (cartItems.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f8fafc',
        padding: '40px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '30px',
          padding: '80px 60px',
          textAlign: 'center',
          maxWidth: '600px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            fontSize: '120px', 
            marginBottom: '30px',
            filter: 'grayscale(0.3)'
          }}>
            🛒
          </div>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: '#1e293b',
            marginBottom: '15px'
          }}>
            Giỏ hàng trống
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#64748b',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm
          </p>
          <Link
            to="/categories"
            style={{
              display: 'inline-block',
              padding: '18px 36px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
            }}
          >
            🛍️ Mua sắm ngay
          </Link>
        </div>
      </div>
    );
  }

  const isMobile = !isDesktop;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      padding: isMobile ? '20px 16px' : '40px 20px',
      paddingBottom: isMobile ? '100px' : '120px'
    }}>
      {/* Container - Desktop Optimized */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: isDesktop ? '1fr 420px' : '1fr',
        gap: '40px'
      }}>
        {/* Left Column - Cart Items */}
        <div style={{ flex: 1 }}>
          {/* Header */}
          <div style={{
            background: '#fff',
            borderRadius: isMobile ? '16px' : '24px',
            padding: isMobile ? '20px 16px' : '35px',
            marginBottom: isMobile ? '20px' : '30px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: isMobile ? 'flex-start' : 'center',
              gap: isMobile ? '16px' : '0'
            }}>
              <div style={{ flex: 1 }}>
                <h1 style={{
                  fontSize: isMobile ? '24px' : '36px',
                  fontWeight: '800',
                  color: '#1e293b',
                  marginBottom: '8px',
                  lineHeight: '1.3'
                }}>
                  🛒 Giỏ hàng
                </h1>
                <p style={{
                  fontSize: isMobile ? '14px' : '16px',
                  color: '#64748b',
                  margin: 0
                }}>
                  {cartItems.length} sản phẩm trong giỏ
                </p>
              </div>
              <button
                onClick={clearCart}
                style={{
                  padding: isMobile ? '10px 16px' : '12px 24px',
                  background: '#fee2e2',
                  color: '#dc2626',
                  border: 'none',
                  borderRadius: isMobile ? '8px' : '10px',
                  fontSize: isMobile ? '13px' : '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  width: isMobile ? '100%' : 'auto',
                  minHeight: isMobile ? '44px' : 'auto'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#fecaca';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fee2e2';
                }}
              >
                🗑️ Xóa tất cả
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginBottom: '30px'
          }}>
            {cartItems.map(item => (
              <div
                key={item.id}
                style={{
                  background: '#fff',
                  borderRadius: isMobile ? '16px' : '20px',
                  padding: isMobile ? '16px' : '28px',
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: isMobile ? '16px' : '24px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s',
                  border: '1px solid #f1f5f9'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = '#f1f5f9';
                }}
              >
                <div style={{
                  display: 'flex',
                  gap: isMobile ? '12px' : '24px',
                  width: '100%'
                }}>
                  <img
                    src={item.image || '/image/logo.png'}
                    alt={item.name}
                    style={{
                      width: isMobile ? '100px' : '140px',
                      height: isMobile ? '100px' : '140px',
                      objectFit: 'contain',
                      borderRadius: isMobile ? '12px' : '16px',
                      background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
                      flexShrink: 0,
                      border: '1px solid #e2e8f0'
                    }}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
                    <div>
                      <h3 style={{
                        fontSize: isMobile ? '16px' : '20px',
                        fontWeight: '700',
                        color: '#1e293b',
                        margin: '0 0 8px 0',
                        lineHeight: '1.4',
                        wordWrap: 'break-word'
                      }}>
                        {item.name}
                      </h3>
                      <div style={{
                        fontSize: isMobile ? '12px' : '14px',
                        color: '#64748b',
                        marginBottom: '12px',
                        wordWrap: 'break-word'
                      }}>
                        {item.code} • {formatCurrency(item.price)} / {item.unit}
                      </div>
                    </div>
                  </div>
                </div>
                  
                  {/* Quantity Controls */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: isMobile ? '12px' : '20px',
                    marginTop: isMobile ? '8px' : '0'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: isMobile ? '12px' : '15px',
                      background: '#f8fafc',
                      padding: isMobile ? '6px' : '8px',
                      borderRadius: isMobile ? '10px' : '12px',
                      flex: 1,
                      justifyContent: 'center'
                    }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: isMobile ? '36px' : '40px',
                          height: isMobile ? '36px' : '40px',
                          background: '#fff',
                          border: '1px solid #e2e8f0',
                          borderRadius: isMobile ? '8px' : '10px',
                          fontSize: isMobile ? '18px' : '20px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s',
                          color: '#475569',
                          fontWeight: '600',
                          minWidth: isMobile ? '36px' : '40px',
                          minHeight: isMobile ? '36px' : '40px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#f1f5f9';
                          e.currentTarget.style.borderColor = '#cbd5e1';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#fff';
                          e.currentTarget.style.borderColor = '#e2e8f0';
                        }}
                      >
                        −
                      </button>
                      <span style={{
                        fontSize: isMobile ? '16px' : '18px',
                        fontWeight: '700',
                        minWidth: isMobile ? '40px' : '50px',
                        textAlign: 'center',
                        color: '#1e293b'
                      }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: isMobile ? '36px' : '40px',
                          height: isMobile ? '36px' : '40px',
                          background: '#fff',
                          border: '1px solid #e2e8f0',
                          borderRadius: isMobile ? '8px' : '10px',
                          fontSize: isMobile ? '18px' : '20px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s',
                          color: '#475569',
                          fontWeight: '600',
                          minWidth: isMobile ? '36px' : '40px',
                          minHeight: isMobile ? '36px' : '40px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#f1f5f9';
                          e.currentTarget.style.borderColor = '#cbd5e1';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#fff';
                          e.currentTarget.style.borderColor = '#e2e8f0';
                        }}
                      >
                        +
                      </button>
                    </div>
                    <div style={{
                      fontSize: isMobile ? '18px' : '24px',
                      fontWeight: '800',
                      color: '#1a5ca2',
                      minWidth: isMobile ? '100px' : '150px',
                      textAlign: 'right',
                      flex: isMobile ? 1 : 'none'
                    }}>
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        padding: isMobile ? '8px 16px' : '10px 20px',
                        background: '#fee2e2',
                        minHeight: isMobile ? '36px' : 'auto',
                        fontSize: isMobile ? '13px' : '14px',
                        color: '#dc2626',
                        border: 'none',
                        borderRadius: isMobile ? '8px' : '10px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontWeight: '600'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#fecaca';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#fee2e2';
                      }}
                    >
                      🗑️ Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Promotions Summary */}
          {showPromotions && (calculation.appliedPromotions.length > 0 || calculation.gifts.length > 0) && (
            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '28px',
              marginBottom: '30px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #f1f5f9'
            }}>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                🎁 Khuyến mãi đã áp dụng
              </h3>
              {calculation.appliedPromotions.map((promo, index) => (
                <div key={index} style={{
                  padding: '14px',
                  background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
                  borderRadius: '12px',
                  marginBottom: '10px',
                  fontSize: '14px',
                  color: '#065f46',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ fontSize: '18px' }}>✓</span>
                  <span>{promo.description} - Giảm {formatCurrency(promo.discount)}</span>
                </div>
              ))}
              {calculation.gifts.map((gift, index) => (
                <div key={index} style={{
                  padding: '14px',
                  background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                  borderRadius: '12px',
                  marginBottom: '10px',
                  fontSize: '14px',
                  color: '#92400e',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ fontSize: '18px' }}>🎁</span>
                  <span>Tặng: {gift.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Summary (Desktop) */}
        <div style={{
          position: isDesktop ? 'sticky' : 'relative',
          top: isDesktop ? '20px' : '0',
          height: 'fit-content'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '35px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            border: '1px solid #f1f5f9',
            position: 'sticky',
            top: '20px'
          }}>
            <h3 style={{
              fontSize: '26px',
              fontWeight: '800',
              color: '#1e293b',
              marginBottom: '28px'
            }}>
              Tóm tắt đơn hàng
            </h3>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '16px',
              fontSize: '16px',
              color: '#64748b',
              fontWeight: '500'
            }}>
              <span>Tạm tính:</span>
              <span style={{ color: '#1e293b', fontWeight: '600' }}>{formatCurrency(calculation.subtotal)}</span>
            </div>
            {calculation.discountAmount > 0 && (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '16px',
                fontSize: '16px',
                color: '#10b981',
                fontWeight: '700'
              }}>
                <span>Giảm giá:</span>
                <span>-{formatCurrency(calculation.discountAmount)}</span>
              </div>
            )}
            <div style={{
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #e2e8f0, transparent)',
              margin: '24px 0'
            }} />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '32px',
              fontSize: '28px',
              fontWeight: '800',
              color: '#667eea'
            }}>
              <span>Tổng cộng:</span>
              <span>{formatCurrency(calculation.total)}</span>
            </div>
            <button
              onClick={handleCheckout}
              style={{
                width: '100%',
                padding: '20px',
                background: 'linear-gradient(135deg, #1a5ca2, #3eb4a8)',
                color: '#fff',
                border: 'none',
                borderRadius: '14px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(26, 92, 162, 0.4)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
              }}
            >
              💳 Thanh toán
            </button>
            <Link
              to="/products"
              style={{
                display: 'block',
                textAlign: 'center',
                marginTop: '20px',
                color: '#64748b',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#667eea';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#64748b';
              }}
            >
              ← Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
