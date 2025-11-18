import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EcommerceHeader from './components/EcommerceHeader';
import EcommerceFooter from './components/EcommerceFooter';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import EcommerceHome from './pages/EcommerceHome';
import EcommerceLogin from './pages/EcommerceLogin';
import AboutUs from './pages/AboutUs';
import CategoryList from './components/CategoryList';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import QuickRegister from './pages/QuickRegister';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import NearbyStations from './pages/NearbyStations';
import Map from './pages/Map';
import StationDetail from './pages/StationDetail';
import CreateStation from './pages/CreateStation';
import CreatePharmacy from './pages/CreatePharmacy';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import AdminDashboard from './pages/AdminDashboard';
import Chat from './pages/Chat';
import CreateOrder from './pages/CreateOrder';
import OrderSummary from './pages/OrderSummary';
import AdminLogin from './pages/admin/AdminLogin';
import AdminWrapper from './pages/admin/AdminWrapper';
import AdminDashboardPage from './pages/admin/AdminDashboard';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminRoutes from './pages/admin/AdminRoutes';
import AdminMap from './pages/admin/AdminMap';
import AdminReports from './pages/admin/AdminReports';
import AdminOrders from './pages/admin/AdminOrders';
import AdminProducts from './pages/admin/AdminProducts';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSettings from './pages/admin/AdminSettings';
import './styles-production.css';
import './styles/ecommerce.css';
import './styles/mobile-fix.css';
import './styles/mobile-ui-optimization.css';

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/quick-register' || location.pathname === '/forgot-password' || location.pathname === '/reset-password';
  const isAdminPage = location.pathname.startsWith('/admin');
  
  // E-commerce routes
  const ecommerceRoutes = ['/', '/ecommerce', '/about', '/categories', '/products', '/product', '/cart', '/checkout', '/login'];
  const isEcommercePage = ecommerceRoutes.some(route => location.pathname === route || location.pathname.startsWith(route + '/'));

  // Admin routes
  if (isAdminPage) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminWrapper><AdminDashboardPage /></AdminWrapper>} />
        <Route path="/admin/customers" element={<AdminWrapper><AdminCustomers /></AdminWrapper>} />
        <Route path="/admin/routes" element={<AdminWrapper><AdminRoutes /></AdminWrapper>} />
        <Route path="/admin/map" element={<AdminWrapper><AdminMap /></AdminWrapper>} />
        <Route path="/admin/reports" element={<AdminWrapper><AdminReports /></AdminWrapper>} />
        <Route path="/admin/orders" element={<AdminWrapper><AdminOrders /></AdminWrapper>} />
        <Route path="/admin/products" element={<AdminWrapper><AdminProducts /></AdminWrapper>} />
        <Route path="/admin/users" element={<AdminWrapper><AdminUsers /></AdminWrapper>} />
        <Route path="/admin/settings" element={<AdminWrapper><AdminSettings /></AdminWrapper>} />
      </Routes>
    );
  }

  return (
    <div className="App">
      {!isAuthPage && (isEcommercePage ? <EcommerceHeader /> : <Navbar />)}
      <div className={`main-content ${isAuthPage ? 'auth-mode' : ''}`}>
        <PageTransition>
          <Routes>
            <Route path="/" element={<EcommerceHome />} />
            <Route path="/home" element={<Home />} />
            <Route path="/ecommerce" element={<EcommerceHome />} />
            <Route path="/login" element={<EcommerceLogin />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:categoryId" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<QuickRegister />} />
            <Route path="/quick-register" element={<QuickRegister />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/nearby" element={<NearbyStations />} />
            <Route path="/map" element={<Map />} />
            <Route path="/station/:id" element={<StationDetail />} />
            <Route path="/create-station" element={<CreateStation />} />
            <Route path="/create-pharmacy" element={<CreatePharmacy />} />
            <Route path="/edit-pharmacy/:id" element={<CreatePharmacy />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin-old" element={<AdminDashboard />} />
            <Route path="/chat/:userId" element={<Chat />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/order-summary" element={<OrderSummary />} />
          </Routes>
        </PageTransition>
      </div>
      {!isAuthPage && (isEcommercePage ? <EcommerceFooter /> : <Footer />)}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;