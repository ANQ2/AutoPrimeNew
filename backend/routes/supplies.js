const express = require("express");
const router = express.Router();
const Supply = require("../models/Supply");

// Получить все поставки с данными об автомобиле
router.get("/", async (req, res) => {
    try {
        const supplies = await Supply.find().populate("car_id");
        res.json(supplies);
    } catch (err) {
        res.status(500).json({ error: "Ошибка при получении поставок" });
    }
});

// Добавить новую поставку
router.post("/", async (req, res) => {
    try {
        const { car_id, supplier_name, quantity } = req.body;

        if (!car_id || !supplier_name) {
            return res.status(400).json({ error: "car_id и supplier_name обязательны" });
        }

        const supply = new Supply({
            car_id,
            supplier_name,
            quantity: quantity || 1 // по умолчанию 1
        });

        const saved = await supply.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: "Ошибка при добавлении поставки" });
    }
});

// Удалить поставку
router.delete("/:id", async (req, res) => {
    try {
        await Supply.findByIdAndDelete(req.params.id);
        res.json({ message: "Поставка удалена" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
