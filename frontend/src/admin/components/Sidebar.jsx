// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const Sidebar = () => {
//   const location = useLocation(); // Current page highlight karne ke liye

//   const menuItems = [
//     { name: 'Dashboard', icon: '📊', path: '/admin' },
//     { name: 'Add Product', icon: '➕', path: '/admin/add-product' },
//     { name: 'All Products', icon: '👕', path: '/admin/products' },
//     { name: 'Categories', icon: '📂', path: '/admin/categories' },
//     { name: 'Orders', icon: '📦', path: '/admin/orders' }, // Future use ke liye
//     { name: 'Customers', icon: '👥', path: '/admin/customers' },
//     { name: 'Reviews', icon: '⭐', path: '/admin/reviews' },
//     { name: 'CMS / Website Content', icon: '🎨', path: '/admin/cms' },
//     { name: 'Blogs', icon: '📝', path: '/admin/blogs' },
//     { name: 'Staff Management', icon: '👥', path: '/admin/staff' },
//     { name: 'Activity Logs', icon: '📜', path: '/admin/logs' },
//   ];

//   return (
//     <div className="w-64 bg-slate-900 text-white min-h-screen p-5 fixed top-0 left-0">
//       <h2 className="text-2xl font-bold mb-10 border-b border-gray-700 pb-4 text-center">
//         WZ Admin
//       </h2>
      
//       <ul className="space-y-2">
//         {menuItems.map((item) => (
//           <li key={item.name}>
//             <Link 
//               to={item.path} 
//               className={`p-3 rounded-lg cursor-pointer transition-all flex items-center gap-3 w-full ${
//                 location.pathname === item.path ? 'bg-blue-600' : 'hover:bg-slate-800'
//               }`}
//             >
//               <span>{item.icon}</span>
//               <span className="font-medium">{item.name}</span>
//             </Link>
//           </li>
//         ))}
//       </ul>
      
//       <div className="absolute bottom-5 left-5 right-5">
//         <Link to="/" className="text-sm text-gray-400 hover:text-white flex items-center gap-2">
//           ⬅ View Website
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;







import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiGrid, FiPlusCircle, FiShoppingBag, FiFolder, FiPackage,
  FiUsers, FiStar, FiLayout, FiEdit3, FiUserCheck, FiFileText, FiArrowLeft
} from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation(); // Current page highlight karne ke liye

  const menuGroups = [
    {
      label: 'Overview',
      items: [
        { name: 'Dashboard', icon: FiGrid, path: '/admin' },
      ]
    },
    {
      label: 'Catalog',
      items: [
        { name: 'Add Product', icon: FiPlusCircle, path: '/admin/add-product' },
        { name: 'All Products', icon: FiShoppingBag, path: '/admin/products' },
        { name: 'Categories', icon: FiFolder, path: '/admin/categories' },
      ]
    },
    {
      label: 'Sales',
      items: [
        { name: 'Orders', icon: FiPackage, path: '/admin/orders' },
        { name: 'Customers', icon: FiUsers, path: '/admin/customers' },
        { name: 'Reviews', icon: FiStar, path: '/admin/reviews' },
      ]
    },
    {
      label: 'Content',
      items: [
        { name: 'CMS / Website Content', icon: FiLayout, path: '/admin/cms' },
        { name: 'Blogs', icon: FiEdit3, path: '/admin/blogs' },
      ]
    },
    {
      label: 'Team',
      items: [
        { name: 'Staff Management', icon: FiUserCheck, path: '/admin/staff' },
        { name: 'Activity Logs', icon: FiFileText, path: '/admin/logs' },
      ]
    },
  ];

  return (
    <div className="w-64 bg-[#0F2A1E] text-white min-h-screen fixed top-0 left-0 flex flex-col">

      {/* Brand header */}
      <div className="px-6 py-7 border-b border-white/10 flex-shrink-0">
        <span className="text-xl font-black tracking-tighter text-white">WEARZANE</span>
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#4ADE80] mt-1">Admin Panel</p>
      </div>

      {/* Scrollable nav */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-7">
        {menuGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-2 px-3">
              {group.label}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`relative px-3 py-2.5 rounded-xl cursor-pointer transition-all flex items-center gap-3 w-full text-sm ${
                        active
                          ? 'bg-[#4ADE80]/15 text-[#4ADE80] font-bold'
                          : 'text-white/70 hover:bg-white/5 hover:text-white font-medium'
                      }`}
                    >
                      {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-[#4ADE80] rounded-r-full"></span>}
                      <Icon className="text-base flex-shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-5 border-t border-white/10 flex-shrink-0">
        <Link to="/" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-[#4ADE80] flex items-center gap-2 transition-colors">
          <FiArrowLeft />
          View Website
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;