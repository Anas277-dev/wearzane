// const express = require('express');
// const router = express.Router();
// const { getBanners, addBanner, updatePageContent } = require('../controllers/cmsController');

// // Banners Routes
// router.get('/banners', getBanners);
// router.post('/banners', addBanner);

// // Static Pages Routes (About/Contact)
// router.post('/update-page', updatePageContent);

// module.exports = router;







const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { getBanners, addBanner, deleteBanner, updatePageContent, getPageContent } = require('../controllers/cmsController');

router.get('/banners', getBanners);
router.post('/banners', addBanner);
router.delete('/banners/:id', deleteBanner);
router.post('/update-page', updatePageContent);

// 🎯 FIXED: Kyunki authMiddleware se direct function export ho raha hai, toh bina curly braces {} ke 'verifyToken' ke naam se import karenge
const verifyToken = require('../middleware/authMiddleware'); 

// 1. Post request checkout process ke liye (Secure with verifyToken middleware)
router.post('/', verifyToken, createOrder);

// 2. Saare orders fetch karna (Admin layout ke liye)
router.get('/', verifyToken, getAllOrders);

// 3. Order ka status update karna
router.put('/:id/status', verifyToken, updateOrderStatus);

router.get('/page/:slug', getPageContent);

module.exports = router;