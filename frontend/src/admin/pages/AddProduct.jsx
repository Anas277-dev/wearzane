import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [categories, setCategories] = useState([]); // Categories store karne ke liye
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '' 
  });

  const [images, setImages] = useState([]);

  // Database se categories load karein
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

  const handleFileChange = (e) => {
  setImages(e.target.files); // Multiple files select karne ke liye
};

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Kyunke hum images bhej rahe hain, humein FormData use karna parega
  const formData = new FormData();
  formData.append('name', product.name);
  formData.append('description', product.description);
  formData.append('price', product.price);
  formData.append('stock', product.stock);
  formData.append('category_id', product.category_id);

  // 4 images add karna
  for (let i = 0; i < images.length; i++) {
    formData.append('images', images[i]);
  }

  try {
    await axios.post('http://localhost:5000/api/products/add', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    alert("Product with 4 Images Added!");
  } catch (err) {
    alert("Upload failed!");
  }
};

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input type="text" name="name" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Blue Cotton Suit" required />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (PKR)</label>
            <input type="number" name="price" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="5000" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
            <input type="number" name="stock" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="20" required />
          </div>
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select 
            name="category_id" 
            value={product.category_id} 
            onChange={handleChange}
            className="w-full p-3 border rounded-lg outline-none"
            required
          >
            <option value="">-- Choose Category --</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea name="description" onChange={handleChange} rows="4" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Describe the fabric and style..."></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
        <input 
            type="file" 
            multiple 
            accept="image/*" 
            onChange={handleFileChange} 
            className="w-full p-2 border rounded"
            />
            </div>

        <button type="submit" className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition duration-300">
          Upload Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;