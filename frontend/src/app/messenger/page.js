"use client";

import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000", {
    transports: ["websocket"],
});

export default function MessengerPage() {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const bottomRef = useRef(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        if (!user) return;

        // Загрузка истории сообщений от клиента (без менеджера)
        axios
            .get(`http://localhost:5000/api/messages/${user._id}/null`)
            .then(res => setMessages(res.data))
            .catch(console.error);

        // Подписка на входящие сообщения
        socket.on("newMessage", (msg) => {
            if (
                (msg.sender === user._id && msg.receiver === null) ||
                (msg.receiver === user._id)
            ) {
                setMessages(prev => [...prev, msg]);
            }
        });

        return () => {
            socket.off("newMessage");
        };
    }, [user]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (!text.trim() || !user?._id) return;

        const payload = {
            sender: user._id,
            receiver: null, // менеджер не указан
            text,
        };

        socket.emit("sendMessage", payload);
        setText("");
    };

    return (
        <main className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-white">Чат с менеджером</h1>

            <div className="h-96 overflow-y-auto border border-gray-700 p-4 bg-white rounded mb-4 shadow">
                {messages.map((msg) => (
                    <div
                        key={msg._id}
                        className={`mb-2 p-3 max-w-[75%] rounded-lg ${
                            msg.sender === user._id
                                ? "bg-blue-600 text-white ml-auto"
                                : "bg-gray-200 text-gray-900 mr-auto"
                        }`}
                    >
                        {msg.text}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <div className="flex gap-2">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Сообщение..."
                    className="flex-grow p-2 border border-gray-600 rounded bg-gray-100 text-black focus:outline-none"
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
                >
                    Отправить
                </button>
            </div>
        </main>
    );
}
