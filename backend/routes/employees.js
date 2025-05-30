const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");

// 🔐 Регистрация менеджера (только админ будет использовать)
router.post("/register", async (req, res) => {
    try {
        const { full_name, email, password, position } = req.body;

        const existing = await Employee.findOne({ email });
        if (existing) return res.status(400).json({ error: "Почта уже существует" });

        const hashed = await bcrypt.hash(password, 10);
        const employee = new Employee({ full_name, email, password: hashed, position });
        await employee.save();

        res.status(201).json({ message: "Менеджер зарегистрирован" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 📋 Получить всех сотрудников (для админ-панели)
router.get("/", async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
