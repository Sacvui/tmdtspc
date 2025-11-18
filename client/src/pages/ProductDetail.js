import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ecommerceProducts from '../data/ecommerceProducts.json';
import StarRating from '../components/StarRating';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const isLoggedIn = !!user;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const foundProduct = ecommerceProducts.products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      // Get related products from same category
      const related = ecommerceProducts.products
        .filter(p => p.categoryId === foundProduct.categoryId && p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [id]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      showToast(`✓ Đã thêm ${quantity} ${product.name} vào giỏ hàng!`);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate('/checkout');
    }
  };

  const showToast = (message) => {
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
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  };

  if (!product) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '24px',
          padding: '60px 40px',
          textAlign: 'center',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '80px', marginBottom: '20px' }}>🔍</div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '15px'
          }}>
            Không tìm thấy sản phẩm
          </h2>
          <Link
            to="/products"
            style={{
              display: 'inline-block',
              padding: '14px 28px',
              background: 'linear-gradient(135deg, #1a5ca2, #3eb4a8)',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              marginTop: '20px'
            }}
          >
            Quay lại danh sách sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const category = ecommerceProducts.categories.find(cat => cat.id === product.categoryId);

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
      <div style={{
        minHeight: '100vh',
        background: '#f8fafc',
        padding: '40px 20px',
        paddingBottom: '100px'
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
            <Link to="/categories" style={{ color: '#1a5ca2', textDecoration: 'none' }}>Danh mục</Link>
            {category && (
              <>
                {' / '}
                <Link to={`/products/${category.id}`} style={{ color: '#1a5ca2', textDecoration: 'none' }}>
                  {category.name}
                </Link>
              </>
            )}
            {' / '}
            <span style={{ color: '#1e293b', fontWeight: '600' }}>{product.name}</span>
          </div>

          {/* Main Product Section */}
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            padding: isDesktop ? '50px' : '30px',
            marginBottom: '60px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr',
              gap: isDesktop ? '60px' : '40px',
              alignItems: 'start'
            }}>
              {/* Left Column - Images */}
              <div>
                <div style={{
                  width: '100%',
                  aspectRatio: '1',
                  background: 'linear-gradient(135deg, #1a5ca2 0%, #3eb4a8 100%)',
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <img
                    src={product.image || '/image/logo.png'}
                    alt={product.name}
                    style={{
                      maxWidth: '85%',
                      maxHeight: '85%',
                      objectFit: 'contain'
                    }}
                    onError={(e) => {
                      e.target.src = '/image/logo.png';
                    }}
                  />
                  {hasDiscount && (
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                      color: '#fff',
                      padding: '12px 20px',
                      borderRadius: '30px',
                      fontSize: '16px',
                      fontWeight: '700',
                      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)'
                    }}>
                      -{discountPercent}%
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Product Info */}
              <div>
                <div style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #1a5ca2, #3eb4a8)',
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {category?.name || 'Sản phẩm'}
                </div>

                <h1 style={{
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  fontWeight: '800',
                  color: '#1e293b',
                  marginBottom: '15px',
                  lineHeight: '1.2'
                }}>
                  {product.name}
                </h1>

                <div style={{
                  fontSize: '14px',
                  color: '#64748b',
                  marginBottom: '20px',
                  fontWeight: '500'
                }}>
                  Mã sản phẩm: <span style={{ color: '#1e293b', fontWeight: '700' }}>{product.code}</span>
                </div>

                {/* Rating */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '30px',
                  paddingBottom: '30px',
                  borderBottom: '1px solid #f1f5f9'
                }}>
                  <StarRating rating={product.rating} />
                  <span style={{
                    fontSize: '16px',
                    color: '#64748b',
                    fontWeight: '600'
                  }}>
                    {product.rating} ({product.reviews} đánh giá)
                  </span>
                </div>

                {/* Price Section */}
                <div style={{
                  marginBottom: '30px',
                  paddingBottom: '30px',
                  borderBottom: '1px solid #f1f5f9'
                }}>
                  {isLoggedIn ? (
                    <>
                      {hasDiscount && (
                        <div style={{
                          fontSize: '20px',
                          color: '#94a3b8',
                          textDecoration: 'line-through',
                          marginBottom: '10px',
                          fontWeight: '500'
                        }}>
                          {formatCurrency(product.originalPrice)}
                        </div>
                      )}
                      <div style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '15px',
                        marginBottom: '10px'
                      }}>
                        <span style={{
                          fontSize: 'clamp(36px, 5vw, 48px)',
                          fontWeight: '800',
                          color: '#1a5ca2'
                        }}>
                          {formatCurrency(product.price)}
                        </span>
                        <span style={{
                          fontSize: '18px',
                          color: '#64748b',
                          fontWeight: '500'
                        }}>
                          / {product.unit}
                        </span>
                      </div>
                      {hasDiscount && (
                        <div style={{
                          display: 'inline-block',
                          background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                          color: '#92400e',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          fontWeight: '700',
                          marginTop: '10px'
                        }}>
                          Tiết kiệm {formatCurrency(product.originalPrice - product.price)}
                        </div>
                      )}
                    </>
                  ) : (
                    <div style={{
                      padding: '30px',
                      background: 'linear-gradient(135deg, #e0f2fe, #bfdbfe)',
                      borderRadius: '16px',
                      textAlign: 'center',
                      border: '2px solid #93c5fd'
                    }}>
                      <div style={{
                        fontSize: '48px',
                        marginBottom: '20px'
                      }}>
                        🔒
                      </div>
                      <div style={{
                        fontSize: '24px',
                        fontWeight: '800',
                        color: '#1a5ca2',
                        marginBottom: '12px'
                      }}>
                        Đăng nhập để xem giá
                      </div>
                      <p style={{
                        fontSize: '16px',
                        color: '#475569',
                        marginBottom: '24px',
                        lineHeight: '1.6'
                      }}>
                        Vui lòng đăng nhập để xem giá sản phẩm và thực hiện mua hàng
                      </p>
                      <Link
                        to="/login"
                        style={{
                          display: 'inline-block',
                          padding: '16px 32px',
                          background: 'linear-gradient(135deg, #1a5ca2, #3eb4a8)',
                          color: '#fff',
                          textDecoration: 'none',
                          borderRadius: '12px',
                          fontSize: '16px',
                          fontWeight: '700',
                          boxShadow: '0 4px 12px rgba(26, 92, 162, 0.3)',
                          transition: 'all 0.3s'
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
                        Đăng nhập ngay
                      </Link>
                    </div>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <div style={{
                    marginBottom: '30px',
                    paddingBottom: '30px',
                    borderBottom: '1px solid #f1f5f9'
                  }}>
                    <h3 style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#1e293b',
                      marginBottom: '15px'
                    }}>
                      Mô tả sản phẩm
                    </h3>
                    <p style={{
                      fontSize: '16px',
                      color: '#64748b',
                      lineHeight: '1.8',
                      margin: 0
                    }}>
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Quantity Selector */}
                <div style={{
                  marginBottom: '30px',
                  paddingBottom: '30px',
                  borderBottom: '1px solid #f1f5f9'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '15px'
                  }}>
                    Số lượng
                  </h3>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    background: '#f8fafc',
                    padding: '12px',
                    borderRadius: '12px',
                    width: 'fit-content'
                  }}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{
                        width: '45px',
                        height: '45px',
                        background: '#fff',
                        border: '2px solid #e2e8f0',
                        borderRadius: '10px',
                        fontSize: '24px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                        color: '#475569',
                        fontWeight: '600'
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
                      fontSize: '24px',
                      fontWeight: '700',
                      minWidth: '60px',
                      textAlign: 'center',
                      color: '#1e293b'
                    }}>
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      style={{
                        width: '45px',
                        height: '45px',
                        background: '#fff',
                        border: '2px solid #e2e8f0',
                        borderRadius: '10px',
                        fontSize: '24px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s',
                        color: '#475569',
                        fontWeight: '600'
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
                </div>

                {/* Action Buttons */}
                {isLoggedIn ? (
                  <div style={{
                    display: 'flex',
                    flexDirection: isDesktop ? 'row' : 'column',
                    gap: '20px'
                  }}>
                    <button
                      onClick={handleAddToCart}
                      style={{
                        flex: 1,
                        padding: '20px',
                        background: '#fff',
                        color: '#1a5ca2',
                        border: '2px solid #1a5ca2',
                        borderRadius: '14px',
                        fontSize: '18px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        boxShadow: '0 4px 12px rgba(26, 92, 162, 0.2)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f8fafc';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(26, 92, 162, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#fff';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(26, 92, 162, 0.2)';
                      }}
                    >
                      🛒 Thêm vào giỏ
                    </button>
                    <button
                      onClick={handleBuyNow}
                      style={{
                        flex: 1,
                        padding: '20px',
                        background: 'linear-gradient(135deg, #1a5ca2, #3eb4a8)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '14px',
                        fontSize: '18px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        boxShadow: '0 10px 30px rgba(26, 92, 162, 0.4)'
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
                      💳 Mua ngay
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    style={{
                      display: 'block',
                      padding: '20px',
                      background: 'linear-gradient(135deg, #1a5ca2, #3eb4a8)',
                      color: '#fff',
                      textDecoration: 'none',
                      borderRadius: '14px',
                      fontSize: '18px',
                      fontWeight: '700',
                      textAlign: 'center',
                      boxShadow: '0 10px 30px rgba(26, 92, 162, 0.4)',
                      transition: 'all 0.3s'
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
                    🔐 Đăng nhập để mua hàng
                  </Link>
                )}

                {/* Product Info */}
                <div style={{
                  marginTop: '40px',
                  padding: '25px',
                  background: '#f8fafc',
                  borderRadius: '16px'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '20px'
                  }}>
                    <div>
                      <div style={{
                        fontSize: '13px',
                        color: '#64748b',
                        marginBottom: '5px',
                        fontWeight: '500'
                      }}>
                        Đơn vị
                      </div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#1e293b'
                      }}>
                        {product.unit}
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: '13px',
                        color: '#64748b',
                        marginBottom: '5px',
                        fontWeight: '500'
                      }}>
                        Đánh giá
                      </div>
                      <div style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#1e293b'
                      }}>
                        {product.rating} ⭐ ({product.reviews} đánh giá)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 style={{
                fontSize: 'clamp(28px, 4vw, 36px)',
                fontWeight: '800',
                color: '#1e293b',
                marginBottom: '30px',
                textAlign: 'center'
              }}>
                Sản phẩm liên quan
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '28px'
              }}>
                {relatedProducts.map(relatedProduct => (
                  <Link
                    key={relatedProduct.id}
                    to={`/product/${relatedProduct.id}`}
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
                      border: '1px solid #f1f5f9'
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
                      <div style={{
                        width: '100%',
                        height: '280px',
                        background: 'linear-gradient(135deg, #1a5ca2 0%, #3eb4a8 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                      }}>
                        <img
                          src={relatedProduct.image || '/image/logo.png'}
                          alt={relatedProduct.name}
                          style={{
                            maxWidth: '85%',
                            maxHeight: '85%',
                            objectFit: 'contain'
                          }}
                          onError={(e) => {
                            e.target.src = '/image/logo.png';
                          }}
                        />
                      </div>
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
                          fontWeight: '600'
                        }}>
                          {relatedProduct.code}
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
                          {relatedProduct.name}
                        </h3>
                        {isLoggedIn ? (
                          <div style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '8px',
                            marginTop: 'auto'
                          }}>
                            <span style={{
                              fontSize: '24px',
                              fontWeight: '800',
                              color: '#1a5ca2'
                            }}>
                              {formatCurrency(relatedProduct.price)}
                            </span>
                            <span style={{
                              fontSize: '14px',
                              color: '#64748b',
                              fontWeight: '500'
                            }}>
                              / {relatedProduct.unit}
                            </span>
                          </div>
                        ) : (
                          <div style={{
                            marginTop: 'auto',
                            padding: '12px',
                            background: 'linear-gradient(135deg, #e0f2fe, #bfdbfe)',
                            borderRadius: '10px',
                            textAlign: 'center',
                            border: '1px solid #93c5fd'
                          }}>
                            <div style={{
                              fontSize: '13px',
                              fontWeight: '700',
                              color: '#1a5ca2'
                            }}>
                              🔒 Đăng nhập để xem giá
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;

