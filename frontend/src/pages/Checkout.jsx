// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useCart } from '../context/CartContext';
// import { useNavigate } from 'react-router-dom';

// const Checkout = () => {
//   const { cartItems, cartTotal, clearCartLocal } = useCart();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
  
//   // 🎯 Logged-in user ka data fetch karna
//   const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});

//   // Form Fields State (Email ko user email se pre-fill kiya)
//   const [formData, setFormData] = useState({
//     customer_name: user.name || '',
//     email: user.email || '',
//     phone: '',
//     address: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleCheckoutSubmit = async (e) => {
//     e.preventDefault();
    
//     if (cartItems.length === 0) {
//       alert("Aapka cart khali hai!");
//       return;
//     }

//     setLoading(true);

//     try {
//       const currentToken = localStorage.getItem('token');
      
//       const orderPayload = {
//         customer_name: formData.customer_name,
//         // Backend mein email automatically token se pick hogi, par security ke liye yahan bhi bhej rahe hain
//         email: formData.email, 
//         phone: formData.phone,
//         address: formData.address,
//         total_amount: cartTotal,
//         items: cartItems
//       };

//       const res = await axios.post('http://localhost:5000/api/orders', orderPayload, {
//         headers: { Authorization: `Bearer ${currentToken}` }
//       });

//       if (res.data.success) {
//         alert(`🎉 Order Successfully Placed!\nOrder ID: ${res.data.orderId}`);
//         clearCartLocal();
//         navigate('/');
//       }
//     } catch (err) {
//       console.error("Checkout process failed:", err);
//       alert(err.response?.data?.error || "Order lagane mein koi masla aya he.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatPrice = (price) => {
//     return typeof price === 'number' ? price.toLocaleString() : price;
//   };

//   return (
//     <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
//       <h1 style={{ fontSize: '24px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '30px', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
//         Checkout Process
//       </h1>

//       <div style={{ display: 'table', width: '100%', borderSpacing: '20px 0' }}>
//         <div style={{ display: 'table-row' }}>
          
//           {/* LEFT: Shipping Form */}
//           <div style={{ display: 'table-cell', width: '60%', verticalAlign: 'top', backgroundColor: '#fff', padding: '10px' }}>
//             <h2 style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '20px', color: '#333' }}>
//               Shipping Details
//             </h2>
            
//             <form onSubmit={handleCheckoutSubmit}>
//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '5px', color: '#666' }}>Full Name</label>
//                 <input type="text" name="customer_name" value={formData.customer_name} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px' }} placeholder="Your Name" />
//               </div>

//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '5px', color: '#666' }}>Email Address (Verified)</label>
//                 {/* 🎯 READ ONLY EMAIL FIELD */}
//                 <input type="email" name="email" value={formData.email} readOnly style={{ width: '100%', padding: '12px', border: '1px solid #eee', borderRadius: '4px', fontSize: '13px', backgroundColor: '#f9f9f9', color: '#888' }} />
//               </div>

//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '5px', color: '#666' }}>Phone Number</label>
//                 <input type="text" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px' }} placeholder="03XXXXXXXXX" />
//               </div>

//               <div style={{ marginBottom: '20px' }}>
//                 <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '5px', color: '#666' }}>Shipping Address</label>
//                 <textarea name="address" value={formData.address} onChange={handleChange} required rows="4" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px', resize: 'none' }} placeholder="House #, Street, Area, City..."></textarea>
//               </div>

//               <button type="submit" disabled={loading} style={{ width: '100%', backgroundColor: '#000', color: '#fff', padding: '16px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>
//                 {loading ? "Processing Order..." : "Place Order (Cash on Delivery)"}
//               </button>
//             </form>
//           </div>

//           {/* RIGHT: Order Summary */}
//           <div style={{ display: 'table-cell', width: '40%', verticalAlign: 'top', backgroundColor: '#f9f9f9', padding: '25px', borderRadius: '4px', border: '1px solid #eee' }}>
//             <h2 style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '20px', color: '#333', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
//               Order Summary
//             </h2>

