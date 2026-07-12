// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CustomerList = () => {
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null); // Modal control
//   const [history, setHistory] = useState([]); // History store karne ke liye

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/customers').then(res => setCustomers(res.data));
//   }, []);

//   // History fetch karne ka function
//   const fetchHistory = async (phone) => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/customers/history/${phone}`);
//       setHistory(res.data);
//       setSelectedCustomer(phone); // Modal open ho jayega
//     } catch (err) {
//       alert("History load nahi ho saki");
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm p-6 relative">
//       <h2 className="text-xl font-bold mb-6 italic tracking-widest">REGISTERED CUSTOMERS</h2>
      
//       <table className="w-full text-left border-collapse">
//         <thead className="bg-gray-50 border-b">
//           <tr>
//             <th className="p-4 text-gray-600">Customer Name</th>
//             <th className="p-4 text-gray-600">Contact</th>
//             <th className="p-4 text-gray-600">Address</th>
//             <th className="p-4 text-gray-600">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {customers.map((c, i) => (
//             <tr key={i} className="border-b hover:bg-gray-50">
//               <td className="p-4 font-medium">{c.customer_name}</td>
//               <td className="p-4 text-sm">
//                 <div>{c.email}</div>
//                 <div className="text-gray-500">{c.phone}</div>
//               </td>
//               <td className="p-4 text-sm text-gray-600">{c.address}</td>

//               <td className="p-4">
//                 <button 
//                   onClick={() => fetchHistory(c.phone)}
//                   className="bg-black text-white px-4 py-1 text-xs rounded hover:bg-gray-800 transition"
//                 >
//                   View History
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* --- CUSTOMER HISTORY MODAL --- */}
//       {selectedCustomer && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl">
//             <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
//               <h3 className="text-lg font-bold">Order History - {history[0]?.customer_name}</h3>
//               <button onClick={() => setSelectedCustomer(null)} className="text-2xl font-light">×</button>
//             </div>
            
//             <div className="p-6">
//               {history.length > 0 ? (
//                 <div className="space-y-4">
//                   {history.map((order) => (
//                     <div key={order.id} className="border p-4 rounded-lg flex justify-between items-center bg-gray-50">
//                       <div>
//                         <p className="font-bold text-sm text-blue-600">#WZ-{order.id}</p>
//                         <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="font-bold">Rs. {order.total_amount}</p>
//                         <p className={`text-[10px] font-bold uppercase ${order.status === 'Delivered' ? 'text-green-600' : 'text-orange-500'}`}>
//                           {order.status}
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-center text-gray-500">Koi record nahi mila.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomerList;






