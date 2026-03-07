// const express = require('express');
// const router = express.Router();
// const pool = require('../config/db'); // Database connection

// // Saari categories fetch karne ke liye
// router.get('/', async (req, res) => {
//   try {
//     const result = await pool.query("SELECT * FROM categories ORDER BY name ASC");
//     res.json(result.rows);
//   } catch (err) {
//     console.error("Category Fetch Error:", err.message);
//     res.status(500).json({ error: "Server error while fetching categories" });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const { getCategories, addCategory } = require('../controllers/categoryController');

router.get('/', getCategories);
router.post('/add', addCategory);

module.exports = router;