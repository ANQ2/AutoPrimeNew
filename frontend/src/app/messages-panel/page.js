"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function MessagesPanel() {
    const [clientIds, setClientIds] = useState([]);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/messages/senders")
            .then(res => setClientIds(res.data))
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (clientIds.length === 0) return;

        // Загружаем данные о клиентах по id
        Promise.all(clientIds.map(id =>
            axios.get(`http://localhost:5000/api/clients/${id}`)
                .then(res => res.data)
                .catch(() => null) // если не найден
        )).then(setClients);
    }, [clientIds]);

    return (
        <main className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Клиенты, написавшие в чат</h1>

            {clients.length === 0 ? (
                <p className="text-gray-600">Нет активных сообщений от клиентов.</p>
            ) : (
                <ul className="space-y-2">
                    {clients.map((client) => (
                        client && (
                            <li
                                key={client._id}
                                className="flex justify-between items-center bg-gray-100 p-3 rounded"
                            >
                                <span>{client.full_name}</span>
                                <Link
                                    href={`/messenger/${client._id}`}
                                    className="text-blue-600 underline"
                                >
                                    Перейти в чат
                                </Link>
                            </li>
                        )
                    ))}
                </ul>
            )}
        </main>
    );
}