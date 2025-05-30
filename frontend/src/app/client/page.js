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

    axios
      .get(`http://localhost:5000/api/orders/client/${parsedUser._id}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Ошибка получения заказов:", err));
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Личный кабинет клиента
        </h1>

        {user && (
          <section className="bg-white p-6 rounded-xl shadow mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ваш профиль</h2>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-medium">ФИО:</span> {user.full_name}</p>
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Роль:</span> {user.role}</p>
            </div>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Мои заказы</h2>

          {orders.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow text-gray-600">
              У вас пока нет заказов.
            </div>
          ) : (
            <div className="grid gap-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {order.car_id?.brand} {order.car_id?.model}
                  </h3>
                  <div className="text-gray-700 space-y-1">
                    <p>Цена: <span className="font-medium">${order.car_id?.price}</span></p>
                    <p>Дата: <span className="font-medium">{new Date(order.order_date).toLocaleDateString()}</span></p>
                    <p>Статус: <span className="font-semibold text-blue-600">{order.status}</span></p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
