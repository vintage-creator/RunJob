const express = require("express");
const router = express.Router();
const {runJobHome, runAppEngine} = require("../Controllers/runApp.js");


router.get("/home", runJobHome);
router.post("/runappv1", runAppEngine);

module.exports = router;
