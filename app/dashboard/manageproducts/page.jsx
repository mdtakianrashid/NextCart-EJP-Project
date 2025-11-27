"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { Trash2, Eye, Package, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthorized(true);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      if (!res.ok) {
        console.error("Failed to fetch products, status:", res.status);
        return;
      }
      const data = await res.json();
      // ensure we have an array
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data?.products && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        console.warn("Unexpected products payload:", data);
        setProducts([]);
      }
    } catch (error) {
      console.log("Error fetching products", error);
      toast.error("Could not load inventory");
    }
  };

  useEffect(() => {
    if (!authorized) return;

    const loadProducts = async () => {
      await fetchProducts();
    };

    loadProducts();
  }, [authorized]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      setProducts((prev) => prev.filter((p) => String(p._id) !== String(id)));

      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        cache: "no-store",
      });

      if (!res.ok) {
        console.error("Delete request failed, status:", res.status);
        await fetchProducts();
        toast.error("Failed to delete product");
        return;
      }

      const data = await res.json();

      if (data?.success) {
        toast.success("Product deleted successfully");
        setProducts((prev) => prev.filter((p) => String(p._id) !== String(data.id)));
      } else {
        console.warn("Delete response did not contain success:", data);
        await fetchProducts();
        toast.error(data?.message || "Failed to delete product");
      }
    } catch (error) {
      console.log("Delete error:", error);
      await fetchProducts();
      toast.error("Something went wrong");
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-cyan-500 font-sans">
        <Loader2 size={40} className="animate-spin mb-4" />
        <p className="text-gray-400 font-medium animate-pulse">Verifying access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans pt-24 pb-12 px-4 md:px-8">
      {/* Dark Theme Toaster */}
      <Toaster 
        position="top-right" 
        toastOptions={{ 
          style: { background: '#111827', color: '#fff', border: '1px solid #374151' },
          success: { iconTheme: { primary: '#06b6d4', secondary: '#fff' } }
        }} 
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
              Manage Inventory
            </h1>
            <p className="text-gray-400 mt-1">View, track, and manage your store items.</p>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg">
            <span className="text-gray-400 text-sm font-medium">Total Products:</span>
            <span className="text-cyan-400 font-bold text-lg">{products.length}</span>
          </div>
        </div>

        {/* Product List Content */}
        {products.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 bg-gray-900/50 rounded-2xl border border-dashed border-gray-800"
          >
            <Package size={64} className="text-gray-700 mb-4" />
            <h3 className="text-xl font-bold text-gray-300">No products found</h3>
            <p className="text-gray-500 mt-2">Start adding items to see them here.</p>
          </motion.div>
        ) : (
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-900/80 border-b border-gray-800">
                    <th className="p-5 text-sm font-bold text-gray-400 uppercase tracking-wider text-center">Image</th>
                    <th className="p-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Product Details</th>
                    <th className="p-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Price</th>
                    <th className="p-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Priority</th>
                    <th className="p-5 text-sm font-bold text-gray-400 uppercase tracking-wider text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  <AnimatePresence>
                    {products.map((product) => (
                      <motion.tr 
                        key={product._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                        layout
                        className="group hover:bg-gray-800/50 transition-colors"
                      >
                        {/* Image Column */}
                        <td className="p-4">
                          <div className="relative w-16 h-16 mx-auto bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-sm">
                            <Image
                              src={product.image || "/placeholder.png"}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        </td>

                        {/* Details Column */}
                        <td className="p-4">
                          <p className="font-bold text-white group-hover:text-cyan-400 transition-colors text-lg line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500 font-mono mt-1">ID: {String(product._id).slice(-6)}</p>
                        </td>

                        {/* Price Column */}
                        <td className="p-4">
                          <span className="text-cyan-300 font-bold bg-cyan-950/50 px-3 py-1 rounded-md border border-cyan-500/20">
                            ${product.price}
                          </span>
                        </td>

                        {/* Priority Column */}
                        <td className="p-4">
                          <PriorityBadge priority={product.priority} />
                        </td>

                        {/* Actions Column */}
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              onClick={() => router.push(`/products/${product._id}`)}
                              className="p-2 bg-gray-800 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg transition-all shadow hover:shadow-blue-500/20 tooltip"
                              title="View Details"
                            >
                              <Eye size={18} />
                            </button>

                            <button
                              onClick={() => handleDelete(product._id)}
                              className="p-2 bg-gray-800 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition-all shadow hover:shadow-red-500/20 tooltip"
                              title="Delete Product"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PriorityBadge({ priority }) {
  const styles = {
    high: "bg-purple-900/30 text-purple-400 border-purple-500/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]",
    medium: "bg-blue-900/30 text-blue-400 border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.2)]",
    low: "bg-gray-800 text-gray-400 border-gray-700",
  };

  const key = priority ? priority.toLowerCase() : "low";
  const currentStyle = styles[key] || styles.low;

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${currentStyle}`}>
      {priority || "Normal"}
    </span>
  );
}