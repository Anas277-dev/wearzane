const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getUserOrders, updateOrderStatus } = require('../controllers/orderController');

// 🎯 FIXED: authMiddleware se single function export ho raha hai, isliye direct bina {} ke import karenge
const verifyToken = require('../middleware/authMiddleware'); 

// 1. Post request checkout process ke liye (Secure with verifyToken)
router.post('/', verifyToken, createOrder);

// 🎯 2. NEW: Logged-in user ke specific orders lane ke liye (Tracking Route)
router.get('/my-orders', verifyToken, getUserOrders);

// 2. Saare orders fetch karna (Admin layout)
router.get('/', verifyToken, getAllOrders);

// 3. Order ka status update karna (URL must match exactly with your endpoint)
router.put('/:id/status', verifyToken, updateOrderStatus);

module.exports = router;