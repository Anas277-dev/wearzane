// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { useCart } from '../context/CartContext';
// import { FiChevronRight, FiShoppingBag, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { addToCart, fetchUserCart } = useCart();

//   const [product, setProduct] = useState(null);
//   const [reviewsData, setReviewsData] = useState({ reviews: [], stats: { total_reviews: 0, avg_rating: null } });
//   const [loading, setLoading] = useState(true);
//   const [activeImage, setActiveImage] = useState('');
//   const [adding, setAdding] = useState(false);

//   const token = localStorage.getItem('token');
//   const isLoggedIn = !!token;

//   // Review Form States
//   const [customerName, setCustomerName] = useState('');
//   const [rating, setRating] = useState(5);
//   const [hoverRating, setHoverRating] = useState(0);
//   const [comment, setComment] = useState('');
//   const [formMessage, setFormMessage] = useState({ type: '', text: '' });

//   const fetchProductAndReviews = async () => {
//     try {
//       const productRes = await axios.get(`http://localhost:5000/api/products/${id}`);
//       setProduct(productRes.data);
//       if (productRes.data.images && productRes.data.images.length > 0) {
//         setActiveImage(productRes.data.images[0]);
//       }

//       const reviewsRes = await axios.get(`http://localhost:5000/api/reviews/product/${id}`);
//       setReviewsData(reviewsRes.data);
//     } catch (err) {
//       console.error("Error fetching data", err);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProductAndReviews();
//     window.scrollTo(0, 0);
//   }, [id]);

//   const handleAddToCart = async () => {
//     const currentToken = localStorage.getItem('token');
//     if (!currentToken) {
//       alert("Please login to add products to your cart.");
//       navigate('/login');
//       return;
//     }

//     setAdding(true);
//     try {
//       await axios.post(`http://localhost:5000/api/cart`, { productId: id }, {
//         headers: { Authorization: `Bearer ${currentToken}` }
//       });

//       addToCart({
//         id: product.id || id,
//         name: product.name,
//         price: product.price,
//         image_url: activeImage || (product.images && product.images[0]) || ''
//       }, 1);

//       if (typeof fetchUserCart === 'function') {
//         await fetchUserCart();
//       }

//       alert("Product added to bag successfully!");
//     } catch (err) {
//       if (err.response && err.response.status === 400) {
//         alert(err.response.data.error || "This product is already in your cart!");
//       } else {
//         console.error("Database error", err);
//         alert("Server validation failed. Please try again.");
//       }
//     }
//     setAdding(false);
//   };

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
//     setFormMessage({ type: '', text: '' });

//     const currentToken = localStorage.getItem('token');
//     if (!currentToken) {
//       setFormMessage({ type: 'error', text: "Pehle login karna lazmi hai!" });
//       return;
//     }

//     try {
//       const res = await axios.post(`http://localhost:5000/api/reviews/product/${id}`, {
//         customer_name: customerName,
//         rating,
//         comment
//       }, {
//         headers: { Authorization: `Bearer ${currentToken}` }
//       });

//       setFormMessage({ type: 'success', text: res.data.message });
//       setCustomerName('');
//       setComment('');
//       setRating(5);

//       const reviewsRes = await axios.get(`http://localhost:5000/api/reviews/product/${id}`);
//       setReviewsData(reviewsRes.data);
//     } catch (err) {
//       setFormMessage({ type: 'error', text: err.response?.data?.error || "Submission failed" });
//     }
//   };

//   const renderStars = (ratingScore, size = 'text-sm') => (
//     <div className={`flex items-center text-amber-500 gap-0.5 ${size}`}>
//       {[...Array(5)].map((_, index) => (
//         <span key={index}>{index < Math.floor(ratingScore) ? '★' : '☆'}</span>
//       ))}
//     </div>
//   );

//   const getInitials = (name = '') =>
//     name.trim().split(' ').slice(0, 2).map(w => w[0]?.toUpperCase()).join('') || '?';

//   const avatarPalette = ['#1B4332', '#2D6A4F', '#40916C', '#74C69D', '#B7791F', '#9C4221'];
//   const avatarColor = (name = '') => {
//     const sum = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
//     return avatarPalette[sum % avatarPalette.length];
//   };

