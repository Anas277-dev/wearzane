const pool = require('../config/db');

// Saari categories lane ke liye
const getCategories = async (req, res) => {
  try {
    const categories = await pool.query("SELECT * FROM categories");
    res.json(categories.rows);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Nayi category add karne ke liye
const addCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCat = await pool.query(
      "INSERT INTO categories (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.json(newCat.rows[0]);
  } catch (err) {
    res.status(500).send("Error adding category");
  }
};

// Baaki delete ki logic jo humne pehle likhi thi:
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Check karein ke kya is category mein koi product hai?
    const productsCheck = await pool.query(
      "SELECT id FROM products WHERE category_id = $1 LIMIT 1", 
      [id]
    );

    if (productsCheck.rows.length > 0) {
      // 2. Agar product mil gaya, toh 400 error bhejain
      return res.status(400).json({ 
        error: "Yeh category delete nahi ho sakti kyunke is mein products maujood hain. Pehle products ki category tabdeel karein." 
      });
    }

    // 3. Agar koi product nahi hai, toh delete kar dein
    await pool.query("DELETE FROM categories WHERE id = $1", [id]);
    res.json({ message: "Category deleted successfully!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error occurred" });
  }
};

module.exports = { getCategories, addCategory, deleteCategory };