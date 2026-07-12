require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');

const app = express();

const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const adminRoutes = require('./routes/adminRoutes');
const orderRoutes = require('./routes/orderRoutes');
const customerRoutes = require('./routes/customerRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const cmsRoutes = require('./routes/cmsRoutes');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');

const cartRoutes = require('./routes/cartRoutes');

const paymentRoutes = require('./routes/payment');



// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/admin', adminRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/customers', customerRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/cms', cmsRoutes);
app.use('/api/blogs', blogRoutes)
app.use('/api/auth', authRoutes);

app.use('/api/cart', cartRoutes);

app.use('/api/payment', paymentRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('WearZane Backend is running...');
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found on Vercel backend!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;