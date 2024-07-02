const Student = require("../models/Student");
const Manager = require("../models/Manager");
const Admin = require("../models/Admin");
const SuperAdmin = require("../models/SuperAdmin");
const { getAllStudents} = require('../controller/managerController')
const { getAllManagers } = require("../controller/adminController");
const {generateToken} = require('../middleware/auth');
const { getAllAdmins } = require("./superAdminController");
async function login(req, res) {
    if (!req.body) {
        return res.status(400).json({ message: "Request body is empty." });
      }
      const { username, password, role } = req.body;
    let loggedInUserId;
    
    try {
      const User = getRoleModel(role);
      if (!User) {
        return res.status(400).json({ message: "Invalid role." });
      }
  
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      if (!(user.password == password)) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
  
      loggedInUserId = user._id;
      req.session.loggedInUserId = loggedInUserId;
      req.session.save();
  
      const token = generateToken(user);
      res.header("Authorization", `Bearer ${token}`);
      const students = await getAllStudents();
      const allStudents = await getAllStudents();
      const allManagers = await getAllManagers();
      const allAdmins = await getAllAdmins();
      switch (role) {
        case "student":
          res.render("student", { user, loggedInUserId});
          break;
        case "manager":
          
          res.render("manager", { user, students, loggedInUserId });
          break;
        case "admin":
          res.render("admin", { user, allStudents, allManagers, loggedInUserId });
          break;
        case "superadmin":
          
          res.render("superadmin", { user, allStudents, allManagers, allAdmins, loggedInUserId });
          break;
        default:
          res.status(401).json({ message: "Invalid role." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  }
  function getRoleModel(role) {
    switch (role) {
      case "student":
        return Student;
      case "manager":
        return Manager;
      case "admin":
        return Admin;
      case "superadmin":
        return SuperAdmin;
      default:
        return null;
    }
  }
module.exports = {
    login
}