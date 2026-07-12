// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AdminLayout from './admin/AdminLayout';
// // Ye line add karein (apne sahi path ke mutabiq):
// import AddProduct from './admin/pages/AddProduct';
// import Home from './pages/Home';
// import ProductList from './admin/pages/ProductList';
// import ManageCategories from './admin/pages/ManageCategories';
// import OrderManagement from './admin/pages/OrderManagement';
// import CustomerList from './admin/pages/CustomerList';
// import ManageReviews from './admin/pages/ManageReviews';
// import ManageCMS from './admin/pages/ManageCMS';
// import ManageBlogs from './admin/pages/ManageBlogs';
// import Login from './admin/pages/Login';
// import ManageStaff from './admin/pages/ManageStaff';
// import ActivityLogs from './admin/pages/ActivityLogs';

// // Navbar aur Footer Import karein
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

// import CategoryPage from './pages/CategoryPage';

// import SectionPage from './pages/SectionPage';

// const UserLayout = ({ children }) => (
//   <>
//     <Navbar />
//     <div className="min-h-[80vh]">{children}</div>
//     <Footer />
//   </>
// );

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* User Side Routes */}
//         <Route path="/" element={<UserLayout><Home /></UserLayout>} />
//         {/* <Route path="/shop" element={<UserLayout><Shop /></UserLayout>} /> */}
//         {/* <Route path="/about" element={<UserLayout><About /></UserLayout>} /> */}
//         <Route path="/category/:categoryName" element={<UserLayout><CategoryPage /></UserLayout>} />
        
//         <Route path="/section/:sectionName" element={<UserLayout><SectionPage /></UserLayout>} />

//         {/* Admin Side Routes */}
//         <Route 
//           path="/admin" 
//           element={
//             <AdminLayout>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
//                   <p className="text-gray-500">Total Sales</p>
//                   <h3 className="text-2xl font-bold">Rs. 1,25,000</h3>
//                 </div>
//                 <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
//                   <p className="text-gray-500">Orders</p>
//                   <h3 className="text-2xl font-bold">45</h3>
//                 </div>
//                 <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
//                   <p className="text-gray-500">Pending</p>
//                   <h3 className="text-2xl font-bold">12</h3>
//                 </div>
//               </div>
//             </AdminLayout>
//           } 
//         />

//         <Route 
//           path="/admin/add-product" 
//           element={
//             <AdminLayout>
//               <AddProduct />
//             </AdminLayout>
//           } 
//         />

//         <Route 
//           path="/admin/products" 
//           element={
//             <AdminLayout>
//               <ProductList />
//             </AdminLayout>
//           } 
//         />

//         <Route path="/admin/categories" element={<AdminLayout><ManageCategories /></AdminLayout>} />

//         <Route path="/admin/orders" element={<AdminLayout><OrderManagement /></AdminLayout>} />
//         <Route path="/admin/customers" element={<AdminLayout><CustomerList /></AdminLayout>} />
//         <Route path="/admin/reviews" element={<AdminLayout><ManageReviews /></AdminLayout>} />
//         <Route path="/admin/cms" element={<AdminLayout><ManageCMS /></AdminLayout>} />
//         <Route path="/admin/blogs" element={<AdminLayout><ManageBlogs /></AdminLayout>} />
//         <Route path="/admin/login" element={<Login />} />
//         <Route path="/admin/staff" element={<AdminLayout><ManageStaff /></AdminLayout>} />
//         <Route path="/admin/logs" element={<AdminLayout><ActivityLogs /></AdminLayout>} />

//       </Routes>
//     </Router>
//   );
// }

// export default App;