//   if (loading) {
//     return (
//       <div className="w-full min-h-screen bg-[#F5F0E8] flex flex-col items-center justify-center gap-4">
//         <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-gray-200 border-t-[#1B4332] rounded-full animate-spin"></div>
//         <p className="text-base sm:text-lg font-light uppercase tracking-widest text-[#1B4332]">
//           Loading Piece Details...
//         </p>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="w-full min-h-screen bg-[#F5F0E8] flex items-center justify-center">
//         <p className="text-gray-500 italic text-base">Product not found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen bg-[#F5F0E8]">
//       <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-14 space-y-16 sm:space-y-24">

//         {/* Breadcrumb */}
//         <nav className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-400">
//           <Link to="/" className="hover:text-[#1B4332] transition-colors">Home</Link>
//           <FiChevronRight className="text-[10px]" />
//           <Link to={`/section/${(product.section || '').toLowerCase()}`} className="hover:text-[#1B4332] transition-colors">
//             {product.section}
//           </Link>
//           <FiChevronRight className="text-[10px]" />
//           <span className="text-[#1B4332] truncate max-w-[160px] sm:max-w-none">{product.name}</span>
//         </nav>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-14 -mt-8">
//           {/* IMAGES */}
//           <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
//             <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible justify-start md:w-20 flex-shrink-0">
//               {product.images && product.images.map((img, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setActiveImage(img)}
//                   className={`w-16 sm:w-20 aspect-[3/4] overflow-hidden bg-white rounded-xl border-2 flex-shrink-0 transition-all duration-200 ${
//                     activeImage === img
//                       ? 'border-[#1B4332] shadow-md'
//                       : 'border-transparent opacity-60 hover:opacity-100 hover:border-[#1B4332]/30'
//                   }`}
//                 >
//                   <img src={img} alt="" className="w-full h-full object-cover" />
//                 </button>
//               ))}
//             </div>
//             <div className="flex-1 aspect-[3/4] bg-white overflow-hidden border border-[#1B4332]/10 rounded-3xl shadow-sm relative group">
//               {product.stock > 0 && product.stock <= 5 && (
//                 <span className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm text-red-600 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
//                   Only {product.stock} Left
//                 </span>
//               )}
//               <img
//                 src={activeImage || 'https://via.placeholder.com/600x800'}
//                 alt={product.name}
//                 className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//               />
//             </div>
//           </div>

//           {/* DETAILS */}
//           <div className="lg:col-span-5 flex flex-col justify-start">
//             <div className="lg:sticky lg:top-24 space-y-6">
//               <div>
//                 <span className="inline-block text-[10px] font-black tracking-[0.3em] uppercase text-white bg-[#1B4332] px-3 py-1 rounded-full mb-3">
//                   {product.section} Wear
//                 </span>
//                 <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 uppercase tracking-wide leading-tight">
//                   {product.name}
//                 </h1>

//                 {reviewsData.stats.total_reviews > 0 ? (
//                   <div className="flex items-center gap-2 mt-3">
//                     {renderStars(reviewsData.stats.avg_rating)}
//                     <span className="text-xs font-bold text-gray-700">{reviewsData.stats.avg_rating} / 5</span>
//                     <span className="text-xs text-gray-400">· {reviewsData.stats.total_reviews} Reviews</span>
//                   </div>
//                 ) : (
//                   <p className="text-xs text-gray-400 italic mt-3">No reviews yet — be the first</p>
//                 )}

//                 <p className="text-3xl font-black text-[#1B4332] mt-4">Rs. {product.price}</p>

//                 <div className="mt-3">
//                   {product.stock > 0 ? (
//                     <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-widest">
//                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
//                       In Stock ({product.stock} available)
//                     </span>
//                   ) : (
//                     <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 border border-red-200 px-3 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-widest">
//                       <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
//                       Out Of Stock
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <div className="border-t border-[#1B4332]/10 pt-6">
//                 <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Description</h3>
//                 <p className="text-sm font-light leading-relaxed text-gray-600 whitespace-pre-line">{product.description}</p>
//               </div>

