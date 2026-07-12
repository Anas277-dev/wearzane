// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const AboutUs = () => {
//   const [data, setData] = useState({});

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/cms/page/about-us')
//       .then(res => setData(res.data));
//   }, []);

//   return (
//     <div className="font-sans text-gray-800 bg-white">
//       {/* Hero Section */}
//       <div className="relative h-[400px] w-full overflow-hidden">
//         <img src={data.image_url || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f'} 
//              className="w-full h-full object-cover" alt="About Hero" />
//         <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//           <h1 className="text-5xl font-extrabold text-white">{data.title}</h1>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto py-16 px-6 space-y-16">
        
//         {/* SECTION 1: Our Story (Full Width) */}
//         <section className="text-center max-w-3xl mx-auto">
//           <h2 className="text-3xl font-bold mb-6 border-b-2 border-black inline-block pb-2">Our Story</h2>
//           <p className="text-lg text-gray-600 leading-relaxed">{data.content}</p>
//         </section>

//         {/* SECTION 2: Vision & Mission (Side-by-Side) */}
//         <section className="grid md:grid-cols-2 gap-8">
//           <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border-l-4 border-blue-600">
//             <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
//             <p className="text-gray-600 leading-relaxed">{data.secondary_content || "Vision content here..."}</p>
//           </div>
//           <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border-l-4 border-green-600">
//             <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
//             <p className="text-gray-600 leading-relaxed">{data.mission_content || "Mission content will appear here..."}</p>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;












import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AboutUs = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/cms/page/about-us')
      .then(res => setData(res.data))
      .catch(err => console.error("Error fetching about-us page", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F5F0E8]">

      {/* HERO SECTION - full-bleed, same visual language as Home banner */}
      <div className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] overflow-hidden bg-gray-100">
        <img
          src={data.image_url || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f'}
          className="w-full h-full object-cover"
          alt="About Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 flex flex-col items-center justify-center text-center px-4">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#4ADE80] mb-3 sm:mb-4">
            Wearzane
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider text-white drop-shadow-sm max-w-3xl leading-tight">
            {data.title || "About Us"}
          </h1>
          <div className="h-1 w-16 bg-[#4ADE80] mt-5 sm:mt-6 rounded-full"></div>
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-14 sm:py-20 space-y-16 sm:space-y-24">

        {loading ? (
          <div className="flex flex-col items-center justify-center gap-4 p-16 sm:p-24">
            <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-gray-200 border-t-[#1B4332] rounded-full animate-spin"></div>
            <p className="text-base sm:text-lg font-light uppercase tracking-widest text-[#1B4332]">
              Loading...
            </p>
          </div>
        ) : (
          <>
            {/* SECTION 1: Our Story */}
            <section className="text-center max-w-3xl mx-auto px-2">
              <p className="text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-[#1B4332]/60 mb-3">
                Who We Are
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-[0.1em] uppercase italic text-gray-800 mb-4">
                Our Story
              </h2>
              <div className="h-1 w-12 sm:w-16 bg-[#1B4332] mx-auto mb-8 sm:mb-10 rounded-full"></div>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                {data.content || "Our story will appear here soon."}
              </p>
            </section>

            {/* SECTION 2: Vision & Mission - Side by Side */}
            <section className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-[#1B4332]/10 hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 rounded-full bg-[#1B4332]/10 flex items-center justify-center mb-5">
                  <span className="text-xl">🎯</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wide mb-4 text-[#1B4332]">
                  Our Vision
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {data.secondary_content || "Vision content here..."}
                </p>
              </div>

              <div className="bg-[#1B4332] p-8 sm:p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-5">
                  <span className="text-xl">🌱</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wide mb-4 text-white">
                  Our Mission
                </h2>
                <p className="text-[#F5F0E8]/90 leading-relaxed">
                  {data.mission_content || "Mission content will appear here..."}
                </p>
              </div>
            </section>

            {/* SECTION 3: Brand strip - reinforces identity, consistent with site footer/nav tone */}
            <section className="text-center border-t border-[#1B4332]/15 pt-12 sm:pt-16">
              <p className="text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-gray-400">
                Crafted with care — Worn with pride
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default AboutUs;