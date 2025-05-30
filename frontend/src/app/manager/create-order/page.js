"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function CreateOfflineOrderPage() {
    const [clients, setClients] = useState([]);
    const [cars, setCars] = useState([]);
    const [form, setForm] = useState({ client_id: "", car_id: "" });
    const [msg, setMsg] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            const parsed = JSON.parse(stored);
            setUser(parsed);

            if (parsed.role === "менеджер") {
                fetchClients();
                fetchCars();
            }
        }
    }, []);

    const fetchClients = async () => {
        const res = await axios.get("http://localhost:5000/api/clients");
        setClients(res.data);
    };

    const fetchCars = async () => {
        const res = await axios.get("http://localhost:5000/api/cars");
        setCars(res.data.filter((car) => car.status === "в наличии"));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/orders", form);
            setMsg("Заявка успешно оформлена!");
            setForm({ client_id: "", car_id: "" });
        } catch (err) {
            console.error("Ошибка:", err);
            setMsg("Ошибка оформления заявки");
        }
    };

    if (!user || user.role !== "менеджер") {
        return <p className="p-6 text-red-600">Нет доступа</p>;
    }

    return (
        <main className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Оформить оффлайн-заявку</h1>
            {msg && <p className="mb-4 text-green-600">{msg}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Клиент</label>
                    <select
                        value={form.client_id}
                        onChange={(e) => setForm({ ...form, client_id: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Выберите клиента</option>
                        {clients.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.full_name} ({c.email})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block font-medium">Автомобиль</label>
                    <select
                        value={form.car_id}
                        onChange={(e) => setForm({ ...form, car_id: e.target.value })}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Выберите авто</option>
                        {cars.map((car) => (
                            <option key={car._id} value={car._id}>
                                {car.brand} {car.model} ({car.year})
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Оформить заявку
                </button>
            </form>
        </main>
    );
}
