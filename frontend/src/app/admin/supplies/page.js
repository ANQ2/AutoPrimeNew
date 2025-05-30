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
        <main className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Поставки</h1>

            {supplies.map(supply => (
                <div key={supply._id} className="border rounded p-4 mb-4 bg-gray-800 text-white">
                    <p><strong>Поставщик:</strong> {supply.supplier_name}</p>
                    <p><strong>Дата:</strong> {new Date(supply.supply_date).toLocaleDateString()}</p>
                    <p><strong>Авто ID:</strong> {supply.car_id}</p>
                </div>
            ))}
        </main>
    );
}
