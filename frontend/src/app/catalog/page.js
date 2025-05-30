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
    axios
      .get("http://localhost:5000/api/cars")
      .then((res) => {
        setCars(res.data);
        setLoading(false);
      })
      .catch((err) => {
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
        car_id: carId,
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
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Каталог автомобилей
        </h1>

        {msg && (
          <p className="text-center text-green-600 mb-6 font-medium">{msg}</p>
        )}

        {loading ? (
          <p className="text-center text-gray-500">Загрузка...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div
                key={car._id}
                className="bg-white rounded-xl shadow hover:shadow-md transition-shadow p-5"
              >
                {car.imageUrl && (
                  <img
                    src={car.imageUrl}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}

                <h2 className="text-xl font-bold text-gray-800">
                  {car.brand} {car.model}
                </h2>
                <p className="text-gray-700">Год: {car.year}</p>
                <p className="text-gray-700 mb-1">Цена: ${car.price}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Статус: {car.status}
                </p>

                {/* Заявка */}
                {car.status === "в наличии" && user?.role === "client" && (
                  <button
                    onClick={() => handleOrder(car._id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                  >
                    Оформить заявку
                  </button>
                )}

                {/* Кнопки для менеджера/админа */}
                {(isAdmin || isManager) && (
                  <div className="flex justify-between items-center mt-4 text-sm text-blue-600 font-medium">
                    <button
                      onClick={() =>
                        router.push(`/admin/cars/edit/${car._id}`)
                      }
                      className="hover:underline"
                    >
                       Редактировать
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => handleDelete(car._id)}
                        className="text-red-500 hover:underline"
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
      </div>
    </main>
  );
}
