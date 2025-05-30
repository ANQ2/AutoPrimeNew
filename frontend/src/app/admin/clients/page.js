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
      await axios.put(`http://localhost:5000/api/clients/${id}/role`, {
        role: newRole,
      });
      fetchClients();
    } catch (err) {
      console.error("Ошибка обновления роли", err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Список клиентов
        </h1>

        {clients.length === 0 ? (
          <p className="text-gray-600 text-center">Клиенты не найдены.</p>
        ) : (
          <ul className="grid md:grid-cols-2 gap-6">
            {clients.map((client) => (
              <li
                key={client._id}
                className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-1 text-gray-700">
                  <p>
                    <span className="font-semibold text-gray-800">ФИО:</span>{" "}
                    {client.full_name}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">Email:</span>{" "}
                    {client.email}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">Телефон:</span>{" "}
                    {client.phone}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-800">Текущая роль:</span>{" "}
                    <span
                      className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                        client.role === "admin"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {client.role}
                    </span>
                  </p>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Изменить роль:
                  </label>
                  <select
                    value={client.role}
                    onChange={(e) => updateRole(client._id, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="client">Клиент</option>
                    <option value="admin">Администратор</option>
                  </select>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
