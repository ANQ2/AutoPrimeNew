"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function SuppliesPage() {
  const [supplies, setSupplies] = useState([]);
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({ car_id: "", supplier_name: "", quantity: 1 });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);

      if (parsed.role === "admin") {
        fetchSupplies();
        fetchCars();
      }
    }
  }, []);

  const fetchSupplies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/supplies");
      setSupplies(res.data);
    } catch (err) {
      console.error("Ошибка загрузки поставок:", err);
    }
  };

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cars");
      setCars(res.data);
    } catch (err) {
      console.error("Ошибка загрузки авто:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/supplies", form);
      setForm({ car_id: "", supplier_name: "", quantity: 1 });
      fetchSupplies();
    } catch (err) {
      console.error("Ошибка добавления поставки:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Вы точно хотите удалить поставку?")) {
      try {
        await axios.delete(`http://localhost:5000/api/supplies/${id}`);
        fetchSupplies(); // Обновить список
      } catch (err) {
        console.error("Ошибка удаления поставки:", err);
      }
    }
  };

  if (!user || user.role !== "admin") {
    return <p className="p-6 text-red-600">Нет доступа</p>;
  }

  return (
      <main className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Поставки</h1>

        <form onSubmit={handleSubmit} className="mb-8 space-y-4 bg-gray-100 p-4 rounded">
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

          <div>
            <label className="block font-medium">Поставщик</label>
            <input
                type="text"
                value={form.supplier_name}
                onChange={(e) => setForm({ ...form, supplier_name: e.target.value })}
                className="w-full p-2 border rounded"
                required
            />
          </div>

          <div>
            <label className="block font-medium">Количество</label>
            <input
                type="number"
                value={form.quantity || ""}
                onChange={(e) =>
                    setForm({
                      ...form,
                      quantity: e.target.value === "" ? "" : parseInt(e.target.value),
                    })
                }
            />
          </div>

          <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Добавить поставку
          </button>
        </form>

        <h2 className="text-xl font-semibold mb-2">История поставок</h2>
        {supplies.length === 0 ? (
            <p>Поставок пока нет.</p>
        ) : (
            <ul className="space-y-3">
              {supplies.map((supply) => (
                  <li
                      key={supply._id}
                      className="border p-3 rounded bg-white shadow text-sm"
                  >
                    <p><strong>Авто:</strong> {supply.car_id?.brand} {supply.car_id?.model}</p>
                    <p><strong>Поставщик:</strong> {supply.supplier_name}</p>
                    <p><strong>Количество:</strong> {supply.quantity}</p>
                    <p><strong>Дата:</strong> {new Date(supply.supply_date).toLocaleDateString()}</p>
                    <button
                        onClick={() => handleDelete(supply._id)}
                        className="mt-2 text-red-600 hover:underline"
                    >
                      Удалить
                    </button>
                  </li>
              ))}
            </ul>
        )}
      </main>
  );
}
