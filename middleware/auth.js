const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/config"); // Adjust path as per your configuration
const Student = require("../models/Student");
const Manager = require("../models/Manager");
const Admin = require("../models/Admin");
const SuperAdmin = require("../models/SuperAdmin");
const { getAllStudents } = require("../controller/managerController");
const { getAllManagers } = require("../controller/adminController");
const managerRoutes = require("../routes/managerRoutes");
const express = require("express");
const MongoStore = require("connect-mongo");
const app = express();
const session = require("express-session");
// Configure Express session
app.use(
  session({
    secret: "my_secret_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/INTERNSHIP",
      dbName: "INTERNSHIP",
      collectionName: "managers",
    }),
    cookie: {
      secure: true,
      maxAge: 14 * 24 * 60 * 60,
    },
  })
);

// Function to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    secretKey,
    { expiresIn: "1h" }
  );
};
// Middleware to authenticate requests
function authenticate(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token." });
  }
}

// Middleware to check role
function checkRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res
        .status(403)
        .json({ message: `Unauthorized access for role ${req.user.role}.` });
    }
    next();
  };
}

// Middleware to authorize roles
function authorize(roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Authentication failed. No user found." });
    }

    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: `Unauthorized access for role ${req.user.role}.` });
    }

    next();
  };
}

module.exports = {generateToken, authenticate, checkRole, authorize };
