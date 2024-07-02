const express = require("express");
const router = express.Router();
const { login } = require("../middleware/auth"); // Ensure correct path to auth middleware

// POST route for user login
// router.post("/login", login);

module.exports = router;
