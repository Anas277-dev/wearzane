// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import ProductCard from '../components/ProductCard';
// import PriceFilter from '../components/PriceFilter';

// const CategoryPage = () => {
//   const { categoryName } = useParams();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');

//   const fetchCategoryProducts = async (min = '', max = '') => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/products/category/${categoryName}?minPrice=${min}&maxPrice=${max}`
//       );
//       setProducts(res.data);
//     } catch (err) {
//       console.error("Error fetching category products", err);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     setMinPrice(''); setMaxPrice(''); // Reset filters on category change
//     fetchCategoryProducts();
//   }, [categoryName]);

//   return (
//     <div className="w-full min-h-screen bg-[#F5F0E8]">

//       {/* PRODUCTS SECTION - full width container, same as Home */}
//       <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 space-y-10 sm:space-y-16">
//         <div>
//           <header className="mb-8 sm:mb-12 text-center px-2">
//             <h1 className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase italic text-gray-800 break-words">
//               {categoryName} Collection
//             </h1>
//             <div className="h-1 w-12 sm:w-16 bg-[#1B4332] mx-auto mt-3 sm:mt-4 rounded-full"></div>
//           </header>

//           <div className="mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-[#1B4332]/15">
//             <PriceFilter
//               onFilter={(min, max) => { setMinPrice(min); setMaxPrice(max); fetchCategoryProducts(min, max); }}
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
//                 Loading {categoryName}...
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
//                   No items found in this range.
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;








import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import PriceFilter from '../components/PriceFilter';

// 🎯 Agar Vercel/production me VITE_API_URL set hai to wahi use hoga,
// warna local PC par apne aap localhost:5000 par fallback ho jayega
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const fetchCategoryProducts = async (min = '', max = '') => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_URL}/api/products/category/${categoryName}?minPrice=${min}&maxPrice=${max}`
      );
      // 🎯 Safety check: backend chahe plain array de ya { products: [...] } / { data: [...] } wrap karke de, dono handle honge
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
      console.error("Error fetching category products", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    setMinPrice(''); setMaxPrice(''); // Reset filters on category change
    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <div className="w-full min-h-screen bg-[#F5F0E8]">

      {/* PRODUCTS SECTION - full width container, same as Home */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 space-y-10 sm:space-y-16">
        <div>
          <header className="mb-8 sm:mb-12 text-center px-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase italic text-gray-800 break-words">
              {categoryName} Collection
            </h1>
            <div className="h-1 w-12 sm:w-16 bg-[#1B4332] mx-auto mt-3 sm:mt-4 rounded-full"></div>
          </header>

          <div className="mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-[#1B4332]/15">
            <PriceFilter
              onFilter={(min, max) => { setMinPrice(min); setMaxPrice(max); fetchCategoryProducts(min, max); }}
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
                Loading {categoryName}...
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
                  No items found in this range.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;