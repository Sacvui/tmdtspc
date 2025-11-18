import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ecommerceProducts from '../data/ecommerceProducts.json';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, clearCart, calculatePromotions } = useCart();
  const [showCalculation, setShowCalculation] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
  const printRef = useRef(null);
  
  const calculation = calculatePromotions(cartItems, ecommerceProducts.promotions);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    note: ''
  });

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

  const handleCalculateTotal = () => {
    setShowCalculation(true);
  };

  const handlePrint = () => {
    if (!printRef.current) return;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Đơn đặt hàng - Sapharco</title>
          <style>
            @media print {
              body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
              .no-print { display: none; }
            }
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #1a5ca2; padding-bottom: 20px; }
            .logo { max-width: 150px; margin-bottom: 10px; }
            .company-name { font-size: 24px; font-weight: bold; color: #1a5ca2; margin-bottom: 5px; }
            .company-info { font-size: 12px; color: #666; }
            .order-info { margin: 20px 0; }
            .order-info h2 { color: #1a5ca2; font-size: 20px; margin-bottom: 15px; }
            .info-row { display: flex; margin-bottom: 8px; }
            .info-label { font-weight: bold; width: 150px; }
            .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .items-table th, .items-table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            .items-table th { background: #1a5ca2; color: white; }
            .items-table tr:nth-child(even) { background: #f9f9f9; }
            .summary { margin-top: 30px; text-align: right; }
            .summary-row { display: flex; justify-content: flex-end; margin-bottom: 10px; }
            .summary-label { width: 200px; text-align: right; margin-right: 20px; }
            .summary-value { width: 150px; text-align: right; font-weight: bold; }
            .total { font-size: 20px; color: #1a5ca2; border-top: 2px solid #1a5ca2; padding-top: 10px; }
            .promotions { margin: 20px 0; padding: 15px; background: #f0f9ff; border-left: 4px solid #1a5ca2; }
            .promotions h3 { color: #1a5ca2; margin-bottom: 10px; }
            .promo-item { margin-bottom: 8px; }
            .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 20px; }
          </style>
        </head>
        <body>
          ${printRef.current.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showCalculation) {
      alert('Vui lòng nhấn "Tính tổng đơn" trước khi đặt hàng!');
      return;
    }
    // Simulate order placement
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #10b981;
      color: white;
      padding: 30px 50px;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      z-index: 10000;
      animation: fadeIn 0.3s ease;
      font-weight: 700;
      font-size: 18px;
      text-align: center;
    `;
    toast.innerHTML = '✓ Đặt hàng thành công!<br/><span style="font-size: 14px; opacity: 0.9;">Cảm ơn bạn đã mua sắm tại Sapharco</span>';
    document.body.appendChild(toast);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 2000);
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
          <h2 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: '#1e293b',
            marginBottom: '20px'
          }}>
            Giỏ hàng trống
          </h2>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '18px 36px',
              background: 'linear-gradient(135deg, #1a5ca2, #3eb4a8)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(26, 92, 162, 0.3)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(26, 92, 162, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(26, 92, 162, 0.3)';
            }}
          >
            Quay lại mua sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
        }
      `}</style>
      <div style={{
        minHeight: '100vh',
        background: '#f8fafc',
        padding: '40px 20px',
        paddingBottom: '60px'
      }}>
        {/* Container - Desktop Optimized */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isDesktop ? '1fr 480px' : '1fr',
          gap: '40px'
        }}>
          {/* Left Column - Form */}
          <div>
            <div style={{
              background: '#fff',
              borderRadius: '24px',
              padding: '45px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #f1f5f9'
            }}>
              <div style={{
                marginBottom: '35px'
              }}>
                <h1 style={{
                  fontSize: '36px',
                  fontWeight: '800',
                  color: '#1e293b',
                  marginBottom: '10px'
                }}>
                  💳 Thanh toán
                </h1>
                <p style={{
                  fontSize: '16px',
                  color: '#64748b'
                }}>
                  Vui lòng điền thông tin để hoàn tất đơn hàng
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr',
                  gap: '24px',
                  marginBottom: '24px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#1e293b',
                      marginBottom: '10px'
                    }}>
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '16px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '15px',
                        outline: 'none',
                        transition: 'all 0.2s',
                        background: '#f8fafc',
                        fontWeight: '500'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#1a5ca2';
                        e.currentTarget.style.background = '#fff';
                        e.currentTarget.style.boxShadow = '0 0 0 4px rgba(26, 92, 162, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.background = '#f8fafc';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#1e293b',
                      marginBottom: '10px'
                    }}>
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '16px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '15px',
                        outline: 'none',
                        transition: 'all 0.2s',
                        background: '#f8fafc',
                        fontWeight: '500'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#1a5ca2';
                        e.currentTarget.style.background = '#fff';
                        e.currentTarget.style.boxShadow = '0 0 0 4px rgba(26, 92, 162, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.background = '#f8fafc';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '10px'
                  }}>
                    Địa chỉ giao hàng *
                  </label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '16px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '15px',
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'all 0.2s',
                      fontFamily: 'inherit',
                      background: '#f8fafc',
                      fontWeight: '500'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#1a5ca2';
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(26, 92, 162, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.background = '#f8fafc';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '10px'
                  }}>
                    Email (tùy chọn)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '16px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      background: '#f8fafc',
                      fontWeight: '500'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#1a5ca2';
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(26, 92, 162, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.background = '#f8fafc';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div style={{ marginBottom: '35px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '10px'
                  }}>
                    Ghi chú đơn hàng (tùy chọn)
                  </label>
                  <textarea
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    rows={4}
                    placeholder="Ví dụ: Giao hàng vào buổi sáng, gọi trước khi giao..."
                    style={{
                      width: '100%',
                      padding: '16px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '15px',
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'all 0.2s',
                      fontFamily: 'inherit',
                      background: '#f8fafc',
                      fontWeight: '500'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#1a5ca2';
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(26, 92, 162, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.background = '#f8fafc';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Order Summary */}
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
              
              {/* Order Items */}
              <div style={{
                maxHeight: '320px',
                overflowY: 'auto',
                marginBottom: '24px',
                paddingRight: '10px'
              }}>
                {cartItems.map(item => (
                  <div key={item.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '18px',
                    paddingBottom: '18px',
                    borderBottom: '1px solid #f1f5f9'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '15px',
                        fontWeight: '700',
                        color: '#1e293b',
                        marginBottom: '6px'
                      }}>
                        {item.name}
                      </div>
                      <div style={{
                        fontSize: '13px',
                        color: '#64748b'
                      }}>
                        {item.code} × {item.quantity}
                      </div>
                    </div>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#1a5ca2',
                      marginLeft: '15px'
                    }}>
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #e2e8f0, transparent)',
                margin: '24px 0'
              }} />
              
              {!showCalculation ? (
                <button
                  onClick={handleCalculateTotal}
                  style={{
                    width: '100%',
                    padding: '18px',
                    background: 'linear-gradient(135deg, #1a5ca2, #3eb4a8)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '14px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(26, 92, 162, 0.4)',
                    transition: 'all 0.3s',
                    marginBottom: '20px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(26, 92, 162, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(26, 92, 162, 0.4)';
                  }}
                >
                  🧮 Tính tổng đơn
                </button>
              ) : (
                <>
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
                  
                  {/* Promotions Display */}
                  {calculation.appliedPromotions.length > 0 && (
                    <div style={{
                      marginBottom: '16px',
                      padding: '15px',
                      background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
                      borderRadius: '12px',
                      border: '1px solid #10b981'
                    }}>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#065f46',
                        marginBottom: '10px'
                      }}>
                        🎁 Khuyến mãi đã áp dụng:
                      </div>
                      {calculation.appliedPromotions.map((promo, index) => (
                        <div key={index} style={{
                          fontSize: '13px',
                          color: '#047857',
                          marginBottom: '5px',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                          <span>✓ {promo.description || promo.name}</span>
                          <span style={{ fontWeight: '700' }}>-{formatCurrency(promo.discount || (calculation.subtotal * promo.value / 100))}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {calculation.gifts.length > 0 && (
                    <div style={{
                      marginBottom: '16px',
                      padding: '15px',
                      background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                      borderRadius: '12px',
                      border: '1px solid #f59e0b'
                    }}>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: '700',
                        color: '#92400e',
                        marginBottom: '10px'
                      }}>
                        🎁 Quà tặng kèm:
                      </div>
                      {calculation.gifts.map((gift, index) => (
                        <div key={index} style={{
                          fontSize: '13px',
                          color: '#78350f',
                          marginBottom: '5px'
                        }}>
                          • {gift.name || gift.value}
                        </div>
                      ))}
                    </div>
                  )}
                  
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
                    fontSize: '28px',
                    fontWeight: '800',
                    color: '#1a5ca2',
                    marginBottom: '32px'
                  }}>
                    <span>Tổng cộng:</span>
                    <span>{formatCurrency(calculation.total)}</span>
                  </div>
                  
                  <button
                    type="submit"
                    onClick={handleSubmit}
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
                      transition: 'all 0.3s',
                      marginBottom: '15px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 15px 40px rgba(26, 92, 162, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(26, 92, 162, 0.4)';
                    }}
                  >
                    💳 Đặt hàng ngay
                  </button>
                  
                  <button
                    onClick={handlePrint}
                    className="no-print"
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: '#fff',
                      color: '#1a5ca2',
                      border: '2px solid #1a5ca2',
                      borderRadius: '14px',
                      fontSize: '16px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f8fafc';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    🖨️ In đơn hàng
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Print Template - Hidden */}
      <div ref={printRef} style={{ display: 'none' }}>
        <div className="header">
          <img src="/image/logo.png" alt="Sapharco" className="logo" onError={(e) => e.target.style.display = 'none'} />
          <div className="company-name">SAPHARCO</div>
          <div className="company-info">
            Sàn Thương Mại Điện Tử Sapharco<br/>
            Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM<br/>
            Hotline: 1900 1234 | Email: info@sapharco.com
          </div>
        </div>
        
        <div className="order-info">
          <h2>ĐƠN ĐẶT HÀNG</h2>
          <div className="info-row">
            <span className="info-label">Họ và tên:</span>
            <span>{formData.name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Số điện thoại:</span>
            <span>{formData.phone}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Địa chỉ:</span>
            <span>{formData.address}</span>
          </div>
          {formData.email && (
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span>{formData.email}</span>
            </div>
          )}
          <div className="info-row">
            <span className="info-label">Ngày đặt:</span>
            <span>{new Date().toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>

        <table className="items-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Sản phẩm</th>
              <th>Mã SP</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.code}</td>
                <td>{item.quantity}</td>
                <td>{formatCurrency(item.price)}</td>
                <td>{formatCurrency(item.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {(calculation.appliedPromotions.length > 0 || calculation.gifts.length > 0) && (
          <div className="promotions">
            <h3>Khuyến mãi đã áp dụng:</h3>
            {calculation.appliedPromotions.map((promo, index) => (
              <div key={index} className="promo-item">
                ✓ {promo.description || promo.name} - Giảm {formatCurrency(promo.discount || (calculation.subtotal * promo.value / 100))}
              </div>
            ))}
            {calculation.gifts.map((gift, index) => (
              <div key={index} className="promo-item">
                🎁 Tặng kèm: {gift.name || gift.value}
              </div>
            ))}
          </div>
        )}

        <div className="summary">
          <div className="summary-row">
            <span className="summary-label">Tạm tính:</span>
            <span className="summary-value">{formatCurrency(calculation.subtotal)}</span>
          </div>
          {calculation.discountAmount > 0 && (
            <div className="summary-row">
              <span className="summary-label">Giảm giá:</span>
              <span className="summary-value" style={{ color: '#10b981' }}>-{formatCurrency(calculation.discountAmount)}</span>
            </div>
          )}
          <div className="summary-row total">
            <span className="summary-label">Tổng cộng:</span>
            <span className="summary-value">{formatCurrency(calculation.total)}</span>
          </div>
        </div>

        {formData.note && (
          <div style={{ marginTop: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
            <strong>Ghi chú:</strong> {formData.note}
          </div>
        )}

        <div className="footer">
          Cảm ơn quý khách đã tin tưởng và sử dụng dịch vụ của Sapharco!<br/>
          Đơn hàng này được tạo tự động từ hệ thống.
        </div>
      </div>
    </>
  );
};

export default Checkout;
