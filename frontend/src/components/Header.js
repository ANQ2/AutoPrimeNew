"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow-sm border-b border-gray-200 transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between animate-fade-in">
          {/* Лого */}
          <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
            AutoPrime
          </Link>

          {/* Навигация */}
          <nav className="hidden md:flex gap-6 text-gray-700 text-sm font-medium">
            <Link href="/catalog" className="hover:text-blue-600 transition">Каталог</Link>

            {user?.role === "client" && (
                <>
                  <Link href="/client" className="hover:text-blue-600">Кабинет</Link>
                  <Link href="/messenger" className="hover:text-blue-600">Чат</Link>
                </>
            )}

            {user?.role === "менеджер" && (
                <>
                  <Link href="/manager" className="hover:text-blue-600">Менеджер</Link>
                  <Link href="/manager/supplies" className="hover:text-blue-600">Поставки</Link>
                  <Link href="/manager/create-order" className="hover:text-blue-600">Оффлайн-заявка</Link>
                  <Link href="/messages-panel" className="hover:text-blue-600">Чаты</Link>
                </>
            )}

            {(user?.role === "admin" || user?.role === "админ") && (
                <>
                  <Link href="/admin" className="hover:text-blue-600">Админ</Link>
                  <Link href="/messages-panel" className="hover:text-blue-600">Чаты</Link>
                </>
            )}

            {!user && (
                <>
                  <Link href="/login" className="hover:text-blue-600">Вход</Link>
                  <Link href="/register" className="hover:text-blue-600">Регистрация</Link>
                </>
            )}
          </nav>

          {/* Пользователь */}
          <div className="flex items-center gap-4">
            {user && (
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">
                    {user.full_name?.[0] || "U"}
                  </div>
                  <span>{user.full_name?.split(" ")[0]}</span>
                </div>
            )}
            {user && (
                <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Выйти"
                >
                  <LogOut className="w-5 h-5" />
                </button>
            )}
          </div>
        </div>
      </header>
  );
}
