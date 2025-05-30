const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    car_id: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    order_date: { type: Date, default: Date.now },
    status: { type: String, enum: ["в ожидании", "завершён", "отменён"], default: "в ожидании" }
});

module.exports = mongoose.model("Order", orderSchema);
