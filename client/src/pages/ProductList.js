import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ecommerceProducts from '../data/ecommerceProducts.json';

const ProductList = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [activeFilter, setActiveFilter] = useState('all'); // all, hot, active, bestseller
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (categoryId) {
      const categoryData = ecommerceProducts.categories.find(cat => cat.id === categoryId);
      setCategory(categoryData);
      
      const categoryProducts = ecommerceProducts.products.filter(
        product => product.categoryId === categoryId
      );
      setProducts(categoryProducts);
    } else {
      setProducts(ecommerceProducts.products);
      setCategory({ name: 'Tất cả sản phẩm', icon: '🛍️' });
    }
  }, [categoryId]);

  // Get unique brands from products
  const brands = ['all', ...new Set(ecommerceProducts.products.map(p => {
    // Extract brand from product name (usually "Sapharco" or other brand names)
    if (p.name.includes('Sapharco')) return 'Sapharco';
    return 'Khác';
  }))];

  let filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply filters
  if (activeFilter === 'hot') {
    // Sản phẩm hot: rating >= 4.5 và reviews >= 100
    filteredProducts = filteredProducts.filter(p => p.rating >= 4.5 && p.reviews >= 100);
  } else if (activeFilter === 'active') {
    // Hoạt tính: có khuyến mãi
    filteredProducts = filteredProducts.filter(p => p.promotions && p.promotions.length > 0);
  } else if (activeFilter === 'bestseller') {
    // Sản phẩm bán chạy: reviews cao nhất
    filteredProducts = [...filteredProducts].sort((a, b) => b.reviews - a.reviews);
  }

  // Filter by brand
  if (selectedBrand !== 'all') {
    filteredProducts = filteredProducts.filter(p => {
      if (selectedBrand === 'Sapharco') {
        return p.name.includes('Sapharco');
      }
      return !p.name.includes('Sapharco');
    });
  }

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  } else if (activeFilter !== 'bestseller') {
    // Default sort: by rating if no specific sort
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  }

  const isMobile = !isDesktop;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      padding: isMobile ? '20px 16px' : '40px 20px',
      paddingBottom: isMobile ? '80px' : '100px'
    }}>
      {/* Container - Desktop Optimized */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header with Breadcrumb */}
        <div style={{
          marginBottom: '30px'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#64748b',
            marginBottom: '20px'
          }}>
            <span>Trang chủ</span> / <span>Sản phẩm</span>
            {category && <span> / {category.name}</span>}
          </div>
        </div>

        {/* Header */}
        <div style={{
          background: '#fff',
          borderRadius: isMobile ? '16px' : '24px',
          padding: isMobile ? '20px 16px' : '40px',
          marginBottom: isMobile ? '24px' : '40px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '12px' : '20px',
            marginBottom: isMobile ? '20px' : '30px',
            flexWrap: 'wrap'
          }}>
            <div style={{ 
              fontSize: isMobile ? '40px' : '56px',
              background: 'linear-gradient(135deg, #1a5ca2, #3eb4a8)',
              width: isMobile ? '60px' : '80px',
              height: isMobile ? '60px' : '80px',
              borderRadius: isMobile ? '12px' : '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
              flexShrink: 0
            }}>
              {category?.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 style={{
                fontSize: isMobile ? '24px' : 'clamp(28px, 4vw, 40px)',
                fontWeight: '800',
                color: '#1e293b',
                margin: '0 0 8px 0',
                lineHeight: '1.3',
                wordWrap: 'break-word'
              }}>
                {category?.name || 'Sản phẩm'}
              </h1>
              <p style={{
                fontSize: isMobile ? '14px' : '16px',
                color: '#64748b',
                margin: 0
              }}>
                {filteredProducts.length} sản phẩm
              </p>
            </div>
          </div>

          {/* Filter Buttons */}
          <div style={{
            marginBottom: isMobile ? '20px' : '30px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: isMobile ? '8px' : '12px'
          }}>
            <button
              onClick={() => setActiveFilter('all')}
              style={{
                padding: isMobile ? '10px 16px' : '12px 24px',
                borderRadius: isMobile ? '8px' : '10px',
                border: 'none',
                fontSize: isMobile ? '13px' : '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: activeFilter === 'all' 
                  ? 'linear-gradient(135deg, #1a5ca2, #3eb4a8)' 
                  : '#f1f5f9',
                color: activeFilter === 'all' ? '#fff' : '#475569',
                boxShadow: activeFilter === 'all' 
                  ? '0 4px 12px rgba(26, 92, 162, 0.3)' 
                  : 'none',
                minHeight: isMobile ? '40px' : 'auto',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== 'all') {
                  e.currentTarget.style.background = '#e2e8f0';
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== 'all') {
                  e.currentTarget.style.background = '#f1f5f9';
                }
              }}
            >
              Tất cả
            </button>
            <button
              onClick={() => setActiveFilter('hot')}
              style={{
                padding: isMobile ? '10px 16px' : '12px 24px',
                borderRadius: isMobile ? '8px' : '10px',
                border: 'none',
                fontSize: isMobile ? '13px' : '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: activeFilter === 'hot' 
                  ? 'linear-gradient(135deg, #1a5ca2, #3eb4a8)' 
                  : '#f1f5f9',
                color: activeFilter === 'hot' ? '#fff' : '#475569',
                boxShadow: activeFilter === 'hot' 
                  ? '0 4px 12px rgba(26, 92, 162, 0.3)' 
                  : 'none',
                minHeight: isMobile ? '40px' : 'auto',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== 'hot') {
                  e.currentTarget.style.background = '#e2e8f0';
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== 'hot') {
                  e.currentTarget.style.background = '#f1f5f9';
                }
              }}
            >
              🔥 Sản phẩm hot
            </button>
            <button
              onClick={() => setActiveFilter('active')}
              style={{
                padding: isMobile ? '10px 16px' : '12px 24px',
                borderRadius: isMobile ? '8px' : '10px',
                border: 'none',
                fontSize: isMobile ? '13px' : '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: activeFilter === 'active' 
                  ? 'linear-gradient(135deg, #1a5ca2, #3eb4a8)' 
                  : '#f1f5f9',
                color: activeFilter === 'active' ? '#fff' : '#475569',
                boxShadow: activeFilter === 'active' 
                  ? '0 4px 12px rgba(26, 92, 162, 0.3)' 
                  : 'none',
                minHeight: isMobile ? '40px' : 'auto',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== 'active') {
                  e.currentTarget.style.background = '#e2e8f0';
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== 'active') {
                  e.currentTarget.style.background = '#f1f5f9';
                }
              }}
            >
              ⚡ Hoạt tính
            </button>
            <button
              onClick={() => setActiveFilter('bestseller')}
              style={{
                padding: isMobile ? '10px 16px' : '12px 24px',
                borderRadius: isMobile ? '8px' : '10px',
                border: 'none',
                fontSize: isMobile ? '13px' : '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: activeFilter === 'bestseller' 
                  ? 'linear-gradient(135deg, #1a5ca2, #3eb4a8)' 
                  : '#f1f5f9',
                color: activeFilter === 'bestseller' ? '#fff' : '#475569',
                boxShadow: activeFilter === 'bestseller' 
                  ? '0 4px 12px rgba(26, 92, 162, 0.3)' 
                  : 'none',
                minHeight: isMobile ? '40px' : 'auto',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== 'bestseller') {
                  e.currentTarget.style.background = '#e2e8f0';
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== 'bestseller') {
                  e.currentTarget.style.background = '#f1f5f9';
                }
              }}
            >
              📈 Bán chạy
            </button>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              style={{
                padding: isMobile ? '10px 16px' : '12px 20px',
                border: '2px solid #e2e8f0',
                borderRadius: isMobile ? '8px' : '10px',
                fontSize: isMobile ? '13px' : '14px',
                outline: 'none',
                background: '#fff',
                cursor: 'pointer',
                fontWeight: '600',
                color: selectedBrand !== 'all' ? '#1a5ca2' : '#475569',
                minWidth: isMobile ? '120px' : '150px',
                minHeight: isMobile ? '40px' : 'auto',
                width: isMobile ? '100%' : 'auto'
              }}
            >
              <option value="all">Tất cả hãng</option>
              {brands.filter(b => b !== 'all').map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Search and Sort */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isDesktop ? '1fr auto' : '1fr',
            gap: '20px',
            alignItems: 'center'
          }}>
            <div style={{
              position: 'relative'
            }}>
              <input
                type="text"
                placeholder={isMobile ? "🔍 Tìm kiếm..." : "🔍 Tìm kiếm sản phẩm theo tên hoặc mã..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: isMobile ? '12px 16px 12px 44px' : '16px 20px 16px 50px',
                  border: '2px solid #e2e8f0',
                  borderRadius: isMobile ? '10px' : '12px',
                  fontSize: isMobile ? '16px' : '15px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  background: '#f8fafc',
                  minHeight: isMobile ? '44px' : 'auto'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.background = '#f8fafc';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <div style={{
                position: 'absolute',
                left: isMobile ? '14px' : '18px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: isMobile ? '18px' : '20px'
              }}>
                🔍
              </div>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: isMobile ? '12px 16px' : '16px 20px',
                border: '2px solid #e2e8f0',
                borderRadius: isMobile ? '10px' : '12px',
                fontSize: isMobile ? '16px' : '15px',
                outline: 'none',
                background: '#fff',
                cursor: 'pointer',
                fontWeight: '500',
                color: '#475569',
                minWidth: isMobile ? '100%' : '180px',
                minHeight: isMobile ? '44px' : 'auto',
                width: isMobile ? '100%' : 'auto'
              }}
            >
              <option value="default">Mặc định</option>
              <option value="price-low">Giá: Thấp → Cao</option>
              <option value="price-high">Giá: Cao → Thấp</option>
              <option value="rating">Đánh giá cao nhất</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '28px'
          }}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            padding: '100px 40px',
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <div style={{ 
              fontSize: '100px', 
              marginBottom: '30px',
              filter: 'grayscale(1)',
              opacity: 0.5
            }}>
              🔍
            </div>
            <h3 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '15px'
            }}>
              Không tìm thấy sản phẩm
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#64748b',
              marginBottom: '30px',
              maxWidth: '400px',
              margin: '0 auto 30px'
            }}>
              Thử tìm kiếm với từ khóa khác hoặc xem tất cả sản phẩm
            </p>
            <button
              onClick={() => setSearchTerm('')}
              style={{
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #1a5ca2, #3eb4a8)',
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(26, 92, 162, 0.3)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
              }}
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
