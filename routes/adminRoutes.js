const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const { authenticate, authorize } = require("../middleware/auth");

// Example route to get all managers and students
// router.get("/all", adminController.getAllManagersStudents);

// Example route to get approval status of students
// router.get("/approval-status", adminController.getApprovalStatus);

module.exports = router;
