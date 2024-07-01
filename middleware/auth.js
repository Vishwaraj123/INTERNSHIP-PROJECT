const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/config"); // Adjust path as per your configuration
const Student = require("../models/Student");
const Manager = require("../models/Manager");
const Admin = require("../models/Admin");
const SuperAdmin = require("../models/SuperAdmin");
const { getAllStudents } = require("../controller/managerController");

// Function to generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username, role: user.role }, secretKey, { expiresIn: "1h" });
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

    const token = generateToken(user);

    res.header("Authorization", `Bearer ${token}`);

    switch (role) {
      case "student":
        return res.render("student", { user });
      case "manager":
        const students = await getAllStudents();
        return res.render("manager", { user, students });
      case "admin":
        return res.render("admin", { user });
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
    return res.status(401).json({ message: "Authentication failed. No token provided." });
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
      return res.status(403).json({ message: `Unauthorized access for role ${req.user.role}.` });
    }
    next();
  };
}

// Middleware to authorize roles
function authorize(roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication failed. No user found." });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Unauthorized access for role ${req.user.role}.` });
    }

    next();
  };
}

module.exports = { login, authenticate, checkRole, authorize };