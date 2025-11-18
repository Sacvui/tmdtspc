import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import ecommerceProducts from '../data/ecommerceProducts.json';

const CategoryList = () => {
  const categories = ecommerceProducts.categories;
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get hot products (top rated products with most reviews)
  const hotProducts = [...ecommerceProducts.products]
    .sort((a, b) => {
      // Sort by rating first, then by reviews
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return b.reviews - a.reviews;
    })
    .slice(0, 8); // Get top 8 products

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      padding: '60px 20px'
    }}>
      {/* Container - Desktop Optimized */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #1a5ca2 0%, #3eb4a8 100%)',
          borderRadius: '30px',
          padding: '60px 40px',
          marginBottom: '60px',
          textAlign: 'center',
          boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            filter: 'blur(40px)'
          }} />
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: '800',
            color: '#fff',
            marginBottom: '20px',
            textShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            🛍️ Danh mục sản phẩm Sapharco
          </h1>
          <p style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '10px',
            maxWidth: '600px',
            margin: '0 auto 10px',
            lineHeight: '1.6'
          }}>
            Khám phá các danh mục sản phẩm đa dạng và chất lượng
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '28px'
        }}>
          {categories.map(category => (
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
                borderRadius: '24px',
                padding: '45px 35px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                height: '100%',
                border: '2px solid #f1f5f9',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.15)';
                e.currentTarget.style.borderColor = '#1a5ca2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = '#f1f5f9';
              }}
              >
                <div style={{
                  fontSize: '80px',
                  marginBottom: '25px',
                  transition: 'transform 0.3s',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                }}>
                  {category.icon}
                </div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '12px'
                }}>
                  {category.name}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#64748b',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Hot Products Section */}
        <div style={{ marginTop: '80px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px'
          }}>
            <div>
              <h2 style={{
                fontSize: isDesktop ? '36px' : '28px',
                fontWeight: '800',
                color: '#1e293b',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                🔥 Sản phẩm hot
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#64748b'
              }}>
                Những sản phẩm được đánh giá cao và yêu thích nhất
              </p>
            </div>
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
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isDesktop ? 'repeat(auto-fill, minmax(260px, 1fr))' : 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '28px'
          }}>
            {hotProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
