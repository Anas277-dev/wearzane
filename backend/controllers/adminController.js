// const pool = require('../config/db');

// const getDashboardStats = async (req, res) => {
//   try {
//     // 1. Total Products Count
//     const totalProducts = await pool.query("SELECT COUNT(*) FROM products");
    
//     // 2. Low Stock Alerts (Jahan stock 5 se kam hai)
//     const lowStock = await pool.query("SELECT COUNT(*) FROM products WHERE stock < 5");
    
//     // 3. Total Categories
//     const totalCategories = await pool.query("SELECT COUNT(*) FROM categories");

//     // Abhi Orders table nahi bani, isliye hum dummy data bhej rahe hain 
//     // Taake UI khali na lage, baad mein ise real karenge
//     res.json({
//       totalProducts: totalProducts.rows[0].count,
//       lowStock: lowStock.rows[0].count,
//       totalCategories: totalCategories.rows[0].count,
//       totalOrders: 0, // Baad mein orders table se aayega
//       totalRevenue: 0  // Baad mein orders table se aayega
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Stats fetch karne mein masla hai" });
//   }
// };

// module.exports = { getDashboardStats };






const pool = require('../config/db');
const bcrypt = require('bcrypt'); // 🎯 Password hash karne ke liye

// 📊 1. Get Dashboard Stats
const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await pool.query("SELECT COUNT(*) FROM products");
    const lowStock = await pool.query("SELECT COUNT(*) FROM products WHERE stock < 5");
    const totalCategories = await pool.query("SELECT COUNT(*) FROM categories");

    res.json({
      totalProducts: totalProducts.rows[0].count,
      lowStock: lowStock.rows[0].count,
      totalCategories: totalCategories.rows[0].count,
      totalOrders: 0,
      totalRevenue: 0 
    });
  } catch (err) {
    res.status(500).json({ error: "Stats fetch karne mein masla hai" });
  }
};

// 🔐 2. Insert Admin (🎯 Fixed: Added Username & Password Hashing)
const insertAdmin = async (req, res) => {
  try {
    // 🎯 TARGET CHANGE: req.body se username bhi le rahe hain taake constraint error khatam ho
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, error: "Username, email, and password are required" });
    }

    // 🎯 TARGET CHANGE: Password ko secure tareeqe se hash kar rahe hain
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // 🎯 TARGET CHANGE: Query me username aur password_hash dono pass kar rahe hain
    const query = `
      INSERT INTO admins (username, email, password_hash, created_at) 
      VALUES ($1, $2, $3, NOW()) 
      RETURNING id, username, email, created_at
    `;
    
    const result = await pool.query(query, [username, email, password_hash]);

    return res.status(201).json({
      success: true,
      message: "Admin inserted successfully with hashed password!",
      admin: result.rows[0]
    });
  } catch (err) {
    console.error("Insert Admin Error:", err.message);
    return res.status(500).json({ success: false, error: "Admin insert karne mein masla hai", details: err.message });
  }
};

module.exports = { getDashboardStats, insertAdmin };