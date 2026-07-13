// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   FiLayout, FiImage, FiPlus, FiTrash2, FiCheckCircle, FiAlertTriangle,
//   FiX, FiInfo, FiSave, FiType
// } from 'react-icons/fi';

// const ManageCMS = () => {
//   const [banners, setBanners] = useState([]);
//   const [newBanner, setNewBanner] = useState({ title: '', subtitle: '', image_url: '' });
//   const [aboutContent, setAboutContent] = useState({
//     title: '',
//     image_url: '',
//     content: '',
//     secondary_content: '',
//     mission_content: ''
//   });

//   const [loadingBanners, setLoadingBanners] = useState(true);
//   const [addingBanner, setAddingBanner] = useState(false);
//   const [savingAbout, setSavingAbout] = useState(false);

//   const [successMsg, setSuccessMsg] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');

//   // Delete confirm state
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [deleting, setDeleting] = useState(false);

//   useEffect(() => {
//     fetchBanners();
//   }, []);

//   useEffect(() => {
//     if (successMsg) {
//       const t = setTimeout(() => setSuccessMsg(''), 3000);
//       return () => clearTimeout(t);
//     }
//   }, [successMsg]);

//   useEffect(() => {
//     if (errorMsg) {
//       const t = setTimeout(() => setErrorMsg(''), 4000);
//       return () => clearTimeout(t);
//     }
//   }, [errorMsg]);

//   const fetchBanners = async () => {
//     setLoadingBanners(true);
//     try {
//       const res = await axios.get('http://localhost:5000/api/cms/banners');
//       setBanners(res.data);
//     } catch (err) {
//       setErrorMsg('Banners load nahi ho sakay.');
//     } finally {
//       setLoadingBanners(false);
//     }
//   };

//   const handleBannerUpload = async () => {
//     if (!newBanner.title.trim() || !newBanner.image_url.trim()) {
//       setErrorMsg('Title aur Image URL dono zaroori hain.');
//       return;
//     }
//     setAddingBanner(true);
//     try {
//       await axios.post('http://localhost:5000/api/cms/banners', newBanner);
//       setNewBanner({ title: '', subtitle: '', image_url: '' });
//       setSuccessMsg('Banner successfully added!');
//       fetchBanners();
//     } catch (err) {
//       setErrorMsg('Banner add nahi hua!');
//     } finally {
//       setAddingBanner(false);
//     }
//   };

//   const confirmDelete = (banner) => setDeleteTarget(banner);
//   const cancelDelete = () => setDeleteTarget(null);

//   const handleDeleteBanner = async () => {
//     if (!deleteTarget) return;
//     setDeleting(true);
//     try {
//       await axios.delete(`http://localhost:5000/api/cms/banners/${deleteTarget.id}`);
//       setSuccessMsg('Banner removed successfully.');
//       setDeleteTarget(null);
//       fetchBanners();
//     } catch (err) {
//       setErrorMsg('Banner delete nahi hua!');
//     } finally {
//       setDeleting(false);
//     }
//   };

//   const handlePageUpdate = async (slug) => {
//     setSavingAbout(true);
//     try {
//       await axios.post('http://localhost:5000/api/cms/update-page', { ...aboutContent, slug });
//       setSuccessMsg('About Us page updated successfully!');
//     } catch (err) {
//       setErrorMsg('Update failed!');
//     } finally {
//       setSavingAbout(false);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto space-y-8">
//       {/* Page-level alerts */}
//       {successMsg && (
//         <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
//           <FiCheckCircle /> {successMsg}
//         </div>
//       )}
//       {errorMsg && (
//         <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
//           <FiAlertTriangle /> {errorMsg}
//         </div>
//       )}

//       {/* ---------- Section 1: Homepage Banners ---------- */}
//       <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-[#1B4332]/10">
//         <div className="mb-8 border-b border-[#1B4332]/10 pb-5 flex items-start justify-between gap-4">
//           <div>
//             <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/50 mb-2">
//               CMS / Section 01
//             </p>
//             <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 uppercase">
//               Homepage Banners
//             </h2>
//             <p className="text-gray-400 text-sm mt-1">
//               Rotating hero banners displayed on the WearZane homepage.
//             </p>
//           </div>
//           <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-[#1B4332]/10 items-center justify-center flex-shrink-0">
//             <FiImage className="text-xl text-[#1B4332]" />
//           </div>
//         </div>

