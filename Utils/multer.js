const multer = require("multer");
const path = require("path");

// Define storage and file naming
const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", "uploads"), // Set your desired upload directory
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Initialize multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // 10 MB limit
});

module.exports = upload;
