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

// Middleware to handle login
async function login(req, res) {
  const { username, password, role } = req.body;

  try {
    let User;
    switch (role) {
      case "student":
        User = Student;
        break;
      case "manager":
        User = Manager;
        break;
      case "admin":
        User = Admin;
        break;
      case "superadmin":
        User = SuperAdmin;
        break;
      default:
        return res.status(400).json({ message: "Invalid role." });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare passwords
    const isMatch = password === user.password;
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Set the session for the manager
    if (role === "manager") {
      const user = await Manager.findOne({ username: req.body.username });
      if (user && user.password === req.body.password) {
        req.session._id = user._id;
        req.session.isAuth = true;
        req.session.save(); // Save the session
        // res.status(201).end("Authentication Successful");
      } else {
        res.status(400).end("Authentication Failed");
      }
    }

    const students = await getAllStudents();
    const managers = await getAllManagers();
    const token = generateToken(user);

    res.header("Authorization", `Bearer ${token}`);
    switch (role) {
      case "student":
        return res.render("student", { user });
      case "manager":
        app.use("/manager", managerRoutes);
        return res.render("manager", { user, students });
      case "admin":
        req.session.save(); // Save the session before accessing its properties
        const userId = req.session._id;
        const managerID = await Manager.findById(userId);
        return res.render("admin", { user, students, managers, managerID });
      case "superadmin":
        return res.render("superadmin", { user });
      default:
        return res.status(401).json({ message: "Invalid role." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
}

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

module.exports = { login, authenticate, checkRole, authorize };
