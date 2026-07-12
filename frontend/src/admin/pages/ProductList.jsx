// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [newImages, setNewImages] = useState(null); 

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/products');
//       setProducts(res.data);
//     } catch (err) {
//       console.error("Fetch error:", err);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/categories');
//       setCategories(res.data);
//     } catch (err) {
//       console.error("Category error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure? Is product ko sirf tabhi delete kiya ja sakta hai agar koi active order na ho.")) {
//       try {
//         // API call
//         await axios.delete(`http://localhost:5000/api/products/${id}`);
//         alert("Product deleted successfully!");
//         fetchProducts();
//       } catch (err) {
//         // 🎯 Yahan server ka asli error message show hoga
//         const errorMessage = err.response?.data?.error || "Delete failed! Shayad ye product abhi kisi active order mein hai.";
//         alert(errorMessage);
//       }
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
    
//     const formData = new FormData();
//     formData.append('name', editingProduct.name);
//     formData.append('description', editingProduct.description || "");
//     formData.append('price', editingProduct.price);
//     formData.append('stock', editingProduct.stock);
//     formData.append('category_id', editingProduct.category_id);
//     formData.append('section', editingProduct.section);

//     if (newImages) {
//       for (let i = 0; i < newImages.length; i++) {
//         formData.append('images', newImages[i]);
//       }
//     }

//     try {
//       await axios.put(`http://localhost:5000/api/products/${editingProduct.id}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
      
//       alert("Product & Stock Updated!");
//       setEditingProduct(null);
//       setNewImages(null);
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//       alert("Update failed!");
//     }
//   };

//   return (
//     <div className="relative">
//       <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//         <table className="w-full text-left">
//           <thead className="bg-gray-50 border-b">
//             <tr>
//               <th className="p-4 font-semibold text-gray-600">Image</th>
//               <th className="p-4 font-semibold text-gray-600">Product Name</th>
//               <th className="p-4 font-semibold text-gray-600">Price</th>
//               <th className="p-4 font-semibold text-gray-600">Stock</th>
//               <th className="p-4 font-semibold text-gray-600">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((p) => (
//               <tr key={p.id} className="border-b hover:bg-gray-50 transition">
//                 <td className="p-4">
//                   <img 
//                     src={p.images && p.images[0] ? p.images[0] : ""} 
//                     className="w-12 h-12 object-cover rounded shadow-sm" alt="product"
//                   />
//                 </td>
//                 <td className="p-4 font-medium">{p.name}</td>
//                 <td className="p-4 text-gray-600">Rs. {p.price}</td>
//                 <td className="p-4 font-bold text-gray-700">{p.stock}</td>
//                 <td className="p-4 space-x-3">
//                   <button onClick={() => setEditingProduct(p)} className="text-blue-600 font-medium">Edit</button>
//                   <button onClick={() => handleDelete(p.id)} className="text-red-600 font-medium">Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {editingProduct && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
//             <h2 className="text-xl font-bold mb-6">Update Product Details</h2>
            
//             <form onSubmit={handleUpdate} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-500 mb-2">Current Images</label>
//                 <div className="flex gap-2 overflow-x-auto pb-2">
//                   {editingProduct.images?.map((img, i) => (
//                     <img key={i} src={img} className="w-16 h-16 object-cover rounded border" alt="prod" />
//                   ))}
//                 </div>
//               </div>

//               <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
//                 <label className="block text-sm font-bold text-blue-700 mb-1">Replace Images (Optional)</label>
//                 <input 
//                   type="file" multiple accept="image/*"
//                   onChange={(e) => setNewImages(e.target.files)}
//                   className="text-xs text-gray-600"
//                 />
//               </div>

//               <input 
//                 type="text" value={editingProduct.name} 
//                 onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
//                 className="w-full p-2 border rounded-lg" placeholder="Name" required 
//               />
              
//               <div className="grid grid-cols-2 gap-4">
//                 <input 
//                   type="number" value={editingProduct.price} 
//                   onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
//                   className="w-full p-2 border rounded-lg" placeholder="Price" required 
//                 />
//                 <input 
//                   type="number" value={editingProduct.stock} 
//                   onChange={(e) => setEditingProduct({...editingProduct, stock: e.target.value})}
//                   className="w-full p-2 border rounded-lg" placeholder="Stock" required 
//                 />
//               </div>

//               <select 
//                 value={editingProduct.category_id} 
//                 onChange={(e) => setEditingProduct({...editingProduct, category_id: e.target.value})}
//                 className="w-full p-2 border rounded-lg"
//               >
//                 {categories.map(cat => (
//                   <option key={cat.id} value={cat.id}>{cat.name}</option>
//                 ))}
//               </select>

