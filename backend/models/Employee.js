const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    position: { type: String, enum: ['админ', 'менеджер'], required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model("Employee", employeeSchema);