//             {cartItems.map((item) => (
//               <div key={item.product_id || item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px dashed #eee', paddingBottom: '8px' }}>
//                 <div>
//                   <h4 style={{ fontSize: '12px', fontWeight: '700', margin: 0 }}>{item.name}</h4>
//                   <p style={{ fontSize: '11px', color: '#666' }}>Qty: {item.quantity || 1}</p>
//                 </div>
//                 <span style={{ fontSize: '12px', fontWeight: '900' }}>Rs. {formatPrice(item.price * (item.quantity || 1))}</span>
//               </div>
//             ))}

//             <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', borderTop: '2px solid #000', paddingTop: '15px' }}>
//               <span style={{ fontSize: '12px', fontWeight: '700' }}>Total Payable:</span>
//               <span style={{ fontSize: '18px', fontWeight: '900' }}>Rs. {formatPrice(cartTotal)}</span>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;








// import React, { useState } from 'react';
// import axios from 'axios';
// import { useCart } from '../context/CartContext';
// import { useNavigate, Link } from 'react-router-dom';
// import { FiLock, FiTruck, FiCheckCircle } from 'react-icons/fi';

// const Checkout = () => {
//   const { cartItems, cartTotal, clearCartLocal } = useCart();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   // 🎯 Logged-in user ka data fetch karna
//   const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});

//   // Form Fields State (Email ko user email se pre-fill kiya)
//   const [formData, setFormData] = useState({
//     customer_name: user.name || '',
//     email: user.email || '',
//     phone: '',
//     address: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const formatPrice = (price) => {
//     return typeof price === 'number' ? price.toLocaleString() : price;
//   };

//   const handleCheckoutSubmit = async (e) => {
//     e.preventDefault();

//     if (cartItems.length === 0) {
//       alert("Aapka cart khali hai!");
//       return;
//     }

//     setLoading(true);

//     try {
//       const currentToken = localStorage.getItem('token');

//       const orderPayload = {
//         customer_name: formData.customer_name,
//         email: formData.email,
//         phone: formData.phone,
//         address: formData.address,
//         total_amount: cartTotal,
//         items: cartItems
//       };

//       const res = await axios.post('http://localhost:5000/api/orders', orderPayload, {
//         headers: { Authorization: `Bearer ${currentToken}` }
//       });

