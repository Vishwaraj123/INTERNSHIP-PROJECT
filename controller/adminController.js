const Admin = require("../models/Admin");
const Manager = require("../models/Manager");
const Student = require("../models/Student");

// Get all managers and students
const getAllManagersStudents = async (req, res) => {
  try {
    const managers = await Manager.find();
    const students = await Student.find();
    res.json({ managers, students });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get approval/rejection status of students by managers
const getApprovalStatus = async (req, res) => {
  try {
    const students = await Student.find();
    const approvalStatus = students.map(student => ({
      studentId: student._id,
      approvalStatus: student.status, // Assuming 'status' is a field indicating approval/rejection
      approvedBy: student.approvedBy, // Assuming 'approvedBy' is a field indicating who approved the student
    }));
    res.json(approvalStatus);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllManagersStudents,
  getApprovalStatus,
};
