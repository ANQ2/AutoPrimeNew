"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeesAdminPage() {
    const [form, setForm] = useState({
        full_name: "",
        email: "",
        password: "",
        position: "менеджер",
    });
    const [employees, setEmployees] = useState([]);
    const [msg, setMsg] = useState("");

    const fetchEmployees = () => {
        axios.get("http://localhost:5000/api/employees")
            .then(res => setEmployees(res.data))
            .catch(err => console.error("Ошибка загрузки сотрудников:", err));
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");

        try {
            await axios.post("http://localhost:5000/api/employees/register", form);
            setMsg("Менеджер добавлен!");
            setForm({ full_name: "", email: "", password: "", position: "менеджер" });
            fetchEmployees();
        } catch (err) {
            console.error(err);
            setMsg("Ошибка при добавлении");
        }
    };

    return (
        <main className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Сотрудники</h1>

            <form onSubmit={handleSubmit} className="space-y-4 mb-8 p-4 border rounded shadow">
                <h2 className="text-xl font-semibold">Добавить менеджера</h2>
                <input name="full_name" placeholder="ФИО" className="w-full p-2 border rounded" onChange={handleChange} value={form.full_name} />
                <input name="email" placeholder="Email" className="w-full p-2 border rounded" onChange={handleChange} value={form.email} />
                <input name="password" placeholder="Пароль" type="password" className="w-full p-2 border rounded" onChange={handleChange} value={form.password} />
                <button className="bg-green-600 text-white px-4 py-2 rounded">Добавить</button>
                {msg && <p className="text-sm mt-2 text-blue-700">{msg}</p>}
            </form>

            <h2 className="text-xl font-semibold mb-2">Список сотрудников</h2>
            {employees.map(emp => (
                <div key={emp._id} className="p-3 border rounded mb-2 shadow">
                    <p><strong>ФИО:</strong> {emp.full_name}</p>
                    <p><strong>Email:</strong> {emp.email}</p>
                    <p><strong>Роль:</strong> {emp.position}</p>
                </div>
            ))}
        </main>
    );
}
