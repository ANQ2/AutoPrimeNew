const mongoose = require("mongoose");

const supplySchema = new mongoose.Schema({
    car_id: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    supply_date: { type: Date, default: Date.now },
    supplier_name: { type: String, required: true },
    quantity: { type: Number, default: 1 } // ← добавили количество
});

module.exports = mongoose.model("Supply", supplySchema);