//               <div className="mb-4">
//                 <label className="block text-sm font-bold mb-2 uppercase tracking-tighter">Section</label>
//                 <select 
//                   name="section" 
//                   value={editingProduct.section}
//                   onChange={(e) => setEditingProduct({...editingProduct, section: e.target.value})}
//                   className="w-full p-3 border border-black focus:outline-none"
//                   required
//                 >
//                   <option value="Men">Men</option>
//                   <option value="Women">Women</option>
//                   <option value="Kids">Kids</option>
//                   <option value="Unisex">Unisex</option>
//                 </select>
//               </div>

//               <textarea 
//                 value={editingProduct.description || ""} 
//                 onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
//                 className="w-full p-2 border rounded-lg" rows="2" placeholder="Description"
//               ></textarea>

//               <div className="flex gap-3 pt-2">
//                 <button type="submit" className="flex-1 bg-black text-white py-2 rounded-lg font-bold">Update Everything</button>
//                 <button type="button" onClick={() => {setEditingProduct(null); setNewImages(null);}} className="flex-1 bg-gray-100 py-2 rounded-lg">Cancel</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductList;







import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  FiSearch, FiEdit2, FiTrash2, FiX, FiCheckCircle, FiAlertTriangle,
  FiBox, FiTag, FiDollarSign, FiImage, FiSave, FiFilter
} from 'react-icons/fi';

