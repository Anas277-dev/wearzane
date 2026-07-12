// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FiPackage, FiMapPin, FiPhone } from 'react-icons/fi';

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

//   // 🎯 Status ke liye brand-consistent Tailwind classes (pehle wale inline hex colors ki jagah)
//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'Pending': return 'bg-amber-50 text-amber-700 border border-amber-200';
//       case 'Processing': return 'bg-blue-50 text-blue-700 border border-blue-200';
//       case 'Shipped': return 'bg-gray-100 text-gray-600 border border-gray-200';
//       case 'Delivered': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
//       case 'Cancelled': return 'bg-red-50 text-red-700 border border-red-200';
//       default: return 'bg-gray-100 text-gray-600 border border-gray-200';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="w-full min-h-screen bg-[#F5F0E8] flex flex-col items-center justify-center gap-4">
//         <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-gray-200 border-t-[#1B4332] rounded-full animate-spin"></div>
//         <p className="text-base sm:text-lg font-light uppercase tracking-widest text-[#1B4332]">
//           Loading your orders...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen bg-[#F5F0E8]">
//       <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16">

//         <header className="mb-8 sm:mb-12 text-center px-2">
//           <p className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#1B4332]/60 mb-3">
//             Your History
//           </p>
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.1em] uppercase italic text-gray-800">
//             Track My Orders
//           </h1>
//           <div className="h-1 w-12 sm:w-16 bg-[#1B4332] mx-auto mt-4 rounded-full"></div>
//         </header>

//         {orders.length === 0 ? (
//           <div className="text-center py-16 sm:py-24 px-4">
//             <div className="inline-flex flex-col items-center gap-3 border border-dashed border-[#1B4332]/25 rounded-2xl px-8 py-10 bg-white/50">
//               <FiPackage className="text-3xl text-[#1B4332]/40" />
//               <p className="text-gray-500 italic text-sm sm:text-base">
//                 Aapne abhi tak koi order place nahi kiya.
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="flex flex-col gap-5 sm:gap-6">
//             {orders.map((order) => (
//               <div
//                 key={order.id}
//                 className="bg-white rounded-2xl border border-[#1B4332]/10 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
//               >
//                 {/* Header: Order # + Status badge */}
//                 <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100 bg-[#F5F0E8]/40">
//                   <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#1B4332]">
//                     Order #WZ-{order.id}
//                   </span>
//                   <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${getStatusStyle(order.status)}`}>
//                     {order.status}
//                   </span>
//                 </div>

//                 {/* Product items */}
//                 <div className="px-5 sm:px-6 py-3 divide-y divide-gray-50">
//                   {order.items && order.items.map((item, idx) => (
//                     <div key={idx} className="flex items-center justify-between gap-4 py-3">
//                       <div className="flex-1 min-w-0">
//                         <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
//                           {item.product_name}
//                         </p>
//                         <p className="text-[11px] text-gray-400 mt-0.5">
//                           Rs. {item.price.toLocaleString()} &times; {item.quantity}
//                         </p>
//                       </div>
//                       <span className="text-xs sm:text-sm font-bold text-gray-800 flex-shrink-0">
//                         Rs. {item.total_item_price.toLocaleString()}
//                       </span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Footer: Shipping info + Total */}
//                 <div className="px-5 sm:px-6 py-4 border-t border-gray-100 bg-[#F5F0E8]/40 space-y-2">
//                   <div className="flex items-start gap-2 text-xs text-gray-600">
//                     <FiMapPin className="text-[#1B4332]/60 mt-0.5 flex-shrink-0" />
//                     <span><span className="font-semibold text-gray-700">Shipping to:</span> {order.address}</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-xs text-gray-600">
//                     <FiPhone className="text-[#1B4332]/60 flex-shrink-0" />
//                     <span><span className="font-semibold text-gray-700">Phone:</span> {order.phone}</span>
//                   </div>
//                   <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-100">
//                     <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Total</span>
//                     <span className="text-lg sm:text-xl font-black text-[#1B4332]">
//                       Rs. {order.total_amount}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyOrders;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiPackage, FiMapPin, FiPhone } from 'react-icons/fi';

// 🎯 Agar Vercel/production me VITE_API_URL set hai to wahi use hoga,
// warna local PC par apne aap localhost:5000 par fallback ho jayega
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const currentToken = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/api/orders/my-orders`, {
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