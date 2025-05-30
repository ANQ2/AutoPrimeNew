"use client";

import Link from "next/link";

export default function AdminDashboard() {
    return (
        <main className="max-w-xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Админ-панель</h1>

            <ul className="space-y-4">
                <li>
                    <Link
                        href="/admin/cars"
                        className="block p-4 bg-gray-800 text-white rounded hover:bg-gray-700"
                    >
                        🚗 Добавить автомобиль
                    </Link>
                </li>
                <li>
                    <Link
                        href="/admin/employees"
                        className="block p-4 bg-gray-800 text-white rounded hover:bg-gray-700"
                    >
                        👨‍💼 Менеджеры
                    </Link>
                </li>
                <li>
                    <Link
                        href="/admin/clients"
                        className="block p-4 bg-gray-800 text-white rounded hover:bg-gray-700"
                    >
                        👥 Клиенты
                    </Link>
                </li>
                <li>
                    <Link
                        href="/admin/supplies"
                        className="block p-4 bg-gray-800 text-white rounded hover:bg-gray-700"
                    >
                        📦 Поставки (опционально)
                    </Link>
                </li>
            </ul>
        </main>
    );
}
