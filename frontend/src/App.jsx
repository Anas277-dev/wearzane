import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './admin/AdminLayout';
// Ye line add karein (apne sahi path ke mutabiq):
import AddProduct from './admin/pages/AddProduct';
import Home from './pages/Home';
import ProductList from './admin/pages/ProductList';
import ManageCategories from './admin/pages/ManageCategories';

function App() {
  return (
    <Router>
      <Routes>
        {/* User Side Routes */}
        <Route path="/" element={<Home />} />
        
        {/* Admin Side Routes */}
        <Route 
          path="/admin" 
          element={
            <AdminLayout>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                  <p className="text-gray-500">Total Sales</p>
                  <h3 className="text-2xl font-bold">Rs. 1,25,000</h3>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                  <p className="text-gray-500">Orders</p>
                  <h3 className="text-2xl font-bold">45</h3>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
                  <p className="text-gray-500">Pending</p>
                  <h3 className="text-2xl font-bold">12</h3>
                </div>
              </div>
            </AdminLayout>
          } 
        />

        <Route 
          path="/admin/add-product" 
          element={
            <AdminLayout>
              <AddProduct />
            </AdminLayout>
          } 
        />

        <Route 
          path="/admin/products" 
          element={
            <AdminLayout>
              <ProductList />
            </AdminLayout>
          } 
        />

        <Route path="/admin/categories" element={<AdminLayout><ManageCategories /></AdminLayout>} />


      </Routes>
    </Router>
  );
}

export default App;