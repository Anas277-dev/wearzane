import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newImages, setNewImages] = useState(null); // Nayi images store karne ke liye

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error("Category error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        alert("Delete failed!");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    // Kyunke images change ho sakti hain, hum FormData use karenge
    const formData = new FormData();
    formData.append('name', editingProduct.name);
    formData.append('description', editingProduct.description || "");
    formData.append('price', editingProduct.price);
    formData.append('stock', editingProduct.stock);
    formData.append('category_id', editingProduct.category_id);

    // Agar admin ne nayi images select ki hain
    if (newImages) {
      for (let i = 0; i < newImages.length; i++) {
        formData.append('images', newImages[i]);
      }
    }

    try {
      // Backend par PUT request (FormData ke saath)
      await axios.put(`http://localhost:5000/api/products/${editingProduct.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      alert("Product & Images Updated!");
      setEditingProduct(null);
      setNewImages(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Update failed! Backend controller check karein.");
    }
  };

  return (
    <div className="relative">
      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Image</th>
              <th className="p-4 font-semibold text-gray-600">Product Name</th>
              <th className="p-4 font-semibold text-gray-600">Price</th>
              <th className="p-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4">
                  <img 
                    src={p.images && p.images[0] ? p.images[0] : ""} 
                    className="w-12 h-12 object-cover rounded shadow-sm" 
                  />
                </td>
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4 text-gray-600">Rs. {p.price}</td>
                <td className="p-4 space-x-3">
                  <button onClick={() => setEditingProduct(p)} className="text-blue-600 font-medium">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600 font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-6">Update Product Details</h2>
            
            <form onSubmit={handleUpdate} className="space-y-4">
              {/* Current Images Preview */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Current Images</label>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {editingProduct.images?.map((img, i) => (
                    <img key={i} src={img} className="w-16 h-16 object-cover rounded border" />
                  ))}
                </div>
              </div>

              {/* Upload New Images */}
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <label className="block text-sm font-bold text-blue-700 mb-1">Replace Images (Optional)</label>
                <input 
                  type="file" multiple accept="image/*"
                  onChange={(e) => setNewImages(e.target.files)}
                  className="text-xs text-gray-600"
                />
                <p className="text-[10px] text-blue-500 mt-1">*Nayi images select karne se purani images replace ho jayengi.</p>
              </div>

              {/* Text Fields */}
              <input 
                type="text" value={editingProduct.name} 
                onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                className="w-full p-2 border rounded-lg" placeholder="Name" required 
              />
              
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="number" value={editingProduct.price} 
                  onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                  className="w-full p-2 border rounded-lg" placeholder="Price" required 
                />
                <input 
                  type="number" value={editingProduct.stock} 
                  onChange={(e) => setEditingProduct({...editingProduct, stock: e.target.value})}
                  className="w-full p-2 border rounded-lg" placeholder="Stock" required 
                />
              </div>

              <select 
                value={editingProduct.category_id} 
                onChange={(e) => setEditingProduct({...editingProduct, category_id: e.target.value})}
                className="w-full p-2 border rounded-lg"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>

              <textarea 
                value={editingProduct.description || ""} 
                onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                className="w-full p-2 border rounded-lg" rows="2" placeholder="Description"
              ></textarea>

              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-black text-white py-2 rounded-lg font-bold">Update Everything</button>
                <button type="button" onClick={() => {setEditingProduct(null); setNewImages(null);}} className="flex-1 bg-gray-100 py-2 rounded-lg">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;