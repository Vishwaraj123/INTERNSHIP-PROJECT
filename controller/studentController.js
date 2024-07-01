const Student = require("../models/Student");
const multer = require("multer");
const path = require("path");

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// Register a new student
exports.registerStudent = async (req, res) => {
  try {
    // Check if username already exists
    const existingStudent = await Student.findOne({ username: req.body.username });
    if (existingStudent) {
      return res.status(400).json({ message: "Username already exists. Please choose a different username." });
    }

    // Create a new student object
    const student = new Student({
      fullName: req.body.fullName,
      username: req.body.username,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      dob: req.body.dob,
      email: req.body.email,
      phone: req.body.phone,
      hscPercentage: req.body.hscPercentage,
      file: {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        path: req.file.path,
        size: req.file.size,
      },
    });

    // Save the student to the database
    await student.save();
    res.json({ message: "Your form has been submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "There was an error submitting your form" });
  }
};

// Download a file
exports.downloadFile = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "File not found" });
    }
    res.download(student.file.path, student.file.originalName);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "There was an error downloading the file" });
  }
};

// Get details of the logged-in student
exports.getStudentDetails = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id); // Assuming req.user contains the authenticated user's details
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all students


exports.upload = upload;