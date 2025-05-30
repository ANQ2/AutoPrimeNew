const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["client", "admin"], default: "client" } // 👈 ДОБАВЛЕНО
});

module.exports = mongoose.model("Client", clientSchema);
