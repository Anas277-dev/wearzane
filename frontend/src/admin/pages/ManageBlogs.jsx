// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ManageBlogs = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [formData, setFormData] = useState({ title: '', content: '', image_url: '' });

//   const fetchBlogs = async () => {
//     const res = await axios.get('http://localhost:5000/api/blogs');
//     setBlogs(res.data);
//   };

//   useEffect(() => { fetchBlogs(); }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post('http://localhost:5000/api/blogs/add', formData);
//     setFormData({ title: '', content: '', image_url: '' });
//     fetchBlogs();
//   };

//   const handleDelete = async (id) => {
//     if(window.confirm("Delete this blog?")) {
//       await axios.delete(`http://localhost:5000/api/blogs/${id}`);
//       fetchBlogs();
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-sm">
//       <h2 className="text-2xl font-bold mb-6 italic">BLOG MANAGEMENT</h2>
      
//       {/* Add Blog Form */}
//       <form onSubmit={handleSubmit} className="space-y-4 mb-10 border-b pb-10">
//         <input className="w-full p-3 border rounded" placeholder="Blog Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
//         <input className="w-full p-3 border rounded" placeholder="Image URL (Cloudinary Link)" value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} />
//         <textarea className="w-full p-3 border rounded h-32" placeholder="Blog Content..." value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} required />
//         <button type="submit" className="bg-black text-white px-6 py-3 rounded font-bold hover:bg-gray-800 transition">Publish Blog</button>
//       </form>

//       {/* Blog List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {blogs.map(blog => (
//           <div key={blog.id} className="border rounded-lg overflow-hidden flex flex-col">
//             <img src={blog.image_url || 'https://via.placeholder.com/400x200'} className="h-48 w-full object-cover" alt="blog" />
//             <div className="p-4 flex-1">
//               <h3 className="font-bold text-lg">{blog.title}</h3>
//               <p className="text-gray-500 text-sm line-clamp-3 mt-2">{blog.content}</p>
//             </div>
//             <button onClick={() => handleDelete(blog.id)} className="bg-red-50 text-red-500 p-2 text-xs font-bold hover:bg-red-100 transition">DELETE POST</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ManageBlogs;






import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FiEdit3, FiImage, FiPlus, FiTrash2, FiCheckCircle, FiAlertTriangle,
  FiX, FiFileText
} from 'react-icons/fi';

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '', image_url: '' });
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(res.data);
    } catch (err) {
      setErrorMsg('Blogs load nahi ho sakay.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

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
    setPublishing(true);
    try {
      await axios.post('http://localhost:5000/api/blogs/add', formData);
      setFormData({ title: '', content: '', image_url: '' });
      setSuccessMsg('Blog post successfully published!');
      fetchBlogs();
    } catch (err) {
      setErrorMsg('Blog publish nahi hua!');
    } finally {
      setPublishing(false);
    }
  };

  const confirmDelete = (blog) => setDeleteTarget(blog);
  const cancelDelete = () => setDeleteTarget(null);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${deleteTarget.id}`);
      setSuccessMsg('Blog post removed successfully.');
      setBlogs((prev) => prev.filter((b) => b.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      setErrorMsg('Blog delete nahi hua!');
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
            CMS / Journal
          </p>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 uppercase">
            Blog Management
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Publish stories, style guides, and updates for WearZane readers.
          </p>
        </div>
        <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-[#1B4332]/10 items-center justify-center flex-shrink-0">
          <FiEdit3 className="text-xl text-[#1B4332]" />
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

      {/* Add Blog Form */}
      <form onSubmit={handleSubmit} className="space-y-5 mb-10 pb-10 border-b border-[#1B4332]/10">
        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Blog Title</label>
          <input
            className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors"
            placeholder="e.g. 5 Ways to Style a Velvet Suit"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">
            <FiImage className="inline text-xs mr-1" /> Image URL
          </label>
          <input
            className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors"
            placeholder="Cloudinary link"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Blog Content</label>
          <textarea
            className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors resize-none"
            rows="6"
            placeholder="Write the full story here..."
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
          />
        </div>

        <button
          type="submit"
          disabled={publishing}
          className={`px-6 py-4 rounded-full font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-colors ${
            publishing
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-[#1B4332] text-white hover:bg-[#143728] shadow-sm hover:shadow-lg'
          }`}
        >
          <FiPlus className="text-sm" />
          {publishing ? 'Publishing...' : 'Publish Blog'}
        </button>
      </form>

      {/* Blog list header */}
      <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/50 mb-4">
        Published Posts ({blogs.length})
      </p>

      {/* Loading state */}
      {loading && (
        <div className="py-20 flex flex-col items-center justify-center text-gray-400">
          <div className="w-8 h-8 border-2 border-[#1B4332]/20 border-t-[#1B4332] rounded-full animate-spin mb-3" />
          <p className="text-xs font-bold uppercase tracking-widest">Loading posts...</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && blogs.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#1B4332]/10 flex items-center justify-center mb-4">
            <FiFileText className="text-2xl text-[#1B4332]/50" />
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-gray-500">No blog posts yet</p>
          <p className="text-gray-400 text-sm mt-1">Publish your first post above.</p>
        </div>
      )}

      {/* Blog grid */}
      {!loading && blogs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="group rounded-2xl border border-[#1B4332]/10 bg-[#F5F0E8]/30 overflow-hidden hover:shadow-lg hover:border-[#1B4332]/20 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                {blog.image_url ? (
                  <img
                    src={blog.image_url}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={blog.title}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <FiImage className="text-3xl" />
                  </div>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-black text-gray-900 uppercase tracking-tight text-sm mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-3 flex-1">{blog.content}</p>
                <button
                  onClick={() => confirmDelete(blog)}
                  className="w-full mt-4 py-2.5 rounded-full bg-red-50 text-red-600 text-[11px] font-black tracking-widest uppercase flex items-center justify-center gap-1.5 hover:bg-red-100 transition-colors"
                >
                  <FiTrash2 className="text-xs" /> Delete Post
                </button>
              </div>
            </div>
          ))}
        </div>
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
              Delete Blog Post?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              "<span className="font-semibold text-gray-700">{deleteTarget.title}</span>" will be permanently removed.
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

export default ManageBlogs;