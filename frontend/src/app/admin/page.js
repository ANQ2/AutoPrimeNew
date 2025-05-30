"use client";

import { useState } from "react";
import axios from "axios";
import { UploadButton } from "@/lib/uploadthing"; // убедись, что путь правильный

export default function AddCarPage() {
    const [form, setForm] = useState({
        brand: "",
        model: "",
        year: "",
        price: "",
        status: "в наличии",
        imageUrl: "",
    });

    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg("");

        try {
            const newCar = {
                ...form,
                year: parseInt(form.year),
                price: parseFloat(form.price),
            };

            await axios.post("http://localhost:5000/api/cars", newCar);

            setMsg("Автомобиль добавлен!");
            setForm({
                brand: "",
                model: "",
                year: "",
                price: "",
                status: "в наличии",
                imageUrl: "",
            });
        } catch (err) {
            console.error(err);
            setMsg("Ошибка при добавлении");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Добавить автомобиль</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="brand" placeholder="Марка" value={form.brand} onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="model" placeholder="Модель" value={form.model} onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="year" placeholder="Год" type="number" value={form.year} onChange={handleChange} className="w-full p-2 border rounded" />
                <input name="price" placeholder="Цена" type="number" value={form.price} onChange={handleChange} className="w-full p-2 border rounded" />
                <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 border rounded">
                    <option value="в наличии">в наличии</option>
                    <option value="продано">продано</option>
                </select>

                <div>
                    <p className="mb-1">Загрузите изображение:</p>
                    <UploadButton
                        endpoint="carImageUploader"
                        onClientUploadComplete={(res) => {
                            if (res && res[0]?.url) {
                                setForm((prev) => ({ ...prev, imageUrl: res[0].url }));
                            }
                        }}
                        onUploadError={(error) => {
                            alert(`Ошибка загрузки: ${error.message}`);
                        }}
                    />
                    {form.imageUrl && (
                        <img
                            src={form.imageUrl}
                            alt="Превью"
                            className="mt-2 w-full h-40 object-cover rounded"
                        />
                    )}
                </div>

                <button disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    {loading ? "Загрузка..." : "Добавить авто"}
                </button>
            </form>
            {msg && <p className="mt-4">{msg}</p>}
        </main>
    );
}
