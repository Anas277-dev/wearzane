// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; 
// import { useCart } from '../context/CartContext'; // 🎯 Aapke context folder ka path

// const ProductCard = ({ product }) => {
//   const { addToCart } = useCart(); // 🎯 Cart context se function nikal liya

//   // Safe check: agar images array nahi hai ya khali hai
//   const images = product.images || ["https://via.placeholder.com/300"];
//   const [currentImage, setCurrentImage] = useState(images[0]);

//   // Agar product ya uski images badlein (jaise filter hone par), toh state update ho jaye
//   useEffect(() => {
//     if (images.length > 0) {
//       setCurrentImage(images[0]);
//     }
//   }, [product]);

//   // 🎯 ADD TO CART HANDLER (Link click ko rokne ke liye)
//   const handleAddToCart = (e) => {
//     e.preventDefault();   // Link par navigate hone se rokega
//     e.stopPropagation();  // Click event ko parent (Link) tak jaane se rokega
//     addToCart(product);
//     alert(`${product.name} has been added to your cart!`);
//   };

//   return (
//     // Pure card ko Link se wrap kar diya taake kahi bhi click ho, details page khule
//     <Link to={`/product/${product.id}`} className="group cursor-pointer block">
//       <div 
//         className="relative overflow-hidden bg-gray-100 rounded-lg aspect-[3/4]"
//         onMouseEnter={() => images[1] && setCurrentImage(images[1])}
//         onMouseLeave={() => setCurrentImage(images[0])}
//       >
//         <img 
//           src={currentImage} 
//           alt={product.name}
//           className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
//         />
        
//         {/* Luxury hover text overlay / Ab isme click to add bhee support hai */}
//         <div className="absolute bottom-4 left-4 right-4 bg-black text-white py-3 text-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-widest uppercase hover:bg-gray-900 z-10"
//              onClick={handleAddToCart}>
//           Quick Add To Cart
//         </div>
//       </div>
      
//       <div className="mt-4 flex justify-between items-start">
//         <div>
//           <h3 className="text-xs font-medium text-gray-700 uppercase tracking-widest transition-colors group-hover:text-black">
//             {product.name}
//           </h3>
//           <p className="mt-1 text-sm font-semibold text-gray-900">Rs. {product.price}</p>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;









import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // 🎯 Aapke context folder ka path

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // 🎯 Cart context se function nikal liya

  // Safe check: agar images array nahi hai ya khali hai
  const images = product.images || ["https://via.placeholder.com/300"];
  const [currentImage, setCurrentImage] = useState(images[0]);

  // Agar product ya uski images badlein (jaise filter hone par), toh state update ho jaye
  useEffect(() => {
    if (images.length > 0) {
      setCurrentImage(images[0]);
    }
  }, [product]);

  // 🎯 ADD TO CART HANDLER (Link click ko rokne ke liye)
  const handleAddToCart = (e) => {
    e.preventDefault();   // Link par navigate hone se rokega
    e.stopPropagation();  // Click event ko parent (Link) tak jaane se rokega
    addToCart(product);
    alert(`${product.name} has been added to your cart!`);
  };

  return (
    // Pure card ko Link se wrap kar diya taake kahi bhi click ho, details page khule
    <Link to={`/product/${product.id}`} className="group cursor-pointer block">
      <div
        className="relative overflow-hidden bg-[#FBF8F2] rounded-2xl aspect-[3/4] shadow-sm ring-1 ring-black/[0.04] transition-all duration-300 group-hover:shadow-2xl group-hover:ring-black/[0.08]"
        onMouseEnter={() => images[1] && setCurrentImage(images[1])}
        onMouseLeave={() => setCurrentImage(images[0])}
      >
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />

        {/* Subtle top gradient so overlay text/badges always stay readable */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

        {/* Luxury hover text overlay / Ab isme click to add bhee support hai */}
        <div
          className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-[#1B4332] text-white py-2.5 sm:py-3 rounded-full flex items-center justify-center gap-2 text-[9px] sm:text-[10px] font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 tracking-widest uppercase hover:bg-[#143728] shadow-lg z-10"
          onClick={handleAddToCart}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          Quick Add To Cart
        </div>
      </div>

      <div className="mt-3 sm:mt-4 flex justify-between items-start gap-2">
        <div className="min-w-0">
          <h3 className="text-[11px] sm:text-xs font-medium text-gray-700 uppercase tracking-widest transition-colors group-hover:text-[#1B4332] truncate">
            {product.name}
          </h3>
          <p className="mt-1 text-sm sm:text-base font-semibold text-gray-900">
            Rs. {product.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;