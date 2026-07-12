// const pool = require('../config/db');

// // 🎯 1. Create new order and its items (Checkout Handler)
// // @route   POST /api/orders
// const createOrder = async (req, res) => {
//   const userId = req.user.id; 
//   const { customer_name, email, address, phone, total_amount, items } = req.body;

//   if (!customer_name || !email || !address || !phone || !total_amount || !items || items.length === 0) {
//     return res.status(400).json({ error: "All checkout fields and cart items are required" });
//   }

//   const client = await pool.connect();

//   try {
//     await client.query('BEGIN');

//     // A. Main orders table mein entry dalna
//     const orderQuery = `
//       INSERT INTO orders (customer_name, email, address, phone, total_amount, status)
//       VALUES ($1, $2, $3, $4, $5, 'Pending')
//       RETURNING id
//     `;
//     const orderResult = await client.query(orderQuery, [
//       customer_name,
//       email,
//       address,
//       phone,
//       total_amount
//     ]);
    
//     const orderId = orderResult.rows[0].id;

//     // 🎯 FIXED: 'order_item' ko badal kar aapke actual database table name 'order_items' ke mutabik kr diya hai
//     const itemQuery = `
//       INSERT INTO order_items (order_id, product_id, quantity, price)
//       VALUES ($1, $2, $3, $4)
//     `;

//     for (const item of items) {
//       const pId = item.product_id || item.id; 
//       await client.query(itemQuery, [
//         orderId,
//         pId,
//         item.quantity || 1,
//         item.price
//       ]);
//     }

//     // C. Cart empty karna
//     await client.query('DELETE FROM cart WHERE user_id = $1', [userId]);

//     await client.query('COMMIT');

//     return res.status(201).json({ 
//       success: true, 
//       message: "Order placed successfully!", 
//       orderId: orderId 
//     });

//   } catch (err) {
//     await client.query('ROLLBACK');
//     console.error("🚨 DATABASE ERROR INSIDE CREATE_ORDER TRANSACTION:", err);
//     return res.status(500).json({ error: "Order process fail ho gaya, transaction rolled back" });
//   } finally {
//     client.release();
//   }
// };

// // 🎯 2. Saare orders fetch karna (Admin Panel layout ke liye)
// // @route   GET /api/orders
// const getAllOrders = async (req, res) => {
//   try {
//     const orders = await pool.query("SELECT * FROM orders ORDER BY created_at DESC");
//     res.json(orders.rows);
//   } catch (err) {
//     console.error("Error in getAllOrders:", err);
//     res.status(500).json({ error: "Orders fetch nahi ho sakay" });
//   }
// };

// // 🎯 3. Order ka status update karna (e.g. Pending -> Shipped)
// // @route   PUT /api/orders/:id/status
// const updateOrderStatus = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   try {
//     const updatedOrder = await pool.query(
//       "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
//       [status, id]
//     );
//     res.json(updatedOrder.rows[0]);
//   } catch (err) {
//     console.error("Error in updateOrderStatus:", err);
//     res.status(500).json({ error: "Status update fail ho gaya" });
//   }
// };

// // 🎯 4. NEW: User ke specific orders fetch karna tracking ke liye
// // @route   GET /api/orders/my-orders
// const getUserOrders = async (req, res) => {
//   const userId = req.user.id; // Auth middleware se user ki ID mili

//   try {
//     // Agar aapki orders table mein user_id save ho rahi hai, toh query aisi hogi:
//     // const orders = await pool.query("SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
    
//     // Agar aap abhi user_id save nahi kar rahe balki email se track karna chahein (Fallback):
//     const userEmail = req.user.email;
//     const orders = await pool.query("SELECT * FROM orders WHERE email = $1 ORDER BY created_at DESC", [userEmail]);

//     res.json(orders.rows);
//   } catch (err) {
//     console.error("Error in getUserOrders:", err);
//     res.status(500).json({ error: "Tracking data fetch nahi ho saka" });
//   }
// };

