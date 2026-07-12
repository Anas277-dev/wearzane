const pool = require('../config/db');

// --- BANNERS ---
const getBanners = async (req, res) => {
  const result = await pool.query("SELECT * FROM banners ORDER BY id DESC");
  res.json(result.rows);
};

const addBanner = async (req, res) => {
  const { title, subtitle, button_link, image_url } = req.body;
  const result = await pool.query(
    "INSERT INTO banners (title, subtitle, button_link, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, subtitle, button_link, image_url]
  );
  res.json(result.rows[0]);
};

// 🎯 NEW: Delete Banner Controller
const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM banners WHERE id = $1", [id]);
    res.json({ message: "Banner deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// --- STATIC PAGES (About/Contact) ---
const updatePageContent = async (req, res) => {
  const { slug, title, content, image_url, secondary_content, mission_content } = req.body;
  await pool.query(
    `INSERT INTO site_content (slug, title, content, image_url, secondary_content, mission_content) 
     VALUES ($1, $2, $3, $4, $5, $6) 
     ON CONFLICT (slug) DO UPDATE SET 
     title=$2, content=$3, image_url=$4, secondary_content=$5,mission_content=$6, updated_at=NOW()`,
    [slug, title, content, image_url, secondary_content, mission_content]
  );
  res.json({ message: "Page updated!" });
};

const getPageContent = async (req, res) => {
  const { slug } = req.params;
  try {
    const result = await pool.query("SELECT * FROM site_content WHERE slug = $1", [slug]);
    res.json(result.rows[0] || { title: "", content: "" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { getBanners, addBanner, deleteBanner, updatePageContent,getPageContent }; // 🎯 deleteBanner export kiya