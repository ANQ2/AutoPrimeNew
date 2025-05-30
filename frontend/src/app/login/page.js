"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMsg("");

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });

            const user = res.data.user;

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(user));

            // Переход в зависимости от роли
            if (user.role === "client") router.push("/client");
            else if (user.role === "менеджер") router.push("/manager");
            else if (user.role === "админ" || user.role === "admin") router.push("/admin");
            else setMsg("Неизвестная роль");

        } catch (err) {
            console.error(err);
            setMsg("Неверный логин или пароль");
        }
    };

    return (
        <main className="max-w-sm mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Вход</h1>
            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    className="w-full p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Войти</button>
            </form>
            {msg && <p className="mt-4 text-red-600">{msg}</p>}
        </main>
    );
}
