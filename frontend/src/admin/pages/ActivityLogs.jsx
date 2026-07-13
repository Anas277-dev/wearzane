// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { FiActivity, FiClock, FiAlertTriangle } from 'react-icons/fi';

// const ActivityLogs = () => {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('adminToken');
//     if (!token) {
//       navigate('/admin/login');
//       return;
//     }

//     const fetchLogs = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get('http://localhost:5000/api/auth/logs', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setLogs(res.data);
//       } catch (err) {
//         setErrorMsg('Activity logs load nahi ho sakay.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogs();
//   }, [navigate]);

//   return (
//     <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-[#1B4332]/10 overflow-hidden">
//       {/* Header */}
//       <div className="p-6 sm:p-10 pb-6 border-b border-[#1B4332]/10 flex items-start justify-between gap-4">
//         <div>
//           <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/50 mb-2">
//             Security / Audit Trail
//           </p>
//           <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 uppercase">
//             Recent Activity
//           </h2>
//           <p className="text-gray-400 text-sm mt-1">
//             A running record of every action taken across the dashboard.
//           </p>
//         </div>
//         <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-[#1B4332]/10 items-center justify-center flex-shrink-0">
//           <FiActivity className="text-xl text-[#1B4332]" />
//         </div>
//       </div>

//       {/* Error banner */}
//       {errorMsg && (
//         <div className="mx-6 sm:mx-10 mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
//           <FiAlertTriangle /> {errorMsg}
//         </div>
//       )}

//       {/* Loading state */}
//       {loading && (
//         <div className="py-24 flex flex-col items-center justify-center text-gray-400">
//           <div className="w-8 h-8 border-2 border-[#1B4332]/20 border-t-[#1B4332] rounded-full animate-spin mb-3" />
//           <p className="text-xs font-bold uppercase tracking-widest">Loading logs...</p>
//         </div>
//       )}

//       {/* Empty state */}
//       {!loading && logs.length === 0 && (
//         <div className="py-24 flex flex-col items-center justify-center text-center">
//           <div className="w-14 h-14 rounded-2xl bg-[#1B4332]/10 flex items-center justify-center mb-4">
//             <FiActivity className="text-2xl text-[#1B4332]/50" />
//           </div>
//           <p className="text-sm font-bold uppercase tracking-widest text-gray-500">No activity yet</p>
//           <p className="text-gray-400 text-sm mt-1">Actions taken by staff will appear here.</p>
//         </div>
//       )}

//       {/* Log list — timeline style */}
//       {!loading && logs.length > 0 && (
//         <div className="p-6 sm:p-10 pt-6">
//           <div className="relative pl-6">
//             <div className="absolute left-[7px] top-1 bottom-1 w-px bg-[#1B4332]/10"></div>
//             <div className="space-y-5">
//               {logs.map((log) => (
//                 <div key={log.id} className="relative flex items-start justify-between gap-4">
//                   <span className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full bg-[#1B4332] border-2 border-white ring-2 ring-[#1B4332]/10"></span>
//                   <p className="text-sm text-gray-700 leading-relaxed">
//                     <span className="font-black text-gray-900">{log.admin_name}</span>{' '}
//                     <span className="text-gray-500">{log.action}</span>
//                   </p>
//                   <span className="flex items-center gap-1.5 text-[11px] text-gray-400 font-semibold whitespace-nowrap flex-shrink-0">
//                     <FiClock className="text-[11px]" />
//                     {new Date(log.timestamp).toLocaleString()}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ActivityLogs;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiActivity, FiClock, FiAlertTriangle } from 'react-icons/fi';

// 🎯 Vercel/production me VITE_API_URL set hai to wahi use hoga,
// warna local PC par apne aap localhost:5000 par fallback ho jayega
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchLogs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/api/auth/logs`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLogs(res.data);
      } catch (err) {
        setErrorMsg('Activity logs load nahi ho sakay.');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [navigate]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-[#1B4332]/10 overflow-hidden">
      {/* Header */}
      <div className="p-6 sm:p-10 pb-6 border-b border-[#1B4332]/10 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#1B4332]/50 mb-2">
            Security / Audit Trail
          </p>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 uppercase">
            Recent Activity
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            A running record of every action taken across the dashboard.
          </p>
        </div>
        <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-[#1B4332]/10 items-center justify-center flex-shrink-0">
          <FiActivity className="text-xl text-[#1B4332]" />
        </div>
      </div>

      {/* Error banner */}
      {errorMsg && (
        <div className="mx-6 sm:mx-10 mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <FiAlertTriangle /> {errorMsg}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="py-24 flex flex-col items-center justify-center text-gray-400">
          <div className="w-8 h-8 border-2 border-[#1B4332]/20 border-t-[#1B4332] rounded-full animate-spin mb-3" />
          <p className="text-xs font-bold uppercase tracking-widest">Loading logs...</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && logs.length === 0 && (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#1B4332]/10 flex items-center justify-center mb-4">
            <FiActivity className="text-2xl text-[#1B4332]/50" />
          </div>
          <p className="text-sm font-bold uppercase tracking-widest text-gray-500">No activity yet</p>
          <p className="text-gray-400 text-sm mt-1">Actions taken by staff will appear here.</p>
        </div>
      )}

      {/* Log list — timeline style */}
      {!loading && logs.length > 0 && (
        <div className="p-6 sm:p-10 pt-6">
          <div className="relative pl-6">
            <div className="absolute left-[7px] top-1 bottom-1 w-px bg-[#1B4332]/10"></div>
            <div className="space-y-5">
              {logs.map((log) => (
                <div key={log.id} className="relative flex items-start justify-between gap-4">
                  <span className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full bg-[#1B4332] border-2 border-white ring-2 ring-[#1B4332]/10"></span>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-black text-gray-900">{log.admin_name}</span>{' '}
                    <span className="text-gray-500">{log.action}</span>
                  </p>
                  <span className="flex items-center gap-1.5 text-[11px] text-gray-400 font-semibold whitespace-nowrap flex-shrink-0">
                    <FiClock className="text-[11px]" />
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLogs;