const SuperAdmin = require("../models/SuperAdmin");
const Manager = require("../models/Manager");
const Student = require("../models/Student");

// CRUD operations for all users
const getAllUsers = async (req, res) => {
  try {
    const managers = await Manager.find();
    const students = await Student.find();
    const superAdmins = await SuperAdmin.find();
    res.json({ managers, students, superAdmins });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const createUser = async (req, res) => {

  try {
    const { fullName, username, password, role } = req.body;
    if (role === "manager") {
      const manager = new Manager({ fullName, username, password });
      await manager.save();
      res.send("Manager created successfully");
    } else if (role === "student") {
      const student = new Student({ fullName, username, password });
      await student.save();
      res.send("Student created successfully");
    } else {
      const superAdmin = new SuperAdmin({ fullName, username, password });
      await superAdmin.save();
      res.send("Super Admin created successfully");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
  
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { fullName, username, password, role } = req.body;
  try {
    if (role === "manager") {
      const manager = await Manager.findByIdAndUpdate(id, { fullName, username, password }, { new: true });
      if (!manager) {
        return res.status(404).send("Manager not found");
      }
      res.json(manager);
    } else if (role === "student") {
      const student = await Student.findByIdAndUpdate(id, { fullName, username, password }, { new: true });
      if (!student) {
        return res.status(404).send("Student not found");
      }
      res.json(student);
    } else {
      const superAdmin = await SuperAdmin.findByIdAndUpdate(id, { fullName, username, password }, { new: true });
      if (!superAdmin) {
        return res.status(404).send("Super Admin not found");
      }
      res.json(superAdmin);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }

};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await SuperAdmin.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
