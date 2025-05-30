const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ['в наличии', 'продано'], default: 'в наличии' },
    imageUrl: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model("Car", carSchema);
