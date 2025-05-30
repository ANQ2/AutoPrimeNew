"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function ClientDashboard() {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (!stored) return;

        const parsedUser = JSON.parse(stored);
        setUser(parsedUser);

        axios.get(`http://localhost:5000/api/orders/client/${parsedUser._id}`)
            .then((res) => setOrders(res.data))
            .catch((err) => console.error("Ошибка получения заказов:", err));
    }, []);

    return (
        <main className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Личный кабинет клиента</h1>

            {user && (
                <div className="mb-6 p-4 border rounded shadow bg-gray-50">
                    <h2 className="text-xl font-semibold mb-2">Ваш профиль</h2>
                    <p><strong>ФИО:</strong> {user.full_name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Роль:</strong> {user.role}</p>
                </div>
            )}

            <h2 className="text-2xl font-semibold mb-4">Мои заказы</h2>

            {orders.length === 0 ? (
                <p>У вас пока нет заказов.</p>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order._id} className="p-4 border rounded shadow">
                            <h3 className="text-lg font-bold">
                                {order.car_id?.brand} {order.car_id?.model}
                            </h3>
                            <p>Цена: ${order.car_id?.price}</p>
                            <p>Дата: {new Date(order.order_date).toLocaleDateString()}</p>
                            <p>Статус: <span className="font-semibold">{order.status}</span></p>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
