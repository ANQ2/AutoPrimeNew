const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");
const Message = require("./models/Message");

const carRoutes = require("./routes/cars");
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orders");
const employeeRoutes = require("./routes/employees");
const clientRoutes = require("./routes/clients");
const supplyRoutes = require("./routes/supplies");
const messageRoutes = require("./routes/messages");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/supplies", supplyRoutes);
app.use("/api/messages", messageRoutes);

// WebSocket
io.on("connection", (socket) => {
    console.log("🟢 Новый пользователь подключен");

    socket.on("sendMessage", async (data) => {
        const { sender, receiver, text } = data;

        try {
            const message = new Message({
                sender,
                receiver: receiver || null, // гарантируем null, а не "null"
                text,
            });

            const saved = await message.save();
            io.emit("newMessage", saved);
        } catch (err) {
            console.error("Ошибка при сохранении сообщения:", err);
        }
    });

    socket.on("disconnect", () => {
        console.log("🔴 Пользователь отключен");
    });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB подключен"))
    .catch(err => console.error("❌ Ошибка подключения MongoDB:", err));

// Тестовый endpoint
app.get("/", (req, res) => {
    res.send("✅ Backend работает!");
});

// Server start
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
});
