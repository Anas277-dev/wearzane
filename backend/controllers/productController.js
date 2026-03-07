const pool = require('../config/db');

// Sab products lane ke liye (For Frontend)
// const getProducts = async (req, res) => {
//   try {
//     const allProducts = await pool.query("SELECT * FROM products ORDER BY created_at DESC");
//     res.json(allProducts.rows);
//   } catch (err) {
//     res.status(500).json({ error: "Server error while fetching products" });
//   }
// };
const getProducts = async (req, res) => {
  try {
    // Simple query karke dekhein agar created_at column ka masla hai
    const allProducts = await pool.query("SELECT * FROM products ORDER BY created_at DESC"); 
    res.json(allProducts.rows);
  } catch (err) {
    console.error("DATABASE ERROR:", err); // Ye line terminal mein asli error dikhayegi
    res.status(500).json({ error: err.message }); // Browser mein bhi asli error dikhega
  }
};

// Naya product add karne ke liye (Admin Only)
const createProduct = async (req, res) => {
  const { name, description, price, stock, category_id } = req.body;
  
  // Cloudinary se aye hue URLs nikalna
  const imageUrls = req.files.map(file => file.path); 

  try {
    const newProduct = await pool.query(
      "INSERT INTO products (name, description, price, stock, category_id, images) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, description, price, stock, category_id, imageUrls]
    );
    res.status(201).json(newProduct.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

// Product Delete karne ke liye
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Product edit karne ke liye
// const updateProduct = async (req, res) => {
//   const { id } = req.params;
//   const { name, description, price, stock, category_id } = req.body;
  
//   try {
//     const updated = await pool.query(
//       "UPDATE products SET name=$1, description=$2, price=$3, stock=$4, category_id=$5 WHERE id=$6 RETURNING *",
//       [name, description, price, stock, category_id, id]
//     );
//     res.json(updated.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: "Update failed" });
//   }
// };

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, category_id } = req.body;
  
  // Agar nayi files aayi hain toh unka path lo, warna purani hi rehne do
  let imageUrls;
  if (req.files && req.files.length > 0) {
    imageUrls = req.files.map(file => file.path);
  }

  try {
    let query;
    let params;

    if (imageUrls) {
      // Images ke saath update
      query = "UPDATE products SET name=$1, description=$2, price=$3, stock=$4, category_id=$5, images=$6 WHERE id=$7 RETURNING *";
      params = [name, description, price, stock, category_id, imageUrls, id];
    } else {
      // Sirf text data update
      query = "UPDATE products SET name=$1, description=$2, price=$3, stock=$4, category_id=$5 WHERE id=$6 RETURNING *";
      params = [name, description, price, stock, category_id, id];
    }

    const updated = await pool.query(query, params);
    res.json(updated.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
};


module.exports = { getProducts, createProduct, deleteProduct, updateProduct };