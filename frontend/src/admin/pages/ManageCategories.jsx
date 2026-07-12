// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ManageCategories = () => {
//   const [name, setName] = useState('');
//   const [categories, setCategories] = useState([]);

//   const fetchCats = async () => {
//     const res = await axios.get('http://localhost:5000/api/categories');
//     setCategories(res.data);
//   };

//   useEffect(() => { fetchCats(); }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name) return;
//     await axios.post('http://localhost:5000/api/categories/add', { name });
//     setName('');
//     fetchCats();
//   };

//   const handleDelete = async (id) => {
//   if (!id) return; // Guard clause
  
//   if (window.confirm("Are you sure you want to delete this category?")) {
//     try {
//       const res = await axios.delete(`http://localhost:5000/api/categories/${id}`);
//       console.log("Delete Response:", res.data);
//       alert(res.data.message);
//       fetchCats(); // List ko refresh karein
//     } catch (err) {
//       console.error("Delete Error:", err.response?.data);
//       alert(err.response?.data?.error || "Delete failed!");
//     }
//   }
// };

//   return (
//     <div className="max-w-md bg-white p-6 rounded-xl shadow mx-auto mt-10">
//       <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
//       <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
//         <input 
//           value={name} 
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Category Name (e.g. Summer)"
//           className="flex-1 border p-2 rounded focus:ring-2 focus:ring-black outline-none"
//         />
//         <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">Add</button>
//       </form>
      
//       <ul className="space-y-2">
//         {categories.map(c => (
//           <li key={c.id} className="p-3 bg-gray-50 rounded border flex justify-between items-center group">
//             <span className="font-medium text-gray-700">{c.name}</span>
//             <button 
//               onClick={() => handleDelete(c.id)}
//               className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition"
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ManageCategories;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FiTag, FiPlus, FiTrash2, FiCheckCircle, FiAlertTriangle, FiLayers, FiX
} from 'react-icons/fi';

const ManageCategories = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Delete confirm state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // 1. Categories fetch karna
  const fetchCats = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (err) {
      setErrorMsg('Categories load nahi ho sakin. Backend check karein.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  // Auto-hide alerts
  useEffect(() => {
    if (successMsg) {
      const t = setTimeout(() => setSuccessMsg(''), 3000);
      return () => clearTimeout(t);
    }
  }, [successMsg]);

  useEffect(() => {
    if (errorMsg) {
      const t = setTimeout(() => setErrorMsg(''), 4000);
      return () => clearTimeout(t);
    }
  }, [errorMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    try {
      await axios.post('http://localhost:5000/api/categories/add', { name: name.trim() });
      setName('');
      setSuccessMsg('Collection successfully added!');
      fetchCats();
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Category add nahi ho saki!');
    } finally {
      setSubmitting(false);
    }
  };

  // ---------- Delete handlers ----------
  const confirmDelete = (cat) => setDeleteTarget(cat);
  const cancelDelete = () => setDeleteTarget(null);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await axios.delete(`http://localhost:5000/api/categories/${deleteTarget.id}`);
      setSuccessMsg(res.data.message || 'Collection removed successfully.');
      setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Delete failed!');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-[#1B4332]/10">
      {/* Header */}
      <div className="mb-8 border-b border-[#1B4332]/10 pb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/50 mb-2">
            Catalog / Collections
          </p>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 uppercase">
            Manage Categories
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Create and organize seasonal collections for WearZane.
          </p>
        </div>
        <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-[#1B4332]/10 items-center justify-center flex-shrink-0">
          <FiLayers className="text-xl text-[#1B4332]" />
        </div>
      </div>

      {/* Alerts */}
      {successMsg && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <FiCheckCircle /> {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <FiAlertTriangle /> {errorMsg}
        </div>
      )}

      {/* Add form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">
          New Collection Name
        </label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <FiTag className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B4332]/40" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Summer Collection"
              className="w-full pl-11 pr-4 py-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={submitting || !name.trim()}
            className={`px-6 rounded-xl font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-colors ${
              submitting || !name.trim()
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#1B4332] text-white hover:bg-[#143728] shadow-sm hover:shadow-lg'
            }`}
          >
            <FiPlus className="text-sm" />
            {submitting ? 'Adding...' : 'Add'}
          </button>
        </div>
      </form>

      {/* Divider label */}
      <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/50 mb-3">
        Existing Collections ({categories.length})
      </p>

      {/* Loading state */}
      {loading && (
        <div className="py-16 flex flex-col items-center justify-center text-gray-400">
          <div className="w-8 h-8 border-2 border-[#1B4332]/20 border-t-[#1B4332] rounded-full animate-spin mb-3" />
          <p className="text-xs font-bold uppercase tracking-widest">Loading collections...</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && categories.length === 0 && (
        <div className="py-16 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#1B4332]/10 flex items-center justify-center mb-4">
            <FiLayers className="text-2xl text-[#1B4332]/50" />
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
            No collections yet
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Add your first collection above to get started.
          </p>
        </div>
      )}

      {/* Category list */}
      {!loading && categories.length > 0 && (
        <ul className="space-y-2.5">
          {categories.map((c) => (
            <li
              key={c.id}
              className="group p-4 bg-[#F5F0E8]/40 border border-[#1B4332]/10 rounded-xl flex items-center justify-between hover:bg-[#F5F0E8]/70 hover:border-[#1B4332]/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#1B4332]/10 flex items-center justify-center flex-shrink-0">
                  <FiTag className="text-sm text-[#1B4332]" />
                </div>
                <span className="font-bold text-gray-800 uppercase tracking-tight text-sm">
                  {c.name}
                </span>
              </div>
              <button
                onClick={() => confirmDelete(c)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors sm:opacity-0 sm:group-hover:opacity-100"
              >
                <FiTrash2 className="text-sm" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* ---------- Delete Confirm Modal ---------- */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-6 sm:p-8 text-center relative">
            <button
              onClick={cancelDelete}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5F0E8] flex items-center justify-center text-gray-500 hover:bg-[#1B4332]/10 transition-colors"
            >
              <FiX className="text-sm" />
            </button>
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
              <FiAlertTriangle className="text-2xl text-red-500" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-gray-900 mb-2">
              Remove Collection?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              "<span className="font-semibold text-gray-700">{deleteTarget.name}</span>" will be permanently removed. Products linked to it may be affected.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 py-4 rounded-full font-black text-xs tracking-widest uppercase bg-[#F5F0E8] text-gray-600 hover:bg-[#1B4332]/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className={`flex-1 py-4 rounded-full font-black text-xs tracking-widest uppercase transition-colors ${
                  deleting
                    ? 'bg-gray-300 cursor-not-allowed text-white'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                {deleting ? 'Removing...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;