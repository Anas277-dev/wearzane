// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiChevronDown, FiLogOut, FiSliders, FiPackage } from 'react-icons/fi'; // 🎯 FiPackage add kiya icon ke liye
// // 🎯 CART CONTEXT INTEGRATION
// import { useCart } from '../context/CartContext'; 
// // 🎯 CART DRAWER IMPORT
// import CartDrawer from './CartDrawer'; 

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [user, setUser] = useState(null);

//   // 🎯 CART DRAWER OPEN/CLOSE STATE
//   const [cartOpen, setCartOpen] = useState(false);

//   // 🎯 LIVE CART COUNT & LOGOUTCART EXTRACTED FROM CONTEXT
//   const { cartCount, logoutCart } = useCart();

//   // 🎯 SEARCH STATES
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/categories')
//       .then(res => setCategories(res.data))
//       .catch(err => console.log("Navbar categories error:", err));
//   }, []);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       setUser(null);
//     }
//     setIsOpen(false);
//   }, [location]);

//   const handleLiveSearch = (value) => {
//     setSearchQuery(value);
//     if (value.trim()) {
//       navigate(`/?search=${encodeURIComponent(value.trim())}`);
//     } else {
//       navigate('/');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     if (typeof logoutCart === 'function') {
//       logoutCart();
//     }
//     setUser(null);
//     setActiveDropdown(null);
//     alert("Logged out successfully!");
//     window.location.href = '/login';
//   };

//   const sections = ["Men", "Women", "Kids", "Unisex"];

//   return (
//     <>
//       <nav className="bg-white border-b sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-20">
            
//             <div className="flex-shrink-0">
//               <Link to="/" className="text-3xl font-black tracking-tighter text-black">WEARZANE</Link>
//             </div>

//             <div className="hidden md:flex space-x-8 items-center">
//               <Link to="/" className="text-xs font-bold tracking-widest hover:text-gray-500 transition">NEW ARRIVALS</Link>

//               <div className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
//                 <button 
//                   onMouseEnter={() => setActiveDropdown('shop')}
//                   className="text-xs font-bold tracking-widest flex items-center gap-1 hover:text-gray-500 transition uppercase"
//                 >
//                   SHOP <FiChevronDown />
//                 </button>
                
//                 {activeDropdown === 'shop' && (
//                   <div className="absolute top-full left-0 w-48 bg-white shadow-xl border mt-0 py-2 transition-all z-50">
//                     {sections.map((sec) => (
//                       <Link 
//                         key={sec}
//                         to={`/section/${sec.toLowerCase()}`}
//                         className="block px-4 py-2 text-xs font-bold hover:bg-gray-50 uppercase"
//                         onClick={() => setActiveDropdown(null)}
//                       >
//                         {sec}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
              
//               <div className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
//                 <button 
//                   onMouseEnter={() => setActiveDropdown('collections')}
//                   className="text-xs font-bold tracking-widest flex items-center gap-1 hover:text-gray-500 transition uppercase"
//                 >
//                   COLLECTIONS <FiChevronDown />
//                 </button>
                
//                 {activeDropdown === 'collections' && (
//                   <div className="absolute top-full left-0 w-48 bg-white shadow-xl border mt-0 py-2 transition-all z-50">
//                     {categories.map((cat) => (
//                       <Link 
//                         key={cat.id}
//                         to={`/category/${cat.name.toLowerCase()}`}
//                         className="block px-4 py-2 text-xs font-bold hover:bg-gray-50 uppercase"
//                         onClick={() => setActiveDropdown(null)}
//                       >
//                         {cat.name}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <Link to="/about" className="text-xs font-bold tracking-widest hover:text-gray-500 transition">ABOUT US</Link>
//             </div>

//             <div className="flex items-center space-x-5">
              
