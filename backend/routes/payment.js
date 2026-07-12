const express = require('express');
const router = express.Router();
const { processPayment } = require('../controllers/paymentController');
const verifyToken = require('../middleware/authMiddleware'); // login zaroori hoga payment ke liye

router.post('/', verifyToken, processPayment);

module.exports = router;