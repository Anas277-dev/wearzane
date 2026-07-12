// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

// const Register = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/register', formData);
//       setSuccess(res.data.message);
//       setTimeout(() => navigate('/login'), 2000); // 2 second baad login page par redirect
//     } catch (err) {
//       setError(err.response?.data?.error || "Registration failed. Try again.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="w-full min-h-screen bg-[#F5F0E8] flex">

//       {/* LEFT: Brand panel (hidden on mobile) */}
//       <div className="hidden lg:flex lg:w-[45%] xl:w-1/2 relative overflow-hidden bg-[#1B4332]">
//         <div
//           className="absolute inset-0 opacity-25 bg-cover bg-center"
//           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1445205170230-053b83016050')" }}
//         ></div>
//         <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332] via-[#1B4332]/70 to-[#1B4332]/40"></div>

//         <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 text-white w-full">
//           <span className="text-2xl font-black tracking-tighter">WEARZANE</span>

//           <div className="space-y-6 max-w-md">
//             <h2 className="text-3xl xl:text-4xl font-light leading-tight">
//               Join the wardrobe that's built to last.
//             </h2>
//             <div className="space-y-3">
//               {['Curated seasonal drops', 'Early access to new arrivals', 'Track orders in one place'].map((perk) => (
//                 <div key={perk} className="flex items-center gap-3">
//                   <FiCheckCircle className="text-[#4ADE80] flex-shrink-0" />
//                   <span className="text-sm text-white/85 font-light">{perk}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/50">
//             Crafted with care — Worn with pride
//           </p>
//         </div>
//       </div>

//       {/* RIGHT: Form panel */}
//       <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12 sm:py-16">
//         <div className="w-full max-w-sm">

//           {/* Mobile brand mark */}
//           <div className="lg:hidden text-center mb-8">
//             <span className="text-2xl font-black tracking-tighter text-[#1B4332]">WEARZANE</span>
//           </div>

//           <header className="mb-8">
//             <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/60 mb-2">
//               Get Started
//             </p>
//             <h1 className="text-2xl sm:text-3xl font-light tracking-wide uppercase italic text-gray-800">
//               Create Account
//             </h1>
//             <div className="h-1 w-12 bg-[#1B4332] mt-4 rounded-full"></div>
//           </header>

//           {error && (
//             <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
//               {error}
//             </div>
//           )}
//           {success && (
//             <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
//               {success}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Full Name</label>
//               <div className="relative">
//                 <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B4332]/40 text-sm" />
//                 <input
//                   type="text" required
//                   placeholder="e.g. Anas Siddiqui"
//                   value={formData.name}
//                   onChange={(e) => setFormData({...formData, name: e.target.value})}
//                   className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-[#1B4332] transition-colors"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Email Address</label>
//               <div className="relative">
//                 <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B4332]/40 text-sm" />
//                 <input
//                   type="email" required
//                   placeholder="anas@example.com"
//                   value={formData.email}
//                   onChange={(e) => setFormData({...formData, email: e.target.value})}
//                   className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-[#1B4332] transition-colors"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Password</label>
//               <div className="relative">
//                 <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B4332]/40 text-sm" />
//                 <input
//                   type={showPassword ? 'text' : 'password'} required
//                   placeholder="••••••••"
//                   value={formData.password}
//                   onChange={(e) => setFormData({...formData, password: e.target.value})}
//                   className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-[#1B4332] transition-colors"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1B4332] transition-colors"
//                 >
//                   {showPassword ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-[#1B4332] text-white py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#143728] disabled:bg-gray-300 transition-colors shadow-sm hover:shadow-lg flex items-center justify-center gap-2 group mt-2"
//             >
//               {loading ? 'Creating Account...' : 'Register'}
//               {!loading && <FiArrowRight className="group-hover:translate-x-1 transition-transform" />}
//             </button>
//           </form>

//           <div className="mt-8 text-center text-xs text-gray-500">
//             Already have an account?{' '}
//             <Link to="/login" className="text-[#1B4332] font-bold hover:underline">Login here</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;






import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

// 🎯 Agar Vercel/production me VITE_API_URL set hai to wahi use hoga,
// warna local PC par apne aap localhost:5000 par fallback ho jayega
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, formData);
      setSuccess(res.data.message);
      setTimeout(() => navigate('/login'), 2000); // 2 second baad login page par redirect
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#F5F0E8] flex">

      {/* LEFT: Brand panel (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-1/2 relative overflow-hidden bg-[#1B4332]">
        <div
          className="absolute inset-0 opacity-25 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1445205170230-053b83016050')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332] via-[#1B4332]/70 to-[#1B4332]/40"></div>

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 text-white w-full">
          <span className="text-2xl font-black tracking-tighter">WEARZANE</span>

          <div className="space-y-6 max-w-md">
            <h2 className="text-3xl xl:text-4xl font-light leading-tight">
              Join the wardrobe that's built to last.
            </h2>
            <div className="space-y-3">
              {['Curated seasonal drops', 'Early access to new arrivals', 'Track orders in one place'].map((perk) => (
                <div key={perk} className="flex items-center gap-3">
                  <FiCheckCircle className="text-[#4ADE80] flex-shrink-0" />
                  <span className="text-sm text-white/85 font-light">{perk}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-white/50">
            Crafted with care — Worn with pride
          </p>
        </div>
      </div>

      {/* RIGHT: Form panel */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12 sm:py-16">
        <div className="w-full max-w-sm">

          {/* Mobile brand mark */}
          <div className="lg:hidden text-center mb-8">
            <span className="text-2xl font-black tracking-tighter text-[#1B4332]">WEARZANE</span>
          </div>

          <header className="mb-8">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/60 mb-2">
              Get Started
            </p>
            <h1 className="text-2xl sm:text-3xl font-light tracking-wide uppercase italic text-gray-800">
              Create Account
            </h1>
            <div className="h-1 w-12 bg-[#1B4332] mt-4 rounded-full"></div>
          </header>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B4332]/40 text-sm" />
                <input
                  type="text" required
                  placeholder="e.g. Anas Siddiqui"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-[#1B4332] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B4332]/40 text-sm" />
                <input
                  type="email" required
                  placeholder="anas@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-[#1B4332] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B4332]/40 text-sm" />
                <input
                  type={showPassword ? 'text' : 'password'} required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-[#1B4332] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1B4332] transition-colors"
                >
                  {showPassword ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1B4332] text-white py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#143728] disabled:bg-gray-300 transition-colors shadow-sm hover:shadow-lg flex items-center justify-center gap-2 group mt-2"
            >
              {loading ? 'Creating Account...' : 'Register'}
              {!loading && <FiArrowRight className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-[#1B4332] font-bold hover:underline">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;