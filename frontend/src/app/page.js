import Link from "next/link";

export default function Home() {
  return (
      <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Добро пожаловать в AutoPrime1</h1>
        <p className="text-lg mb-6">Управление автосалоном онлайн</p>
        <Link href="/catalog">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
            Перейти в каталог
          </button>
        </Link>
      </main>
  );
}