//               <div className="flex items-center">
//                 {searchOpen ? (
//                   <div className="flex items-center border-b border-black py-1 px-2 transition-all">
//                     <input 
//                       type="text" 
//                       placeholder="Type to search..." 
//                       value={searchQuery}
//                       onChange={(e) => handleLiveSearch(e.target.value)}
//                       className="text-xs font-bold uppercase tracking-wider outline-none w-32 md:w-48"
//                       autoFocus
//                     />
//                     <FiSearch className="text-lg text-gray-400 ml-1" />
//                     <FiX 
//                       className="text-lg cursor-pointer ml-2 text-red-500" 
//                       onClick={() => { 
//                         setSearchOpen(false); 
//                         setSearchQuery(''); 
//                         navigate('/'); 
//                       }} 
//                     />
//                   </div>
//                 ) : (
//                   <FiSearch className="text-xl cursor-pointer hover:text-gray-600 transition" onClick={() => setSearchOpen(true)} />
//                 )}
//               </div>
              
//               <button 
//                 onClick={() => setCartOpen(true)} 
//                 className="relative text-xl hover:text-gray-600 transition focus:outline-none"
//               >
//                 <FiShoppingCart />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold transition-all animate-bounce">
//                     {cartCount}
//                   </span>
//                 )}
//               </button>

//               <div className="relative" onMouseLeave={() => setActiveDropdown(null)}>
//                 <button 
//                   onMouseEnter={() => setActiveDropdown('profile')}
//                   className={`flex items-center gap-1 text-xl transition ${user ? 'text-emerald-600 font-bold' : 'text-black hover:text-gray-600'}`}
//                 >
//                   <FiUser />
//                   {user && <span className="text-[10px] uppercase tracking-wider hidden lg:inline">{user.name.split(' ')[0]}</span>}
//                 </button>

//                 {activeDropdown === 'profile' && (
//                   <div className="absolute top-full right-0 w-56 bg-white shadow-xl border mt-0 py-2 transition-all z-50">
//                     {user ? (
//                       <>
//                         <div className="px-4 py-3 border-b border-gray-100">
//                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Logged In As</p>
//                           <p className="text-xs font-black text-gray-900 truncate uppercase mt-0.5">{user.name}</p>
//                         </div>

//                         {/* 🎯 OPTION 2: My Orders Link (Visible only if user is logged in) */}
//                         <Link 
//                           to="/my-orders" 
//                           className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 uppercase tracking-wider"
//                           onClick={() => setActiveDropdown(null)}
//                         >
//                           <FiPackage /> My Orders
//                         </Link>

//                         {user.is_admin && (
//                           <Link 
//                             to="/admin" 
//                             className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-amber-600 hover:bg-amber-50 uppercase tracking-wider"
//                             onClick={() => setActiveDropdown(null)}
//                           >
//                             <FiSliders /> Admin Panel
//                           </Link>
//                         )}

//                         <button 
//                           onClick={handleLogout}
//                           className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 uppercase tracking-wider text-left"
//                         >
//                           <FiLogOut /> Log Out
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <Link to="/login" className="block px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 uppercase tracking-wider" onClick={() => setActiveDropdown(null)}>Sign In</Link>
//                         <Link to="/register" className="block px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 uppercase tracking-wider" onClick={() => setActiveDropdown(null)}>Create Account</Link>
//                       </>
//                     )}
//                   </div>
//                 )}
//               </div>

//               <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl text-black">
//                 {isOpen ? <FiX /> : <FiMenu />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {isOpen && (
//           <div className="md:hidden bg-white border-t px-4 pt-4 pb-6 space-y-3 shadow-lg transition-all">
//             <Link to="/" className="block text-xs font-bold tracking-widest text-gray-900 uppercase py-2 border-b border-gray-50">NEW ARRIVALS</Link>
//             {/* 🎯 MOBILE MY ORDERS */}
//             {user && <Link to="/my-orders" className="block text-xs font-bold tracking-widest text-emerald-600 uppercase py-2 border-b border-gray-50">MY ORDERS</Link>}
            
//             <div className="py-1">
//               <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">Shop By Section</p>
//               <div className="grid grid-cols-2 gap-2">
//                 {sections.map((sec) => (
//                   <Link key={sec} to={`/section/${sec.toLowerCase()}`} className="text-xs font-bold text-gray-700 py-1 uppercase">{sec}</Link>
//                 ))}
//               </div>
//             </div>

