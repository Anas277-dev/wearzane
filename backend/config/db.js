// const { Pool } = require('pg');
// require('dotenv').config();

// // DATABASE_URL ko connection string ke taur par use karte hain
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// // Check karne ke liye ke connect hua ya nahi
// pool.on('connect', () => {
//   console.log('Database connected successfully! ✅');
// });

// pool.on('error', (err) => {
//   console.error('Unexpected error on idle client', err);
//   process.exit(-1);
// });

// module.exports = pool;



const { Pool } = require('pg');
require('dotenv').config();

// DATABASE_URL ko connection string ke taur par use karte hain
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Production (Vercel) par SSL zaroori hai, local par nahi
  ssl: process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost') 
    ? { rejectUnauthorized: false } 
    : false
});

// Check karne ke liye ke connect hua ya nahi
pool.on('connect', () => {
  console.log('Database connected successfully! ✅');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;