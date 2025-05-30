"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000", {
    transports: ["websocket"],
});

export default function ChatWithClient() {
    const params = useParams();
    const clientId = params.id;

    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const bottomRef = useRef(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (!user || !clientId) return;

        axios
            .get(`http://localhost:5000/api/messages/conversation/${clientId}/${user._id}`)
            .then((res) => setMessages(res.data))
            .catch(console.error);

        socket.on("newMessage", (msg) => {
            const relevant =
                (msg.sender === user._id && msg.receiver === clientId) ||
                (msg.sender === clientId && (msg.receiver === user._id || msg.receiver === null));

            if (relevant) {
                setMessages((prev) => [...prev, msg]);
            }
        });

        return () => {
            socket.off("newMessage");
        };
    }, [user, clientId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (!text.trim() || !user || !clientId) return;

        socket.emit("sendMessage", {
            sender: user._id,
            receiver: clientId,
            text,
        });

        setText("");
    };

    return (
        <main className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-white">Чат с клиентом</h1>

            <div className="h-96 overflow-y-auto border border-gray-700 p-4 bg-white rounded mb-4 shadow">
                {messages.map((msg) => (
                    <div
                        key={msg._id}
                        className={`mb-2 p-3 max-w-[75%] rounded-lg ${
                            msg.sender === user._id
                                ? "bg-green-600 text-white ml-auto"
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
                    className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
                >
                    Отправить
                </button>
            </div>
        </main>
    );
}
