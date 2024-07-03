const express = require("express");
const router = express.Router();
const {
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