//         {/* Add banner form */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Banner Title</label>
//             <input
//               className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors"
//               placeholder="e.g. Summer Sale — Up to 40% Off"
//               value={newBanner.title}
//               onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Subtitle</label>
//             <input
//               className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors"
//               placeholder="e.g. Limited time only"
//               value={newBanner.subtitle}
//               onChange={(e) => setNewBanner({ ...newBanner, subtitle: e.target.value })}
//             />
//           </div>
//           <div className="md:col-span-2">
//             <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Image URL</label>
//             <input
//               className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors"
//               placeholder="https://..."
//               value={newBanner.image_url}
//               onChange={(e) => setNewBanner({ ...newBanner, image_url: e.target.value })}
//             />
//           </div>
//         </div>

//         <button
//           onClick={handleBannerUpload}
//           disabled={addingBanner}
//           className={`px-6 py-4 rounded-full font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-colors mb-8 ${
//             addingBanner
//               ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//               : 'bg-[#1B4332] text-white hover:bg-[#143728] shadow-sm hover:shadow-lg'
//           }`}
//         >
//           <FiPlus className="text-sm" />
//           {addingBanner ? 'Adding...' : 'Add New Banner'}
//         </button>

//         {/* Banner list */}
//         <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/50 mb-3">
//           Active Banners ({banners.length})
//         </p>

//         {loadingBanners && (
//           <div className="py-10 flex flex-col items-center justify-center text-gray-400">
//             <div className="w-7 h-7 border-2 border-[#1B4332]/20 border-t-[#1B4332] rounded-full animate-spin mb-3" />
//             <p className="text-xs font-bold uppercase tracking-widest">Loading banners...</p>
//           </div>
//         )}

//         {!loadingBanners && banners.length === 0 && (
//           <div className="py-10 flex flex-col items-center justify-center text-center">
//             <div className="w-14 h-14 rounded-2xl bg-[#1B4332]/10 flex items-center justify-center mb-3">
//               <FiImage className="text-2xl text-[#1B4332]/50" />
//             </div>
//             <p className="text-sm font-bold uppercase tracking-widest text-gray-500">No banners yet</p>
//             <p className="text-gray-400 text-sm mt-1">Add your first banner above.</p>
//           </div>
//         )}

//         {!loadingBanners && banners.length > 0 && (
//           <div className="flex gap-4 overflow-x-auto pb-2">
//             {banners.map((b) => (
//               <div
//                 key={b.id}
//                 className="w-40 rounded-2xl border border-[#1B4332]/10 bg-[#F5F0E8]/30 overflow-hidden flex-shrink-0"
//               >
//                 <div className="w-full h-24 bg-gray-100 overflow-hidden">
//                   <img src={b.image_url} className="w-full h-full object-cover" alt={b.title} />
//                 </div>
//                 <div className="p-2.5">
//                   <p className="font-bold text-xs text-gray-900 line-clamp-1">{b.title}</p>
//                   {b.subtitle && <p className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">{b.subtitle}</p>}
//                   <button
//                     onClick={() => confirmDelete(b)}
//                     className="w-full mt-2.5 py-2 rounded-full bg-red-50 text-red-600 text-[10px] font-black tracking-widest uppercase flex items-center justify-center gap-1.5 hover:bg-red-100 transition-colors"
//                   >
//                     <FiTrash2 className="text-[10px]" /> Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* ---------- Section 2: About Us Page ---------- */}
//       <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-[#1B4332]/10">
//         <div className="mb-8 border-b border-[#1B4332]/10 pb-5 flex items-start justify-between gap-4">
//           <div>
//             <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/50 mb-2">
//               CMS / Section 02
//             </p>
//             <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 uppercase">
//               About Us Page
//             </h2>
//             <p className="text-gray-400 text-sm mt-1">
//               Edit the story, vision, and mission shown on the About Us page.
//             </p>
//           </div>
//           <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-[#1B4332]/10 items-center justify-center flex-shrink-0">
//             <FiInfo className="text-xl text-[#1B4332]" />
//           </div>
//         </div>

