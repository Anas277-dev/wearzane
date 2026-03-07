const express = require('express');
const router = express.Router();
const { getProducts, createProduct, deleteProduct, updateProduct } = require('../controllers/productController');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

// Public route: Koi bhi dekh sakta hai
router.get('/', getProducts);

// Admin route: Baad mein hum yahan 'adminMiddleware' lagayenge protection ke liye
// router.post('/add', createProduct);

// Route ko update karein: array('images', 4) matlab max 4 files
router.post('/add', upload.array('images', 4), createProduct);

router.delete('/:id', deleteProduct);

router.put('/:id', upload.array('images', 4), updateProduct);


module.exports = router;