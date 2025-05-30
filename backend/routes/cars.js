const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

// Получить все авто
router.get("/", async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Добавить новое авто
router.post("/", async (req, res) => {
    try {
        const newCar = new Car(req.body);
        const savedCar = await newCar.save();
        res.status(201).json(savedCar);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Получить одно авто
router.get("/:id", async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ error: "Авто не найдено" });
        res.json(car);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Обновить авто
router.put("/:id", async (req, res) => {
    try {
        const updated = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Удалить авто
router.delete("/:id", async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id);
        res.json({ message: "Авто удалено" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
