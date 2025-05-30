"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ClientsPage() {
    const [clients, setClients] = useState([]);

    const fetchClients = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/clients");
            setClients(res.data);
        } catch (err) {
            console.error("Ошибка загрузки клиентов", err);
        }
    };

    const updateRole = async (id, newRole) => {
        try {
            await axios.put(`http://localhost:5000/api/clients/${id}/role`, { role: newRole });
            fetchClients();
        } catch (err) {
            console.error("Ошибка обновления роли", err);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <main className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Клиенты</h1>

            {clients.map(client => (
                <div key={client._id} className="border rounded p-4 mb-4 bg-gray-800 text-white">
                    <p><strong>ФИО:</strong> {client.full_name}</p>
                    <p><strong>Email:</strong> {client.email}</p>
                    <p><strong>Телефон:</strong> {client.phone}</p>
                    <p><strong>Роль:</strong> {client.role}</p>

                    <select
                        value={client.role}
                        onChange={(e) => updateRole(client._id, e.target.value)}
                        className="mt-2 bg-white text-black p-1 rounded"
                    >
                        <option value="client">client</option>
                        <option value="admin">admin</option>
                    </select>
                </div>
            ))}
        </main>
    );
}
