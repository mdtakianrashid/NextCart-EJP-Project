"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { 
  PackagePlus, 
  Type, 
  FileText, 
  AlignLeft, 
  DollarSign, 
  Image as ImageIcon, 
  Calendar, 
  AlertCircle, 
  Loader2, 
  CheckCircle 
} from "lucide-react";

export default function AddProductPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

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

  const [form, setForm] = useState({
    name: "",
    shortDescription: "",
    description: "",
    price: "",
    image: "",
    priority: "medium",
    createdAt: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (
      !form.name ||
      !form.shortDescription ||
      !form.description ||
      !form.price ||
      !form.createdAt
    ) {
      toast.error("All fields except image are required");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Product added successfully!");

        setTimeout(() => {
          router.push("/dashboard/manageproducts");
        }, 1200);
      } else {
        toast.error("Failed to add product");
        setSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      setSubmitting(false);
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
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans pt-24 pb-12 px-4 md:px-8 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <Toaster 
        position="top-right" 
        toastOptions={{ 
          style: { background: '#111827', color: '#fff', border: '1px solid #374151' },
          success: { iconTheme: { primary: '#06b6d4', secondary: '#fff' } }
        }} 
      />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 mb-2">
            Add New Product
          </h1>
          <p className="text-gray-400">Enter the details below to add a new item to your store.</p>
        </div>

        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 md:p-10 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Basic Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-300 border-b border-gray-800 pb-2 flex items-center gap-2">
                <FileText size={18} className="text-cyan-500" /> Basic Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Product Title */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-400">Product Title</label>
                  <div className="relative group">
                    <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                    <input
                      type="text"
                      name="name"
                      className="w-full bg-gray-800/50 border border-gray-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-gray-600"
                      placeholder="e.g. Neon Gaming Headset"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Short Description */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-400">Short Description</label>
                  <div className="relative group">
                    <AlignLeft className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                    <input
                      type="text"
                      name="shortDescription"
                      className="w-full bg-gray-800/50 border border-gray-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-gray-600"
                      placeholder="Quick summary (1-2 lines)"
                      value={form.shortDescription}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Full Description */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-400">Full Description</label>
                <textarea
                  name="description"
                  className="w-full bg-gray-800/50 border border-gray-700 text-white p-4 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-gray-600 min-h-[120px]"
                  placeholder="Detailed product specifications and features..."
                  value={form.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            {/* Details & Media */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-300 border-b border-gray-800 pb-2 flex items-center gap-2">
                <PackagePlus size={18} className="text-purple-500" /> Details & Media
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Price */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-400">Price ($)</label>
                  <div className="relative group">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-400 transition-colors" size={18} />
                    <input
                      type="number"
                      name="price"
                      className="w-full bg-gray-800/50 border border-gray-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder-gray-600"
                      placeholder="0.00"
                      value={form.price}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Priority */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-400">Priority Level</label>
                  <div className="relative">
                    <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <select
                      name="priority"
                      className="w-full bg-gray-800/50 border border-gray-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none cursor-pointer"
                      value={form.priority}
                      onChange={handleChange}
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-400">Release Date</label>
                  <div className="relative group">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                    <input
                      type="date"
                      name="createdAt"
                      className="w-full bg-gray-800/50 border border-gray-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all scheme-dark"
                      value={form.createdAt}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-400">Image URL</label>
                  <div className="relative group">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
                    <input
                      type="text"
                      name="image"
                      className="w-full bg-gray-800/50 border border-gray-700 text-white pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-gray-600"
                      placeholder="https://example.com/image.jpg"
                      value={form.image}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> Adding Product...
                  </>
                ) : (
                  <>
                    <PackagePlus size={20} /> Add Product to Store
                  </>
                )}
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </div>
  );
}