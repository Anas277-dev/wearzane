// const pool = require('../config/db');

// // 1. Home Page & All Products (Filter Support)
// // 1. Home Page & All Products (Filter + SEARCH Support)
// const getProducts = async (req, res) => {
//   // 🎯 query params se search ko bhi destructure kiya
//   const { minPrice, maxPrice, search } = req.query; 
//   try {
//     let query = "SELECT * FROM products WHERE 1=1"; 
//     let params = [];

//     // 🎯 1. Search Logic (Name ya Description dono me se kuch bhi match kare)
//     if (search) {
//       params.push(`%${search}%`);
//       query += ` AND (name ILIKE $${params.length} OR description ILIKE $${params.length})`;
//     }

//     // 2. Min Price Logic
//     if (minPrice) {
//       params.push(minPrice);
//       query += ` AND price >= $${params.length}`;
//     }

//     // 🎯 3. Max Price Logic (Jo pehle missing tha)
//     if (maxPrice) {
//       params.push(maxPrice);
//       query += ` AND price <= $${params.length}`;
//     }

//     query += " ORDER BY created_at DESC";

//     const allProducts = await pool.query(query, params);
//     res.json(allProducts.rows);
//   } catch (err) {
//     console.error("DATABASE ERROR:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

// // 2. Categories (Filter Support)
// const getProductsByCategory = async (req, res) => {
//   const { categoryName } = req.params;
//   const { minPrice, maxPrice } = req.query;
  
//   try {
//     let query = `
//       SELECT p.* FROM products p 
//       JOIN categories c ON p.category_id = c.id 
//       WHERE LOWER(c.name) = LOWER($1)
//     `;
//     let params = [categoryName];

//     if (minPrice) {
//       params.push(minPrice);
//       query += ` AND p.price >= $${params.length}`;
//     }
//     if (maxPrice) {
//       params.push(maxPrice);
//       query += ` AND p.price <= $${params.length}`;
//     }

//     query += " ORDER BY p.price ASC";

//     const products = await pool.query(query, params);
//     res.json(products.rows);
//   } catch (err) {
//     res.status(500).json({ error: "Products fetch fail" });
//   }
// };

// // 3. Sections (Men/Women) (Filter Support)
// const getProductsBySection = async (req, res) => {
//   const { sectionName } = req.params;
//   const { minPrice, maxPrice } = req.query;
  
//   try {
//     let query = "SELECT * FROM products WHERE LOWER(section) = LOWER($1)";
//     let params = [sectionName];

//     if (minPrice) {
//       params.push(minPrice);
//       query += ` AND price >= $${params.length}`;
//     }

//     if (maxPrice) {
//       params.push(maxPrice);
//       query += ` AND price <= $${params.length}`;
//     }

//     query += " ORDER BY price ASC";

//     const products = await pool.query(query, params);
//     res.json(products.rows);
//   } catch (err) {
//     console.error("Section Fetch Error:", err);
//     res.status(500).json({ error: "Section products fetch failed" });
//   }
// };

// // 4. Single Product Details (ID ke mutabiq lana)
// const getProductById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const product = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
//     if (product.rows.length === 0) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     res.json(product.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error fetching product" });
//   }
// };

// // 5. Naya Product Add karne ke liye (Admin)
// const createProduct = async (req, res) => {
//   const { name, description, price, stock, category_id, section } = req.body;
//   const imageUrls = req.files.map(file => file.path); 
//   try {
//     const newProduct = await pool.query(
//       "INSERT INTO products (name, description, price, stock, category_id, section, images) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
//       [name, description, price, stock, category_id, section, imageUrls]
//     );
//     res.status(201).json(newProduct.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: "Database error" });
//   }
// };

// // 6. Product Delete karne ke liye
// const deleteProduct = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await pool.query("DELETE FROM products WHERE id = $1", [id]);
//     res.json({ message: "Product deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// };

// // 7. Product Edit / Update karne ke liye (Section Filter Support ke sath)
// const updateProduct = async (req, res) => {
//   const { id } = req.params;
//   const { name, description, price, stock, category_id, section } = req.body;
//   let imageUrls = req.files && req.files.length > 0 ? req.files.map(file => file.path) : null;

//   try {
//     let query, params;
//     if (imageUrls) {
//       query = "UPDATE products SET name=$1, description=$2, price=$3, stock=$4, category_id=$5, section=$6, images=$7 WHERE id=$8 RETURNING *";
//       params = [name, description, price, stock, category_id, section, imageUrls, id];
//     } else {
//       query = "UPDATE products SET name=$1, description=$2, price=$3, stock=$4, category_id=$5, section=$6 WHERE id=$7 RETURNING *";
//       params = [name, description, price, stock, category_id, section, id];
//     }
//     const updated = await pool.query(query, params);
//     res.json(updated.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: "Update failed" });
//   }
// };

// // Tamam functions aik sath export ho rahe hain
// module.exports = { 
//   getProducts, 
//   getProductsByCategory, 
//   getProductsBySection, 
//   getProductById, 
//   createProduct, 
//   deleteProduct, 
//   updateProduct 
// };







