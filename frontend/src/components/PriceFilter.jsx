// import React, { useState } from 'react';

// const PriceFilter = ({ onFilter, currentMin, currentMax, setMin, setMax }) => {
//   const handleFilter = (e) => {
//     e.preventDefault();
//     onFilter(currentMin, currentMax);
//   };

//   const handleReset = () => {
//     setMin('');
//     setMax('');
//     onFilter('', '');
//   };

//   return (
//     <div className="mb-10 flex flex-wrap justify-center items-center gap-4">
//       <form onSubmit={handleFilter} className="flex items-center gap-3">
//         <input 
//           type="number" 
//           placeholder="Min Price"
//           value={currentMin}
//           onChange={(e) => setMin(e.target.value)}
//           className="border border-gray-300 p-2 text-xs w-28 outline-none focus:border-black transition"
//         />
//         <span className="text-gray-400">—</span>
//         <input 
//           type="number" 
//           placeholder="Max Price"
//           value={currentMax}
//           onChange={(e) => setMax(e.target.value)}
//           className="border border-gray-300 p-2 text-xs w-28 outline-none focus:border-black transition"
//         />
//         <button 
//           type="submit"
//           className="bg-black text-white px-6 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors"
//         >
//           Filter
//         </button>
//       </form>
      
//       {(currentMin || currentMax) && (
//         <button 
//           onClick={handleReset}
//           className="text-[10px] font-bold tracking-widest uppercase underline hover:text-gray-500 transition-colors"
//         >
//           Clear All
//         </button>
//       )}
//     </div>
//   );
// };

// export default PriceFilter;






import React, { useState } from 'react';

const PriceFilter = ({ onFilter, currentMin, currentMax, setMin, setMax }) => {
  const handleFilter = (e) => {
    e.preventDefault();
    onFilter(currentMin, currentMax);
  };

  const handleReset = () => {
    setMin('');
    setMax('');
    onFilter('', '');
  };

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4">
      <form
        onSubmit={handleFilter}
        className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 bg-white border border-gray-200 rounded-xl sm:rounded-full px-3 sm:px-4 py-3 sm:py-2 shadow-sm"
      >
        <div className="flex items-center gap-2 flex-1">
          <span className="text-[11px] text-gray-400 uppercase tracking-widest font-medium hidden sm:inline">Rs.</span>
          <input
            type="number"
            placeholder="Min Price"
            value={currentMin}
            onChange={(e) => setMin(e.target.value)}
            className="border border-gray-300 sm:border-0 rounded-lg sm:rounded-none p-2 sm:p-1.5 text-xs w-full sm:w-24 outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] sm:focus:ring-0 transition"
          />
        </div>

        <span className="text-gray-300 text-center sm:text-base hidden sm:block">—</span>

        <div className="flex items-center gap-2 flex-1">
          <span className="text-[11px] text-gray-400 uppercase tracking-widest font-medium hidden sm:inline">Rs.</span>
          <input
            type="number"
            placeholder="Max Price"
            value={currentMax}
            onChange={(e) => setMax(e.target.value)}
            className="border border-gray-300 sm:border-0 rounded-lg sm:rounded-none p-2 sm:p-1.5 text-xs w-full sm:w-24 outline-none focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] sm:focus:ring-0 transition"
          />
        </div>

        <button
          type="submit"
          className="bg-[#1B4332] text-white px-6 py-2.5 sm:py-2 rounded-full text-[10px] font-bold tracking-widest uppercase hover:bg-[#143728] active:scale-95 transition-all duration-200 shadow-sm"
        >
          Filter
        </button>
      </form>

      {(currentMin || currentMax) && (
        <button
          onClick={handleReset}
          className="text-[10px] font-bold tracking-widest uppercase text-gray-500 border border-gray-300 rounded-full px-4 py-1.5 hover:text-[#1B4332] hover:border-[#1B4332] transition-colors"
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default PriceFilter;