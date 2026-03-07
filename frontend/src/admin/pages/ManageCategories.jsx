import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageCategories = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);

  const fetchCats = async () => {
    const res = await axios.get('http://localhost:5000/api/categories');
    setCategories(res.data);
  };

  useEffect(() => { fetchCats(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/categories/add', { name });
    setName('');
    fetchCats();
  };

  return (
    <div className="max-w-md bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Manage Categories</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name (e.g. Summer)"
          className="flex-1 border p-2 rounded"
        />
        <button className="bg-black text-white px-4 py-2 rounded">Add</button>
      </form>
      <ul className="space-y-2">
        {categories.map(c => (
          <li key={c.id} className="p-2 bg-gray-50 rounded border">{c.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCategories;