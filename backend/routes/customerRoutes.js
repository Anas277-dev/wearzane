const express = require('express');
const router = express.Router();
const { getAllCustomers, getCustomerHistory } = require('../controllers/customerController');

// Yeh wahi endpoint hai jo frontend 404 keh raha hai
router.get('/', getAllCustomers); 
// Ensure 'history' endpoint is correct
router.get('/history/:phone', getCustomerHistory);

module.exports = router;