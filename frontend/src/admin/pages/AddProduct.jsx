// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AddProduct = () => {
//   const [categories, setCategories] = useState([]); // Database Categories (Summer, Winter, etc.)
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);
  
//   const [product, setProduct] = useState({
//     name: '',
//     description: '',
//     price: '',
//     stock: '',
//     category_id: '',
//     section: 'Men' // Naya column: Section selection
//   });

//   // 1. Categories load karna (Summer, Winter etc)
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/categories'); 
//         setCategories(res.data);
//         if (res.data.length > 0) {
//           setProduct(prev => ({ ...prev, category_id: res.data[0].id }));
//         }
//       } catch (err) {
//         console.error("Categories load nahi ho sakin");
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setImages(e.target.files);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     const formData = new FormData();
//     formData.append('name', product.name);
//     formData.append('description', product.description);
//     formData.append('price', product.price);
//     formData.append('stock', product.stock);
//     formData.append('category_id', product.category_id);
//     formData.append('section', product.section); // Section append kar rahe hain

//     for (let i = 0; i < images.length; i++) {
//       formData.append('images', images[i]);
//     }

//     try {
//       const token = localStorage.getItem('adminToken');
//       await axios.post('http://localhost:5000/api/products/add', formData, {
//         headers: { 
//           'Content-Type': 'multipart/form-data',
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       alert("Product successfully added to WearZane!");
//       // Form reset logic yahan add kar sakte hain
//     } catch (err) {
//       alert("Upload failed! Please check backend console.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
//       <div className="mb-8 border-b pb-4">
//         <h2 className="text-3xl font-black tracking-tighter text-black uppercase">Add New Product</h2>
//         <p className="text-gray-500 text-sm">Fill in the details to list a new item on WearZane.</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Name */}
//         <div>
//           <label className="block text-xs font-bold tracking-widest uppercase text-gray-700 mb-2">Product Title</label>
//           <input type="text" name="name" onChange={handleChange} className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black outline-none transition" placeholder="e.g. Midnight Black Velvet Suit" required />
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Price */}
//           <div>
//             <label className="block text-xs font-bold tracking-widest uppercase text-gray-700 mb-2">Price (PKR)</label>
//             <input type="number" name="price" onChange={handleChange} className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black outline-none transition" placeholder="9500" required />
//           </div>
//           {/* Stock */}
//           <div>
//             <label className="block text-xs font-bold tracking-widest uppercase text-gray-700 mb-2">Inventory Stock</label>
//             <input type="number" name="stock" onChange={handleChange} className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black outline-none transition" placeholder="15" required />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Section Selection */}
//           <div>
//             <label className="block text-xs font-bold tracking-widest uppercase text-gray-700 mb-2">Target Section</label>
//             <select name="section" value={product.section} onChange={handleChange} className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black outline-none transition cursor-pointer font-semibold">
//               <option value="Men">MEN</option>
//               <option value="Women">WOMEN</option>
//               <option value="Unisex">UNISEX</option>
//               <option value="Kids">KIDS</option>
//             </select>
//           </div>

//           {/* Collection Selection */}
//           <div>
//             <label className="block text-xs font-bold tracking-widest uppercase text-gray-700 mb-2">Season/Collection</label>
//             <select name="category_id" value={product.category_id} onChange={handleChange} className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black outline-none transition cursor-pointer font-semibold">
//               {categories.map(cat => (
//                 <option key={cat.id} value={cat.id}>{cat.name.toUpperCase()}</option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-xs font-bold tracking-widest uppercase text-gray-700 mb-2">Description & Details</label>
//           <textarea name="description" onChange={handleChange} rows="4" className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black outline-none transition" placeholder="Mention fabric quality, embroidery details, and size guide..."></textarea>
//         </div>

//         {/* Image Upload */}
//         <div className="p-6 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 hover:bg-gray-100 transition">
//           <label className="block text-xs font-bold tracking-widest uppercase text-gray-700 mb-2">Upload Product Images (Max 4)</label>
//           <input type="file" multiple accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer" />
//         </div>

//         <button 
//           type="submit" 
//           disabled={loading}
//           className={`w-full py-5 rounded-xl font-black tracking-widest uppercase transition duration-300 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-900 shadow-xl'}`}
//         >
//           {loading ? 'Processing...' : 'Publish Product to WearZane'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;










import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUploadCloud, FiTag, FiDollarSign, FiBox, FiX, FiCheckCircle } from 'react-icons/fi';

