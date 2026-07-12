const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ==========================================
// 🎯 CUSTOMER / USER AUTHENTICATION LOGIC
// ==========================================

// 1. REGISTER USER
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Saari fields fill karna lazmi hain" });
  }

  try {
    // Check agar email pehle se register hai
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "Yeh Email pehle se registered hai" });
    }

    // Password Hash karna (Security ke liye)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Database mein user insert karna (Default: is_admin = false)
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password, is_admin) VALUES ($1, $2, $3, false) RETURNING id, name, email, is_admin",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "Registration successful!", user: newUser.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during registration" });
  }
};

// 2. LOGIN USER
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email aur Password lazmi hain" });
  }

  try {
    // User check karein
    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: "Ghalat Email ya Password" });
    }

    const user = userResult.rows[0];

    // Password check karein (Note: database column user.password hai)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Ghalat Email ya Password" });
    }

    // JWT Token generate karna
    const token = jwt.sign(
      { id: user.id, is_admin: user.is_admin },
      process.env.JWT_SECRET || 'wearzane_secret_key', 
      { expiresIn: '7d' }
    );

    res.json({
      message: "Login Successful!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_admin: user.is_admin
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during login" });
  }
};


// ==========================================
// 🎯 ADMIN / SUB-ADMIN AUTHENTICATION LOGIC
// ==========================================

// 3. LOGIN ADMIN
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query("SELECT * FROM admins WHERE email = $1", [email]);
        if (result.rows.length === 0) return res.status(404).json({ error: "Admin not found" });

        const admin = result.rows[0];
        
        // Debugging ke liye console logs
        console.log("Input Password:", password);
        console.log("Stored Hash:", admin.password_hash);

        // Note: database column admin.password_hash hai
        const isMatch = await bcrypt.compare(password, admin.password_hash);
        console.log("Password match result:", isMatch);

        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // Admin Token generation
        const token = jwt.sign(
            { id: admin.id, role: admin.role, is_admin: true }, 
            process.env.JWT_SECRET || 'wearzane_secret_key', 
            { expiresIn: '1d' }
        );
        
        res.json({ 
            token, 
            admin: { id: admin.id, username: admin.username, role: admin.role } 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// 4. ADD SUB-ADMIN
const addSubAdmin = async (req, res) => {
    const { username, email, password, role } = req.body;
    
    if (!username || !email || !password || !role) {
        return res.status(400).json({ error: "Saari fields fill karna lazmi hain" });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await pool.query(
            "INSERT INTO admins (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, username, role",
            [username, email, hashedPassword, role]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "Email already exists" });
    }
};

// Tamam functions ko aik sath export kar diya
module.exports = { registerUser, loginUser, loginAdmin, addSubAdmin };