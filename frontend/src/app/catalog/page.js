"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CatalogPage() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [msg, setMsg] = useState("");
    const router = useRouter();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);

        fetchCars();
    }, []);

    const fetchCars = () => {
        axios.get("http://localhost:5000/api/cars")
            .then(res => {
                setCars(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Ошибка загрузки авто:", err);
                setLoading(false);
            });
    };

    const handleOrder = async (carId) => {
        if (!user?._id) {
            setMsg("Необходимо войти в систему.");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/orders", {
                client_id: user._id,
                car_id: carId
            });

            setMsg("Заявка оформлена!");
        } catch (err) {
            console.error(err);
            setMsg("Ошибка при оформлении заявки");
        }
    };

    const handleDelete = async (carId) => {
        if (!confirm("Удалить авто?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/cars/${carId}`);
            fetchCars();
        } catch (err) {
            console.error("Ошибка удаления авто", err);
        }
    };

    const isAdmin = user?.role === "admin" || user?.role === "админ";
    const isManager = user?.role === "менеджер";

    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold mb-4">Каталог автомобилей</h1>
            {msg && <p className="mb-4 text-green-600">{msg}</p>}

            {loading ? (
                <p>Загрузка...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {cars.map(car => (
                        <div key={car._id} className="border rounded-lg p-4 shadow bg-gray-800 text-white">
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
                            <p className="text-sm text-gray-400 mb-2">Статус: {car.status}</p>

                            {car.status === "в наличии" && user?.role === "client" && (
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-2"
                                    onClick={() => handleOrder(car._id)}
                                >
                                    Оформить заявку
                                </button>
                            )}

                            {(isAdmin || isManager) && (
                                <div className="flex gap-3 mt-2">
                                    <button
                                        className="text-blue-400 hover:text-blue-600"
                                        onClick={() => router.push(`/admin/cars/edit/${car._id}`)}
                                    >
                                        Редактировать
                                    </button>

                                    {isAdmin && (
                                        <button
                                            className="text-red-400 hover:text-red-600"
                                            onClick={() => handleDelete(car._id)}
                                        >
                                            Удалить
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