//         <div className="space-y-5">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">
//                 <FiType className="inline text-xs mr-1" /> Page Title
//               </label>
//               <input
//                 className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors"
//                 placeholder="e.g. Our Story"
//                 value={aboutContent.title}
//                 onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">
//                 <FiImage className="inline text-xs mr-1" /> Hero Image URL
//               </label>
//               <input
//                 className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors"
//                 placeholder="https://..."
//                 value={aboutContent.image_url}
//                 onChange={(e) => setAboutContent({ ...aboutContent, image_url: e.target.value })}
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Main Content</label>
//             <textarea
//               className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors resize-none"
//               rows="4"
//               placeholder="Tell the WearZane story..."
//               value={aboutContent.content}
//               onChange={(e) => setAboutContent({ ...aboutContent, content: e.target.value })}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Vision Content</label>
//               <textarea
//                 className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors resize-none"
//                 rows="4"
//                 placeholder="What WearZane aims to become..."
//                 value={aboutContent.secondary_content}
//                 onChange={(e) => setAboutContent({ ...aboutContent, secondary_content: e.target.value })}
//               />
//             </div>
//             <div>
//               <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Mission Content</label>
//               <textarea
//                 className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors resize-none"
//                 rows="4"
//                 placeholder="How WearZane delivers on its promise..."
//                 value={aboutContent.mission_content}
//                 onChange={(e) => setAboutContent({ ...aboutContent, mission_content: e.target.value })}
//               />
//             </div>
//           </div>

//           <button
//             onClick={() => handlePageUpdate('about-us')}
//             disabled={savingAbout}
//             className={`px-6 py-4 rounded-full font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-colors ${
//               savingAbout
//                 ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                 : 'bg-[#1B4332] text-white hover:bg-[#143728] shadow-sm hover:shadow-lg'
//             }`}
//           >
//             <FiSave className="text-sm" />
//             {savingAbout ? 'Saving...' : 'Save About Us'}
//           </button>
//         </div>
//       </section>

//       {/* ---------- Delete Confirm Modal ---------- */}
//       {deleteTarget && (
//         <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-6 sm:p-8 text-center relative">
//             <button
//               onClick={cancelDelete}
//               className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5F0E8] flex items-center justify-center text-gray-500 hover:bg-[#1B4332]/10 transition-colors"
//             >
//               <FiX className="text-sm" />
//             </button>
//             <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
//               <FiAlertTriangle className="text-2xl text-red-500" />
//             </div>
//             <h3 className="text-lg font-black uppercase tracking-tight text-gray-900 mb-2">
//               Remove Banner?
//             </h3>
//             <p className="text-sm text-gray-500 mb-6">
//               "<span className="font-semibold text-gray-700">{deleteTarget.title}</span>" will be removed from the homepage.
//             </p>
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={cancelDelete}
//                 className="flex-1 py-4 rounded-full font-black text-xs tracking-widest uppercase bg-[#F5F0E8] text-gray-600 hover:bg-[#1B4332]/10 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDeleteBanner}
//                 disabled={deleting}
//                 className={`flex-1 py-4 rounded-full font-black text-xs tracking-widest uppercase transition-colors ${
//                   deleting
//                     ? 'bg-gray-300 cursor-not-allowed text-white'
//                     : 'bg-red-500 text-white hover:bg-red-600'
//                 }`}
//               >
//                 {deleting ? 'Removing...' : 'Yes, Delete'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageCMS;







