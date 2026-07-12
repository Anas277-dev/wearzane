const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  createProduct, 
  deleteProduct, 
  updateProduct, 
  getProductsByCategory, 
  getProductsBySection,
  getProductById // <--- Controller se import kiya
} = require('../controllers/productController');

const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

// 1. Public route: Saare products dekhne ke liye
router.get('/', getProducts);

// 2. Admin routes: Add, Edit, Delete karne ke liye
router.post('/add', upload.array('images', 4), createProduct);
router.put('/:id', upload.array('images', 4), updateProduct);
router.delete('/:id', deleteProduct);

// 3. Filter routes: Specific category ya section ke mutabiq
router.get('/category/:categoryName', getProductsByCategory);
router.get('/section/:sectionName', getProductsBySection);

// 4. Single Product route: ID ke zariye specific product lane ke liye
// (Isay hamesha niche rakhein taake upar wale routes dynamic id se clash na karein)
router.get('/:id', getProductById);

module.exports = router;