// module.exports = { 
//   createOrder,
//   getAllOrders, 
//   getUserOrders,
//   updateOrderStatus 
// };





// const pool = require('../config/db');

// // 🎯 1. Create new order and its items (Checkout Handler)
// const createOrder = async (req, res) => {
//   const userId = req.user.id;
//   const { customer_name, address, phone, total_amount, items } = req.body;
//   const userEmail = req.user.email;

//   if (!customer_name || !address || !phone || !total_amount || !items || items.length === 0) {
//     return res.status(400).json({ error: "All checkout fields and cart items are required" });
//   }

//   const client = await pool.connect();

//   try {
//     await client.query('BEGIN');

//     // A. Main orders table mein entry dalna
//     const orderQuery = `
//       INSERT INTO orders (user_id, customer_name, email, address, phone, total_amount, status)
//       VALUES ($1, $2, $3, $4, $5, $6, 'Pending')
//       RETURNING id
//     `;
//     const orderResult = await client.query(orderQuery, [
//       userId, customer_name, userEmail, address, phone, total_amount
//     ]);
    
//     const orderId = orderResult.rows[0].id;

//     // B. Items entry aur Stock update loop
//     const itemQuery = `
//       INSERT INTO order_items (order_id, product_id, quantity, price)
//       VALUES ($1, $2, $3, $4)
//     `;

//     const updateStockQuery = `
//       UPDATE products 
//       SET stock = stock - $1 
//       WHERE id = $2 AND stock >= $1
//     `;

//     for (const item of items) {
//       const pId = item.product_id || item.id; 
//       const qty = item.quantity || 1;

//       // 1. Order item save karein
//       await client.query(itemQuery, [orderId, pId, qty, item.price]);

//       // 2. Stock update karein
//       const stockResult = await client.query(updateStockQuery, [qty, pId]);

//       // 3. Agar stock kam tha toh transaction cancel karein
//       if (stockResult.rowCount === 0) {
//         throw new Error(`Product ${item.name} ka stock khatam ho chuka hai ya kam hai!`);
//       }
//     }

//     // C. Cart empty karna
//     await client.query('DELETE FROM cart WHERE user_id = $1', [userId]);

//     await client.query('COMMIT');

//     return res.status(201).json({ 
//       success: true, 
//       message: "Order placed successfully!", 
//       orderId: orderId 
//     });

//   } catch (err) {
//     await client.query('ROLLBACK');
//     console.error("🚨 DATABASE ERROR IN CREATE_ORDER:", err);
//     return res.status(500).json({ error: err.message || "Order process fail ho gaya." });
//   } finally {
//     client.release();
//   }
// };

// // 🎯 2. Saare orders fetch karna (Admin Panel)
// const getAllOrders = async (req, res) => {
//   try {
//     const orders = await pool.query("SELECT * FROM orders ORDER BY created_at DESC");
//     res.json(orders.rows);
//   } catch (err) {
//     res.status(500).json({ error: "Orders fetch nahi ho sakay" });
//   }
// };

// // 🎯 3. Order ka status update karna
// const updateOrderStatus = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   try {
//     const updatedOrder = await pool.query(
//       "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
//       [status, id]
//     );
//     res.json(updatedOrder.rows[0]);
//   } catch (err) {
//     res.status(500).json({ error: "Status update fail ho gaya" });
//   }
// };

// // 🎯 4. User ke specific orders fetch karna (Tracking Route)
// const getUserOrders = async (req, res) => {
//   const userId = req.user.id;

//   try {
//     const query = `
//       SELECT o.*, 
//              json_agg(json_build_object(
//                'product_name', p.name,
//                'quantity', oi.quantity,
//                'price', oi.price, 
//                'total_item_price', (oi.quantity * oi.price)
//              )) as items
//       FROM orders o
//       JOIN order_items oi ON o.id = oi.order_id
//       JOIN products p ON oi.product_id = p.id
//       WHERE o.user_id = $1
//       GROUP BY o.id
//       ORDER BY o.created_at DESC
//     `;
    
