// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import ProductCard from '../components/ProductCard';
// import PriceFilter from '../components/PriceFilter';

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [banners, setBanners] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loading, setLoading] = useState(false); // Default false rakhein taake screen jhatke na mare
//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const searchParam = queryParams.get('search') || '';

//   // 🎯 Central API Fetch Function
//   const fetchProducts = async (searchVal = '', min = '', max = '') => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/products?minPrice=${min}&maxPrice=${max}&search=${encodeURIComponent(searchVal)}`
//       );
//       setProducts(res.data);
//     } catch (err) {
//       console.error("Error fetching products", err);
//     }
//     setLoading(false);
//   };

//   // 🎯 DEBOUNCE EFFECT: Type karne ke 400ms baad API call hogi
//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       fetchProducts(searchParam, minPrice, maxPrice);
//     }, 400); // 400ms ka delay jab user typing rokay ga

//     return () => clearTimeout(delayDebounceFn); // Agar user phir se type kare toh purana timer cancel
//   }, [searchParam, minPrice, maxPrice]); // Jab bhi search lafz ya price badle, ye trigger hoga

//   useEffect(() => {
//     // Banners sirf ek baar load honge
//     const fetchBanners = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/cms/banners');
//         setBanners(res.data);
//       } catch (err) {
//         console.error("Error fetching banners", err);
//       }
//     };
//     fetchBanners();
//   }, []);

//   useEffect(() => {
//     if (banners.length <= 1) return;
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % banners.length);
//     }, 4000);
//     return () => clearInterval(timer);
//   }, [banners]);

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
//       {/* HERO BANNER SECTION (Search ke dauran automatic hide hojayega taake result clear dikhein) */}
//       {banners.length > 0 && !searchParam && (
//         <div className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
//           {banners.map((banner, index) => (
//             <div 
//               key={banner.id} 
//               className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
//                 index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
//               }`}
//             >
//               <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover" />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
//                 <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wider mb-2">{banner.title}</h2>
//                 {banner.subtitle && <p className="text-sm md:text-base font-light tracking-wide mb-4">{banner.subtitle}</p>}
//                 {banner.button_link && (
//                   <a href={banner.button_link} className="bg-white text-black px-6 py-2 rounded-full font-medium text-xs md:text-sm uppercase tracking-widest w-max hover:bg-black hover:text-white transition-all">
//                     Shop Now
//                   </a>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* PRODUCT ARRIVALS SECTION */}
//       <div>
//         <header className="mb-12 text-center">
//           <h1 className="text-3xl font-light tracking-[0.2em] uppercase italic text-gray-800">
//             {searchParam ? `Live Results For: "${searchParam}"` : "New Arrivals"}
//           </h1>
//           <div className="h-1 w-16 bg-black mx-auto mt-2"></div>
//         </header>

//         <PriceFilter 
//           onFilter={(min, max) => { setMinPrice(min); setMaxPrice(max); }} 
//           currentMin={minPrice} 
//           currentMax={maxPrice}
//           setMin={setMinPrice}
//           setMax={setMaxPrice}
//         />

//         {loading ? (
//           <div className="text-center p-20 text-xl font-light uppercase tracking-widest animate-pulse text-gray-400">Searching Products...</div>
//         ) : products.length > 0 ? (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
//             {products.map((product) => <ProductCard key={product.id} product={product} />)}
//           </div>
//         ) : (
//           <div className="text-center py-20 text-gray-400 italic">No products found matching "{searchParam}".</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;







// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import ProductCard from '../components/ProductCard';
// import PriceFilter from '../components/PriceFilter';

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [banners, setBanners] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loading, setLoading] = useState(false); // Default false rakhein taake screen jhatke na mare
//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const searchParam = queryParams.get('search') || '';

//   // 🎯 Central API Fetch Function
//   const fetchProducts = async (searchVal = '', min = '', max = '') => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/products?minPrice=${min}&maxPrice=${max}&search=${encodeURIComponent(searchVal)}`
//       );
//       setProducts(res.data);
//     } catch (err) {
//       console.error("Error fetching products", err);
//     }
//     setLoading(false);
//   };

//   // 🎯 DEBOUNCE EFFECT: Type karne ke 400ms baad API call hogi
//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       fetchProducts(searchParam, minPrice, maxPrice);
//     }, 400); // 400ms ka delay jab user typing rokay ga

//     return () => clearTimeout(delayDebounceFn); // Agar user phir se type kare toh purana timer cancel
//   }, [searchParam, minPrice, maxPrice]); // Jab bhi search lafz ya price badle, ye trigger hoga