import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './admin/AdminLayout';
import AddProduct from './admin/pages/AddProduct';
import Home from './pages/Home';
import ProductList from './admin/pages/ProductList';
import ManageCategories from './admin/pages/ManageCategories';
import OrderManagement from './admin/pages/OrderManagement';
import CustomerList from './admin/pages/CustomerList';
import ManageReviews from './admin/pages/ManageReviews';
import ManageCMS from './admin/pages/ManageCMS';
import ManageBlogs from './admin/pages/ManageBlogs';
import Login from './admin/pages/Login';
import ManageStaff from './admin/pages/ManageStaff';
import ActivityLogs from './admin/pages/ActivityLogs';

// Navbar aur Footer Import karein
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import CategoryPage from './pages/CategoryPage';
import SectionPage from './pages/SectionPage';
import ProductDetails from './pages/ProductDetails'; 

import AboutUs from './pages/AboutUs';

// 🎯 Naye Customer Auth Pages Imports
import UserLogin from './pages/Login';       // Customer Login Page
import UserRegister from './pages/Register'; // Customer Register Page

// 🎯 Checkout Page Import Kiya (Path check karlein agar aapne kisi aur folder me rakha ho)
import Checkout from './pages/Checkout'; 

import MyOrders from './pages/MyOrders';

// 🎯 Cart Context Provider Import
import { CartProvider } from './context/CartContext';

const UserLayout = ({ children }) => (
  <>
    <Navbar />
    <div className="min-h-[80vh]">{children}</div>
    <Footer />
  </>
);

function App() {
  return (
    // 🎯 Poori App ko CartProvider se wrap kiya taake global state chale
    <CartProvider>
      <Router>
        <Routes>
          {/* ========================================== */}
          {/* 🎯 USER SIDE ROUTES                        */}
          {/* ========================================== */}
          <Route path="/" element={<UserLayout><Home /></UserLayout>} />
          {/* <Route path="/shop" element={<UserLayout><Shop /></UserLayout>} /> */}
          {/* <Route path="/about" element={<UserLayout><About /></UserLayout>} /> */}
          <Route path="/category/:categoryName" element={<UserLayout><CategoryPage /></UserLayout>} />
          <Route path="/section/:sectionName" element={<UserLayout><SectionPage /></UserLayout>} />
          
          {/* Single Product Detail Page Route */}
          <Route path="/product/:id" element={<UserLayout><ProductDetails /></UserLayout>} />

          <Route path="/about" element={<UserLayout><AboutUs /></UserLayout>} />

        
          {/* 🎯 Customer Authentication Routes */}
          <Route path="/login" element={<UserLayout><UserLogin /></UserLayout>} />
          <Route path="/register" element={<UserLayout><UserRegister /></UserLayout>} />

          {/* 🎯 FIXED: Checkout Route yahan register kar di hai with UserLayout */}
          <Route path="/checkout" element={<UserLayout><Checkout /></UserLayout>} />

          <Route path="/my-orders" element={<UserLayout><MyOrders /></UserLayout>} />


          {/* ========================================== */}
          {/* 🎯 ADMIN SIDE ROUTES                       */}
          {/* ========================================== */}
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
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <AddProduct />
                </div>
              </AdminLayout>
            } 
          />

          <Route 
            path="/admin/products" 
            element={
              <AdminLayout>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <ProductList />
                </div>
              </AdminLayout>
            } 
          />

          <Route path="/admin/categories" element={<AdminLayout><ManageCategories /></AdminLayout>} />
          <Route path="/admin/orders" element={<AdminLayout><OrderManagement /></AdminLayout>} />
          <Route path="/admin/customers" element={<AdminLayout><CustomerList /></AdminLayout>} />
          <Route path="/admin/reviews" element={<AdminLayout><ManageReviews /></AdminLayout>} />
          <Route path="/admin/cms" element={<AdminLayout><ManageCMS /></AdminLayout>} />
          <Route path="/admin/blogs" element={<AdminLayout><ManageBlogs /></AdminLayout>} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/staff" element={<AdminLayout><ManageStaff /></AdminLayout>} />
          <Route path="/admin/logs" element={<AdminLayout><ActivityLogs /></AdminLayout>} />

        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;