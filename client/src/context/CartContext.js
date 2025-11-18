import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [promotions, setPromotions] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('sapharco_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('sapharco_cart', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('sapharco_cart');
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Calculate promotions
  const calculatePromotions = (cartItems, allPromotions) => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const appliedPromotions = [];
    let discountAmount = 0;
    const gifts = [];

    // Apply product-specific promotions
    cartItems.forEach(item => {
      if (item.promotions && item.promotions.length > 0) {
        item.promotions.forEach(promo => {
          if (promo.type === 'discount') {
            // Check if quantity meets requirement
            const minQty = parseInt(promo.description.match(/\d+/)?.[0] || 0);
            if (item.quantity >= minQty) {
              const itemDiscount = (item.price * item.quantity * promo.value) / 100;
              discountAmount += itemDiscount;
              appliedPromotions.push({
                ...promo,
                productName: item.name,
                discount: itemDiscount
              });
            }
          } else if (promo.type === 'gift') {
            const minQty = parseInt(promo.description.match(/\d+/)?.[0] || 0);
            if (item.quantity >= minQty) {
              gifts.push({
                name: promo.value,
                description: promo.description,
                productName: item.name,
                quantity: 1
              });
            }
          }
        });
      }
    });

    // Apply global promotions - only the best discount (highest value)
    let bestDiscount = { value: 0, promo: null };
    const applicableGifts = [];

    allPromotions.forEach(promo => {
      if (promo.type === 'discount' && subtotal >= promo.minOrder) {
        const promoDiscount = (subtotal * promo.value) / 100;
        if (promoDiscount > bestDiscount.value) {
          bestDiscount = { value: promoDiscount, promo: { ...promo, discount: promoDiscount } };
        }
      } else if (promo.type === 'gift' && subtotal >= promo.minOrder) {
        applicableGifts.push({
          name: promo.value,
          description: promo.description,
          quantity: 1
        });
      }
    });

    // Apply best discount
    if (bestDiscount.promo) {
      discountAmount += bestDiscount.value;
      appliedPromotions.push(bestDiscount.promo);
    }

    // Add applicable gifts
    gifts.push(...applicableGifts);

    return {
      subtotal,
      discountAmount,
      total: Math.max(0, subtotal - discountAmount),
      appliedPromotions,
      gifts,
      totalItems
    };
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    calculatePromotions,
    promotions,
    setPromotions
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

