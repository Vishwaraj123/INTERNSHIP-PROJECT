const express = require("express");
const router = express.Router();
const {
  getAllAdmins,
  createManager,
  createAdmin,
  updateManager,
  updateAdmin,
  removeManager,
  removeAdmin,
  getEditAdmin,
  getEditManager,
  removeStudent,
} = require("../controller/superAdminController");

// // Example route to get all users (managers, students, superadmins)
// router.get("/all-users", authenticate, authorize("superadmin"), superAdminController.getAllUsers);

// // Example route to create a new user
// router.post("/create-user", authenticate, authorize("superadmin"), superAdminController.createUser);

// // Example route to update a user
// router.put("/update-user/:id", authenticate, authorize("superadmin"), superAdminController.updateUser);

// // Example route to delete a user

// router.delete("/delete-user/:id", authenticate, authorize("superadmin"), superAdminController.deleteUser);

router.get("/editManager/:id", getEditManager);
router.post("/:id/editManager", updateManager);
router.get("/editAdmin/:id", getEditAdmin);
router.post("/:id/editAdmin", updateAdmin);
router.post("/createManager", createManager);
router.post("/createAdmin", createAdmin);
router.get("/deleteManager/:id", removeManager);
router.get("/deleteAdmin/:id", removeAdmin);
router.get("/deleteStudent/:id", removeStudent);

module.exports = router;
