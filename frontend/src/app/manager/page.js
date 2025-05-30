"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ManagerPanel() {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            const parsed = JSON.parse(stored);
            setUser(parsed);

            if (parsed.role === "менеджер" || parsed.role === "админ") {
                fetchOrders();
            }
        }
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/orders");
            setOrders(res.data);
        } catch (err) {
            console.error("Ошибка загрузки заказов:", err);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, {
                status: newStatus,
            });
            fetchOrders(); // Обновим список
        } catch (err) {
            console.error("Ошибка обновления статуса:", err);
        }
    };

    if (!user || (user.role !== "менеджер" && user.role !== "админ")) {
        return <p className="p-6 text-red-600">Нет доступа</p>;
    }

    return (
        <main className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Панель менеджера</h1>

            {orders.length === 0 ? (
                <p>Заявки отсутствуют.</p>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order._id} className="p-4 border rounded shadow bg-gray-100">
                            <h2 className="text-xl font-semibold mb-1">
                                {order.car_id?.brand} {order.car_id?.model}
                            </h2>
                            <p><strong>Клиент:</strong> {order.client_id?.full_name}</p>
                            <p><strong>Email:</strong> {order.client_id?.email}</p>
                            <p><strong>Телефон:</strong> {order.client_id?.phone}</p>
                            <p><strong>Дата:</strong> {new Date(order.order_date).toLocaleDateString()}</p>

                            <div className="mt-2">
                                <label className="mr-2 font-medium">Статус:</label>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    className="p-1 rounded border"
                                >
                                    <option value="в ожидании">в ожидании</option>
                                    <option value="завершён">завершён</option>
                                    <option value="отменён">отменён</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
