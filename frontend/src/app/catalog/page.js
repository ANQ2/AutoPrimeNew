"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function CatalogPage() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:5000/api/cars")
            .then(res => {
                setCars(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Ошибка загрузки авто:", err);
                setLoading(false);
            });
    }, []);

    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold mb-4">Каталог автомобилей</h1>

            {loading ? (
                <p>Загрузка...</p>
            ) : cars.length === 0 ? (
                <p>Нет доступных автомобилей.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {cars.map(car => (
                        <div key={car._id} className="border rounded-lg p-4 shadow">
                            {car.imageUrl && (
                                <img
                                    src={car.imageUrl}
                                    alt={`${car.brand} ${car.model}`}
                                    className="w-full h-40 object-cover mb-2 rounded"
                                />
                            )}
                            <h2 className="text-xl font-semibold">{car.brand} {car.model}</h2>
                            <p>Год: {car.year}</p>
                            <p>Цена: ${car.price}</p>
                            <p className="text-sm text-gray-600">Статус: {car.status}</p>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
