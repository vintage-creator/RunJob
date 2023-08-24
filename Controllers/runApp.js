const fs = require("fs");
const multer = require("multer");
const path = require("path");
const inputValidation = require("../Utils/inputValidation");

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

const runAppEngine = (req, res) => {
  upload.single("cv")(req, res, (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(500).send("File upload error");
    }

    // Access the uploaded file and other form data
    const { professionalRole, applicationLetter } = req.body;
    const cvFilePath = req.file ? req.file.path : null; // The uploaded file path
    if (cvFilePath) {
      console.log("CV File Path:", cvFilePath);
    }

    // Validate and sanitize the input
    const { error, value } = inputValidation.validate(req.body);
    if (error) {
      console.error("Validation error:", error.details);
      // Unlink the uploaded file
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.sendFile(path.join(__dirname, "..", "views/404.html"));
    }

    // Now you can process the uploaded file and form data as needed
    console.log(professionalRole);
    console.log(applicationLetter);

    // Respond to the client
    res.sendFile(path.join(__dirname, "..", "views/success.html"));
  });
};

module.exports = runAppEngine;