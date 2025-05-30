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
    axios
      .get("http://localhost:5000/api/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Ошибка загрузки сотрудников:", err));
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
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <section className="bg-white p-6 rounded-xl shadow">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Управление сотрудниками
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Добавить менеджера
            </h2>
            <input
              name="full_name"
              placeholder="ФИО"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={form.full_name}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={form.email}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Пароль"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={form.password}
              required
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
            >
              Добавить
            </button>
            {msg && (
              <p className="text-sm mt-2 text-green-600 font-medium">{msg}</p>
            )}
          </form>
        </section>

        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Список сотрудников
          </h2>
          {employees.length === 0 ? (
            <p className="text-gray-600">Сотрудников пока нет.</p>
          ) : (
            <ul className="space-y-4">
              {employees.map((emp) => (
                <li
                  key={emp._id}
                  className="border border-gray-200 p-4 rounded-lg shadow-sm bg-gray-50"
                >
                  <p>
                    <span className="font-medium text-gray-700">ФИО:</span>{" "}
                    {emp.full_name}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Email:</span>{" "}
                    {emp.email}
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">Роль:</span>{" "}
                    {emp.position}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
