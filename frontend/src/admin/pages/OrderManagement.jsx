// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// const OrderManagement = () => {
//   const [orders, setOrders] = useState([]);

//   // 🎯 FIXED 1: Token configuration method block
//   const fetchOrders = async () => {
//     try {
//       const currentToken = localStorage.getItem('token'); // LocalStorage se admin/user token utthaya
      
//       const res = await axios.get('http://localhost:5000/api/orders', {
//         headers: { Authorization: `Bearer ${currentToken}` } // Pass headers token securely
//       });
      
//       setOrders(res.data || []);
//     } catch (err) {
//       console.error("Error fetching orders in admin dashboard:", err);
//       // Agar authorization token invalid ho ya expire ho chuka ho
//       if (err.response?.status === 401 || err.response?.status === 403) {
//         alert("Session Expired! Kindly re-login to access order records.");
//       }
//     }
//   };

//   useEffect(() => { 
//     fetchOrders(); 
//   }, []);

//   // --- PDF Generation Logic ---
//   const generateInvoice = (order) => {
//     const doc = new jsPDF();

//     // 1. Branding
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(22);
//     doc.text("WEARZANE", 105, 20, { align: "center" });
    
//     doc.setFontSize(10);
//     doc.setFont("helvetica", "normal");
//     doc.text("Premium Suit Collection | Karachi, Pakistan", 105, 27, { align: "center" });
//     doc.line(20, 35, 190, 35); 

//     // 2. Customer & Order Details
//     doc.setFontSize(12);
//     doc.text(`Invoice Number: #WZ-${order.id}`, 20, 45);
//     doc.text(`Order Date: ${new Date(order.created_at).toLocaleDateString()}`, 20, 52);
    
//     doc.setFont("helvetica", "bold");
//     doc.text("Bill To:", 20, 65);
//     doc.setFont("helvetica", "normal");
//     doc.text(`Name: ${order.customer_name}`, 20, 72);
//     doc.text(`Email: ${order.email || 'N/A'}`, 20, 79); 
//     doc.text(`Phone: ${order.phone}`, 20, 86);
//     doc.text(`Address: ${order.address}`, 20, 93, { maxWidth: 100 });

//     // 3. Items Table
//     autoTable(doc, {
//       startY: 105,
//       head: [['Description', 'Status', 'Total Amount']],
//       body: [
//         ['Suit Collection Product Purchase', order.status, `Rs. ${order.total_amount}`],
//       ],
//       headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
//       theme: 'grid'
//     });

//     // 4. Summary & Footer
//     const finalY = doc.lastAutoTable.finalY + 10;
//     doc.setFont("helvetica", "bold");
//     doc.text(`Grand Total: Rs. ${order.total_amount}`, 140, finalY + 10);
    
//     doc.setFontSize(10);
//     doc.setFont("helvetica", "italic");
//     doc.text("Thank you for your business!", 105, finalY + 30, { align: "center" });

//     doc.save(`Invoice_WZ_${order.id}.pdf`);
//   };

//   // 🎯 FIXED 2: PUT Request header injection for token verification
//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       const currentToken = localStorage.getItem('token');
      
//       await axios.put(`http://localhost:5000/api/orders/${id}/status`, 
//         { status: newStatus },
//         { headers: { Authorization: `Bearer ${currentToken}` } } // Headers attached here too
//       );
      
