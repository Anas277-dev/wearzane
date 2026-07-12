// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const MyOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMyOrders = async () => {
//       try {
//         const currentToken = localStorage.getItem('token');
//         const res = await axios.get('http://localhost:5000/api/orders/my-orders', {
//           headers: { Authorization: `Bearer ${currentToken}` }
//         });
//         setOrders(res.data || []);
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMyOrders();
//   }, []);

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'Pending': return { backgroundColor: '#fff3cd', color: '#856404', border: '1px solid #ffeeba' };
//       case 'Processing': return { backgroundColor: '#cce5ff', color: '#004085', border: '1px solid #b8daff' };
//       case 'Shipped': return { backgroundColor: '#e2e3e5', color: '#383d41', border: '1px solid #d6d8db' };
//       case 'Delivered': return { backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' };
//       case 'Cancelled': return { backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' };
//       default: return { backgroundColor: '#e2e3e5', color: '#383d41' };
//     }
//   };

//   if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Loading your orders...</div>;

//   return (
//     <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
//       <h1 style={{ fontSize: '22px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '25px', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
//         Track My Orders
//       </h1>

//       {orders.length === 0 ? (
//         <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#f9f9f9', border: '1px dashed #ccc' }}>
//           <p>Aapne abhi tak koi order place nahi kiya.</p>
//         </div>
//       ) : (
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
//           {orders.map((order) => (
//             <div key={order.id} style={{ border: '1px solid #eee', borderRadius: '6px', padding: '20px', backgroundColor: '#fff' }}>
              
//               <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
//                 <span style={{ fontWeight: '900' }}>Order #WZ-{order.id}</span>
//                 <span style={{ padding: '2px 10px', borderRadius: '15px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', ...getStatusStyle(order.status) }}>
//                   {order.status}
//                 </span>
//               </div>

//               {/* 🎯 PRODUCT DETAILS SECTION */}
//               <div style={{ marginBottom: '15px' }}>
//   {order.items && order.items.map((item, idx) => (
//     <div key={idx} style={{ 
//       display: 'flex', 
//       justifyContent: 'space-between', 
//       fontSize: '12px', 
//       padding: '8px 0',
//       borderBottom: '1px solid #f9f9f9' 
//     }}>
//       <div style={{ flex: 1 }}>
//         <span style={{ fontWeight: '600' }}>{item.product_name}</span>
//         <div style={{ color: '#888', fontSize: '10px' }}>
//           {/* Original Price */}
//           Price: Rs. {item.price.toLocaleString()} x {item.quantity}
//         </div>
//       </div>
      
//       {/* Total for this product */}
//       <span style={{ fontWeight: 'bold' }}>
//         Rs. {item.total_item_price.toLocaleString()}
//       </span>
//     </div>
//   ))}
// </div>

//               <div style={{ fontSize: '12px', borderTop: '1px solid #f0f0f0', paddingTop: '10px' }}>
//                 <p><strong>Shipping to:</strong> {order.address}</p>
//                 <p><strong>Phone:</strong> {order.phone}</p>
//                 <p style={{ fontSize: '16px', fontWeight: '900', marginTop: '10px' }}>Total: Rs. {order.total_amount}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyOrders;










import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPackage, FiMapPin, FiPhone } from 'react-icons/fi';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const currentToken = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/orders/my-orders', {
          headers: { Authorization: `Bearer ${currentToken}` }
        });
        setOrders(res.data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyOrders();
  }, []);

  // 🎯 Status ke liye brand-consistent Tailwind classes (pehle wale inline hex colors ki jagah)
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'Processing': return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'Shipped': return 'bg-gray-100 text-gray-600 border border-gray-200';
      case 'Delivered': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'Cancelled': return 'bg-red-50 text-red-700 border border-red-200';
      default: return 'bg-gray-100 text-gray-600 border border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#F5F0E8] flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-gray-200 border-t-[#1B4332] rounded-full animate-spin"></div>
        <p className="text-base sm:text-lg font-light uppercase tracking-widest text-[#1B4332]">
          Loading your orders...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F5F0E8]">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16">

        <header className="mb-8 sm:mb-12 text-center px-2">
          <p className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#1B4332]/60 mb-3">
            Your History
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.1em] uppercase italic text-gray-800">
            Track My Orders
          </h1>
          <div className="h-1 w-12 sm:w-16 bg-[#1B4332] mx-auto mt-4 rounded-full"></div>
        </header>

        {orders.length === 0 ? (
          <div className="text-center py-16 sm:py-24 px-4">
            <div className="inline-flex flex-col items-center gap-3 border border-dashed border-[#1B4332]/25 rounded-2xl px-8 py-10 bg-white/50">
              <FiPackage className="text-3xl text-[#1B4332]/40" />
              <p className="text-gray-500 italic text-sm sm:text-base">
                Aapne abhi tak koi order place nahi kiya.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5 sm:gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-[#1B4332]/10 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                {/* Header: Order # + Status badge */}
                <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100 bg-[#F5F0E8]/40">
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#1B4332]">
                    Order #WZ-{order.id}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                {/* Product items */}
                <div className="px-5 sm:px-6 py-3 divide-y divide-gray-50">
                  {order.items && order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-4 py-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
                          {item.product_name}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          Rs. {item.price.toLocaleString()} &times; {item.quantity}
                        </p>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-gray-800 flex-shrink-0">
                        Rs. {item.total_item_price.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer: Shipping info + Total */}
                <div className="px-5 sm:px-6 py-4 border-t border-gray-100 bg-[#F5F0E8]/40 space-y-2">
                  <div className="flex items-start gap-2 text-xs text-gray-600">
                    <FiMapPin className="text-[#1B4332]/60 mt-0.5 flex-shrink-0" />
                    <span><span className="font-semibold text-gray-700">Shipping to:</span> {order.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <FiPhone className="text-[#1B4332]/60 flex-shrink-0" />
                    <span><span className="font-semibold text-gray-700">Phone:</span> {order.phone}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-100">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Total</span>
                    <span className="text-lg sm:text-xl font-black text-[#1B4332]">
                      Rs. {order.total_amount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;