const AddProduct = () => {
  const [categories, setCategories] = useState([]); // Database Categories (Summer, Winter, etc.)
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    section: 'Men' // Naya column: Section selection
  });

  // 1. Categories load karna (Summer, Winter etc)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/categories');
        setCategories(res.data);
        if (res.data.length > 0) {
          setProduct(prev => ({ ...prev, category_id: res.data[0].id }));
        }
      } catch (err) {
        console.error("Categories load nahi ho sakin");
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    setImages(files);
    setPreviews(files.map(file => URL.createObjectURL(file)));
  };

  const removeImage = (idx) => {
    const newFiles = images.filter((_, i) => i !== idx);
    setImages(newFiles);
    setPreviews(newFiles.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('stock', product.stock);
    formData.append('category_id', product.category_id);
    formData.append('section', product.section); // Section append kar rahe hain

    images.forEach((img) => formData.append('images', img));

    try {
      const token = localStorage.getItem('adminToken');
      await axios.post('http://localhost:5000/api/products/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      setSuccessMsg("Product successfully added to WearZane!");
      setProduct(prev => ({ ...prev, name: '', description: '', price: '', stock: '' }));
      setImages([]);
      setPreviews([]);
    } catch (err) {
      alert("Upload failed! Please check backend console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-[#1B4332]/10">
      <div className="mb-8 border-b border-[#1B4332]/10 pb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/50 mb-2">Catalog / New Listing</p>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 uppercase">Add New Product</h2>
          <p className="text-gray-400 text-sm mt-1">Fill in the details to list a new item on WearZane.</p>
        </div>
        <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-[#1B4332]/10 items-center justify-center flex-shrink-0">
          <FiTag className="text-xl text-[#1B4332]" />
        </div>
      </div>

      {successMsg && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <FiCheckCircle /> {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Product Title</label>
          <input
            type="text" name="name" value={product.name} onChange={handleChange}
            className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors"
            placeholder="e.g. Midnight Black Velvet Suit" required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price */}
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Price (PKR)</label>
            <div className="relative">
              <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B4332]/40" />
              <input
                type="number" name="price" value={product.price} onChange={handleChange}
                className="w-full pl-11 pr-4 py-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors"
                placeholder="9500" required
              />
            </div>
          </div>
          {/* Stock */}
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Inventory Stock</label>
            <div className="relative">
              <FiBox className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B4332]/40" />
              <input
                type="number" name="stock" value={product.stock} onChange={handleChange}
                className="w-full pl-11 pr-4 py-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors"
                placeholder="15" required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section Selection */}
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Target Section</label>
            <select
              name="section" value={product.section} onChange={handleChange}
              className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors cursor-pointer font-semibold"
            >
              <option value="Men">MEN</option>
              <option value="Women">WOMEN</option>
              <option value="Unisex">UNISEX</option>
              <option value="Kids">KIDS</option>
            </select>
          </div>

          {/* Collection Selection */}
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Season/Collection</label>
            <select
              name="category_id" value={product.category_id} onChange={handleChange}
              className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors cursor-pointer font-semibold"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Description &amp; Details</label>
          <textarea
            name="description" value={product.description} onChange={handleChange} rows="4"
            className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors resize-none"
            placeholder="Mention fabric quality, embroidery details, and size guide..."
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Upload Product Images (Max 4)</label>

          {previews.length > 0 && (
            <div className="grid grid-cols-4 gap-3 mb-4">
              {previews.map((src, idx) => (
                <div key={idx} className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 border border-[#1B4332]/10 group">
                  <img src={src} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FiX className="text-xs" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <label className="flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed border-[#1B4332]/20 rounded-2xl bg-[#F5F0E8]/40 hover:bg-[#F5F0E8]/70 hover:border-[#1B4332]/40 transition-colors cursor-pointer">
            <FiUploadCloud className="text-2xl text-[#1B4332]/50" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#1B4332]">Click to select images</span>
            <span className="text-[10px] text-gray-400">PNG, JPG up to 4 photos</span>
            <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 sm:py-5 rounded-full font-black text-xs sm:text-sm tracking-widest uppercase transition-colors duration-300 flex items-center justify-center gap-2 ${
            loading
              ? 'bg-gray-300 cursor-not-allowed text-white'
              : 'bg-[#1B4332] text-white hover:bg-[#143728] shadow-sm hover:shadow-xl'
          }`}
        >
          {loading ? 'Processing...' : 'Publish Product to WearZane'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;