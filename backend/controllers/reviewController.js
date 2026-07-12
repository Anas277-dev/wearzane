const pool = require('../config/db');

// 1. Saare reviews fetch karna (Admin Panel ke liye - Product name ke sath join karke)
const getAllReviews = async (req, res) => {
  try {
    const reviews = await pool.query(`
      SELECT r.*, p.name as product_name 
      FROM reviews r 
      JOIN products p ON r.product_id = p.id 
      ORDER BY r.created_at DESC
    `);
    res.json(reviews.rows);
  } catch (err) {
    console.error("GetAllReviews Error:", err);
    res.status(500).json({ error: "Reviews fetch nahi ho sakay" });
  }
};

// 2. Review status update karna (Admin Panel se Approve/Reject)
const updateReviewStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await pool.query("UPDATE reviews SET status = $1 WHERE id = $2", [status, id]);
    res.json({ message: `Review ${status} successfully` });
  } catch (err) {
    console.error("UpdateReviewStatus Error:", err);
    res.status(500).json({ error: "Update failed" });
  }
};

// 3. Kisi specific product ke approved reviews lana (Frontend Product Details ke liye)
const getProductReviews = async (req, res) => {
  const { productId } = req.params;
  try {
    // Sirf Approved reviews lena taake user ko faltu ya pending feedback na dikhe
    const reviews = await pool.query(
      "SELECT * FROM reviews WHERE product_id = $1 AND status = 'Approved' ORDER BY created_at DESC",
      [productId]
    );

    // Average rating aur total reviews count calculate karna
    const stats = await pool.query(
      "SELECT COUNT(*) as total_reviews, ROUND(AVG(rating), 1) as avg_rating FROM reviews WHERE product_id = $1 AND status = 'Approved'",
      [productId]
    );

    res.json({
      reviews: reviews.rows,
      stats: stats.rows[0]
    });
  } catch (err) {
    console.error("GetProductReviews Error:", err);
    res.status(500).json({ error: "Product reviews fetch nahi ho sakay" });
  }
};

// 4. Customer ki taraf se naya review submit karna
const createProductReview = async (req, res) => {
  const { productId } = req.params;
  const { customer_name, rating, comment } = req.body;

  // Validation
  if (!customer_name || !rating || !comment) {
    return res.status(400).json({ error: "Saari fields lazmi hain" });
  }

  try {
    const newReview = await pool.query(
      `INSERT INTO reviews (product_id, customer_name, rating, comment, status) 
       VALUES ($1, $2, $3, $4, 'Pending') RETURNING *`,
      [productId, customer_name, rating, comment]
    );
    res.status(201).json({ 
      message: "Review submit ho gaya hai, admin approval ke baad show hoga!", 
      review: newReview.rows[0] 
    });
  } catch (err) {
    console.error("CreateProductReview Error:", err);
    res.status(500).json({ error: "Review submit nahi ho saka" });
  }
};

// Saare functions export kar diye hain
module.exports = { 
  getAllReviews, 
  updateReviewStatus, 
  getProductReviews,
  createProductReview
};