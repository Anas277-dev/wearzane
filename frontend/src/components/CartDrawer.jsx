// import React from 'react';
// import { useNavigate } from 'react-router-dom'; // 🎯 NAVIGATION HOOK IMPORT KIYA
// import { useCart } from '../context/CartContext';
// import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';

// const CartDrawer = ({ isOpen, onClose }) => {
//   const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
//   const navigate = useNavigate(); // 🎯 INITIALIZE NAVIGATE

//   const formatPrice = (price) => {
//     return typeof price === 'number' ? price.toLocaleString() : price;
//   };

//   // 🎯 ROUTE REDIRECT HANDLER
//   const handleCheckoutRedirect = () => {
//     onClose(); // Checkout screen par jaane se pehle drawer close karein
//     navigate('/checkout'); // Users ko direct checkout route pr bhein
//   };

//   return (
//     <>
//       {/* 1. OVERLAY (Backdrop Background) */}
//       <div 
//         className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
//           isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
//         }`}
//         onClick={onClose}
//       />

//       {/* 2. SLIDE-OVER PANEL */}
//       <div 
//         className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform ${
//           isOpen ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >
//         {/* Drawer Header */}
//         <div className="p-6 border-b flex justify-between items-center">
//           <div>
//             <h2 className="text-lg font-black uppercase tracking-widest text-gray-900">Your Cart</h2>
//             <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mt-0.5">
//               {cartItems ? cartItems.length : 0} items selected
//             </p>
//           </div>
//           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-black transition">
//             <FiX size={22} />
//           </button>
//         </div>

//         {/* Drawer Body (Items List) */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-4">
//           {!cartItems || cartItems.length === 0 ? (
//             <div className="h-full flex flex-col justify-center items-center text-center space-y-4">
//               <div className="bg-gray-50 p-5 rounded-full text-gray-400">
//                 <FiShoppingBag size={40} />
//               </div>
//               <h3 className="text-xs font-bold uppercase tracking-widest text-gray-700">Your cart is empty</h3>
//               <button 
//                 onClick={onClose} 
//                 className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-black underline transition"
//               >
//                 Shop New Arrivals
//               </button>
//             </div>
//           ) : (
//             cartItems.map((item) => {
//               const currentProductId = item.product_id || item.id;

//               return (
//                 <div key={currentProductId} className="flex items-center justify-between border-b pb-4 gap-4">
//                   {/* Product Thumbnail & Info */}
//                   <div className="flex items-center space-x-4 min-w-0 flex-1">
//                     <div className="w-16 h-20 bg-gray-50 rounded border overflow-hidden flex-shrink-0">
//                       <img src={item.image_url || 'https://via.placeholder.com/150'} alt={item.name} className="w-full h-full object-cover" />
//                     </div>
//                     <div className="truncate">
//                       <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 truncate">{item.name}</h4>
//                       <p className="text-xs font-black text-gray-600 mt-1">Rs. {formatPrice(item.price)}</p>
                      
//                       {/* Plus/Minus Controls */}
//                       <div className="flex items-center border rounded w-max bg-gray-50 mt-2 scale-90 origin-left">
//                         <button onClick={() => updateQuantity(currentProductId, (item.quantity || 1) - 1)} className="px-2 py-1 text-gray-500 hover:bg-gray-200"><FiMinus size={10} /></button>
//                         <span className="px-2 text-xs font-bold text-gray-800">{item.quantity || 1}</span>
//                         <button onClick={() => updateQuantity(currentProductId, (item.quantity || 1) + 1)} className="px-2 py-1 text-gray-500 hover:bg-gray-200"><FiPlus size={10} /></button>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Subtotal & Delete */}
//                   <div className="flex flex-col items-end justify-between h-20 flex-shrink-0">
//                     <button onClick={() => removeFromCart(currentProductId)} className="text-gray-400 hover:text-red-500 transition">
//                       <FiTrash2 size={16} />
//                     </button>
//                     <p className="text-xs font-black text-gray-900">Rs. {formatPrice(item.price * (item.quantity || 1))}</p>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>

//         {/* Drawer Footer (Checkout Summary) */}
//         {cartItems && cartItems.length > 0 && (
//           <div className="p-6 border-t bg-gray-50 space-y-4">
//             <div className="flex justify-between items-end">
//               <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Subtotal Amount</span>
//               <span className="text-lg font-black text-gray-900">Rs. {formatPrice(cartTotal)}</span>
//             </div>
//             <p className="text-[10px] text-gray-400 uppercase tracking-wider">Shipping & taxes calculated at checkout.</p>
            
