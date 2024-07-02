const SuperAdmin = require("../models/SuperAdmin");
const Manager = require("../models/Manager");
const Student = require("../models/Student");
const Admin = require("../models/Admin");

// CRUD operations for all users
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({}).select("-password -__v"); // exclude password and __v fields
    return admins;
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server Error" });
  }
};

const createManager = async (req, res) => {
  try {
    const { fullName, username, password } = req.body;
    const manager = new Manager({ fullName, username, password });
    await manager.save();
    res.send("Manager created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const createAdmin = async (req, res) => {
  try {
    const { fullName, username, password } = req.body;
    const admin = new Admin({ fullName, username, password });
    await admin.save();
    res.send("Admin created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
const getEditManager = async (req, res) => {
  try {
    const id = req.params.id;
    const manager = await Manager.findById(id);
    if (!manager) {
      throw new Error("Manager not found");
    }
    res.render('editManager', { manager });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server Error" });
  }
};
const updateManager = async (req, res) => {
  const { id } = req.params;
  const { fullName, username, password } = req.body;
  try {
    const manager = await Manager.findByIdAndUpdate(id, { fullName, username, password }, { new: true });
    if (!manager) {
      return res.status(404).send("Manager not found");
    }
    res.send("Manager Updated Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
const getEditAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admin.findById(id);
    if (!admin) {
      throw new Error("Admin not found");
    }
    res.render('editAdmin', { admin });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server Error" });
  }
};
const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { fullName, username, password } = req.body;
  try {
    const admin = await Admin.findByIdAndUpdate(id, { fullName, username, password }, { new: true });
    if (!admin) {
      return res.status(404).send("Admin not found");
    }
    res.send("Admin updated Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const removeManager = async (req, res) => {
  const { id } = req.params;
  try {
    const manager = await Manager.findByIdAndDelete(id);
    if (!manager) {
      return res.status(404).send("Manager not found");
    }
    res.send("Manager Removed");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const removeAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return res.status(404).send("Admin not found");
    }
    res.send("Admin Removed");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
const removeStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.send("Student Removed");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = {
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
};
