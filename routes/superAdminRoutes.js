const express = require("express");
const router = express.Router();
const superAdminController = require("../controllers/superAdminController");
const { authenticate, authorize } = require("../middleware/auth");

// Example route to get all users (managers, students, superadmins)
router.get("/all-users", authenticate, authorize("superadmin"), superAdminController.getAllUsers);

// Example route to create a new user
router.post("/create-user", authenticate, authorize("superadmin"), superAdminController.createUser);

// Example route to update a user
router.put("/update-user/:id", authenticate, authorize("superadmin"), superAdminController.updateUser);

// Example route to delete a user
router.delete("/delete-user/:id", authenticate, authorize("superadmin"), superAdminController.deleteUser);

module.exports = router;
