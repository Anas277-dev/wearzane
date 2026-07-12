const pool = require('../config/db');

// 1. Saare Unique Customers ki list (Unke phone/email se pehchan)
const getAllCustomers = async (req, res) => {
  try {
    const customers = await pool.query(
      "SELECT DISTINCT customer_name, email, phone, address FROM orders ORDER BY customer_name"
    );
    res.json(customers.rows);
  } catch (err) {
    res.status(500).json({ error: "Customers fetch nahi ho sakay" });
  }
};

// 2. Specific Customer ki Order History
const getCustomerHistory = async (req, res) => {
  const { phone } = req.params;
  try {
    const history = await pool.query(
      "SELECT * FROM orders WHERE phone = $1 ORDER BY created_at DESC",
      [phone]
    );
    res.json(history.rows);
  } catch (err) {
    res.status(500).json({ error: "History fetch nahi ho saki" });
  }
};

module.exports = { getAllCustomers, getCustomerHistory };