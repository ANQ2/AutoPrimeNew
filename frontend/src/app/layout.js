import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
    title: "AutoPrime",
    description: "Автосалон — MERN/Next.js проект",
};

export default function RootLayout({ children }) {
    return (
        <html lang="ru">
        <body>
        <Header />
        {children}
        </body>
        </html>
    );
}
