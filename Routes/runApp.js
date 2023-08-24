const express = require("express");
const router = express.Router();
const runAppEngine = require("../Controllers/runApp.js");


router.post("/runappv1", runAppEngine);

module.exports = router;
