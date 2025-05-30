"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function EditCarPage() {
    const { id } = useParams();
    const router = useRouter();

    const [form, setForm] = useState({
        brand: "",
        model: "",
        year: "",
        price: "",
        status: "в наличии",
    });
    const [msg, setMsg] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:5000/api/cars/${id}`)
            .then(res => setForm(res.data))
            .catch(err => console.error("Ошибка загрузки авто:", err));
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:5000/api/cars/${id}`, form);
            setMsg("Авто обновлено");
            setTimeout(() => router.push("/catalog"), 1000);
        } catch (err) {
            console.error("Ошибка при обновлении:", err);
            setMsg("Ошибка при обновлении");
        }
    };

    return (
        <main className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Редактировать авто</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    placeholder="Марка"
                    className="w-full p-2 border rounded"
                />
                <input
                    name="model"
                    value={form.model}
                    onChange={handleChange}
                    placeholder="Модель"
                    className="w-full p-2 border rounded"
                />
                <input
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    placeholder="Год"
                    className="w-full p-2 border rounded"
                />
                <input
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Цена"
                    className="w-full p-2 border rounded"
                />
                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="в наличии">в наличии</option>
                    <option value="продано">продано</option>
                </select>

                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Сохранить
                </button>

                {msg && <p className="text-green-400 mt-2">{msg}</p>}
            </form>
        </main>
    );
}
