"use client";

import { useState } from "react";
import axios from "axios";
import { UploadButton } from "@/lib/uploadthing"; // убедись, что файл реально есть

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
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Добавить автомобиль
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="brand"
            placeholder="Марка"
            value={form.brand}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="model"
            placeholder="Модель"
            value={form.model}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="year"
            type="number"
            placeholder="Год"
            value={form.year}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Цена"
            value={form.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="в наличии">в наличии</option>
            <option value="продано">продано</option>
          </select>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Изображение</label>
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
                className="mt-4 w-full h-48 object-cover rounded-lg"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition"
          >
            {loading ? "Загрузка..." : "Добавить авто"}
          </button>
        </form>

        {msg && (
          <p className="mt-4 text-center text-sm text-green-700 font-medium">{msg}</p>
        )}
      </div>
    </main>
  );
}
