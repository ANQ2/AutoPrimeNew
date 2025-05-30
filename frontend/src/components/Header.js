"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
    };

    return (
        <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
            <div className="text-xl font-bold">
                <Link href="/">AutoPrime</Link>
            </div>
            <nav className="space-x-4 flex items-center">
                <Link href="/catalog">Каталог</Link>

                {/* Чат для клиента */}
                {user?.role === "client" && (
                    <>
                        <Link href="/client">Кабинет</Link>
                        <Link href="/messenger">Чат с менеджером</Link>
                    </>
                )}

                {/* Чат для менеджера */}
                {user?.role === "менеджер" && (
                    <>
                        <Link href="/manager">Менеджер</Link>
                        <Link href="/messages-panel">Чат клиентов</Link>
                    </>
                )}

                {/* Чат для админа */}
                {user?.role === "admin" || user?.role === "админ" ? (
                    <>
                        <Link href="/admin">Админ</Link>
                        <Link href="/messages-panel">Чат клиентов</Link>
                    </>
                ) : null}

                {/* Гостевой доступ */}
                {!user && (
                    <>
                        <Link href="/login">Вход</Link>
                        <Link href="/register">Регистрация</Link>
                    </>
                )}

                {/* Кнопка выхода */}
                {user && (
                    <button
                        onClick={handleLogout}
                        className="underline text-red-400 ml-2"
                    >
                        Выйти
                    </button>
                )}
            </nav>
        </header>
    );
}
