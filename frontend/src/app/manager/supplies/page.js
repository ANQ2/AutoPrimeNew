"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ManagerSuppliesPage() {
    const [supplies, setSupplies] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            const parsed = JSON.parse(stored);
            setUser(parsed);

            if (parsed.role === "менеджер") {
                fetchSupplies();
            }
        }
    }, []);

    const fetchSupplies = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/supplies");
            setSupplies(res.data);
        } catch (err) {
            console.error("Ошибка загрузки поставок:", err);
        }
    };

    if (!user || user.role !== "менеджер") {
        return <p className="p-6 text-red-600">Нет доступа</p>;
    }

    return (
        <main className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Поставки (только просмотр)</h1>

            {supplies.length === 0 ? (
                <p>Поставок пока нет.</p>
            ) : (
                <ul className="space-y-3">
                    {supplies.map((supply) => (
                        <li
                            key={supply._id}
                            className="border p-3 rounded bg-white shadow text-sm"
                        >
                            <p><strong>Авто:</strong> {supply.car_id?.brand} {supply.car_id?.model}</p>
                            <p><strong>Поставщик:</strong> {supply.supplier_name}</p>
                            <p><strong>Дата:</strong> {new Date(supply.supply_date).toLocaleDateString()}</p>
                            <p><strong>Количество:</strong> {supply.quantity || 1}</p>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
