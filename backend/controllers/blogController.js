const pool = require('../config/db');

// 1. Saare blogs fetch karna
const getBlogs = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM blogs ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Blogs fetch nahi ho sakay" });
  }
};

// 2. Naya blog add karna
const addBlog = async (req, res) => {
  const { title, content, image_url, author } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO blogs (title, content, image_url, author) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, content, image_url, author || 'Admin']
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Blog post nahi ho saka" });
  }
};

// 3. Blog delete karna
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM blogs WHERE id = $1", [id]);
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};

module.exports = { getBlogs, addBlog, deleteBlog };