const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access Denied! Pehle login karein." });
  }

  try {
    // 🎯 Fallback key ('wearzane_secret_key') add ki hai jo controllers se match karegi
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'wearzane_secret_key');
    req.user = verified; 
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message); // Server console par error dekhne ke liye
    res.status(403).json({ error: "Invalid Token" });
  }
};

module.exports = verifyToken;