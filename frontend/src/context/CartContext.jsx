// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const token = localStorage.getItem('token');

//   // 🎯 1. DATABASE SE FRESH CART UTTHANE KA FUNCTION
//   const fetchUserCart = async () => {
//     const currentToken = localStorage.getItem('token');
//     if (!currentToken) {
//       setCartItems([]);
//       return;
//     }

//     try {
//       const res = await axios.get('http://localhost:5000/api/cart', {
//         headers: { Authorization: `Bearer ${currentToken}` }
//       });
      
//       // SQL JOIN response direct array deta hai (product_id aur sahi quantity ke sath)
//       setCartItems(res.data || []);
//       console.log("Database se fetched cart items:", res.data);
//     } catch (err) {
//       console.error("Error fetching cart from DB:", err);
//       setCartItems([]);
//     }
//   };

//   // 🎯 2. FIXED AUTO RUN: Token change hone par automatic cart load karega
//   useEffect(() => {
//     fetchUserCart();
//   }, [token]);

//   // Helper function taake product_id handle karne mein frontend/backend schema strictly match ho
//   const getProductKey = (item) => item.product_id || item.id;

//   // 🎯 3. ADD TO CART FUNCTION
//   const addToCart = (product, quantity) => {
//     setCartItems((prevItems) => {
//       const pId = getProductKey(product);
//       const exists = prevItems.find(item => getProductKey(item) === pId);
      
//       if (exists) {
//         return prevItems.map(item => 
//           getProductKey(item) === pId 
//             ? { ...item, quantity: (item.quantity || 1) + quantity } 
//             : item
//         );
//       }
//       return [...prevItems, { ...product, quantity }];
//     });
//   };

//   // 🎯 4. QUANTITY UPDATE (Plus / Minus triggers)
//   const updateQuantity = async (productId, newQuantity) => {
//     if (newQuantity < 1) {
//       removeFromCart(productId);
//       return;
//     }

//     // Pehle frontend UI ko fast update karo (Instant Feedback)
//     setCartItems(prev => prev.map(item => 
//       getProductKey(item) === productId ? { ...item, quantity: newQuantity } : item
//     ));

//     // Backend database update query hit karo permanent save ke liye
//     try {
//       const currentToken = localStorage.getItem('token');
//       await axios.put(`http://localhost:5000/api/cart`, { 
//         productId: productId, // Match exactly with backend req.body
//         quantity: newQuantity 
//       }, {
//         headers: { Authorization: `Bearer ${currentToken}` }
//       });
//     } catch (err) {
//       console.error("Backend quantity update failed:", err);
//       // Agar backend fail ho jaye to wapas roll-back karne ke liye refresh karlo
//       fetchUserCart();
//     }
//   };

//   // 🎯 5. REMOVE FROM CART (Trash button controller)
//   const removeFromCart = async (productId) => {
//     // UI se foran remove karo strict validation ke sath
//     setCartItems(prev => prev.filter(item => getProductKey(item) !== productId));

//     try {
//       const currentToken = localStorage.getItem('token');
//       await axios.delete(`http://localhost:5000/api/cart/${productId}`, {
//         headers: { Authorization: `Bearer ${currentToken}` }
//       });
//     } catch (err) {
//       console.error("Backend delete failed:", err);
//       // Fail hone par wapas state sync karo database se
//       fetchUserCart();
//     }
//   };

//   // 🎯 6. LOGOUT CLEANER
//   const logoutCart = () => {
//     setCartItems([]);
//   };

//   // 🎯 7. NEW: CHECKOUT SUCCESS CLEANER
//   // Jab checkout completely done ho jaye to screen se items remove karne ke liye
//   const clearCartLocal = () => {
//     setCartItems([]);
//   };

//   // 🎯 8. SECURE LIVE CALCULATION METRICS
//   const cartCount = cartItems ? cartItems.reduce((total, item) => total + (Number(item.quantity) || 1), 0) : 0;
  