//               {/* Add to bag */}
//               <div className="border-t border-[#1B4332]/10 pt-6 space-y-4">
//                 {isLoggedIn ? (
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={product.stock <= 0 || adding}
//                     className="w-full bg-[#1B4332] text-white py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#143728] disabled:bg-gray-300 transition-colors shadow-sm hover:shadow-lg flex items-center justify-center gap-2"
//                   >
//                     <FiShoppingBag className="text-sm" />
//                     {adding ? 'Adding...' : product.stock > 0 ? 'Add To Bag' : 'Out Of Stock'}
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => navigate('/login')}
//                     className="w-full bg-white text-[#1B4332] border border-[#1B4332] py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#1B4332] hover:text-white transition-colors"
//                   >
//                     Login To Purchase
//                   </button>
//                 )}
//               </div>

//               {/* Trust badges */}
//               <div className="grid grid-cols-3 gap-3 pt-2">
//                 <div className="flex flex-col items-center text-center gap-1.5 bg-white rounded-xl p-3 border border-[#1B4332]/10">
//                   <FiTruck className="text-lg text-[#1B4332]" />
//                   <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 leading-tight">Fast Delivery</span>
//                 </div>
//                 <div className="flex flex-col items-center text-center gap-1.5 bg-white rounded-xl p-3 border border-[#1B4332]/10">
//                   <FiShield className="text-lg text-[#1B4332]" />
//                   <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 leading-tight">Secure Checkout</span>
//                 </div>
//                 <div className="flex flex-col items-center text-center gap-1.5 bg-white rounded-xl p-3 border border-[#1B4332]/10">
//                   <FiRefreshCw className="text-lg text-[#1B4332]" />
//                   <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 leading-tight">Easy Returns</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* REVIEWS */}
//         <div className="pt-2 border-t border-[#1B4332]/10 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12">
//           <div className="pt-10 sm:pt-14">
//             <header className="mb-6">
//               <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/60 mb-2">Feedback</p>
//               <h2 className="text-xl font-light tracking-widest uppercase italic text-gray-800">Customer Reviews</h2>
//               <div className="h-1 w-12 bg-[#1B4332] mt-3 rounded-full"></div>
//             </header>

//             {reviewsData.reviews.length === 0 ? (
//               <div className="bg-white rounded-2xl border border-dashed border-[#1B4332]/20 p-8 text-center">
//                 <p className="text-sm text-gray-400 italic">Is product ke liye abhi koi reviews maujood nahi hain.</p>
//               </div>
//             ) : (
//               <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2">
//                 {reviewsData.reviews.map((review) => (
//                   <div key={review.id} className="border border-[#1B4332]/10 p-5 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
//                     <div className="flex items-start gap-3">
//                       <div
//                         className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0"
//                         style={{ backgroundColor: avatarColor(review.customer_name) }}
//                       >
//                         {getInitials(review.customer_name)}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex justify-between items-center mb-1 gap-2">
//                           <span className="text-xs font-bold uppercase tracking-tight text-gray-900 truncate">{review.customer_name}</span>
//                           {renderStars(review.rating)}
//                         </div>
//                         <p className="text-xs text-gray-600 font-light italic leading-relaxed">"{review.comment}"</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="pt-10 sm:pt-14">
//             <div className="bg-white p-6 sm:p-8 border border-[#1B4332]/10 rounded-2xl shadow-sm">
//               <header className="mb-6">
//                 <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/60 mb-2">Share Your Experience</p>
//                 <h2 className="text-xl font-light tracking-widest uppercase italic text-gray-800">Write A Review</h2>
//                 <div className="h-1 w-12 bg-[#1B4332] mt-3 rounded-full"></div>
//               </header>

//               {isLoggedIn ? (
//                 <form onSubmit={handleReviewSubmit} className="space-y-4">
//                   {formMessage.text && (
//                     <div className={`p-3 rounded-lg text-xs font-bold uppercase tracking-wider ${formMessage.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
//                       {formMessage.text}
//                     </div>
//                   )}

