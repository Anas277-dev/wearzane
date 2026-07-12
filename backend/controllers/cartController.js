// 🔴 Puraani commented line hata kar apna sahi path likhein
const pool = require('../config/db'); // Ensure direct connection pool file is here

// @desc    Add product to cart
// @route   POST /api/cart
const addToCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id; 

  // Data Validation
  if (!productId) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  try {
    // Check if already exists in user's cart
    const existing = await pool.query(
      'SELECT * FROM cart WHERE user_id = $1 AND product_id = $2', 
      [userId, productId]
    );
    
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Product is already in your cart!" });
    }

    await pool.query(
      'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, 1)', 
      [userId, productId]
    );
    
    return res.status(200).json({ message: "Added to cart successfully" });
  } catch (err) {
    console.error("Database Error inside addToCart:", err); // Server console pr trace check karne ke liye
    return res.status(500).json({ error: "Internal server database error" });
  }
};

// @desc    Get logged-in user's cart items
// @route   GET /api/cart
const getCart = async (req, res) => {
  const userId = req.user.id;
  try {
    // 🎯 FIXED QUERY: p.image_url hata kar p.images[1] lagaya hai (PostgreSQL array index 1 se shuru hota hai)
    // 'AS image_url' lagane se frontend ko purana variable name hi milega aur aapka baaki frontend code break nahi hoga.
    const cartItems = await pool.query(
      `SELECT c.id, p.id as product_id, p.name, p.price, p.images[1] as image_url, c.quantity 
       FROM cart c 
       JOIN products p ON c.product_id = p.id 
       WHERE c.user_id = $1`, 
      [userId]
    );
    
    return res.status(200).json(cartItems.rows);
  } catch (err) {
    // 🎯 Live backend terminal par crash tracking ke liye print statement
    console.error("🚨 DATABASE ERROR INSIDE GET_CART CONTROLLER:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart
const updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  // Data Validation
  if (!productId || quantity === undefined) {
    return res.status(400).json({ error: "Product ID and Quantity are required" });
  }

  try {
    // 🎯 DATABASE UPDATE: User id aur product id check kar ke quantity update hogi
    const result = await pool.query(
      'UPDATE cart SET quantity = $1 WHERE user_id = $2 AND product_id = $3 RETURNING *',
      [quantity, userId, productId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    return res.status(200).json({ message: "Quantity updated successfully", cart: result.rows[0] });
  } catch (err) {
    console.error("🚨 DATABASE ERROR INSIDE UPDATE_QUANTITY CONTROLLER:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// @desc    Delete item from cart
// @route   DELETE /api/cart/:productId
const deleteCartItem = async (req, res) => {
  const { productId } = req.params; // URL parameters se productId milegi
  const userId = req.user.id;

  try {
    // 🎯 DATABASE DELETE: Specific user ke cart se product permanently delete hoga
    const result = await pool.query(
      'DELETE FROM cart WHERE user_id = $1 AND product_id = $2 RETURNING *',
      [userId, productId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Item not found in your cart" });
    }

    return res.status(200).json({ message: "Item removed from cart successfully" });
  } catch (err) {
    console.error("🚨 DATABASE ERROR INSIDE DELETE_CART_ITEM CONTROLLER:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// 🎯 Chaaro functions ko export kar diya hai
module.exports = {
  addToCart,
  getCart,
  updateQuantity,
  deleteCartItem // 👈 Isko yahan list mein add kiya
};