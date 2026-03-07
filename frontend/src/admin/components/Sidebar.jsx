import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: '📊', path: '/admin' },
    { name: 'Add Product', icon: '➕', path: '/admin/add-product' },
    { name: 'Products', icon: '👕', path: '/admin/products' },
    { name: 'Orders', icon: '📦' },
    { name: 'Users', icon: '👥' },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-5 fixed top-0 left-0">
      <h2 className="text-2xl font-bold mb-10 border-b border-gray-700 pb-4">
        WZ Admin
      </h2>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li 
            key={item.name} 
            className="hover:bg-slate-800 p-3 rounded-lg cursor-pointer transition-all flex items-center gap-3"
          >
            <span>{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;