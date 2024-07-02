const Manager = require("../models/Manager");
const Student = require("../models/Student");
const studentController = require("../controller/studentController");

// Get all students and their details (for manager)
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({}).select("-password -__v"); // exclude password and __v fields
    return students;
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server Error" });
  }
};

// approve a student
exports.approveStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    student.status = "Approved";
    const manager = await Manager.findById(req.session.loggedInUserId); // get logged in manager
    if (!manager) {
      return res.status(404).send({ message: "Manager not found" });
    }
    student.reviewedBy = manager.fullName;
    await student.save();
    res.send(`<script>alert('Student approved');</script>`);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error approving student" });
  }
};

// reject a student
exports.rejectStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    student.status = "Rejected";
    const manager = await Manager.findById(req.session.loggedInUserId); // get logged in manager
    student.reviewedBy = manager.fullName;
    await student.save();
    res.send("Student rejected");
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error rejecting student" });
  }
};
exports.getEditStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findById(id);
    if (!student) {
      throw new Error("Student not found");
    }
    res.render('editStudent', { student });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server Error" });
  }
};

// edit a student
exports.editStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }
    const { fullName, email, phone, dob } = req.body;
    student.fullName = fullName;
    student.email = email;
    student.phone = phone;
    student.dob = dob;
    await student.save();
    res.send("Student details updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error updating student details" });
  }
};