//       if (res.data.success) {
//         alert(`🎉 Order Successfully Placed!\nOrder ID: ${res.data.orderId}`);
//         clearCartLocal();
//         navigate('/');
//       }
//     } catch (err) {
//       console.error("Checkout process failed:", err);
//       alert(err.response?.data?.error || "Order lagane mein koi masla aya he.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!cartItems || cartItems.length === 0) {
//     return (
//       <div className="w-full min-h-screen bg-[#F5F0E8] flex items-center justify-center px-4">
//         <div className="text-center bg-white rounded-2xl border border-[#1B4332]/10 shadow-sm p-10 sm:p-14 max-w-md">
//           <p className="text-gray-500 italic text-sm sm:text-base mb-6">Aapka cart khali hai — checkout se pehle kuch add karein.</p>
//           <Link
//             to="/"
//             className="inline-block bg-[#1B4332] text-white px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#143728] transition-colors shadow-sm hover:shadow-lg"
//           >
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen bg-[#F5F0E8]">
//       <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16">

//         <header className="mb-8 sm:mb-12 text-center px-2">
//           <p className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#1B4332]/60 mb-3">
//             Almost There
//           </p>
//           <h1 className="text-2xl sm:text-3xl font-light tracking-[0.15em] uppercase italic text-gray-800">
//             Checkout
//           </h1>
//           <div className="h-1 w-12 sm:w-16 bg-[#1B4332] mx-auto mt-4 rounded-full"></div>
//         </header>

//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 items-start">

//           {/* LEFT: Shipping Form */}
//           <div className="lg:col-span-3 bg-white rounded-2xl border border-[#1B4332]/10 shadow-sm p-6 sm:p-8">
//             <div className="flex items-center gap-2 mb-6">
//               <FiTruck className="text-[#1B4332] text-lg" />
//               <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-700">
//                 Shipping Details
//               </h2>
//             </div>

//             <form onSubmit={handleCheckoutSubmit} className="space-y-5">
//               <div>
//                 <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Full Name</label>
//                 <input
//                   type="text"
//                   name="customer_name"
//                   value={formData.customer_name}
//                   onChange={handleChange}
//                   required
//                   placeholder="Your Name"
//                   className="w-full p-3.5 rounded-xl border border-gray-200 text-sm bg-[#F5F0E8]/40 outline-none focus:border-[#1B4332] focus:bg-white transition-colors"
//                 />
//               </div>

//               <div>
//                 <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Email Address (Verified)</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   readOnly
//                   className="w-full p-3.5 rounded-xl border border-gray-100 text-sm bg-gray-50 text-gray-400 outline-none cursor-not-allowed"
//                 />
//               </div>

//               <div>
//                 <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Phone Number</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                   placeholder="03XXXXXXXXX"
//                   className="w-full p-3.5 rounded-xl border border-gray-200 text-sm bg-[#F5F0E8]/40 outline-none focus:border-[#1B4332] focus:bg-white transition-colors"
//                 />
//               </div>

//               <div>
//                 <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Shipping Address</label>
//                 <textarea
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   required
//                   rows="4"
//                   placeholder="House #, Street, Area, City..."
//                   className="w-full p-3.5 rounded-xl border border-gray-200 text-sm bg-[#F5F0E8]/40 outline-none focus:border-[#1B4332] focus:bg-white resize-none transition-colors"
//                 ></textarea>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-[#1B4332] text-white py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#143728] disabled:bg-gray-300 transition-colors shadow-sm hover:shadow-lg flex items-center justify-center gap-2"
//               >
//                 <FiLock className="text-sm" />
//                 {loading ? "Processing Order..." : "Place Order (Cash on Delivery)"}
//               </button>
//             </form>
//           </div>

//           {/* RIGHT: Order Summary */}
//           <div className="lg:col-span-2 bg-white rounded-2xl border border-[#1B4332]/10 shadow-sm p-6 sm:p-8 lg:sticky lg:top-24">
//             <div className="flex items-center gap-2 mb-6">
//               <FiCheckCircle className="text-[#1B4332] text-lg" />
//               <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-700">
//                 Order Summary
//               </h2>
//             </div>

//             <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
//               {cartItems.map((item) => (
//                 <div key={item.product_id || item.id} className="flex items-center justify-between gap-3 pb-3 border-b border-dashed border-gray-200">
//                   <div className="min-w-0">
//                     <h4 className="text-xs font-bold text-gray-800 truncate">{item.name}</h4>
//                     <p className="text-[11px] text-gray-400 mt-0.5">Qty: {item.quantity || 1}</p>
//                   </div>
//                   <span className="text-xs font-black text-gray-900 whitespace-nowrap">
//                     Rs. {formatPrice(item.price * (item.quantity || 1))}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             <div className="flex justify-between items-center mt-5 pt-5 border-t border-[#1B4332]/15">
//               <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Total Payable</span>
//               <span className="text-xl font-black text-[#1B4332]">Rs. {formatPrice(cartTotal)}</span>
//             </div>
//             <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-3">
//               Shipping & taxes calculated at delivery.
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;









import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { FiLock, FiTruck, FiCheckCircle, FiCreditCard, FiDollarSign } from 'react-icons/fi';

const Checkout = () => {
  const { cartItems, cartTotal, clearCartLocal } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 🎯 Payment method: 'cod' (Cash on Delivery) ya 'card' (Authorize.Net)
  const [paymentMethod, setPaymentMethod] = useState('cod');

  // 🎯 Logged-in user ka data fetch karna
  const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});

  // Form Fields State (shipping + card details merged)
  const [formData, setFormData] = useState({
    customer_name: user.name || '',
    email: user.email || '',
    phone: '',
    address: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toLocaleString() : price;
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Aapka cart khali hai!");
      return;
    }

    setLoading(true);

    try {
      const currentToken = localStorage.getItem('token');
      let transactionId = null;

      if (paymentMethod === 'card') {
        // Step 1: Process card payment via Authorize.Net (only when card is selected)
        const paymentRes = await axios.post(
          'http://localhost:5000/api/payment',
          {
            cardNumber: formData.cardNumber,
            expMonth: formData.expMonth,
            expYear: formData.expYear,
            cvv: formData.cvv,
            amount: cartTotal
          },
          { headers: { Authorization: `Bearer ${currentToken}` } }
        );

        if (!paymentRes.data.success) {
          alert("Payment failed: " + paymentRes.data.message);
          setLoading(false);
          return;
        }

        transactionId = paymentRes.data.transactionId;
      }

      // Step 2: Create the order (COD skips straight here, Card arrives after payment success)
      const orderPayload = {
        customer_name: formData.customer_name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        total_amount: cartTotal,
        items: cartItems,
        payment_method: paymentMethod, // 'cod' or 'card'
        transaction_id: transactionId  // null for COD
      };

      const res = await axios.post('http://localhost:5000/api/orders', orderPayload, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });

      if (res.data.success) {
        const successMsg = paymentMethod === 'card'
          ? `🎉 Order Successfully Placed!\nOrder ID: ${res.data.orderId}\nTransaction ID: ${transactionId}`
          : `🎉 Order Successfully Placed!\nOrder ID: ${res.data.orderId}\nPayment: Cash on Delivery`;
        alert(successMsg);
        clearCartLocal();
        navigate('/');
      }
    } catch (err) {
      console.error("Checkout process failed:", err);
      alert(err.response?.data?.error || err.response?.data?.message || "Order lagane mein koi masla aya he.");
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="w-full min-h-screen bg-[#F5F0E8] flex items-center justify-center px-4">
        <div className="text-center bg-white rounded-2xl border border-[#1B4332]/10 shadow-sm p-10 sm:p-14 max-w-md">
          <p className="text-gray-500 italic text-sm sm:text-base mb-6">Aapka cart khali hai — checkout se pehle kuch add karein.</p>
          <Link
            to="/"
            className="inline-block bg-[#1B4332] text-white px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#143728] transition-colors shadow-sm hover:shadow-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F5F0E8]">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16">

        <header className="mb-8 sm:mb-12 text-center px-2">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#1B4332]/60 mb-3">
            Almost There
          </p>
          <h1 className="text-2xl sm:text-3xl font-light tracking-[0.15em] uppercase italic text-gray-800">
            Checkout
          </h1>
          <div className="h-1 w-12 sm:w-16 bg-[#1B4332] mx-auto mt-4 rounded-full"></div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 items-start">

          {/* LEFT: Shipping + Payment Form */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-[#1B4332]/10 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <FiTruck className="text-[#1B4332] text-lg" />
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-700">
                Shipping Details
              </h2>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="w-full p-3.5 rounded-xl border border-gray-200 text-sm bg-[#F5F0E8]/40 outline-none focus:border-[#1B4332] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Email Address (Verified)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full p-3.5 rounded-xl border border-gray-100 text-sm bg-gray-50 text-gray-400 outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="03XXXXXXXXX"
                  className="w-full p-3.5 rounded-xl border border-gray-200 text-sm bg-[#F5F0E8]/40 outline-none focus:border-[#1B4332] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Shipping Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="House #, Street, Area, City..."
                  className="w-full p-3.5 rounded-xl border border-gray-200 text-sm bg-[#F5F0E8]/40 outline-none focus:border-[#1B4332] focus:bg-white resize-none transition-colors"
                ></textarea>
              </div>

              {/* --- Payment Method Selector --- */}
              <div className="pt-4 border-t border-dashed border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <FiCreditCard className="text-[#1B4332] text-lg" />
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-700">
                    Payment Method
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs font-bold uppercase tracking-widest transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-[#1B4332] bg-[#1B4332] text-white'
                        : 'border-gray-200 bg-[#F5F0E8]/40 text-gray-500 hover:border-[#1B4332]/40'
                    }`}
                  >
                    <FiDollarSign size={14} /> Cash on Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs font-bold uppercase tracking-widest transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-[#1B4332] bg-[#1B4332] text-white'
                        : 'border-gray-200 bg-[#F5F0E8]/40 text-gray-500 hover:border-[#1B4332]/40'
                    }`}
                  >
                    <FiCreditCard size={14} /> Pay by Card
                  </button>
                </div>

                {/* Card fields only render + become required when 'card' is selected */}
                {paymentMethod === 'card' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                        placeholder="XXXX XXXX XXXX XXXX"
                        className="w-full p-3.5 rounded-xl border border-gray-200 text-sm bg-[#F5F0E8]/40 outline-none focus:border-[#1B4332] focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Exp Month</label>
                      <input
                        type="text"
                        name="expMonth"
                        value={formData.expMonth}
                        onChange={handleChange}
                        required
                        placeholder="MM"
                        className="w-full p-3.5 rounded-xl border border-gray-200 text-sm bg-[#F5F0E8]/40 outline-none focus:border-[#1B4332] focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Exp Year</label>
                      <input
                        type="text"
                        name="expYear"
                        value={formData.expYear}
                        onChange={handleChange}
                        required
                        placeholder="YYYY"
                        className="w-full p-3.5 rounded-xl border border-gray-200 text-sm bg-[#F5F0E8]/40 outline-none focus:border-[#1B4332] focus:bg-white transition-colors"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                        placeholder="123"
                        className="w-full p-3.5 rounded-xl border border-gray-200 text-sm bg-[#F5F0E8]/40 outline-none focus:border-[#1B4332] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <p className="text-[11px] text-gray-400 italic">
                    Order delivery ke waqt cash mein pay kar dein — koi card details zaroori nahi.
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1B4332] text-white py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#143728] disabled:bg-gray-300 transition-colors shadow-sm hover:shadow-lg flex items-center justify-center gap-2"
              >
                <FiLock className="text-sm" />
                {loading
                  ? (paymentMethod === 'card' ? "Processing Payment..." : "Placing Order...")
                  : (paymentMethod === 'card' ? "Pay & Place Order" : "Place Order (Cash on Delivery)")}
              </button>
            </form>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-[#1B4332]/10 shadow-sm p-6 sm:p-8 lg:sticky lg:top-24">
            <div className="flex items-center gap-2 mb-6">
              <FiCheckCircle className="text-[#1B4332] text-lg" />
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-700">
                Order Summary
              </h2>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.product_id || item.id} className="flex items-center justify-between gap-3 pb-3 border-b border-dashed border-gray-200">
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-gray-800 truncate">{item.name}</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">Qty: {item.quantity || 1}</p>
                  </div>
                  <span className="text-xs font-black text-gray-900 whitespace-nowrap">
                    Rs. {formatPrice(item.price * (item.quantity || 1))}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-5 pt-5 border-t border-[#1B4332]/15">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Total Payable</span>
              <span className="text-xl font-black text-[#1B4332]">Rs. {formatPrice(cartTotal)}</span>
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-3">
              Card payments are processed securely via Authorize.Net.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;