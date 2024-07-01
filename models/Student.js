const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  hscPercentage: { type: Number, required: true },
  file: {
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true }
  },
  status: { type: Boolean, required: true, default: false },
  reviewedBy: {type: String, required: true, default: null}
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;