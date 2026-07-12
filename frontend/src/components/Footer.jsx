// import React from 'react';
// import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const Footer = () => {
//   return (
//     <footer className="bg-zinc-900 text-white pt-16 pb-8">
//       <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-zinc-800 pb-12">
        
//         {/* Brand Info */}
//         <div className="space-y-4">
//           <h2 className="text-2xl font-black tracking-tighter">WEARZANE</h2>
//           <p className="text-zinc-400 text-sm leading-relaxed">
//             Premium suit collections for those who value elegance and quality. Crafting the perfect fit for your every occasion.
//           </p>
//           <div className="flex space-x-4">
//             <FaInstagram className="cursor-pointer hover:text-pink-500 transition text-lg" />
//             <FaFacebookF className="cursor-pointer hover:text-blue-500 transition text-lg" />
//             <FaWhatsapp className="cursor-pointer hover:text-green-500 transition text-lg" />
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h4 className="font-bold mb-6 text-sm">CUSTOMER CARE</h4>
//           <ul className="space-y-3 text-zinc-400 text-sm">
//             <li><a href="#" className="hover:text-white">Shipping Policy</a></li>
//             <li><a href="#" className="hover:text-white">Return & Exchange</a></li>
//             <li><a href="#" className="hover:text-white">Track Order</a></li>
//             <li><a href="#" className="hover:text-white">Contact Us</a></li>
//           </ul>
//         </div>

//         {/* Categories */}
//         <div>
//           <h4 className="font-bold mb-6 text-sm">SHOP</h4>
//           <ul className="space-y-3 text-zinc-400 text-sm">
//             <li><Link to="/category/men" className="hover:text-white">Men's Collection</Link></li>
//             <li><Link to="/category/women" className="hover:text-white">Women's Collection</Link></li>
//             <li><Link to="/shop" className="hover:text-white">New Arrivals</Link></li>
//             <li><Link to="/sale" className="hover:text-white text-red-400 font-bold">Clearance Sale</Link></li>
//           </ul>
//         </div>

//         {/* Newsletter */}
//         <div>
//           <h4 className="font-bold mb-6 text-sm">STAY UPDATED</h4>
//           <p className="text-zinc-400 text-xs mb-4">Subscribe to get special offers and first look at new collections.</p>
//           <div className="flex border border-zinc-700 rounded overflow-hidden">
//             <input type="email" placeholder="Email Address" className="bg-transparent p-2 text-xs w-full outline-none" />
//             <button className="bg-white text-black px-4 font-bold text-xs">JOIN</button>
//           </div>
//         </div>
//       </div>

//       <div className="text-center pt-8 text-zinc-600 text-xs tracking-widest">
//         &copy; {new Date().getFullYear()} WEARZANE PREMIUM. ALL RIGHTS RESERVED.
//       </div>
//     </footer>
//   );
// };

// export default Footer;






import React, { useState } from 'react';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { FiSend, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // 🎯 Yahan actual newsletter API call add ki ja sakti hai
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-[#1B4332] text-white pt-16 pb-8">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 grid grid-cols-1 md:grid-cols-4 gap-10 sm:gap-12 border-b border-white/10 pb-12">

        {/* Brand Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black tracking-tighter">WEARZANE</h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Premium suit collections for those who value elegance and quality. Crafting the perfect fit for your every occasion.
          </p>
          <div className="flex space-x-3 pt-1">
            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4ADE80] hover:text-[#1B4332] transition-colors">
              <FaInstagram className="text-sm" />
            </a>
            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4ADE80] hover:text-[#1B4332] transition-colors">
              <FaFacebookF className="text-sm" />
            </a>
            <a href="#" aria-label="WhatsApp" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4ADE80] hover:text-[#1B4332] transition-colors">
              <FaWhatsapp className="text-sm" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold mb-6 text-xs tracking-widest uppercase text-white/90">Customer Care</h4>
          <ul className="space-y-3 text-white/60 text-sm">
            <li><a href="#" className="hover:text-[#4ADE80] transition-colors">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-[#4ADE80] transition-colors">Return &amp; Exchange</a></li>
            <li><Link to="/my-orders" className="hover:text-[#4ADE80] transition-colors">Track Order</Link></li>
            <li><a href="#" className="hover:text-[#4ADE80] transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-bold mb-6 text-xs tracking-widest uppercase text-white/90">Shop</h4>
          <ul className="space-y-3 text-white/60 text-sm">
            <li><Link to="/section/men" className="hover:text-[#4ADE80] transition-colors">Men's Collection</Link></li>
            <li><Link to="/section/women" className="hover:text-[#4ADE80] transition-colors">Women's Collection</Link></li>
            <li><Link to="/" className="hover:text-[#4ADE80] transition-colors">New Arrivals</Link></li>
            <li><Link to="/about" className="hover:text-[#4ADE80] transition-colors">About Us</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-bold mb-6 text-xs tracking-widest uppercase text-white/90">Stay Updated</h4>
          <p className="text-white/60 text-xs mb-4 leading-relaxed">
            Subscribe to get special offers and first look at new collections.
          </p>
          <form onSubmit={handleSubscribe} className="flex bg-white/10 rounded-full overflow-hidden border border-white/10 focus-within:border-[#4ADE80] transition-colors">
            <input
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent px-4 py-2.5 text-xs w-full outline-none placeholder:text-white/40"
            />
            <button
              type="submit"
              className="bg-[#4ADE80] text-[#1B4332] px-4 font-bold text-xs flex items-center gap-1 hover:bg-white transition-colors flex-shrink-0"
            >
              {subscribed ? <FiCheck /> : <FiSend />}
              <span className="hidden sm:inline">{subscribed ? 'Done' : 'Join'}</span>
            </button>
          </form>
          {subscribed && (
            <p className="text-[#4ADE80] text-[10px] font-bold uppercase tracking-widest mt-2">Subscribed successfully!</p>
          )}
        </div>
      </div>

      <div className="text-center pt-8 text-white/40 text-xs tracking-widest px-4">
        &copy; {new Date().getFullYear()} WEARZANE PREMIUM. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};

export default Footer;