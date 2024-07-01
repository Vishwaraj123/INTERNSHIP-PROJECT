const express = require("express");
const router = express.Router();
const studentController = require("../controller/studentController");

router.post("/register", studentController.upload.single('file'), studentController.registerStudent);
router.get("/download/:id", studentController.downloadFile);

module.exports = router;
