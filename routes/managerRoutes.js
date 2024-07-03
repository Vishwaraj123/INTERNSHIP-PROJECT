const express = require("express");
const router = express.Router();
const managerController = require("../controller/managerController");

// Route to get all students
router.get("/",  managerController.getAllStudents);
router.get('/edit/:id', managerController.getEditStudent);
router.post('/:id/edit', managerController.editStudent);
router.get('/approve/:id', managerController.approveStudent);
router.get('/reject/:id',  managerController.rejectStudent);
module.exports = router;