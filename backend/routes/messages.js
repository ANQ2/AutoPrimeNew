const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Получить список уникальных отправителей
router.get("/senders", async (req, res) => {
    try {
        const messages = await Message.find({ receiver: null }); // клиенты пишут менеджерам

        const uniqueSenderIds = [
            ...new Set(messages.map((msg) => msg.sender)),
        ];

        res.json(uniqueSenderIds);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Получить переписку между двумя пользователями
router.get("/:user1/:user2", async (req, res) => {
    try {
        const { user1, user2 } = req.params;

        const messages = await Message.find({
            $or: [
                { sender: user1, receiver: user2 },
                { sender: user2, receiver: user1 }
            ]
        }).sort({ timestamp: 1 });

        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) return res.status(404).json({ error: "Клиент не найден" });

        res.json(client);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