//     const orders = await pool.query(query, [userId]);
//     res.json(orders.rows);
//   } catch (err) {
//     res.status(500).json({ error: "Tracking data fetch nahi ho saka" });
//   }
// };

// module.exports = { 
//   createOrder,
//   getAllOrders, 
//   getUserOrders,
//   updateOrderStatus 
// };




const pool = require('../config/db');

// 🎯 1. Create new order and its items (Checkout Handler)
const createOrder = async (req, res) => {
  const userId = req.user.id;
  const {
    customer_name,
    address,
    phone,
    total_amount,
    items,
    payment_method,   // 'cod' | 'card'  (frontend se aa raha hai)
    transaction_id     // Authorize.Net transaction id, COD ke liye null
  } = req.body;
  const userEmail = req.user.email;

  if (!customer_name || !address || !phone || !total_amount || !items || items.length === 0) {
    return res.status(400).json({ error: "All checkout fields and cart items are required" });
  }

  // Agar frontend se method na aaye, default COD maan lein
  const method = payment_method === 'card' ? 'card' : 'cod';

  // Card se aaya order matlab payment already ho chuki hai -> 'Paid'
  // COD abhi tak 'Pending' hi rahega (delivery pe wasool hoga)
  const initialStatus = method === 'card' ? 'Paid' : 'Pending';

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // A. Main orders table mein entry dalna
    const orderQuery = `
      INSERT INTO orders (user_id, customer_name, email, address, phone, total_amount, status, payment_method, transaction_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id
    `;
    const orderResult = await client.query(orderQuery, [
      userId,
      customer_name,
      userEmail,
      address,
      phone,
      total_amount,
      initialStatus,
      method,
      transaction_id || null
    ]);

    const orderId = orderResult.rows[0].id;

    // B. Items entry aur Stock update loop
    const itemQuery = `
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES ($1, $2, $3, $4)
    `;

    const updateStockQuery = `
      UPDATE products 
      SET stock = stock - $1 
      WHERE id = $2 AND stock >= $1
    `;

    for (const item of items) {
      const pId = item.product_id || item.id;
      const qty = item.quantity || 1;

      // 1. Order item save karein
      await client.query(itemQuery, [orderId, pId, qty, item.price]);

      // 2. Stock update karein
      const stockResult = await client.query(updateStockQuery, [qty, pId]);

      // 3. Agar stock kam tha toh transaction cancel karein
      if (stockResult.rowCount === 0) {
        throw new Error(`Product ${item.name} ka stock khatam ho chuka hai ya kam hai!`);
      }
    }

    // C. Cart empty karna
    await client.query('DELETE FROM cart WHERE user_id = $1', [userId]);

    await client.query('COMMIT');

    return res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      orderId: orderId,
      payment_method: method,
      status: initialStatus
    });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error("🚨 DATABASE ERROR IN CREATE_ORDER:", err);
    return res.status(500).json({ error: err.message || "Order process fail ho gaya." });
  } finally {
    client.release();
  }
};

// 🎯 2. Saare orders fetch karna (Admin Panel)
const getAllOrders = async (req, res) => {
  try {
    const orders = await pool.query("SELECT * FROM orders ORDER BY created_at DESC");
    res.json(orders.rows);
  } catch (err) {
    res.status(500).json({ error: "Orders fetch nahi ho sakay" });
  }
};

// 🎯 3. Order ka status update karna
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedOrder = await pool.query(
      "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    res.json(updatedOrder.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Status update fail ho gaya" });
  }
};

// 🎯 4. User ke specific orders fetch karna (Tracking Route)
const getUserOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const query = `
      SELECT o.*, 
             json_agg(json_build_object(
               'product_name', p.name,
               'quantity', oi.quantity,
               'price', oi.price, 
               'total_item_price', (oi.quantity * oi.price)
             )) as items
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = $1
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `;

    const orders = await pool.query(query, [userId]);
    res.json(orders.rows);
  } catch (err) {
    res.status(500).json({ error: "Tracking data fetch nahi ho saka" });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus
};