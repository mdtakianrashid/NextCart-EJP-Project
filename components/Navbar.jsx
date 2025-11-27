"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Menu, X, User, LogOut, ChevronDown, ShoppingBag, PlusCircle, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  const linkClass = (path) =>
    pathname === path
      ? "text-cyan-400 font-semibold drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
      : "text-gray-300 hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-950/80 backdrop-blur-md border-b border-gray-800 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-linear-to-br from-cyan-500 to-blue-600 p-2 rounded-lg group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all">
            <ShoppingBag className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            Next<span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">Cart</span>
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/products" className={linkClass("/products")}>Products</Link>

          {!user ? (
            <div className="flex items-center gap-4 ml-4">
              <Link href="/login" className="text-gray-300 hover:text-white font-medium transition">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-white text-gray-950 px-5 py-2 rounded-full font-bold hover:bg-cyan-400 hover:scale-105 transition-all shadow-[0_0_10px_rgba(255,255,255,0.2)]"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div className="relative ml-4">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-gray-900 border border-gray-700 px-4 py-2 rounded-full hover:border-cyan-500 transition-all group"
              >
                <div className="w-8 h-8 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  {user.email?.[0].toUpperCase()}
                </div>
                <span className="text-gray-300 text-sm font-medium group-hover:text-white max-w-[100px] truncate">
                  {user.email.split('@')[0]}
                </span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* USER DROPDOWN */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gray-800 bg-gray-900/50">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Account</p>
                      <p className="text-sm text-gray-300 truncate">{user.email}</p>
                    </div>
                    
                    <div className="p-2">
                      <Link
                        href="/dashboard/addproduct"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-cyan-400 rounded-lg transition"
                      >
                        <PlusCircle size={16} /> Add Product
                      </Link>
                      <Link
                        href="/dashboard/manageproducts"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-cyan-400 rounded-lg transition"
                      >
                        <Settings size={16} /> Manage Products
                      </Link>
                    </div>

                    <div className="p-2 border-t border-gray-800">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-red-950/30 hover:text-red-300 rounded-lg transition"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* MOBILE MENU */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-gray-950 border-t border-gray-800 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              <Link href="/" onClick={() => setMenuOpen(false)} className={linkClass("/")}>
                Home
              </Link>
              <Link href="/products" onClick={() => setMenuOpen(false)} className={linkClass("/products")}>
                Products
              </Link>

              {!user && (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="text-center py-3 rounded-lg border border-gray-700 text-gray-300 hover:border-gray-500"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="text-center py-3 rounded-lg bg-white text-gray-950 font-bold hover:bg-gray-200"
                  >
                    Register
                  </Link>
                </div>
              )}

              {user && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <p className="text-gray-500 text-xs uppercase mb-3 font-bold">Dashboard</p>
                  <Link
                    href="/dashboard/addproduct"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 text-gray-300 mb-4 hover:text-cyan-400"
                  >
                    <PlusCircle size={18} /> Add Product
                  </Link>
                  <Link
                    href="/dashboard/manageproducts"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 text-gray-300 mb-4 hover:text-cyan-400"
                  >
                    <Settings size={18} /> Manage Products
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-red-400 hover:text-red-300 w-full"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}