//                   <div>
//                     <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Your Rating</label>
//                     <div className="flex items-center gap-1">
//                       {[...Array(5)].map((_, index) => {
//                         const starValue = index + 1;
//                         return (
//                           <button
//                             type="button"
//                             key={index}
//                             className={`text-2xl transition-all duration-150 ${starValue <= (hoverRating || rating) ? 'text-amber-500 scale-110' : 'text-gray-300'}`}
//                             onClick={() => setRating(starValue)}
//                             onMouseEnter={() => setHoverRating(starValue)}
//                             onMouseLeave={() => setHoverRating(0)}
//                           >
//                             ★
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Your Name</label>
//                     <input type="text" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="e.g. Anas Siddiqui" className="w-full p-3 rounded-xl border border-gray-200 text-xs bg-[#F5F0E8]/40 outline-none focus:border-[#1B4332] focus:bg-white transition-colors" />
//                   </div>

//                   <div>
//                     <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Comments / Review</label>
//                     <textarea rows="4" required value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Tell us about fabric quality..." className="w-full p-3 rounded-xl border border-gray-200 text-xs bg-[#F5F0E8]/40 outline-none focus:border-[#1B4332] focus:bg-white resize-none transition-colors"></textarea>
//                   </div>

//                   <button type="submit" className="w-full bg-[#1B4332] text-white py-3.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#143728] transition-colors shadow-sm hover:shadow-lg">
//                     Submit Review
//                   </button>
//                 </form>
//               ) : (
//                 <div className="text-center py-10 space-y-4">
//                   <p className="text-sm text-gray-500 italic font-light">Sirf registered customers hi reviews submit kar sakte hain.</p>
//                   <button
//                     onClick={() => navigate('/login')}
//                     className="bg-[#1B4332] text-white px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#143728] transition-colors shadow-sm hover:shadow-lg"
//                   >
//                     Login to Write a Review
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;







