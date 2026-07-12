const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { 
  registerUser, 
  loginUser, 
  loginAdmin, 
  addSubAdmin 
} = require('../controllers/authController');

// ==========================================
// 🎯 CUSTOMER / USER ROUTES
// ==========================================

// Customer Registration
router.post('/register', registerUser);

// Customer Login
router.post('/login', loginUser);


// ==========================================
// 🎯 ADMIN / STAFF MANAGEMENT ROUTES
// ==========================================

// Admin Login
router.post('/admin/login', loginAdmin);

// Add Sub-Admin / Staff Member
router.post('/admin/add-subadmin', addSubAdmin);

// Get All Staff / Admins List
router.get('/admin/staff', async (req, res) => {
    try {
        const result = await pool.query("SELECT id, username, email, role FROM admins");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Staff fetch failed" });
    }
});

// Get Admin Activity Logs
router.get('/admin/logs', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT l.*, a.username as admin_name 
            FROM activity_logs l 
            JOIN admins a ON l.admin_id = a.id 
            ORDER BY l.timestamp DESC LIMIT 50
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Logs fetch failed" });
    }
});


// ==========================================
// ⚠️ INITIAL SETUP ROUTE (Temporary)
// ==========================================
// Isay aap pehla main admin (Super Admin) banane ke liye use kar sakte hain.
// Database mein pehla admin bante hi security ke liye is route ko delete ya comment out kar dein.
router.post('/admin/register-first-admin', addSubAdmin); 

module.exports = router;