//   const cartTotal = cartItems ? cartItems.reduce((total, item) => {
//     const price = Number(item.price) || 0;
//     const qty = Number(item.quantity) || 1;
//     return total + (price * qty);
//   }, 0) : 0;

//   return (
//     <CartContext.Provider value={{ 
//       cartItems, 
//       cartCount, 
//       cartTotal, 
//       setCartItems, 
//       addToCart, 
//       updateQuantity, 
//       removeFromCart, 
//       logoutCart, 
//       clearCartLocal, // Ab isey aap checkout page pr use kar sakte hain
//       fetchUserCart 
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);









import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// 🎯 Agar Vercel/production me VITE_API_URL set hai to wahi use hoga,
// warna local PC par apne aap localhost:5000 par fallback ho jayega
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('token');

  // 🎯 1. DATABASE SE FRESH CART UTTHANE KA FUNCTION
  const fetchUserCart = async () => {
    const currentToken = localStorage.getItem('token');
    if (!currentToken) {
      setCartItems([]);
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      
      // SQL JOIN response direct array deta hai (product_id aur sahi quantity ke sath)
      setCartItems(res.data || []);
      console.log("Database se fetched cart items:", res.data);
    } catch (err) {
      console.error("Error fetching cart from DB:", err);
      setCartItems([]);
    }
  };

  // 🎯 2. FIXED AUTO RUN: Token change hone par automatic cart load karega
  useEffect(() => {
    fetchUserCart();
  }, [token]);

  // Helper function taake product_id handle karne mein frontend/backend schema strictly match ho
  const getProductKey = (item) => item.product_id || item.id;

  // 🎯 3. ADD TO CART FUNCTION
  const addToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      const pId = getProductKey(product);
      const exists = prevItems.find(item => getProductKey(item) === pId);
      
      if (exists) {
        return prevItems.map(item => 
          getProductKey(item) === pId 
            ? { ...item, quantity: (item.quantity || 1) + quantity } 
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  // 🎯 4. QUANTITY UPDATE (Plus / Minus triggers)
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    // Pehle frontend UI ko fast update karo (Instant Feedback)
    setCartItems(prev => prev.map(item => 
      getProductKey(item) === productId ? { ...item, quantity: newQuantity } : item
    ));

    // Backend database update query hit karo permanent save ke liye
    try {
      const currentToken = localStorage.getItem('token');
      await axios.put(`${API_URL}/api/cart`, { 
        productId: productId, // Match exactly with backend req.body
        quantity: newQuantity 
      }, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
    } catch (err) {
      console.error("Backend quantity update failed:", err);
      // Agar backend fail ho jaye to wapas roll-back karne ke liye refresh karlo
      fetchUserCart();
    }
  };

  // 🎯 5. REMOVE FROM CART (Trash button controller)
  const removeFromCart = async (productId) => {
    // UI se foran remove karo strict validation ke sath
    setCartItems(prev => prev.filter(item => getProductKey(item) !== productId));

    try {
      const currentToken = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
    } catch (err) {
      console.error("Backend delete failed:", err);
      // Fail hone par wapas state sync karo database se
      fetchUserCart();
    }
  };

  // 🎯 6. LOGOUT CLEANER
  const logoutCart = () => {
    setCartItems([]);
  };

  // 🎯 7. NEW: CHECKOUT SUCCESS CLEANER
  // Jab checkout completely done ho jaye to screen se items remove karne ke liye
  const clearCartLocal = () => {
    setCartItems([]);
  };

  // 🎯 8. SECURE LIVE CALCULATION METRICS
  const cartCount = cartItems ? cartItems.reduce((total, item) => total + (Number(item.quantity) || 1), 0) : 0;
  
  const cartTotal = cartItems ? cartItems.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 1;
    return total + (price * qty);
  }, 0) : 0;

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      cartCount, 
      cartTotal, 
      setCartItems, 
      addToCart, 
      updateQuantity, 
      removeFromCart, 
      logoutCart, 
      clearCartLocal, // Ab isey aap checkout page pr use kar sakte hain
      fetchUserCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);