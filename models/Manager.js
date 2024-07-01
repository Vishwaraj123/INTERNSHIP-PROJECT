const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

const Manager = mongoose.model("Manager", managerSchema);

module.exports = Manager;