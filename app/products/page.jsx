"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Search, SlidersHorizontal, Loader2, ShoppingBag, ShoppingCart, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_PRODUCTS = [
  { _id: "1", name: "Neon Gaming Headset", shortDescription: "Immersive 7.1 surround sound.", price: 129, image: "", priority: "high" },
  { _id: "2", name: "Cyberpunk Mechanical Keyboard", shortDescription: "RGB backlit keys with blue switches.", price: 199, image: "", priority: "high" },
  { _id: "3", name: "Wireless Gaming Mouse", shortDescription: "Ultra-fast response time.", price: 89, image: "", priority: "medium" },
  { _id: "4", name: "4K Gaming Monitor", shortDescription: "144Hz refresh rate for smooth visuals.", price: 499, image: "", priority: "high" },
  { _id: "5", name: "RGB Mousepad", shortDescription: "Smooth surface with customizable lighting.", price: 45, image: "", priority: "low" },
  { _id: "6", name: "Streaming Microphone", shortDescription: "Studio quality audio for streamers.", price: 150, image: "", priority: "medium" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  // Fetch Products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log("API not ready, using mock data:", error);
        setProducts(MOCK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low") return a.price - b.price;
    if (sortOrder === "high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-extrabold mb-2 text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500"
            >
              All Products
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400"
            >
              Explore our exclusive collection of next-gen gear.
            </motion.p>
          </div>

          {/* SEARCH & FILTER CONTROLS */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 w-full md:w-auto"
          >
            {/* Search Bar */}
            <div className="relative group w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-gray-900 border border-gray-800 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-48">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                <SlidersHorizontal size={18} />
              </div>
              <select
                className="w-full bg-gray-900 border border-gray-800 text-gray-300 pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer hover:bg-gray-800 transition-colors"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="default">Sort by: Default</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </motion.div>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-cyan-500">
            <Loader2 size={48} className="animate-spin mb-4" />
            <p className="text-gray-400">Loading gear...</p>
          </div>
        ) : (
          <>
            {/* PRODUCTS GRID */}
            {sortedProducts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-gray-900/50 rounded-2xl border border-dashed border-gray-800"
              >
                <ShoppingBag size={48} className="mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-300">No products found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search filters.</p>
              </motion.div>
            ) : (
              <motion.div 
                layout
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                <AnimatePresence>
                  {sortedProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:border-cyan-500/30 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-800">
        <Image
          src={product.image || "/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <a href={`/products/${product._id}`}>
            <button className="bg-white text-gray-950 p-3 rounded-full hover:bg-cyan-400 hover:scale-110 transition-all shadow-lg cursor-pointer">
              <Eye size={20} />
            </button>
          </a>
          <button className="bg-gray-950 text-white p-3 rounded-full hover:bg-cyan-600 hover:scale-110 transition-all shadow-lg border border-gray-700 cursor-pointer">
            <ShoppingCart size={20} />
          </button>
        </div>

        {/* Price Tag */}
        <div className="absolute top-3 right-3 bg-gray-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-gray-700">
          <span className="text-cyan-400 font-bold">${product.price}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col grow">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-cyan-400 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-2 mb-4 grow">
          {product.shortDescription}
        </p>
        
        <a 
          href={`/products/${product._id}`}
          className="w-full block text-center bg-gray-800 hover:bg-cyan-600 text-gray-300 hover:text-white py-2.5 rounded-lg font-medium transition-all duration-300 cursor-pointer"
        >
          View Details
        </a>
      </div>
    </motion.div>
  );
}