const SECTIONS = ['Men', 'Women', 'Unisex', 'Kids'];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Filters
  const [search, setSearch] = useState('');
  const [sectionFilter, setSectionFilter] = useState('All');

  // Edit modal state
  const [editProduct, setEditProduct] = useState(null); // holds product being edited
  const [savingEdit, setSavingEdit] = useState(false);

  // Delete confirm state
  const [deleteTarget, setDeleteTarget] = useState(null); // holds product being deleted
  const [deleting, setDeleting] = useState(false);

  const token = localStorage.getItem('adminToken');

  // 1. Products aur Categories dono load karna
  const fetchAll = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const [prodRes, catRes] = await Promise.all([
        axios.get('http://localhost:5000/api/products'),
        axios.get('http://localhost:5000/api/categories')
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    } catch (err) {
      setErrorMsg('Products load nahi ho sakay. Backend check karein.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Auto-hide success message
  useEffect(() => {
    if (successMsg) {
      const t = setTimeout(() => setSuccessMsg(''), 3000);
      return () => clearTimeout(t);
    }
  }, [successMsg]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase());
      const matchesSection = sectionFilter === 'All' || p.section === sectionFilter;
      return matchesSearch && matchesSection;
    });
  }, [products, search, sectionFilter]);

  const categoryName = (id) => {
    const cat = categories.find((c) => c.id === id || c.id === Number(id));
    return cat ? cat.name.toUpperCase() : '—';
  };

  // ---------- Edit handlers ----------
  const openEdit = (product) => {
    setEditProduct({ ...product });
  };

  const closeEdit = () => setEditProduct(null);

  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    setSavingEdit(true);
    try {
      await axios.put(
        `http://localhost:5000/api/products/${editProduct.id}`,
        {
          name: editProduct.name,
          description: editProduct.description,
          price: editProduct.price,
          stock: editProduct.stock,
          category_id: editProduct.category_id,
          section: editProduct.section
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts((prev) =>
        prev.map((p) => (p.id === editProduct.id ? { ...p, ...editProduct } : p))
      );
      setSuccessMsg('Product successfully updated!');
      setEditProduct(null);
    } catch (err) {
      alert('Update failed! Please check backend console.');
    } finally {
      setSavingEdit(false);
    }
  };

  // ---------- Delete handlers ----------
  const confirmDelete = (product) => setDeleteTarget(product);
  const cancelDelete = () => setDeleteTarget(null);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:5000/api/products/${deleteTarget.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setSuccessMsg('Product removed from WearZane.');
      setDeleteTarget(null);
    } catch (err) {
      alert('Delete failed! Please check backend console.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-[#1B4332]/10">
      {/* Header */}
      <div className="mb-8 border-b border-[#1B4332]/10 pb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/50 mb-2">
            Catalog / All Listings
          </p>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 uppercase">
            Product Inventory
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage, edit, and remove items listed on WearZane.
          </p>
        </div>
        <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-[#1B4332]/10 items-center justify-center flex-shrink-0">
          <FiBox className="text-xl text-[#1B4332]" />
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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B4332]/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by name..."
            className="w-full pl-11 pr-4 py-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors"
          />
        </div>
        <div className="relative sm:w-56">
          <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B4332]/40" />
          <select
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
            className="w-full pl-11 pr-4 py-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors cursor-pointer font-semibold"
          >
            <option value="All">ALL SECTIONS</option>
            {SECTIONS.map((s) => (
              <option key={s} value={s}>{s.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="py-24 flex flex-col items-center justify-center text-gray-400">
          <div className="w-8 h-8 border-2 border-[#1B4332]/20 border-t-[#1B4332] rounded-full animate-spin mb-3" />
          <p className="text-xs font-bold uppercase tracking-widest">Loading inventory...</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && filteredProducts.length === 0 && (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#1B4332]/10 flex items-center justify-center mb-4">
            <FiBox className="text-2xl text-[#1B4332]/50" />
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
            No products found
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Try a different search or add a new listing.
          </p>
        </div>
      )}

      {/* Product grid */}
      {!loading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group rounded-2xl border border-[#1B4332]/10 bg-[#F5F0E8]/30 overflow-hidden hover:shadow-lg hover:border-[#1B4332]/20 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <FiImage className="text-3xl" />
                  </div>
                )}
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold tracking-widest uppercase text-[#1B4332]">
                  {product.section}
                </span>
                {Number(product.stock) === 0 && (
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-red-500/90 text-[10px] font-bold tracking-widest uppercase text-white">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="p-4">
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#1B4332]/50 mb-1 flex items-center gap-1">
                  <FiTag className="text-[10px]" /> {categoryName(product.category_id)}
                </p>
                <h3 className="font-black text-gray-900 uppercase tracking-tight text-sm mb-2 line-clamp-1">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center gap-1 text-[#1B4332] font-black text-sm">
                    <FiDollarSign className="text-xs" /> {Number(product.price).toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500 font-semibold">
                    <FiBox className="text-xs" /> {product.stock} in stock
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(product)}
                    className="flex-1 py-2.5 rounded-full bg-[#1B4332] text-white text-[11px] font-black tracking-widest uppercase flex items-center justify-center gap-1.5 hover:bg-[#143728] transition-colors"
                  >
                    <FiEdit2 className="text-xs" /> Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(product)}
                    className="flex-1 py-2.5 rounded-full bg-red-50 text-red-600 text-[11px] font-black tracking-widest uppercase flex items-center justify-center gap-1.5 hover:bg-red-100 transition-colors"
                  >
                    <FiTrash2 className="text-xs" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results count */}
      {!loading && filteredProducts.length > 0 && (
        <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-widest mt-6 text-center">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      )}

      {/* ---------- Edit Modal ---------- */}
      {editProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/50 mb-1">
                  Editing
                </p>
                <h3 className="text-xl font-black uppercase tracking-tight text-gray-900">
                  {editProduct.name}
                </h3>
              </div>
              <button
                onClick={closeEdit}
                className="w-9 h-9 rounded-full bg-[#F5F0E8] flex items-center justify-center text-gray-500 hover:bg-[#1B4332]/10 transition-colors"
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={submitEdit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">
                  Product Title
                </label>
                <input
                  type="text"
                  name="name"
                  value={editProduct.name}
                  onChange={handleEditChange}
                  className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">
                    Price (PKR)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={editProduct.price}
                    onChange={handleEditChange}
                    className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={editProduct.stock}
                    onChange={handleEditChange}
                    className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">
                    Section
                  </label>
                  <select
                    name="section"
                    value={editProduct.section}
                    onChange={handleEditChange}
                    className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors cursor-pointer font-semibold"
                  >
                    {SECTIONS.map((s) => (
                      <option key={s} value={s}>{s.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">
                    Collection
                  </label>
                  <select
                    name="category_id"
                    value={editProduct.category_id}
                    onChange={handleEditChange}
                    className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors cursor-pointer font-semibold"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">
                  Description &amp; Details
                </label>
                <textarea
                  name="description"
                  value={editProduct.description}
                  onChange={handleEditChange}
                  rows="4"
                  className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeEdit}
                  className="flex-1 py-4 rounded-full font-black text-xs tracking-widest uppercase bg-[#F5F0E8] text-gray-600 hover:bg-[#1B4332]/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className={`flex-1 py-4 rounded-full font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-colors ${
                    savingEdit
                      ? 'bg-gray-300 cursor-not-allowed text-white'
                      : 'bg-[#1B4332] text-white hover:bg-[#143728]'
                  }`}
                >
                  <FiSave className="text-xs" />
                  {savingEdit ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------- Delete Confirm Modal ---------- */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-6 sm:p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
              <FiAlertTriangle className="text-2xl text-red-500" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight text-gray-900 mb-2">
              Remove Product?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              "<span className="font-semibold text-gray-700">{deleteTarget.name}</span>" will be permanently removed from WearZane. This action cannot be undone.
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

export default ProductList;