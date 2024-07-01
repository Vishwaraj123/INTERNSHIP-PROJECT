const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin
