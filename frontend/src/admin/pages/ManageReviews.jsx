// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ManageReviews = () => {
//   const [reviews, setReviews] = useState([]);

//   const fetchReviews = async () => {
//     const res = await axios.get('http://localhost:5000/api/reviews');
//     setReviews(res.data);
//   };

//   useEffect(() => { fetchReviews(); }, []);

//   const handleStatus = async (id, status) => {
//     await axios.put(`http://localhost:5000/api/reviews/${id}`, { status });
//     fetchReviews();
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm p-6">
//       <h2 className="text-xl font-bold mb-6 text-gray-800">CUSTOMER REVIEWS & FEEDBACK</h2>
//       <div className="overflow-x-auto">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-gray-50 border-b">
//               <th className="p-4 font-semibold">Product</th>
//               <th className="p-4 font-semibold">Customer</th>
//               <th className="p-4 font-semibold">Rating</th>
//               <th className="p-4 font-semibold">Comment</th>
//               <th className="p-4 font-semibold">Status</th>
//               <th className="p-4 font-semibold">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reviews.map((r) => (
//               <tr key={r.id} className="border-b hover:bg-gray-50 transition">
//                 <td className="p-4 text-sm font-medium">{r.product_name}</td>
//                 <td className="p-4 text-sm">{r.customer_name}</td>
//                 <td className="p-4 text-yellow-500">{"★".repeat(r.rating)}</td>
//                 <td className="p-4 text-sm text-gray-600 italic">"{r.comment}"</td>
//                 <td className="p-4">
//                   <span className={`px-2 py-1 rounded text-xs font-bold ${
//                     r.status === 'Approved' ? 'bg-green-100 text-green-700' : 
//                     r.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
//                   }`}>
//                     {r.status}
//                   </span>
//                 </td>
//                 <td className="p-4 flex gap-2">
//                   <button 
//                     onClick={() => handleStatus(r.id, 'Approved')}
//                     className="bg-black text-white px-3 py-1 text-xs rounded hover:bg-gray-800"
//                   > Approve </button>
//                   <button 
//                     onClick={() => handleStatus(r.id, 'Rejected')}
//                     className="border border-red-500 text-red-500 px-3 py-1 text-xs rounded hover:bg-red-50"
//                   > Reject </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageReviews;






import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import {
  FiStar, FiSearch, FiFilter, FiCheck, FiX, FiMessageSquare, FiAlertTriangle
} from 'react-icons/fi';

const STATUS_FILTERS = ['All', 'Pending', 'Approved', 'Rejected'];

const statusStyles = {
  Approved: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  Rejected: 'bg-red-50 text-red-600 border-red-200',
  Pending: 'bg-orange-50 text-orange-600 border-orange-200'
};

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <FiStar
        key={n}
        className={`text-sm ${n <= rating ? 'fill-[#1B4332] text-[#1B4332]' : 'text-gray-200'}`}
      />
    ))}
  </div>
);

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchReviews = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await axios.get('http://localhost:5000/api/reviews');
      setReviews(res.data || []);
    } catch (err) {
      setErrorMsg('Reviews load nahi ho sakin. Backend check karein.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await axios.put(`http://localhost:5000/api/reviews/${id}`, { status });
      await fetchReviews();
    } catch (err) {
      alert('Status update failed');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      const matchesSearch =
        r.product_name?.toLowerCase().includes(search.toLowerCase()) ||
        r.customer_name?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [reviews, search, statusFilter]);

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-sm border border-[#1B4332]/10 overflow-hidden">
      {/* Header */}
      <div className="p-6 sm:p-10 pb-6 border-b border-[#1B4332]/10 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/50 mb-2">
            Feedback / Customer Voice
          </p>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 uppercase">
            Reviews &amp; Ratings
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Moderate customer feedback before it goes live on WearZane.
          </p>
        </div>
        <div className="hidden sm:flex flex-col items-end gap-2">
          <div className="w-12 h-12 rounded-2xl bg-[#1B4332]/10 flex items-center justify-center">
            <FiMessageSquare className="text-xl text-[#1B4332]" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {reviews.length} Total
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
            placeholder="Search by product or customer..."
            className="w-full pl-11 pr-4 py-3.5 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors text-sm"
          />
        </div>
        <div className="relative sm:w-52">
          <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B4332]/40" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors cursor-pointer font-semibold text-sm"
          >
            {STATUS_FILTERS.map((s) => (
              <option key={s} value={s}>{s.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="py-24 flex flex-col items-center justify-center text-gray-400">
          <div className="w-8 h-8 border-2 border-[#1B4332]/20 border-t-[#1B4332] rounded-full animate-spin mb-3" />
          <p className="text-xs font-bold uppercase tracking-widest">Loading reviews...</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && filteredReviews.length === 0 && (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#1B4332]/10 flex items-center justify-center mb-4">
            <FiMessageSquare className="text-2xl text-[#1B4332]/50" />
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
            No reviews found
          </p>
          <p className="text-gray-400 text-sm mt-1">Try a different search or status filter.</p>
        </div>
      )}

      {/* Table */}
      {!loading && filteredReviews.length > 0 && (
        <div className="overflow-x-auto pb-4">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-[#1B4332]/10">
                <th className="px-6 sm:px-10 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1B4332]/50">Product</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1B4332]/50">Customer</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1B4332]/50">Rating</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1B4332]/50">Comment</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1B4332]/50">Status</th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1B4332]/50 pr-6 sm:pr-10">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map((r) => (
                <tr key={r.id} className="border-b border-[#1B4332]/5 hover:bg-[#F5F0E8]/30 transition-colors align-top">
                  <td className="px-6 sm:px-10 py-4 font-bold text-sm text-gray-900 max-w-[160px]">{r.product_name}</td>
                  <td className="px-4 py-4 text-sm text-gray-600 font-medium">{r.customer_name}</td>
                  <td className="px-4 py-4"><StarRating rating={r.rating} /></td>
                  <td className="px-4 py-4 text-sm text-gray-500 italic max-w-[260px]">"{r.comment}"</td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusStyles[r.status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 pr-6 sm:pr-10">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStatus(r.id, 'Approved')}
                        disabled={updatingId === r.id || r.status === 'Approved'}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${
                          r.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-300 cursor-not-allowed'
                            : 'bg-[#1B4332]/10 text-[#1B4332] hover:bg-[#1B4332] hover:text-white'
                        }`}
                        title="Approve"
                      >
                        <FiCheck className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleStatus(r.id, 'Rejected')}
                        disabled={updatingId === r.id || r.status === 'Rejected'}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors flex-shrink-0 ${
                          r.status === 'Rejected'
                            ? 'bg-red-50 text-red-200 cursor-not-allowed'
                            : 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white'
                        }`}
                        title="Reject"
                      >
                        <FiX className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && filteredReviews.length > 0 && (
        <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-widest px-6 sm:px-10 pb-6 text-center sm:text-left">
          Showing {filteredReviews.length} of {reviews.length} reviews
        </p>
      )}
    </div>
  );
};

export default ManageReviews;