import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import {
  FiUsers, FiSearch, FiClock, FiX, FiAlertTriangle, FiPhone, FiMail, FiMapPin
} from 'react-icons/fi';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [search, setSearch] = useState('');

  const [selectedCustomer, setSelectedCustomer] = useState(null); // phone of selected customer
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await axios.get('http://localhost:5000/api/customers');
      setCustomers(res.data || []);
    } catch (err) {
      setErrorMsg('Customers load nahi ho sakay. Backend check karein.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchHistory = async (phone) => {
    setHistoryLoading(true);
    setSelectedCustomer(phone);
    try {
      const res = await axios.get(`http://localhost:5000/api/customers/history/${phone}`);
      setHistory(res.data);
    } catch (err) {
      alert('History load nahi ho saki');
      setSelectedCustomer(null);
    } finally {
      setHistoryLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedCustomer(null);
    setHistory([]);
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) =>
      c.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.includes(search) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [customers, search]);

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-sm border border-[#1B4332]/10 overflow-hidden relative">
      {/* Header */}
      <div className="p-6 sm:p-10 pb-6 border-b border-[#1B4332]/10 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/50 mb-2">
            CRM / Registered Customers
          </p>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 uppercase">
            Customer Directory
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            View contact details and order history for every WearZane customer.
          </p>
        </div>
        <div className="hidden sm:flex flex-col items-end gap-2">
          <div className="w-12 h-12 rounded-2xl bg-[#1B4332]/10 flex items-center justify-center">
            <FiUsers className="text-xl text-[#1B4332]" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {customers.length} Total
          </span>
        </div>
      </div>

      {/* Error banner */}
      {errorMsg && (
        <div className="mx-6 sm:mx-10 mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <FiAlertTriangle /> {errorMsg}
        </div>
      )}

      {/* Search */}
      <div className="p-6 sm:p-10 pt-6 pb-4">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B4332]/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone, or email..."
            className="w-full pl-11 pr-4 py-3.5 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors text-sm"
          />
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="py-24 flex flex-col items-center justify-center text-gray-400">
          <div className="w-8 h-8 border-2 border-[#1B4332]/20 border-t-[#1B4332] rounded-full animate-spin mb-3" />
          <p className="text-xs font-bold uppercase tracking-widest">Loading customers...</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && filteredCustomers.length === 0 && (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#1B4332]/10 flex items-center justify-center mb-4">
            <FiUsers className="text-2xl text-[#1B4332]/50" />
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
            No customers found
          </p>
          <p className="text-gray-400 text-sm mt-1">Try a different search term.</p>
        </div>
      )}

      {/* Table */}
      {!loading && filteredCustomers.length > 0 && (
        <div className="overflow-x-auto pb-4">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[#1B4332]/10">
                <th className="px-6 sm:px-10 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1B4332]/50">Customer</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1B4332]/50">Contact</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1B4332]/50">Address</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1B4332]/50 pr-6 sm:pr-10">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((c, i) => (
                <tr key={i} className="border-b border-[#1B4332]/5 hover:bg-[#F5F0E8]/30 transition-colors">
                  <td className="px-6 sm:px-10 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#1B4332]/10 flex items-center justify-center flex-shrink-0 text-xs font-black text-[#1B4332] uppercase">
                        {c.customer_name?.charAt(0) || '?'}
                      </div>
                      <span className="font-bold text-sm text-gray-900">{c.customer_name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-xs text-[#1B4332]/70 font-medium flex items-center gap-1.5">
                      <FiMail className="text-[11px]" /> {c.email || '—'}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5">
                      <FiPhone className="text-[11px]" /> {c.phone}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-500 max-w-[220px]">
                    <span className="flex items-start gap-1.5">
                      <FiMapPin className="text-[11px] mt-0.5 flex-shrink-0" />
                      {c.address}
                    </span>
                  </td>
                  <td className="px-4 py-4 pr-6 sm:pr-10">
                    <button
                      onClick={() => fetchHistory(c.phone)}
                      className="px-4 py-2 rounded-full bg-[#1B4332] text-white text-[11px] font-black tracking-widest uppercase flex items-center gap-1.5 hover:bg-[#143728] transition-colors"
                    >
                      <FiClock className="text-xs" /> History
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && filteredCustomers.length > 0 && (
        <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-widest px-6 sm:px-10 pb-6 text-center sm:text-left">
          Showing {filteredCustomers.length} of {customers.length} customers
        </p>
      )}

      {/* ---------- Order History Modal ---------- */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl max-h-[85vh] overflow-y-auto">
            <div className="p-6 sm:p-8 border-b border-[#1B4332]/10 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl">
              <div>
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/50 mb-1">
                  Order History
                </p>
                <h3 className="text-lg font-black uppercase tracking-tight text-gray-900">
                  {history[0]?.customer_name || 'Customer'}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="w-9 h-9 rounded-full bg-[#F5F0E8] flex items-center justify-center text-gray-500 hover:bg-[#1B4332]/10 transition-colors"
              >
                <FiX />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {historyLoading && (
                <div className="py-12 flex flex-col items-center justify-center text-gray-400">
                  <div className="w-7 h-7 border-2 border-[#1B4332]/20 border-t-[#1B4332] rounded-full animate-spin mb-3" />
                  <p className="text-xs font-bold uppercase tracking-widest">Loading history...</p>
                </div>
              )}

              {!historyLoading && history.length > 0 && (
                <div className="space-y-3">
                  {history.map((order) => (
                    <div
                      key={order.id}
                      className="border border-[#1B4332]/10 p-4 rounded-xl flex justify-between items-center bg-[#F5F0E8]/30"
                    >
                      <div>
                        <p className="font-black text-sm text-[#1B4332]">#WZ-{order.id}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-sm text-gray-800">Rs. {Number(order.total_amount).toLocaleString()}</p>
                        <p className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${
                          order.status === 'Delivered' ? 'text-emerald-600' :
                          order.status === 'Cancelled' ? 'text-red-500' : 'text-orange-500'
                        }`}>
                          {order.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!historyLoading && history.length === 0 && (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#1B4332]/10 flex items-center justify-center mb-3">
                    <FiClock className="text-xl text-[#1B4332]/50" />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
                    Koi record nahi mila
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;