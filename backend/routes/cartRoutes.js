const express = require('express');
const router = express.Router();

// 🎯 FIXED: updateQuantity ke sath deleteCartItem controller ko bhi yahan import kar liya hai
const { addToCart, getCart, updateQuantity, deleteCartItem } = require('../controllers/cartController');
const verifyToken = require('../middleware/authMiddleware'); 

// 🎯 POST: New product add karne ke liye
router.post('/', verifyToken, addToCart);

// 🎯 GET: Logged-in user ka cart lane ke liye
router.get('/', verifyToken, getCart);

// 🎯 PUT: Quantity plus/minus hone par database me update karne ke liye
router.put('/', verifyToken, updateQuantity);

// 🎯 DELETE: Dynamic product ID ke sath item ko database se permanent hatane ke liye
router.delete('/:productId', verifyToken, deleteCartItem);

module.exports = router;