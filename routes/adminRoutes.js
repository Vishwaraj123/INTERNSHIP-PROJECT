const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticate, authorize } = require("../middleware/auth");

// Example route to get all managers and students
router.get("/all", authenticate, authorize("admin"), adminController.getAllManagersStudents);

// Example route to get approval status of students
router.get("/approval-status", authenticate, authorize("admin"), adminController.getApprovalStatus);

module.exports = router;
