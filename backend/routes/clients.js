const express = require("express");
const router = express.Router();
const Client = require("../models/Client");

// Получить всех клиентов
router.get("/", async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Обновить роль клиента
router.put("/:id/role", async (req, res) => {
    try {
        const { role } = req.body;
        if (!["client", "admin"].includes(role)) {
            return res.status(400).json({ error: "Недопустимая роль" });
        }

        const updated = await Client.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
