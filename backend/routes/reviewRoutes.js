const express = require('express');
const router = express.Router();
const { 
  getAllReviews, 
  updateReviewStatus, 
  getProductReviews,
  createProductReview
} = require('../controllers/reviewController');

const verifyToken = require('../middleware/authMiddleware'); // Middleware import kiya

// 1. Saare reviews get karne ke liye (Admin Dashboard ke liye)
router.get('/', getAllReviews);

// 2. Review ka status (Approve/Reject) update karne ke liye (Admin Panel action)
router.put('/:id', updateReviewStatus);

// 3. Public route: Frontend par product details ke niche specific product ke approved reviews dikhane ke liye
router.get('/product/:productId', getProductReviews);

router.post('/product/:productId', verifyToken, createProductReview);

module.exports = router;