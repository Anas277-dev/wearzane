import Sidebar from './components/Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar - Desktop par fixed */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="ml-64 w-full bg-gray-100 min-h-screen p-8">
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm">
          <h1 className="text-xl font-semibold text-gray-700">Control Center</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 italic">Welcome, Admin</span>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">A</div>
          </div>
        </header>
        
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;