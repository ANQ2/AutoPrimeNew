const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Client = require("../models/Client");
const Employee = require("../models/Employee");

const router = express.Router();

// Функция генерации JWT токена
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// 🔐 Регистрация клиента (только client)
router.post("/register", async (req, res) => {
    try {
        const { full_name, email, phone, password } = req.body;

        const existing = await Client.findOne({ email });
        if (existing) return res.status(400).json({ error: "Почта уже зарегистрирована" });

        const hashed = await bcrypt.hash(password, 10);
        const client = new Client({
            full_name,
            email,
            phone,
            password: hashed,
            role: "client" // 👈 фиксированная роль
        });

        await client.save();

        const token = generateToken({ id: client._id, role: "client" });
        res.json({
            token,
            user: {
                _id: client._id,
                full_name: client.full_name,
                email: client.email,
                phone: client.phone,
                role: client.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔑 Вход (для клиента и сотрудника)
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Попытка входа как клиент
        const client = await Client.findOne({ email });
        if (client && await bcrypt.compare(password, client.password)) {
            const token = generateToken({ id: client._id, role: client.role });
            return res.json({
                token,
                user: {
                    _id: client._id,
                    full_name: client.full_name,
                    email: client.email,
                    phone: client.phone,
                    role: client.role
                }
            });
        }

        // Попытка входа как сотрудник
        const employee = await Employee.findOne({ email });
        if (employee && await bcrypt.compare(password, employee.password)) {
            const token = generateToken({ id: employee._id, role: employee.position });
            return res.json({
                token,
                user: {
                    _id: employee._id,
                    full_name: employee.full_name,
                    email: employee.email,
                    role: employee.position
                }
            });
        }

        res.status(401).json({ error: "Неверные данные для входа" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
