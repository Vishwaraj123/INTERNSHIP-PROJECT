const express = require("express");
const router = express.Router();
const { ensureAuthenticated, checkRole } = require("../middleware/auth");
const { getStudentDashboard, getManagerDashboard, getAdminDashboard, getSuperadminDashboard } = require("../controllers/dashboardController");

// Dashboard routes based on role
router.get("/dashboard/student", ensureAuthenticated, checkRole("student"), getStudentDashboard);
router.get("/dashboard/manager", ensureAuthenticated, checkRole("manager"), getManagerDashboard);
router.get("/dashboard/admin", ensureAuthenticated, checkRole("admin"), getAdminDashboard);
router.get("/dashboard/superadmin", ensureAuthenticated, checkRole("superadmin"), getSuperadminDashboard);

module.exports = router;