const pool = require('../config/db');

// 1. Home Page & All Products (Filter + SEARCH Support)
const getProducts = async (req, res) => {
  const { minPrice, maxPrice, search } = req.query; 
  try {
    let query = "SELECT * FROM products WHERE 1=1"; 
    let params = [];

    if (search) {
      params.push(`%${search}%`);
      query += ` AND (name ILIKE $${params.length} OR description ILIKE $${params.length})`;
    }

    if (minPrice) {
      params.push(minPrice);
      query += ` AND price >= $${params.length}`;
    }

    if (maxPrice) {
      params.push(maxPrice);
      query += ` AND price <= $${params.length}`;
    }

    query += " ORDER BY created_at DESC";

    const allProducts = await pool.query(query, params);
    res.json(allProducts.rows);
  } catch (err) {
    console.error("DATABASE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// 2. Categories (Filter Support)
const getProductsByCategory = async (req, res) => {
  const { categoryName } = req.params;
  const { minPrice, maxPrice } = req.query;
  
  try {
    let query = `
      SELECT p.* FROM products p 
      JOIN categories c ON p.category_id = c.id 
      WHERE LOWER(c.name) = LOWER($1)
    `;
    let params = [categoryName];

    if (minPrice) {
      params.push(minPrice);
      query += ` AND p.price >= $${params.length}`;
    }
    if (maxPrice) {
      params.push(maxPrice);
      query += ` AND p.price <= $${params.length}`;
    }

    query += " ORDER BY p.price ASC";

    const products = await pool.query(query, params);
    res.json(products.rows);
  } catch (err) {
    res.status(500).json({ error: "Products fetch fail" });
  }
};

// 3. Sections (Filter Support)
const getProductsBySection = async (req, res) => {
  const { sectionName } = req.params;
  const { minPrice, maxPrice } = req.query;
  
  try {
    let query = "SELECT * FROM products WHERE LOWER(section) = LOWER($1)";
    let params = [sectionName];

    if (minPrice) {
      params.push(minPrice);
      query += ` AND price >= $${params.length}`;
    }

    if (maxPrice) {
      params.push(maxPrice);
      query += ` AND price <= $${params.length}`;
    }

    query += " ORDER BY price ASC";

    const products = await pool.query(query, params);
    res.json(products.rows);
  } catch (err) {
    console.error("Section Fetch Error:", err);
    res.status(500).json({ error: "Section products fetch failed" });
  }
};

// 4. Single Product Details (ID ke mutabiq lana - STOCK INCLUDED)
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    // 🎯 Ab hum explicitly 'stock' column fetch kar rahe hain
    const product = await pool.query(
      "SELECT id, name, description, price, stock, category_id, section, images FROM products WHERE id = $1", 
      [id]
    );
    
    if (product.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching product" });
  }
};

// 5. Naya Product Add karne ke liye (Admin)
const createProduct = async (req, res) => {
  const { name, description, price, stock, category_id, section } = req.body;
  const imageUrls = req.files ? req.files.map(file => file.path) : []; 
  try {
    const newProduct = await pool.query(
      "INSERT INTO products (name, description, price, stock, category_id, section, images) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, description, price, stock, category_id, section, imageUrls]
    );
    res.status(201).json(newProduct.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};

// 6. Product Delete karne ke liye
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Check karein ke kya koi aisa order item hai jo abhi 'active' (not cancelled/delivered) hai?
    const checkActiveOrders = await pool.query(`
      SELECT COUNT(*) 
      FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      WHERE oi.product_id = $1 
      AND o.status NOT IN ('Delivered', 'Cancelled')
    `, [id]);

    // 2. Agar count > 0 hai, to matlab product abhi kisi active order mein hai
    if (parseInt(checkActiveOrders.rows[0].count) > 0) {
      return res.status(400).json({ 
        error: "Product delete nahi ho sakta kyunke yeh abhi kisi active order (Pending/Shipped) ka hissa hai!" 
      });
    }

    // 3. Agar koi active order nahi hai, to safely delete karein
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    
    res.json({ message: "Product successfully deleted!" });

  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: "Delete process fail ho gaya." });
  }
};

// 7. Product Edit / Update karne ke liye
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, category_id, section } = req.body;
  let imageUrls = req.files && req.files.length > 0 ? req.files.map(file => file.path) : null;

  try {
    let query, params;
    if (imageUrls) {
      query = "UPDATE products SET name=$1, description=$2, price=$3, stock=$4, category_id=$5, section=$6, images=$7 WHERE id=$8 RETURNING *";
      params = [name, description, price, stock, category_id, section, imageUrls, id];
    } else {
      query = "UPDATE products SET name=$1, description=$2, price=$3, stock=$4, category_id=$5, section=$6 WHERE id=$7 RETURNING *";
      params = [name, description, price, stock, category_id, section, id];
    }
    const updated = await pool.query(query, params);
    res.json(updated.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
};

module.exports = { 
  getProducts, 
  getProductsByCategory, 
  getProductsBySection, 
  getProductById, 
  createProduct, 
  deleteProduct, 
  updateProduct 
};