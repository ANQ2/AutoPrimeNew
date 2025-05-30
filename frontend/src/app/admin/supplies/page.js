"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function SuppliesPage() {
  const [supplies, setSupplies] = useState([]);

  const fetchSupplies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/supplies");
      setSupplies(res.data);
    } catch (err) {
      console.error("Ошибка загрузки поставок", err);
    }
  };

  useEffect(() => {
    fetchSupplies();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          История поставок
        </h1>

        {supplies.length === 0 ? (
          <p className="text-center text-gray-600">
            Поставки не найдены.
          </p>
        ) : (
          <ul className="space-y-6">
            {supplies.map((supply) => (
              <li
                key={supply._id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-shadow"
              >
                <p className="text-gray-800">
                  <span className="font-semibold">Поставщик:</span>{" "}
                  {supply.supplier_name}
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold">Дата поставки:</span>{" "}
                  {new Date(supply.supply_date).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold">ID автомобиля:</span>{" "}
                  {supply.car_id}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
