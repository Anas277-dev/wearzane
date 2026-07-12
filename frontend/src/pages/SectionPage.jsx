// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import ProductCard from '../components/ProductCard';
// import PriceFilter from '../components/PriceFilter';

// const SectionPage = () => {
//   const { sectionName } = useParams(); 
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');

//   const fetchSectionProducts = async (min = '', max = '') => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/products/section/${sectionName}?minPrice=${min}&maxPrice=${max}`
//       );
//       setProducts(res.data);
//     } catch (err) {
//       console.error("Error fetching section products", err);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     setMinPrice(''); setMaxPrice(''); // Reset filters on section change
//     fetchSectionProducts();
//   }, [sectionName]);

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <header className="mb-12 text-center">
//         <h1 className="text-3xl font-light tracking-[0.2em] uppercase italic text-gray-800">{sectionName} Collection</h1>
//         <div className="h-1 w-16 bg-black mx-auto mt-2"></div>
//       </header>

//       <PriceFilter 
//         onFilter={fetchSectionProducts} 
//         currentMin={minPrice} 
//         currentMax={maxPrice}
//         setMin={setMinPrice}
//         setMax={setMaxPrice}
//       />

//       {loading ? (
//         <div className="text-center p-20 text-xl font-light uppercase tracking-widest animate-pulse">Loading {sectionName}...</div>
//       ) : products.length > 0 ? (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
//           {products.map((product) => <ProductCard key={product.id} product={product} />)}
//         </div>
//       ) : (
//         <div className="text-center py-20 text-gray-400 italic font-light tracking-widest uppercase">No products match your criteria.</div>
//       )}
//     </div>
//   );
// };

// export default SectionPage;









import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import PriceFilter from '../components/PriceFilter';

const SectionPage = () => {
  const { sectionName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const fetchSectionProducts = async (min = '', max = '') => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/section/${sectionName}?minPrice=${min}&maxPrice=${max}`
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching section products", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    setMinPrice(''); setMaxPrice(''); // Reset filters on section change
    fetchSectionProducts();
  }, [sectionName]);

  return (
    <div className="w-full min-h-screen bg-[#F5F0E8]">

      {/* PRODUCTS SECTION - full width container, same as Home */}
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 space-y-10 sm:space-y-16">
        <div>
          <header className="mb-8 sm:mb-12 text-center px-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase italic text-gray-800 break-words">
              {sectionName} Collection
            </h1>
            <div className="h-1 w-12 sm:w-16 bg-[#1B4332] mx-auto mt-3 sm:mt-4 rounded-full"></div>
          </header>

          <div className="mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-[#1B4332]/15">
            <PriceFilter
              onFilter={(min, max) => { setMinPrice(min); setMaxPrice(max); fetchSectionProducts(min, max); }}
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
                Loading {sectionName}...
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
                  No products match your criteria.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionPage;