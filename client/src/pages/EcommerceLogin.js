import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const EcommerceLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mockup login: user/user
      if (formData.username === 'user' && formData.password === 'user') {
        // Create or get user
        const mockUser = {
          id: 'ecommerce-user-001',
          username: 'user',
          phone: '0900000000',
          name: 'Khách hàng',
          role: 'CUSTOMER',
          email: 'user@sapharco.com',
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };

        // Save to localStorage
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = users.find(u => u.username === 'user' || u.id === mockUser.id);
        if (!existingUser) {
          users.push(mockUser);
          localStorage.setItem('users', JSON.stringify(users));
        } else {
          const index = users.findIndex(u => u.id === existingUser.id || u.username === 'user');
          users[index] = { ...existingUser, ...mockUser, lastLogin: new Date().toISOString() };
          localStorage.setItem('users', JSON.stringify(users));
        }

        // Trigger login success - reload to update AuthContext
        const from = location.state?.from?.pathname || '/';
        setTimeout(() => {
          window.location.href = from;
        }, 500);
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại với: user/user');
      }
    } catch (err) {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a5ca2 0%, #3eb4a8 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '24px',
        padding: isDesktop ? '50px' : '30px',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        {/* Logo */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 20px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #1a5ca2, #3eb4a8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(26, 92, 162, 0.3)'
          }}>
            <img
              src="/image/logo.png"
              alt="Sapharco"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                padding: '12px'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<span style="font-size: 36px; color: white;">🏥</span>';
              }}
            />
          </div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '800',
            color: '#1e293b',
            marginBottom: '8px'
          }}>
            Đăng nhập
          </h1>
          <p style={{
            fontSize: '15px',
            color: '#64748b'
          }}>
            Đăng nhập để xem giá và mua sắm
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '10px'
            }}>
              Tên đăng nhập
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Nhập tên đăng nhập"
              style={{
                width: '100%',
                padding: '16px',
                border: error ? '2px solid #ef4444' : '2px solid #e2e8f0',
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

          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '10px'
            }}>
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Nhập mật khẩu"
              style={{
                width: '100%',
                padding: '16px',
                border: error ? '2px solid #ef4444' : '2px solid #e2e8f0',
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

          {error && (
            <div style={{
              padding: '12px 16px',
              background: '#fee2e2',
              border: '1px solid #fecaca',
              borderRadius: '10px',
              marginBottom: '20px',
              color: '#991b1b',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              {error}
            </div>
          )}

          {/* Mockup Info */}
          <div style={{
            padding: '12px 16px',
            background: '#e0f2fe',
            border: '1px solid #bfdbfe',
            borderRadius: '10px',
            marginBottom: '24px',
            fontSize: '13px',
            color: '#1e40af',
            textAlign: 'center'
          }}>
            <strong>Thông tin đăng nhập:</strong><br />
            Tên đăng nhập: <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px' }}>user</code><br />
            Mật khẩu: <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px' }}>user</code>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '18px',
              background: loading 
                ? '#94a3b8' 
                : 'linear-gradient(135deg, #1a5ca2, #3eb4a8)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading 
                ? 'none' 
                : '0 10px 30px rgba(26, 92, 162, 0.4)',
              transition: 'all 0.3s',
              marginBottom: '20px'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(26, 92, 162, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(26, 92, 162, 0.4)';
              }
            }}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        {/* Back to Home */}
        <div style={{
          textAlign: 'center',
          marginTop: '30px',
          paddingTop: '30px',
          borderTop: '1px solid #e2e8f0'
        }}>
          <Link
            to="/"
            style={{
              color: '#1a5ca2',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EcommerceLogin;

