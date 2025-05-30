"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RegisterPage() {
    const [form, setForm] = useState({
        full_name: "",
        email: "",
        phone: "",
        password: "",
    });

    const [msg, setMsg] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setMsg("");

        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", form);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            setMsg("Регистрация успешна!");
            router.push("/client");
        } catch (err) {
            console.error(err);
            setMsg("Ошибка регистрации");
        }
    };

    return (
        <main className="max-w-sm mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Регистрация клиента</h1>
            <form onSubmit={handleRegister} className="space-y-4">
                <input
                    name="full_name"
                    placeholder="ФИО"
                    className="w-full p-2 border rounded"
                    onChange={handleChange}
                />
                <input
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    onChange={handleChange}
                />
                <input
                    name="phone"
                    placeholder="Телефон"
                    className="w-full p-2 border rounded"
                    onChange={handleChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    className="w-full p-2 border rounded"
                    onChange={handleChange}
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Зарегистрироваться</button>
            </form>
            {msg && <p className="mt-4">{msg}</p>}
        </main>
    );
}
