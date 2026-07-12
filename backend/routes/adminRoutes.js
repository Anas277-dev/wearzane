// const express = require('express');
// const router = express.Router();
// const { getDashboardStats } = require('../controllers/adminController');

// router.get('/stats', getDashboardStats);

// module.exports = router;







const express = require('express');
const router = express.Router();
const { getDashboardStats, insertAdmin } = require('../controllers/adminController');

// GET stats
router.get('/stats', getDashboardStats);

// POST insert admin (🎯 For Thunder Client testing)
router.post('/insert-admin', insertAdmin);

module.exports = router;