//   useEffect(() => {
//     // Banners sirf ek baar load honge
//     const fetchBanners = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/cms/banners');
//         setBanners(res.data);
//       } catch (err) {
//         console.error("Error fetching banners", err);
//       }
//     };
//     fetchBanners();
//   }, []);

//   useEffect(() => {
//     if (banners.length <= 1) return;
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % banners.length);
//     }, 4000);
//     return () => clearInterval(timer);
//   }, [banners]);

//   return (
//     <div className="w-full min-h-screen bg-[#F5F0E8]">

//       {/* HERO BANNER SECTION - full-bleed edge to edge (Search ke dauran automatic hide hojayega) */}
//       {banners.length > 0 && !searchParam && (
//         <div className="relative w-full h-[300px] sm:h-[420px] md:h-[540px] lg:h-[640px] overflow-hidden bg-gray-100 shadow-sm">
//           {banners.map((banner, index) => (
//             <div
//               key={banner.id}
//               className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
//                 index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
//               }`}
//             >
//               <img
//                 src={banner.image_url}
//                 alt={banner.title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex flex-col justify-end p-6 sm:p-10 md:p-14 lg:p-16 text-white">
//                 <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider mb-2 sm:mb-3 drop-shadow-sm max-w-2xl leading-tight">
//                   {banner.title}
//                 </h2>
//                 {banner.subtitle && (
//                   <p className="text-xs sm:text-sm md:text-lg font-light tracking-wide mb-4 sm:mb-5 max-w-md text-white/90">
//                     {banner.subtitle}
//                   </p>
//                 )}
//                 {banner.button_link && (
//                   <a
//                     href={banner.button_link}
//                     className="inline-block bg-white text-[#1B4332] px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium text-xs md:text-sm uppercase tracking-widest w-max hover:bg-[#1B4332] hover:text-white transition-all duration-300 shadow-md hover:shadow-xl"
//                   >
//                     Shop Now
//                   </a>
//                 )}
//               </div>
//             </div>
//           ))}

//           {/* Slide indicators */}
//           {banners.length > 1 && (
//             <div className="absolute bottom-4 sm:bottom-6 right-5 sm:right-10 z-20 flex gap-1.5 sm:gap-2">
//               {banners.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentSlide(index)}
//                   aria-label={`Go to slide ${index + 1}`}
//                   className={`h-1.5 rounded-full transition-all duration-300 ${
//                     index === currentSlide ? 'w-6 sm:w-8 bg-[#4ADE80] ring-1 ring-white/60' : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white/80'
//                   }`}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       {/* PRODUCT ARRIVALS SECTION - full width container */}
//       <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 space-y-10 sm:space-y-16">
//         <div>
//           <header className="mb-8 sm:mb-12 text-center px-2">
//             <h1 className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase italic text-gray-800 break-words">
//               {searchParam ? `Live Results For: "${searchParam}"` : "New Arrivals"}
//             </h1>
//             <div className="h-1 w-12 sm:w-16 bg-[#1B4332] mx-auto mt-3 sm:mt-4 rounded-full"></div>
//           </header>

//           <div className="mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-[#1B4332]/15">
//             <PriceFilter
//               onFilter={(min, max) => { setMinPrice(min); setMaxPrice(max); }}
//               currentMin={minPrice}
//               currentMax={maxPrice}
//               setMin={setMinPrice}
//               setMax={setMaxPrice}
//             />
//           </div>

//           {loading ? (
//             <div className="flex flex-col items-center justify-center gap-4 p-16 sm:p-24">
//               <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-gray-200 border-t-[#1B4332] rounded-full animate-spin"></div>
//               <p className="text-base sm:text-lg font-light uppercase tracking-widest text-[#1B4332]">
//                 Searching Products...
//               </p>
//             </div>
//           ) : products.length > 0 ? (
//             <div className="grid grid-cols-1 min-[481px]:grid-cols-2 min-[769px]:grid-cols-3 min-[1025px]:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-8 sm:gap-y-12">
//               {products.map((product) => <ProductCard key={product.id} product={product} />)}
//             </div>
//           ) : (
//             <div className="text-center py-16 sm:py-24 px-4">
//               <div className="inline-block border-l-2 border-[#1B4332] pl-4 text-left">
//                 <p className="text-gray-400 italic text-sm sm:text-base break-words">
//                   No products found matching "{searchParam}".
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;