//             {/* 🎯 ACTION REDIRECT ROUTER */}
//             <button 
//               onClick={handleCheckoutRedirect}
//               className="w-full bg-black text-white text-xs font-bold uppercase tracking-widest py-4 rounded hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
//             >
//               Proceed To Checkout <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default CartDrawer;





import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return typeof price === 'number' ? price.toLocaleString() : price;
  };

  const handleCheckoutRedirect = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      {/* 1. OVERLAY (Backdrop Background) */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-[2px] z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* 2. SLIDE-OVER PANEL */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[440px] bg-[#F5F0E8] z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#1B4332]/10 flex justify-between items-center bg-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1B4332]/10 flex items-center justify-center">
              <FiShoppingBag className="text-[#1B4332] text-sm" />
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-widest text-gray-900">Your Cart</h2>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mt-0.5">
                {cartItems ? cartItems.length : 0} item{cartItems && cartItems.length === 1 ? '' : 's'} selected
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#F5F0E8] rounded-full text-[#1B4332] transition-colors">
            <FiX size={20} />
          </button>
        </div>

        {/* Drawer Body (Items List) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3">
          {!cartItems || cartItems.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center text-center space-y-4 px-4">
              <div className="bg-white p-6 rounded-full text-[#1B4332]/40 border border-[#1B4332]/10 shadow-sm">
                <FiShoppingBag size={36} />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-700">Your cart is empty</h3>
                <p className="text-[11px] text-gray-400 mt-1.5">Time to find something you'll love.</p>
              </div>
              <button
                onClick={onClose}
                className="text-xs font-black uppercase tracking-widest text-white bg-[#1B4332] px-6 py-3 rounded-full hover:bg-[#143728] transition-colors shadow-sm"
              >
                Shop New Arrivals
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const currentProductId = item.product_id || item.id;

              return (
                <div
                  key={currentProductId}
                  className="flex items-center justify-between gap-4 bg-white rounded-2xl border border-[#1B4332]/10 p-3.5 shadow-sm"
                >
                  {/* Product Thumbnail & Info */}
                  <div className="flex items-center space-x-3.5 min-w-0 flex-1">
                    <div className="w-16 h-20 bg-[#F5F0E8] rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image_url || 'https://via.placeholder.com/150'} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="truncate">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 truncate">{item.name}</h4>
                      <p className="text-xs font-black text-[#1B4332] mt-1">Rs. {formatPrice(item.price)}</p>

                      {/* Plus/Minus Controls */}
                      <div className="flex items-center border border-[#1B4332]/15 rounded-full w-max bg-[#F5F0E8]/60 mt-2.5 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(currentProductId, (item.quantity || 1) - 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#1B4332] hover:bg-[#1B4332]/10 transition-colors"
                        >
                          <FiMinus size={10} />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-gray-800">{item.quantity || 1}</span>
                        <button
                          onClick={() => updateQuantity(currentProductId, (item.quantity || 1) + 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#1B4332] hover:bg-[#1B4332]/10 transition-colors"
                        >
                          <FiPlus size={10} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Subtotal & Delete */}
                  <div className="flex flex-col items-end justify-between h-20 flex-shrink-0">
                    <button
                      onClick={() => removeFromCart(currentProductId)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <FiTrash2 size={15} />
                    </button>
                    <p className="text-xs font-black text-gray-900">Rs. {formatPrice(item.price * (item.quantity || 1))}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer (Checkout Summary) */}
        {cartItems && cartItems.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-[#1B4332]/10 bg-white space-y-4 flex-shrink-0">
            <div className="flex justify-between items-end">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Subtotal Amount</span>
              <span className="text-xl font-black text-[#1B4332]">Rs. {formatPrice(cartTotal)}</span>
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Shipping & taxes calculated at checkout.</p>

            <button
              onClick={handleCheckoutRedirect}
              className="w-full bg-[#1B4332] text-white text-xs font-bold uppercase tracking-widest py-4 rounded-full hover:bg-[#143728] transition-all shadow-sm hover:shadow-lg flex items-center justify-center gap-2 group"
            >
              Proceed To Checkout <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;