//             <div className="py-1 border-t border-gray-50 pt-2">
//               <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">Collections</p>
//               <div className="grid grid-cols-2 gap-2">
//                 {categories.map((cat) => (
//                   <Link key={cat.id} to={`/category/${cat.name.toLowerCase()}`} className="text-xs font-bold text-gray-700 py-1 uppercase">{cat.name}</Link>
//                 ))}
//               </div>
//             </div>

//             <Link to="/about" className="block text-xs font-bold tracking-widest text-gray-900 uppercase py-2 border-t border-gray-50">OUR STORY</Link>
//           </div>
//         )}
//       </nav>

//       <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
//     </>
//   );
// };

// export default Navbar;












import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiChevronDown, FiLogOut, FiSliders, FiPackage, FiChevronRight } from 'react-icons/fi'; // 🎯 FiPackage add kiya icon ke liye
// 🎯 CART CONTEXT INTEGRATION
import { useCart } from '../context/CartContext';
// 🎯 CART DRAWER IMPORT
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [user, setUser] = useState(null);

  // 🎯 CART DRAWER OPEN/CLOSE STATE
  const [cartOpen, setCartOpen] = useState(false);

  // 🎯 LIVE CART COUNT & LOGOUTCART EXTRACTED FROM CONTEXT
  const { cartCount, logoutCart } = useCart();

  // 🎯 SEARCH STATES
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.log("Navbar categories error:", err));
  }, []);

  // 🎯 User info location change hone par refresh hota hai (login/logout ke baad)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  // 🎯 FIX: Mobile sidebar sirf tab close ho jab actual PAGE (pathname) badle,
  // search query (?search=...) update hone par NAHI.
  // Pehle ye [location] (poora object) par depend karta tha, is liye search box
  // mein type karte hi (jo navigate('/?search=...') call karta hai) sidebar
  // khud hi band ho jati thi. Ab sirf pathname change hone par close hogi.
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLiveSearch = (value) => {
    setSearchQuery(value);
    if (value.trim()) {
      navigate(`/?search=${encodeURIComponent(value.trim())}`);
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (typeof logoutCart === 'function') {
      logoutCart();
    }
    setUser(null);
    setActiveDropdown(null);
    alert("Logged out successfully!");
    window.location.href = '/login';
  };

  const sections = ["Men", "Women", "Kids", "Unisex"];

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-sm border-b border-[#1B4332]/10 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center h-16 sm:h-20">

            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl sm:text-3xl font-black tracking-tighter text-[#1B4332]">WEARZANE</Link>
            </div>

            <div className="hidden md:flex space-x-8 items-center">
              <Link to="/" className="text-xs font-bold tracking-widest text-gray-700 hover:text-[#1B4332] transition-colors">NEW ARRIVALS</Link>

              <div className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
                <button
                  onMouseEnter={() => setActiveDropdown('shop')}
                  className="text-xs font-bold tracking-widest flex items-center gap-1 text-gray-700 hover:text-[#1B4332] transition-colors uppercase"
                >
                  SHOP <FiChevronDown className={`transition-transform duration-200 ${activeDropdown === 'shop' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'shop' && (
                  <div className="absolute top-full left-0 w-48 pt-2">
                    <div className="bg-white shadow-xl rounded-lg border border-gray-100 py-2 z-50 overflow-hidden">
                      {sections.map((sec) => (
                        <Link
                          key={sec}
                          to={`/section/${sec.toLowerCase()}`}
                          className="block px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-[#F5F0E8] hover:text-[#1B4332] uppercase transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {sec}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative group" onMouseLeave={() => setActiveDropdown(null)}>
                <button
                  onMouseEnter={() => setActiveDropdown('collections')}
                  className="text-xs font-bold tracking-widest flex items-center gap-1 text-gray-700 hover:text-[#1B4332] transition-colors uppercase"
                >
                  COLLECTIONS <FiChevronDown className={`transition-transform duration-200 ${activeDropdown === 'collections' ? 'rotate-180' : ''}`} />
                </button>

                {activeDropdown === 'collections' && (
                  <div className="absolute top-full left-0 w-48 pt-2">
                    <div className="bg-white shadow-xl rounded-lg border border-gray-100 py-2 z-50 overflow-hidden">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/category/${cat.name.toLowerCase()}`}
                          className="block px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-[#F5F0E8] hover:text-[#1B4332] uppercase transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link to="/about" className="text-xs font-bold tracking-widest text-gray-700 hover:text-[#1B4332] transition-colors">ABOUT US</Link>
            </div>

            <div className="flex items-center space-x-4 sm:space-x-5">

              <div className="hidden md:flex items-center">
                {searchOpen ? (
                  <div className="flex items-center border-b-2 border-[#1B4332] py-1 px-2 transition-all">
                    <input
                      type="text"
                      placeholder="Type to search..."
                      value={searchQuery}
                      onChange={(e) => handleLiveSearch(e.target.value)}
                      className="text-xs font-bold uppercase tracking-wider outline-none w-28 sm:w-32 md:w-48 bg-transparent"
                      autoFocus
                    />
                    <FiSearch className="text-lg text-[#1B4332]/50 ml-1" />
                    <FiX
                      className="text-lg cursor-pointer ml-2 text-red-500 hover:text-red-600 transition-colors"
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery('');
                        navigate('/');
                      }}
                    />
                  </div>
                ) : (
                  <FiSearch className="text-xl cursor-pointer text-gray-700 hover:text-[#1B4332] transition-colors" onClick={() => setSearchOpen(true)} />
                )}
              </div>

              <button
                onClick={() => setCartOpen(true)}
                className="relative text-xl text-gray-700 hover:text-[#1B4332] transition-colors focus:outline-none"
              >
                <FiShoppingCart />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#1B4332] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold transition-all animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              <div className="hidden md:block relative" onMouseLeave={() => setActiveDropdown(null)}>
                <button
                  onMouseEnter={() => setActiveDropdown('profile')}
                  className={`flex items-center gap-1 text-xl transition-colors ${user ? 'text-[#1B4332] font-bold' : 'text-gray-700 hover:text-[#1B4332]'}`}
                >
                  <FiUser />
                  {user && <span className="text-[10px] uppercase tracking-wider hidden lg:inline">{user.name.split(' ')[0]}</span>}
                </button>

                {activeDropdown === 'profile' && (
                  <div className="absolute top-full right-0 w-56 pt-2">
                    <div className="bg-white shadow-xl rounded-lg border border-gray-100 py-2 z-50 overflow-hidden">
                    {user ? (
                      <>
                        <div className="px-4 py-3 border-b border-gray-100 bg-[#F5F0E8]/50">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Logged In As</p>
                          <p className="text-xs font-black text-gray-900 truncate uppercase mt-0.5">{user.name}</p>
                        </div>

                        {/* 🎯 OPTION 2: My Orders Link (Visible only if user is logged in) */}
                        <Link
                          to="/my-orders"
                          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-[#F5F0E8] hover:text-[#1B4332] uppercase tracking-wider transition-colors"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <FiPackage /> My Orders
                        </Link>

                        {user.is_admin && (
                          <Link
                            to="/admin"
                            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-amber-600 hover:bg-amber-50 uppercase tracking-wider transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <FiSliders /> Admin Panel
                          </Link>
                        )}

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 uppercase tracking-wider text-left transition-colors"
                        >
                          <FiLogOut /> Log Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="block px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-[#F5F0E8] hover:text-[#1B4332] uppercase tracking-wider transition-colors" onClick={() => setActiveDropdown(null)}>Sign In</Link>
                        <Link to="/register" className="block px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-[#F5F0E8] hover:text-[#1B4332] uppercase tracking-wider transition-colors" onClick={() => setActiveDropdown(null)}>Create Account</Link>
                      </>
                    )}
                    </div>
                  </div>
                )}
              </div>

              <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl text-[#1B4332]">
                {isOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 🎯 MOBILE SIDEBAR - dark overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* 🎯 MOBILE SIDEBAR - slide-in panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[70] md:hidden shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-[#1B4332]/10 flex-shrink-0">
          <span className="text-xl font-black tracking-tighter text-[#1B4332]">WEARZANE</span>
          <button onClick={() => setIsOpen(false)} className="text-2xl text-gray-500 hover:text-[#1B4332] transition-colors">
            <FiX />
          </button>
        </div>

        {/* Sidebar scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">

          {/* 🎯 MOBILE SEARCH BAR */}
          <div className="flex items-center bg-[#F5F0E8] rounded-full px-4 py-2.5 border border-transparent focus-within:border-[#1B4332] transition-colors">
            <FiSearch className="text-[#1B4332]/60 text-lg flex-shrink-0" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleLiveSearch(e.target.value)}
              className="text-xs font-bold uppercase tracking-wider outline-none bg-transparent ml-2 w-full"
            />
            {searchQuery && (
              <FiX
                className="text-lg cursor-pointer text-red-500 hover:text-red-600 transition-colors flex-shrink-0"
                onClick={() => {
                  setSearchQuery('');
                  navigate('/');
                }}
              />
            )}
          </div>

          {/* 🎯 MOBILE USER ACCOUNT SECTION */}
          {user ? (
            <div className="bg-[#F5F0E8]/50 rounded-xl overflow-hidden border border-[#1B4332]/10">
              <div className="px-4 py-3 border-b border-[#1B4332]/10">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Logged In As</p>
                <p className="text-sm font-black text-gray-900 truncate uppercase mt-0.5">{user.name}</p>
              </div>
              <Link
                to="/my-orders"
                className="flex items-center justify-between px-4 py-3 text-xs font-bold text-gray-700 hover:bg-[#F5F0E8] uppercase tracking-wider transition-colors border-b border-[#1B4332]/10"
              >
                <span className="flex items-center gap-2"><FiPackage /> My Orders</span>
                <FiChevronRight className="text-gray-400" />
              </Link>
              {user.is_admin && (
                <Link
                  to="/admin"
                  className="flex items-center justify-between px-4 py-3 text-xs font-bold text-amber-600 hover:bg-amber-50 uppercase tracking-wider transition-colors border-b border-[#1B4332]/10"
                >
                  <span className="flex items-center gap-2"><FiSliders /> Admin Panel</span>
                  <FiChevronRight className="text-amber-400" />
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 text-xs font-bold text-red-600 hover:bg-red-50 uppercase tracking-wider text-left transition-colors"
              >
                <FiLogOut /> Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="flex-1 flex items-center justify-center gap-2 text-xs font-bold text-white bg-[#1B4332] py-3 rounded-full uppercase tracking-wider hover:bg-[#143728] transition-colors"
              >
                <FiUser /> Sign In
              </Link>
              <Link
                to="/register"
                className="flex-1 flex items-center justify-center text-xs font-bold text-[#1B4332] border border-[#1B4332] py-3 rounded-full uppercase tracking-wider hover:bg-[#F5F0E8] transition-colors"
              >
                Create Account
              </Link>
            </div>
          )}

          {/* 🎯 MAIN NAV LINKS */}
          <div className="space-y-1">
            <Link to="/" className="flex items-center justify-between text-xs font-bold tracking-widest text-gray-900 uppercase py-3 border-b border-gray-100">
              New Arrivals <FiChevronRight className="text-gray-400" />
            </Link>
            <Link to="/about" className="flex items-center justify-between text-xs font-bold tracking-widest text-gray-900 uppercase py-3 border-b border-gray-100">
              About Us <FiChevronRight className="text-gray-400" />
            </Link>
          </div>

          {/* 🎯 SHOP BY SECTION */}
          <div>
            <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2.5">Shop By Section</p>
            <div className="grid grid-cols-2 gap-2">
              {sections.map((sec) => (
                <Link
                  key={sec}
                  to={`/section/${sec.toLowerCase()}`}
                  className="text-xs font-bold text-gray-700 py-2.5 px-3 uppercase bg-[#F5F0E8] rounded-lg text-center hover:bg-[#1B4332] hover:text-white transition-colors"
                >
                  {sec}
                </Link>
              ))}
            </div>
          </div>

          {/* 🎯 COLLECTIONS */}
          {categories.length > 0 && (
            <div>
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2.5">Collections</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.name.toLowerCase()}`}
                    className="text-xs font-bold text-gray-700 py-2.5 px-3 uppercase bg-[#F5F0E8] rounded-lg text-center hover:bg-[#1B4332] hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;