import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { FiChevronRight, FiShoppingBag, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';

// 🎯 Agar Vercel/production me VITE_API_URL set hai to wahi use hoga,
// warna local PC par apne aap localhost:5000 par fallback ho jayega
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart, fetchUserCart } = useCart();

  const [product, setProduct] = useState(null);
  const [reviewsData, setReviewsData] = useState({ reviews: [], stats: { total_reviews: 0, avg_rating: null } });
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [adding, setAdding] = useState(false);

  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  // Review Form States
  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [formMessage, setFormMessage] = useState({ type: '', text: '' });

  const fetchProductAndReviews = async () => {
    try {
      const productRes = await axios.get(`${API_URL}/api/products/${id}`);
      setProduct(productRes.data);
      if (productRes.data.images && productRes.data.images.length > 0) {
        setActiveImage(productRes.data.images[0]);
      }

      const reviewsRes = await axios.get(`${API_URL}/api/reviews/product/${id}`);
      setReviewsData(reviewsRes.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProductAndReviews();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = async () => {
    const currentToken = localStorage.getItem('token');
    if (!currentToken) {
      alert("Please login to add products to your cart.");
      navigate('/login');
      return;
    }

    setAdding(true);
    try {
      await axios.post(`${API_URL}/api/cart`, { productId: id }, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });

      addToCart({
        id: product.id || id,
        name: product.name,
        price: product.price,
        image_url: activeImage || (product.images && product.images[0]) || ''
      }, 1);

      if (typeof fetchUserCart === 'function') {
        await fetchUserCart();
      }

      alert("Product added to bag successfully!");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert(err.response.data.error || "This product is already in your cart!");
      } else {
        console.error("Database error", err);
        alert("Server validation failed. Please try again.");
      }
    }
    setAdding(false);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setFormMessage({ type: '', text: '' });

    const currentToken = localStorage.getItem('token');
    if (!currentToken) {
      setFormMessage({ type: 'error', text: "Pehle login karna lazmi hai!" });
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/reviews/product/${id}`, {
        customer_name: customerName,
        rating,
        comment
      }, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });

      setFormMessage({ type: 'success', text: res.data.message });
      setCustomerName('');
      setComment('');
      setRating(5);

      const reviewsRes = await axios.get(`${API_URL}/api/reviews/product/${id}`);
      setReviewsData(reviewsRes.data);
    } catch (err) {
      setFormMessage({ type: 'error', text: err.response?.data?.error || "Submission failed" });
    }
  };

  const renderStars = (ratingScore, size = 'text-sm') => (
    <div className={`flex items-center text-amber-500 gap-0.5 ${size}`}>
      {[...Array(5)].map((_, index) => (
        <span key={index}>{index < Math.floor(ratingScore) ? '★' : '☆'}</span>
      ))}
    </div>
  );

  const getInitials = (name = '') =>
    name.trim().split(' ').slice(0, 2).map(w => w[0]?.toUpperCase()).join('') || '?';

  const avatarPalette = ['#1B4332', '#2D6A4F', '#40916C', '#74C69D', '#B7791F', '#9C4221'];
  const avatarColor = (name = '') => {
    const sum = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    return avatarPalette[sum % avatarPalette.length];
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#F5F0E8] flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-gray-200 border-t-[#1B4332] rounded-full animate-spin"></div>
        <p className="text-base sm:text-lg font-light uppercase tracking-widest text-[#1B4332]">
          Loading Piece Details...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full min-h-screen bg-[#F5F0E8] flex items-center justify-center">
        <p className="text-gray-500 italic text-base">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F5F0E8]">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-14 space-y-16 sm:space-y-24">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-400">
          <Link to="/" className="hover:text-[#1B4332] transition-colors">Home</Link>
          <FiChevronRight className="text-[10px]" />
          <Link to={`/section/${(product.section || '').toLowerCase()}`} className="hover:text-[#1B4332] transition-colors">
            {product.section}
          </Link>
          <FiChevronRight className="text-[10px]" />
          <span className="text-[#1B4332] truncate max-w-[160px] sm:max-w-none">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-14 -mt-8">
          {/* IMAGES */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible justify-start md:w-20 flex-shrink-0">
              {product.images && product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 sm:w-20 aspect-[3/4] overflow-hidden bg-white rounded-xl border-2 flex-shrink-0 transition-all duration-200 ${
                    activeImage === img
                      ? 'border-[#1B4332] shadow-md'
                      : 'border-transparent opacity-60 hover:opacity-100 hover:border-[#1B4332]/30'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 aspect-[3/4] bg-white overflow-hidden border border-[#1B4332]/10 rounded-3xl shadow-sm relative group">
              {product.stock > 0 && product.stock <= 5 && (
                <span className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm text-red-600 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                  Only {product.stock} Left
                </span>
              )}
              <img
                src={activeImage || 'https://via.placeholder.com/600x800'}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          {/* DETAILS */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div>
                <span className="inline-block text-[10px] font-black tracking-[0.3em] uppercase text-white bg-[#1B4332] px-3 py-1 rounded-full mb-3">
                  {product.section} Wear
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-900 uppercase tracking-wide leading-tight">
                  {product.name}
                </h1>

                {reviewsData.stats.total_reviews > 0 ? (
                  <div className="flex items-center gap-2 mt-3">
                    {renderStars(reviewsData.stats.avg_rating)}
                    <span className="text-xs font-bold text-gray-700">{reviewsData.stats.avg_rating} / 5</span>
                    <span className="text-xs text-gray-400">· {reviewsData.stats.total_reviews} Reviews</span>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic mt-3">No reviews yet — be the first</p>
                )}

                <p className="text-3xl font-black text-[#1B4332] mt-4">Rs. {product.price}</p>

                <div className="mt-3">
                  {product.stock > 0 ? (
                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      In Stock ({product.stock} available)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 border border-red-200 px-3 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                      Out Of Stock
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t border-[#1B4332]/10 pt-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Description</h3>
                <p className="text-sm font-light leading-relaxed text-gray-600 whitespace-pre-line">{product.description}</p>
              </div>

              {/* Add to bag */}
              <div className="border-t border-[#1B4332]/10 pt-6 space-y-4">
                {isLoggedIn ? (
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0 || adding}
                    className="w-full bg-[#1B4332] text-white py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#143728] disabled:bg-gray-300 transition-colors shadow-sm hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <FiShoppingBag className="text-sm" />
                    {adding ? 'Adding...' : product.stock > 0 ? 'Add To Bag' : 'Out Of Stock'}
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full bg-white text-[#1B4332] border border-[#1B4332] py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#1B4332] hover:text-white transition-colors"
                  >
                    Login To Purchase
                  </button>
                )}
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="flex flex-col items-center text-center gap-1.5 bg-white rounded-xl p-3 border border-[#1B4332]/10">
                  <FiTruck className="text-lg text-[#1B4332]" />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 leading-tight">Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5 bg-white rounded-xl p-3 border border-[#1B4332]/10">
                  <FiShield className="text-lg text-[#1B4332]" />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 leading-tight">Secure Checkout</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5 bg-white rounded-xl p-3 border border-[#1B4332]/10">
                  <FiRefreshCw className="text-lg text-[#1B4332]" />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 leading-tight">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* REVIEWS */}
        <div className="pt-2 border-t border-[#1B4332]/10 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12">
          <div className="pt-10 sm:pt-14">
            <header className="mb-6">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/60 mb-2">Feedback</p>
              <h2 className="text-xl font-light tracking-widest uppercase italic text-gray-800">Customer Reviews</h2>
              <div className="h-1 w-12 bg-[#1B4332] mt-3 rounded-full"></div>
            </header>

            {reviewsData.reviews.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-[#1B4332]/20 p-8 text-center">
                <p className="text-sm text-gray-400 italic">Is product ke liye abhi koi reviews maujood nahi hain.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2">
                {reviewsData.reviews.map((review) => (
                  <div key={review.id} className="border border-[#1B4332]/10 p-5 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                        style={{ backgroundColor: avatarColor(review.customer_name) }}
                      >
                        {getInitials(review.customer_name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1 gap-2">
                          <span className="text-xs font-bold uppercase tracking-tight text-gray-900 truncate">{review.customer_name}</span>
                          {renderStars(review.rating)}
                        </div>
                        <p className="text-xs text-gray-600 font-light italic leading-relaxed">"{review.comment}"</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-10 sm:pt-14">
            <div className="bg-white p-6 sm:p-8 border border-[#1B4332]/10 rounded-2xl shadow-sm">
              <header className="mb-6">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/60 mb-2">Share Your Experience</p>
                <h2 className="text-xl font-light tracking-widest uppercase italic text-gray-800">Write A Review</h2>
                <div className="h-1 w-12 bg-[#1B4332] mt-3 rounded-full"></div>
              </header>

              {isLoggedIn ? (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  {formMessage.text && (
                    <div className={`p-3 rounded-lg text-xs font-bold uppercase tracking-wider ${formMessage.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                      {formMessage.text}
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Your Rating</label>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, index) => {
                        const starValue = index + 1;
                        return (
                          <button
                            type="button"
                            key={index}
                            className={`text-2xl transition-all duration-150 ${starValue <= (hoverRating || rating) ? 'text-amber-500 scale-110' : 'text-gray-300'}`}
                            onClick={() => setRating(starValue)}
                            onMouseEnter={() => setHoverRating(starValue)}
                            onMouseLeave={() => setHoverRating(0)}
                          >
                            ★
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Your Name</label>
                    <input type="text" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="e.g. Anas Siddiqui" className="w-full p-3 rounded-xl border border-gray-200 text-xs bg-[#F5F0E8]/40 outline-none focus:border-[#1B4332] focus:bg-white transition-colors" />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Comments / Review</label>
                    <textarea rows="4" required value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Tell us about fabric quality..." className="w-full p-3 rounded-xl border border-gray-200 text-xs bg-[#F5F0E8]/40 outline-none focus:border-[#1B4332] focus:bg-white resize-none transition-colors"></textarea>
                  </div>

                  <button type="submit" className="w-full bg-[#1B4332] text-white py-3.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#143728] transition-colors shadow-sm hover:shadow-lg">
                    Submit Review
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <p className="text-sm text-gray-500 italic font-light">Sirf registered customers hi reviews submit kar sakte hain.</p>
                  <button
                    onClick={() => navigate('/login')}
                    className="bg-[#1B4332] text-white px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#143728] transition-colors shadow-sm hover:shadow-lg"
                  >
                    Login to Write a Review
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;