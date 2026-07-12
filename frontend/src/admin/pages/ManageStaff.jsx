// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ManageStaff = () => {
//     const [staff, setStaff] = useState([]);
//     const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'Editor' });

//     const fetchStaff = async () => {
//         const res = await axios.get('http://localhost:5000/api/auth/staff'); // Route banana hoga
//         setStaff(res.data);
//     };

//     const handleAddStaff = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:5000/api/auth/add-subadmin', formData);
//             alert("Sub-Admin Added!");
//             setFormData({ username: '', email: '', password: '', role: 'Editor' });
//             fetchStaff();
//         } catch (err) { alert("Error adding staff"); }
//     };

//     return (
//         <div className="p-6 space-y-8">
//             <div className="bg-white p-6 rounded-xl shadow-sm">
//                 <h2 className="text-xl font-bold mb-4">Add Sub-Admin</h2>
//                 <form onSubmit={handleAddStaff} className="grid grid-cols-2 gap-4">
//                     <input className="border p-2 rounded" placeholder="Username" onChange={e => setFormData({...formData, username: e.target.value})} />
//                     <input className="border p-2 rounded" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} />
//                     <input className="border p-2 rounded" type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} />
//                     <select className="border p-2 rounded" onChange={e => setFormData({...formData, role: e.target.value})}>
//                         <option value="Editor">Editor</option>
//                         <option value="Viewer">Viewer</option>
//                         <option value="SuperAdmin">SuperAdmin</option>
//                     </select>
//                     <button className="bg-black text-white p-2 rounded col-span-2">Create Admin</button>
//                 </form>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow-sm">
//                 <h2 className="text-xl font-bold mb-4">Active Staff</h2>
//                 <table className="w-full text-left">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="p-3">Username</th>
//                             <th className="p-3">Role</th>
//                             <th className="p-3">Email</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {staff.map(s => (
//                             <tr key={s.id} className="border-b">
//                                 <td className="p-3">{s.username}</td>
//                                 <td className="p-3"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{s.role}</span></td>
//                                 <td className="p-3">{s.email}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default ManageStaff;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FiUserPlus, FiUsers, FiUser, FiMail, FiLock, FiShield,
  FiCheckCircle, FiAlertTriangle
} from 'react-icons/fi';

const ROLE_STYLES = {
  SuperAdmin: 'bg-[#1B4332]/10 text-[#1B4332] border-[#1B4332]/20',
  Editor: 'bg-blue-50 text-blue-600 border-blue-200',
  Viewer: 'bg-gray-100 text-gray-600 border-gray-200'
};

const ManageStaff = () => {
  const [staff, setStaff] = useState([]);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'Editor' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/auth/staff');
      setStaff(res.data);
    } catch (err) {
      setErrorMsg('Staff list load nahi ho saki.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
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

  const handleAddStaff = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post('http://localhost:5000/api/auth/add-subadmin', formData);
      setSuccessMsg('Sub-admin successfully added!');
      setFormData({ username: '', email: '', password: '', role: 'Editor' });
      fetchStaff();
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Error adding staff');
    } finally {
      setSubmitting(false);
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

      {/* ---------- Add Sub-Admin ---------- */}
      <section className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-[#1B4332]/10">
        <div className="mb-8 border-b border-[#1B4332]/10 pb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/50 mb-2">
              Team / New Access
            </p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 uppercase">
              Add Sub-Admin
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Give teammates limited access to the WearZane dashboard.
            </p>
          </div>
          <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-[#1B4332]/10 items-center justify-center flex-shrink-0">
            <FiUserPlus className="text-xl text-[#1B4332]" />
          </div>
        </div>

        <form onSubmit={handleAddStaff} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Username</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B4332]/40" />
                <input
                  className="w-full pl-11 pr-4 py-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors"
                  placeholder="e.g. sara_admin"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B4332]/40" />
                <input
                  type="email"
                  className="w-full pl-11 pr-4 py-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors"
                  placeholder="sara@wearzane.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B4332]/40" />
                <input
                  type="password"
                  className="w-full pl-11 pr-4 py-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-gray-600 mb-2">Role</label>
              <div className="relative">
                <FiShield className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1B4332]/40" />
                <select
                  className="w-full pl-11 pr-4 py-4 bg-[#F5F0E8]/50 border border-transparent rounded-xl focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] outline-none transition-colors cursor-pointer font-semibold"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="Editor">EDITOR</option>
                  <option value="Viewer">VIEWER</option>
                  <option value="SuperAdmin">SUPER ADMIN</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-4 rounded-full font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-colors ${
              submitting
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#1B4332] text-white hover:bg-[#143728] shadow-sm hover:shadow-lg'
            }`}
          >
            <FiUserPlus className="text-sm" />
            {submitting ? 'Creating...' : 'Create Admin'}
          </button>
        </form>
      </section>

      {/* ---------- Active Staff ---------- */}
      <section className="bg-white rounded-3xl shadow-sm border border-[#1B4332]/10 overflow-hidden">
        <div className="p-6 sm:p-10 pb-6 border-b border-[#1B4332]/10 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/50 mb-2">
              Team / Directory
            </p>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 uppercase">
              Active Staff
            </h2>
          </div>
          <div className="hidden sm:flex flex-col items-end gap-2">
            <div className="w-12 h-12 rounded-2xl bg-[#1B4332]/10 flex items-center justify-center">
              <FiUsers className="text-xl text-[#1B4332]" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              {staff.length} Total
            </span>
          </div>
        </div>

        {loading && (
          <div className="py-16 flex flex-col items-center justify-center text-gray-400">
            <div className="w-7 h-7 border-2 border-[#1B4332]/20 border-t-[#1B4332] rounded-full animate-spin mb-3" />
            <p className="text-xs font-bold uppercase tracking-widest">Loading staff...</p>
          </div>
        )}

        {!loading && staff.length === 0 && (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#1B4332]/10 flex items-center justify-center mb-3">
              <FiUsers className="text-2xl text-[#1B4332]/50" />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-gray-500">No staff added yet</p>
            <p className="text-gray-400 text-sm mt-1">Create your first sub-admin above.</p>
          </div>
        )}

        {!loading && staff.length > 0 && (
          <div className="overflow-x-auto pb-2">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-[#1B4332]/10">
                  <th className="px-6 sm:px-10 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1B4332]/50">Username</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1B4332]/50">Role</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#1B4332]/50 pr-6 sm:pr-10">Email</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((s) => (
                  <tr key={s.id} className="border-b border-[#1B4332]/5 hover:bg-[#F5F0E8]/30 transition-colors">
                    <td className="px-6 sm:px-10 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#1B4332]/10 flex items-center justify-center flex-shrink-0 text-xs font-black text-[#1B4332] uppercase">
                          {s.username?.charAt(0) || '?'}
                        </div>
                        <span className="font-bold text-sm text-gray-900">{s.username}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${ROLE_STYLES[s.role] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                        {s.role}
                      </span>
                    </td>
                    <td className="px-4 py-4 pr-6 sm:pr-10 text-sm text-gray-500">{s.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default ManageStaff;