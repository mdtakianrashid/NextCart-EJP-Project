import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "NextCart – Simple E-Commerce App",
  description: "A Next.js + MongoDB + Firebase eCommerce demo project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">

        <Toaster position="top-center" />

        <Navbar />

        <main className="min-h-screen pt-20">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}