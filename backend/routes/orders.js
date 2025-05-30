const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// 🔹 Получить все заказы (менеджер/админ)
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("car_id")
            .populate("client_id");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Получить заказы конкретного клиента
router.get("/client/:id", async (req, res) => {
    try {
        const orders = await Order.find({ client_id: req.params.id }).populate("car_id");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Создать новый заказ
router.post("/", async (req, res) => {
    try {
        const { client_id, car_id } = req.body;
        const newOrder = new Order({ client_id, car_id });
        const saved = await newOrder.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 🔹 Обновить статус заказа
router.put("/:id/status", async (req, res) => {
    try {
        const { status } = req.body;

        if (!["в ожидании", "завершён", "отменён"].includes(status)) {
            return res.status(400).json({ error: "Неверный статус" });
        }

        const updated = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate("car_id client_id");

        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
