import Link from "next/link";
import { CarFront, ShieldCheck, Clock } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-gray-50 text-gray-800">
      {/* Hero-блок */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl font-bold mb-4">Добро пожаловать в AutoPrime</h1>
        <p className="text-lg mb-6 text-gray-600">
          Управление автосалоном в один клик — быстро, удобно, эффективно.
        </p>
        <Link href="/catalog">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition">
            Перейти в каталог
          </button>
        </Link>
      </section>

      {/* Преимущества */}
      <section className="max-w-5xl mx-auto py-12 px-4 grid sm:grid-cols-3 gap-8 text-center">
        <div className="flex flex-col items-center">
          <CarFront className="w-10 h-10 text-blue-600 mb-2" />
          <h3 className="font-semibold text-lg">200+ авто</h3>
          <p className="text-sm text-gray-500">Большой выбор моделей в наличии</p>
        </div>
        <div className="flex flex-col items-center">
          <ShieldCheck className="w-10 h-10 text-blue-600 mb-2" />
          <h3 className="font-semibold text-lg">Надёжность</h3>
          <p className="text-sm text-gray-500">Безопасная система оформления</p>
        </div>
        <div className="flex flex-col items-center">
          <Clock className="w-10 h-10 text-blue-600 mb-2" />
          <h3 className="font-semibold text-lg">Онлайн 24/7</h3>
          <p className="text-sm text-gray-500">Заявки обрабатываются мгновенно</p>
        </div>
      </section>

      {/* Контактный блок */}
      <footer className="text-center py-8 text-sm text-gray-500 border-t bg-white">
        © {new Date().getFullYear()} AutoPrime. Все права защищены.
      </footer>
    </main>
  );
}