//       fetchOrders(); // Refreshes management dashboard interface
//     } catch (err) {
//       console.error("Status update tracking error:", err);
//       alert(err.response?.data?.error || "Status update failed");
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//       <div className="p-6 border-b flex justify-between items-center">
//         <h2 className="text-xl font-bold text-gray-800 tracking-tight">ORDERS MANAGEMENT</h2>
//         <span className="text-xs font-medium bg-gray-100 px-3 py-1 rounded-full text-gray-500">
//           Total: {orders.length}
//         </span>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="w-full text-left">
//           <thead className="bg-gray-50 border-b">
//             <tr>
//               <th className="p-4 font-semibold text-gray-600">Order ID</th>
//               <th className="p-4 font-semibold text-gray-600">Customer Details</th>
//               <th className="p-4 font-semibold text-gray-600">Total Price</th>
//               <th className="p-4 font-semibold text-gray-600">Status</th>
//               <th className="p-4 font-semibold text-gray-600">Date</th>
//               <th className="p-4 font-semibold text-gray-600">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order.id} className="border-b hover:bg-gray-50 transition">
//                 <td className="p-4 font-medium text-blue-600">#WZ-{order.id}</td>
//                 <td className="p-4">
//                   <p className="font-semibold text-sm text-gray-900">{order.customer_name}</p>
//                   <p className="text-xs text-blue-500 font-medium">{order.email}</p>
//                   <p className="text-xs text-gray-500">{order.phone}</p>
//                 </td>
//                 <td className="p-4 font-bold text-gray-800">Rs. {order.total_amount}</td>
//                 <td className="p-4">
//                   <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
//                     order.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 
//                     order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 
//                     order.status === 'Cancelled' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
//                   }`}>
//                     {order.status}
//                   </span>
//                 </td>
//                 <td className="p-4 text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
//                 <td className="p-4">
//                   <div className="flex items-center gap-3">
//                     <select 
//                       className="text-xs border p-1 rounded bg-white outline-none cursor-pointer hover:border-black transition"
//                       value={order.status}
//                       onChange={(e) => handleStatusChange(order.id, e.target.value)}
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Processing">Processing</option>
//                       <option value="Shipped">Shipped</option>
//                       <option value="Delivered">Delivered</option>
//                       <option value="Cancelled">Cancelled</option>
//                     </select>

//                     <button 
//                       onClick={() => generateInvoice(order)}
//                       className="p-1.5 hover:bg-gray-200 rounded-md transition border border-transparent hover:border-gray-300" 
//                       title="Download Invoice"
//                     >
//                       📄
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {orders.length === 0 && <div className="p-10 text-center text-gray-500 italic">No orders found in the system.</div>}
//     </div>
//   );
// };

// export default OrderManagement;







import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  FiShoppingBag, FiSearch, FiDownload, FiFilter, FiAlertTriangle
} from 'react-icons/fi';

const STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const statusStyles = {
  Pending: 'bg-orange-50 text-orange-600 border-orange-200',
  Processing: 'bg-blue-50 text-blue-600 border-blue-200',
  Shipped: 'bg-indigo-50 text-indigo-600 border-indigo-200',
  Delivered: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  Cancelled: 'bg-red-50 text-red-600 border-red-200'
};

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchOrders = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const currentToken = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      setOrders(res.data || []);
    } catch (err) {
      console.error('Error fetching orders in admin dashboard:', err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        setErrorMsg('Session expired! Kindly re-login to access order records.');
      } else {
        setErrorMsg('Orders load nahi ho sakay. Backend check karein.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const generateInvoice = (order) => {
    const doc = new jsPDF();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('WEARZANE', 105, 20, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Premium Suit Collection | Karachi, Pakistan', 105, 27, { align: 'center' });
    doc.line(20, 35, 190, 35);

    doc.setFontSize(12);
    doc.text(`Invoice Number: #WZ-${order.id}`, 20, 45);
    doc.text(`Order Date: ${new Date(order.created_at).toLocaleDateString()}`, 20, 52);

    doc.setFont('helvetica', 'bold');
    doc.text('Bill To:', 20, 65);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${order.customer_name}`, 20, 72);
    doc.text(`Email: ${order.email || 'N/A'}`, 20, 79);
    doc.text(`Phone: ${order.phone}`, 20, 86);
    doc.text(`Address: ${order.address}`, 20, 93, { maxWidth: 100 });

    autoTable(doc, {
      startY: 105,
      head: [['Description', 'Status', 'Total Amount']],
      body: [['Suit Collection Product Purchase', order.status, `Rs. ${order.total_amount}`]],
      headStyles: { fillColor: [27, 67, 50], textColor: [255, 255, 255] },
      theme: 'grid'
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFont('helvetica', 'bold');
    doc.text(`Grand Total: Rs. ${order.total_amount}`, 140, finalY + 10);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Thank you for your business!', 105, finalY + 30, { align: 'center' });

    doc.save(`Invoice_WZ_${order.id}.pdf`);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const currentToken = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/orders/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${currentToken}` } }
      );
      fetchOrders();
    } catch (err) {
      console.error('Status update tracking error:', err);
      alert(err.response?.data?.error || 'Status update failed');
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
        String(o.id).includes(search) ||
        o.phone?.includes(search);
      const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-sm border border-[#1B4332]/10 overflow-hidden">
      {/* Header */}
      <div className="p-6 sm:p-10 pb-6 border-b border-[#1B4332]/10 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/50 mb-2">
            Fulfillment / All Orders
          </p>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 uppercase">
            Order Management
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Track, update, and invoice WearZane orders.
          </p>
        </div>
        <div className="hidden sm:flex flex-col items-end gap-2">
          <div className="w-12 h-12 rounded-2xl bg-[#1B4332]/10 flex items-center justify-center">
            <FiShoppingBag className="text-xl text-[#1B4332]" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {orders.length} Total
          </span>
        </div>
      </div>

      {/* Error banner */}
      {errorMsg && (
        <div className="mx-6 sm:mx-10 mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <FiAlertTriangle /> {errorMsg}
        </div>
      )}

      {/* Filters */}
      <div className="p-6 sm:p-10 pt-6 pb-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B4332]/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer, phone, or order ID..."
            className="w-full pl-11 pr-4 py-3.5 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors text-sm"
          />
        </div>
        <div className="relative sm:w-56">
          <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B4332]/40" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors cursor-pointer font-semibold text-sm"
          >
            <option value="All">ALL STATUSES</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="py-24 flex flex-col items-center justify-center text-gray-400">
          <div className="w-8 h-8 border-2 border-[#1B4332]/20 border-t-[#1B4332] rounded-full animate-spin mb-3" />
          <p className="text-xs font-bold uppercase tracking-widest">Loading orders...</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && filteredOrders.length === 0 && (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#1B4332]/10 flex items-center justify-center mb-4">
            <FiShoppingBag className="text-2xl text-[#1B4332]/50" />
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
            No orders found
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Try a different search or status filter.
          </p>
        </div>
      )}

      {/* Table */}
      {!loading && filteredOrders.length > 0 && (
        <div className="overflow-x-auto pb-4">
          <table className="w-full text-left border-collapse min-w-[820px]">
            <thead>
              <tr className="border-b border-[#1B4332]/10">
                <th className="px-6 sm:px-10 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1B4332]/50">Order</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1B4332]/50">Customer</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1B4332]/50">Total</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1B4332]/50">Status</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1B4332]/50">Date</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1B4332]/50 pr-6 sm:pr-10">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-[#1B4332]/5 hover:bg-[#F5F0E8]/30 transition-colors">
                  <td className="px-6 sm:px-10 py-4 font-black text-sm text-[#1B4332]">#WZ-{order.id}</td>
                  <td className="px-4 py-4">
                    <p className="font-bold text-sm text-gray-900">{order.customer_name}</p>
                    <p className="text-xs text-[#1B4332]/70 font-medium">{order.email}</p>
                    <p className="text-xs text-gray-400">{order.phone}</p>
                  </td>
                  <td className="px-4 py-4 font-black text-sm text-gray-800">Rs. {Number(order.total_amount).toLocaleString()}</td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusStyles[order.status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-400 font-medium">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 pr-6 sm:pr-10">
                    <div className="flex items-center gap-2">
                      <select
                        className="text-xs font-semibold border border-[#1B4332]/15 py-2 px-2.5 rounded-lg bg-[#F5F0E8]/40 outline-none cursor-pointer hover:border-[#1B4332]/40 focus:ring-2 focus:ring-[#1B4332]/20 transition-colors"
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>

                      <button
                        onClick={() => generateInvoice(order)}
                        className="w-9 h-9 rounded-lg bg-[#1B4332]/10 hover:bg-[#1B4332] text-[#1B4332] hover:text-white flex items-center justify-center transition-colors flex-shrink-0"
                        title="Download Invoice"
                      >
                        <FiDownload className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && filteredOrders.length > 0 && (
        <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-widest px-6 sm:px-10 pb-6 text-center sm:text-left">
          Showing {filteredOrders.length} of {orders.length} orders
        </p>
      )}
    </div>
  );
};

export default OrderManagement;