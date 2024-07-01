const mongoose = require("mongoose");

const superAdminSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

const SuperAdmin = mongoose.model("SuperAdmin", superAdminSchema);

module.exports = SuperAdmin
