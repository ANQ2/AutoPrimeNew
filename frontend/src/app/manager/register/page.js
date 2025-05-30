"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ManagerRegister() {
    const [form, setForm] = useState({
        full_name: "",
        email: "",
        password: "",
        position: "менеджер",
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
            const res = await axios.post("http://localhost:5000/api/employees/register", form);
            setMsg("Менеджер зарегистрирован!");
            router.push("/manager/login");
        } catch (err) {
            console.error(err);
            setMsg("Ошибка регистрации");
        }
    };

    return (
        <main className="max-w-sm mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Регистрация менеджера</h1>
            <form onSubmit={handleRegister} className="space-y-4">
                <input name="full_name" placeholder="ФИО" onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="password" type="password" placeholder="Пароль" onChange={handleChange} className="w-full p-2 border rounded" />
                <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Зарегистрироваться</button>
            </form>
            {msg && <p className="mt-4">{msg}</p>}
        </main>
    );
}
