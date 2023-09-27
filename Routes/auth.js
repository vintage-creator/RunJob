const express = require("express");
const router = express.Router();
const {signUpFn, signInFn} = require("../Controllers/authFn");
const oAuthFn = require("../Controllers/oAuthFn");


router.post("^/signup(.html)?", signUpFn);
router.post("^/signin(.html)?", signInFn);
router.get("/google", oAuthFn.googleAuth);
router.get("/google/cb", oAuthFn.googleAuthCallback);

module.exports = router;
