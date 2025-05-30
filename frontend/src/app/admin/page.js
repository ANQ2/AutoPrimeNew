"use client";

import Link from "next/link";
import { Car, Users, UserCog, Package } from "lucide-react";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Панель администратора
        </h1>

        <div className="grid sm:grid-cols-2 gap-6">
          <Link
            href="/admin/cars"
            className="flex items-center gap-4 p-6 bg-white rounded-xl shadow hover:shadow-lg hover:scale-[1.01] transition"
          >
            <Car className="text-blue-600 w-6 h-6" />
            <span className="text-lg text-gray-800 font-medium">
              Добавить автомобиль
            </span>
          </Link>

          <Link
            href="/admin/employees"
            className="flex items-center gap-4 p-6 bg-white rounded-xl shadow hover:shadow-lg hover:scale-[1.01] transition"
          >
            <UserCog className="text-green-600 w-6 h-6" />
            <span className="text-lg text-gray-800 font-medium">
              Менеджеры
            </span>
          </Link>

          <Link
            href="/admin/clients"
            className="flex items-center gap-4 p-6 bg-white rounded-xl shadow hover:shadow-lg hover:scale-[1.01] transition"
          >
            <Users className="text-purple-600 w-6 h-6" />
            <span className="text-lg text-gray-800 font-medium">Клиенты</span>
          </Link>

          <Link
            href="/admin/supplies"
            className="flex items-center gap-4 p-6 bg-white rounded-xl shadow hover:shadow-lg hover:scale-[1.01] transition"
          >
            <Package className="text-yellow-600 w-6 h-6" />
            <span className="text-lg text-gray-800 font-medium">
              Поставки (опционально)
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