import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FiLayout, FiImage, FiPlus, FiTrash2, FiCheckCircle, FiAlertTriangle,
  FiX, FiInfo, FiSave, FiType
} from 'react-icons/fi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ManageCMS = () => {
  const [banners, setBanners] = useState([]);
  const [newBanner, setNewBanner] = useState({ title: '', subtitle: '', image_url: '' });
  const [aboutContent, setAboutContent] = useState({
    title: '',
    image_url: '',
    content: '',
    secondary_content: '',
    mission_content: ''
  });

  const [loadingBanners, setLoadingBanners] = useState(true);
  const [addingBanner, setAddingBanner] = useState(false);
  const [savingAbout, setSavingAbout] = useState(false);

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchBanners();
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

  const fetchBanners = async () => {
    setLoadingBanners(true);
    try {
      const res = await axios.get(`${API_URL}/api/cms/banners`);
      setBanners(res.data);
    } catch (err) {
      setErrorMsg('Banners load nahi ho sakay.');
    } finally {
      setLoadingBanners(false);
    }
  };

  const handleBannerUpload = async () => {
    if (!newBanner.title.trim() || !newBanner.image_url.trim()) {
      setErrorMsg('Title aur Image URL dono zaroori hain.');
      return;
    }
    setAddingBanner(true);
    try {
      await axios.post(`${API_URL}/api/cms/banners`, newBanner);
      setNewBanner({ title: '', subtitle: '', image_url: '' });
      setSuccessMsg('Banner successfully added!');
      fetchBanners();
    } catch (err) {
      setErrorMsg('Banner add nahi hua!');
    } finally {
      setAddingBanner(false);
    }
  };

  const confirmDelete = (banner) => setDeleteTarget(banner);
  const cancelDelete = () => setDeleteTarget(null);

  const handleDeleteBanner = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await axios.delete(`${API_URL}/api/cms/banners/${deleteTarget.id}`);
      setSuccessMsg('Banner removed successfully.');
      setDeleteTarget(null);
      fetchBanners();
    } catch (err) {
      setErrorMsg('Banner delete nahi hua!');
    } finally {
      setDeleting(false);
    }
  };

  const handlePageUpdate = async (slug) => {
    setSavingAbout(true);
    try {
      await axios.post(`${API_URL}/api/cms/update-page`, { ...aboutContent, slug });
      setSuccessMsg('About Us page updated successfully!');
    } catch (err) {
      setErrorMsg('Update failed!');
    } finally {
      setSavingAbout(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Page-level alerts */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <FiCheckCircle /> {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <FiAlertTriangle /> {errorMsg}
        </div>
      )}

      {/* ---------- Section 1: Homepage Banners ---------- */}
      <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-[#1B4332]/10">
        <div className="mb-8 border-b border-[#1B4332]/10 pb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/50 mb-2">
              CMS / Section 01
            </p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 uppercase">
              Homepage Banners
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Rotating hero banners displayed on the WearZane homepage.
            </p>
          </div>
          <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-[#1B4332]/10 items-center justify-center flex-shrink-0">
            <FiImage className="text-xl text-[#1B4332]" />
          </div>
        </div>

        {/* Add banner form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Banner Title</label>
            <input
              className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors"
              placeholder="e.g. Summer Sale — Up to 40% Off"
              value={newBanner.title}
              onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Subtitle</label>
            <input
              className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors"
              placeholder="e.g. Limited time only"
              value={newBanner.subtitle}
              onChange={(e) => setNewBanner({ ...newBanner, subtitle: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Image URL</label>
            <input
              className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors"
              placeholder="https://..."
              value={newBanner.image_url}
              onChange={(e) => setNewBanner({ ...newBanner, image_url: e.target.value })}
            />
          </div>
        </div>

        <button
          onClick={handleBannerUpload}
          disabled={addingBanner}
          className={`px-6 py-4 rounded-full font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-colors mb-8 ${
            addingBanner
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-[#1B4332] text-white hover:bg-[#143728] shadow-sm hover:shadow-lg'
          }`}
        >
          <FiPlus className="text-sm" />
          {addingBanner ? 'Adding...' : 'Add New Banner'}
        </button>

        {/* Banner list */}
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/50 mb-3">
          Active Banners ({banners.length})
        </p>

        {loadingBanners && (
          <div className="py-10 flex flex-col items-center justify-center text-gray-400">
            <div className="w-7 h-7 border-2 border-[#1B4332]/20 border-t-[#1B4332] rounded-full animate-spin mb-3" />
            <p className="text-xs font-bold uppercase tracking-widest">Loading banners...</p>
          </div>
        )}

        {!loadingBanners && banners.length === 0 && (
          <div className="py-10 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#1B4332]/10 flex items-center justify-center mb-3">
              <FiImage className="text-2xl text-[#1B4332]/50" />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-gray-500">No banners yet</p>
            <p className="text-gray-400 text-sm mt-1">Add your first banner above.</p>
          </div>
        )}

        {!loadingBanners && banners.length > 0 && (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {banners.map((b) => (
              <div
                key={b.id}
                className="w-40 rounded-2xl border border-[#1B4332]/10 bg-[#F5F0E8]/30 overflow-hidden flex-shrink-0"
              >
                <div className="w-full h-24 bg-gray-100 overflow-hidden">
                  <img src={b.image_url} className="w-full h-full object-cover" alt={b.title} />
                </div>
                <div className="p-2.5">
                  <p className="font-bold text-xs text-gray-900 line-clamp-1">{b.title}</p>
                  {b.subtitle && <p className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">{b.subtitle}</p>}
                  <button
                    onClick={() => confirmDelete(b)}
                    className="w-full mt-2.5 py-2 rounded-full bg-red-50 text-red-600 text-[10px] font-black tracking-widest uppercase flex items-center justify-center gap-1.5 hover:bg-red-100 transition-colors"
                  >
                    <FiTrash2 className="text-[10px]" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ---------- Section 2: About Us Page ---------- */}
      <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-[#1B4332]/10">
        <div className="mb-8 border-b border-[#1B4332]/10 pb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/50 mb-2">
              CMS / Section 02
            </p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 uppercase">
              About Us Page
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Edit the story, vision, and mission shown on the About Us page.
            </p>
          </div>
          <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-[#1B4332]/10 items-center justify-center flex-shrink-0">
            <FiInfo className="text-xl text-[#1B4332]" />
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">
                <FiType className="inline text-xs mr-1" /> Page Title
              </label>
              <input
                className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors"
                placeholder="e.g. Our Story"
                value={aboutContent.title}
                onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">
                <FiImage className="inline text-xs mr-1" /> Hero Image URL
              </label>
              <input
                className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors"
                placeholder="https://..."
                value={aboutContent.image_url}
                onChange={(e) => setAboutContent({ ...aboutContent, image_url: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Main Content</label>
            <textarea
              className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors resize-none"
              rows="4"
              placeholder="Tell the WearZane story..."
              value={aboutContent.content}
              onChange={(e) => setAboutContent({ ...aboutContent, content: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Vision Content</label>
              <textarea
                className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors resize-none"
                rows="4"
                placeholder="What WearZane aims to become..."
                value={aboutContent.secondary_content}
                onChange={(e) => setAboutContent({ ...aboutContent, secondary_content: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Mission Content</label>
              <textarea
                className="w-full p-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors resize-none"
                rows="4"
                placeholder="How WearZane delivers on its promise..."
                value={aboutContent.mission_content}
                onChange={(e) => setAboutContent({ ...aboutContent, mission_content: e.target.value })}
              />
            </div>
          </div>

          <button
            onClick={() => handlePageUpdate('about-us')}
            disabled={savingAbout}
            className={`px-6 py-4 rounded-full font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-colors ${
              savingAbout
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#1B4332] text-white hover:bg-[#143728] shadow-sm hover:shadow-lg'
            }`}
          >
            <FiSave className="text-sm" />
            {savingAbout ? 'Saving...' : 'Save About Us'}
          </button>
        </div>
      </section>

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
              Remove Banner?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              "<span className="font-semibold text-gray-700">{deleteTarget.title}</span>" will be removed from the homepage.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 py-4 rounded-full font-black text-xs tracking-widest uppercase bg-[#F5F0E8] text-gray-600 hover:bg-[#1B4332]/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteBanner}
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

export default ManageCMS;