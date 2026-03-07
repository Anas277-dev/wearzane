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

module.exports = { getCategories, addCategory };