import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import PriceFilter from '../components/PriceFilter';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false); // Default false rakhein taake screen jhatke na mare
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get('search') || '';

  // 🎯 Central API Fetch Function
  const fetchProducts = async (searchVal = '', min = '', max = '') => {
    console.log("🎯 VITE_API_URL value hai:", import.meta.env.VITE_API_URL); // 🎯 DEBUG
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products?minPrice=${min}&maxPrice=${max}&search=${encodeURIComponent(searchVal)}`
      );
      console.log("Products API response:", res.data); // 🎯 DEBUG: response shape check karne ke liye
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else if (Array.isArray(res.data?.products)) {
        setProducts(res.data.products);
      } else if (Array.isArray(res.data?.data)) {
        setProducts(res.data.data);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Error fetching products", err);
    }
    setLoading(false);
  };

  // 🎯 DEBOUNCE EFFECT: Type karne ke 400ms baad API call hogi
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts(searchParam, minPrice, maxPrice);
    }, 400); // 400ms ka delay jab user typing rokay ga

    return () => clearTimeout(delayDebounceFn); // Agar user phir se type kare toh purana timer cancel
  }, [searchParam, minPrice, maxPrice]); // Jab bhi search lafz ya price badle, ye trigger hoga

  useEffect(() => {
    // Banners sirf ek baar load honge
    const fetchBanners = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cms/banners`);
        console.log("Banners API response:", res.data); // 🎯 DEBUG: response shape check karne ke liye
        if (Array.isArray(res.data)) {
          setBanners(res.data);
        } else if (Array.isArray(res.data?.banners)) {
          setBanners(res.data.banners);
        } else if (Array.isArray(res.data?.data)) {
          setBanners(res.data.data);
        } else {
          setBanners([]);
        }
      } catch (err) {
        console.error("Error fetching banners", err);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [banners]);

  return (
    <div className="w-full min-h-screen bg-[#F5F0E8]">

      {/* HERO BANNER SECTION - full-bleed edge to edge (Search ke dauran automatic hide hojayega) */}
      {banners.length > 0 && !searchParam && (
        <div className="relative w-full h-[300px] sm:h-[420px] md:h-[540px] lg:h-[640px] overflow-hidden bg-gray-100 shadow-sm">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={banner.image_url}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex flex-col justify-end p-6 sm:p-10 md:p-14 lg:p-16 text-white">
                <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider mb-2 sm:mb-3 drop-shadow-sm max-w-2xl leading-tight">
                  {banner.title}
                </h2>
                {banner.subtitle && (
                  <p className="text-xs sm:text-sm md:text-lg font-light tracking-wide mb-4 sm:mb-5 max-w-md text-white/90">
                    {banner.subtitle}
                  </p>
                )}
                {banner.button_link && (
                  <a
                    href={banner.button_link}
                    className="inline-block bg-white text-[#1B4332] px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium text-xs md:text-sm uppercase tracking-widest w-max hover:bg-[#1B4332] hover:text-white transition-all duration-300 shadow-md hover:shadow-xl"
                  >
                    Shop Now
                  </a>
                )}
              </div>
            </div>
          ))}

          {/* Slide indicators */}
          {banners.length > 1 && (
            <div className="absolute bottom-4 sm:bottom-6 right-5 sm:right-10 z-20 flex gap-1.5 sm:gap-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'w-6 sm:w-8 bg-[#4ADE80] ring-1 ring-white/60' : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* PRODUCT ARRIVALS SECTION - full width container */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 space-y-10 sm:space-y-16">
        <div>
          <header className="mb-8 sm:mb-12 text-center px-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase italic text-gray-800 break-words">
              {searchParam ? `Live Results For: "${searchParam}"` : "New Arrivals"}
            </h1>
            <div className="h-1 w-12 sm:w-16 bg-[#1B4332] mx-auto mt-3 sm:mt-4 rounded-full"></div>
          </header>

          <div className="mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-[#1B4332]/15">
            <PriceFilter
              onFilter={(min, max) => { setMinPrice(min); setMaxPrice(max); }}
              currentMin={minPrice}
              currentMax={maxPrice}
              setMin={setMinPrice}
              setMax={setMaxPrice}
            />
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center gap-4 p-16 sm:p-24">
              <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-gray-200 border-t-[#1B4332] rounded-full animate-spin"></div>
              <p className="text-base sm:text-lg font-light uppercase tracking-widest text-[#1B4332]">
                Searching Products...
              </p>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 min-[481px]:grid-cols-2 min-[769px]:grid-cols-3 min-[1025px]:grid-cols-4 gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-8 sm:gap-y-12">
              {products.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="text-center py-16 sm:py-24 px-4">
              <div className="inline-block border-l-2 border-[#1B4332] pl-4 text-left">
                <p className="text-gray-400 italic text-sm sm:text-base break-words">
                  No products found matching "{searchParam}".
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;