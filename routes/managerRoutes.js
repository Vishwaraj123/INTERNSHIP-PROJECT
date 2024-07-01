const express = require("express");
const router = express.Router();
const managerController = require("../controller/managerController");
const { authenticate, authorize, ensureAuthenticated } = require("../middleware/auth");

// Route to get all students
router.get("/",  managerController.getAllStudents);

router.get('/approve/:id', managerController.approveStudent);
router.get('/reject/:id',  managerController.rejectStudent);
module.exports = router;