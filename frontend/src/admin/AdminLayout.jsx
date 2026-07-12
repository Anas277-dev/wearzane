
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // navigate ke liye import karein
// import Sidebar from './components/Sidebar';

// const AdminLayout = ({ children }) => {
//   const navigate = useNavigate(); // Navigation hook
//   const [stats, setStats] = useState({
//     totalProducts: 0,
//     lowStock: 0,
//     totalCategories: 0,
//     totalOrders: 0,
//     totalRevenue: 0
//   });

//   useEffect(() => {
//     // --- Security Check ---
//     const token = localStorage.getItem('adminToken');
//     if (!token) {
//       navigate('/admin/login');
//       return; // Aage ka code execute na ho
//     }

//     // --- Fetch Stats ---
//     axios.get('http://localhost:5000/api/admin/stats', {
//       headers: { Authorization: `Bearer ${token}` } // Security ke liye token headers mein bhejein
//     })
//       .then(res => setStats(res.data))
//       .catch(err => {
//         if (err.response?.status === 401) {
//           localStorage.removeItem('adminToken');
//           navigate('/admin/login');
//         }
//         console.log(err);
//       });
//   }, [navigate]);

//   return (
//     <div className="flex bg-gray-100 min-h-screen">
//       <Sidebar />
//       <div className="flex-1 ml-64 p-8">
        
//         {/* Stats Cards Section */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <Card title="Total Products" value={stats.totalProducts} color="blue" />
//           <Card title="Categories" value={stats.totalCategories} color="purple" />
//           <Card title="Low Stock" value={stats.lowStock} color="red" />
//           <Card title="Total Orders" value={stats.totalOrders} color="green" />
//         </div>

//         {/* Dynamic Content */}
//         <div className="mt-4">{children}</div>
//       </div>
//     </div>
//   );
// };

// // Reusable Card Component (Same as before)
// const Card = ({ title, value, color }) => {
//   const colors = {
//     blue: 'border-blue-500',
//     purple: 'border-purple-500',
//     red: 'border-red-500',
//     green: 'border-green-500'
//   };
//   return (
//     <div className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${colors[color]}`}>
//       <p className="text-gray-500 text-sm font-medium">{title}</p>
//       <h3 className="text-2xl font-bold mt-1">{value}</h3>
//     </div>
//   );
// };

// export default AdminLayout;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import {
  FiBox, FiLayers, FiAlertTriangle, FiShoppingBag, FiDollarSign, FiLogOut, FiUser
} from 'react-icons/fi';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Admin ka naam localStorage se nikalna (agar save hai)
  let adminName = 'Admin';
  try {
    const storedUser = JSON.parse(localStorage.getItem('adminUser') || 'null');
    if (storedUser?.username) adminName = storedUser.username;
  } catch (e) {
    // ignore parse errors
  }

  useEffect(() => {
    // --- Security Check ---
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    // --- Fetch Stats ---
    axios
      .get('http://localhost:5000/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setStats(res.data))
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
        }
        console.log(err);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  return (
    <div className="flex bg-[#F5F0E8] min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 p-6 sm:p-8">

        {/* Top bar */}
        <div className="flex items-center justify-end gap-3 mb-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#1B4332]/10 shadow-sm">
            <div className="w-7 h-7 rounded-full bg-[#1B4332]/10 flex items-center justify-center text-[#1B4332]">
              <FiUser className="text-xs" />
            </div>
            <span className="text-xs font-bold text-gray-700">{adminName}</span>
          </div>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#1B4332]/10 text-red-500 text-xs font-bold uppercase tracking-widest hover:bg-red-50 hover:border-red-200 transition-colors shadow-sm"
          >
            <FiLogOut className="text-sm" /> Logout
          </button>
        </div>

        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
          <Card title="Total Products" value={stats.totalProducts} icon={FiBox} />
          <Card title="Categories" value={stats.totalCategories} icon={FiLayers} />
          <Card title="Low Stock" value={stats.lowStock} icon={FiAlertTriangle} alert />
          <Card title="Total Orders" value={stats.totalOrders} icon={FiShoppingBag} />
          <Card
            title="Total Revenue"
            value={`Rs. ${Number(stats.totalRevenue || 0).toLocaleString()}`}
            icon={FiDollarSign}
            highlight
          />
        </div>

        {/* Dynamic Content */}
        <div>{children}</div>
      </div>

      {/* ---------- Logout Confirm Modal ---------- */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-6 sm:p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
              <FiLogOut className="text-2xl text-red-500" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-gray-900 mb-2">
              Log Out?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              You'll need to sign in again to access the dashboard.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-4 rounded-full font-black text-xs tracking-widest uppercase bg-[#F5F0E8] text-gray-600 hover:bg-[#1B4332]/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-4 rounded-full font-black text-xs tracking-widest uppercase bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Card Component
const Card = ({ title, value, icon: Icon, alert, highlight }) => (
  <div
    className={`p-5 rounded-2xl shadow-sm border transition-colors ${
      alert
        ? 'bg-red-50 border-red-200'
        : highlight
        ? 'bg-[#1B4332] border-[#1B4332]'
        : 'bg-white border-[#1B4332]/10'
    }`}
  >
    <div
      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
        alert
          ? 'bg-red-100 text-red-500'
          : highlight
          ? 'bg-white/15 text-white'
          : 'bg-[#1B4332]/10 text-[#1B4332]'
      }`}
    >
      <Icon className="text-lg" />
    </div>
    <p
      className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${
        alert ? 'text-red-400' : highlight ? 'text-white/60' : 'text-gray-400'
      }`}
    >
      {title}
    </p>
    <h3 className={`text-2xl font-black tracking-tight ${
      alert ? 'text-red-600' : highlight ? 'text-white' : 'text-gray-900'
    }`}>
      {value}
    </h3>
  </div>
);

export default AdminLayout;