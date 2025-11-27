"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  Tag, 
  CheckCircle, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Loader2, 
  AlertTriangle 
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
            setProduct(null);
        } else {
            const data = await res.json();
            setProduct(data);
        }
      } catch (error) {
        console.log("Error loading product:", error);
        toast.error("Could not load product details");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-cyan-500 font-sans">
        <Loader2 size={48} className="animate-spin mb-4" />
        <p className="text-gray-400 font-medium animate-pulse">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-center px-4 font-sans">
        <AlertTriangle size={64} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
        <p className="text-gray-400 mb-6">The item you are looking for does not exist or has been removed.</p>
        <button 
          onClick={() => router.back()}
          className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-full transition border border-gray-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans pt-24 pb-12 px-4 md:px-8 relative overflow-hidden">
      <Toaster position="top-center" toastOptions={{ style: { background: '#1f2937', color: '#fff' } }}/>
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors group"
        >
          <div className="p-2 bg-gray-900 rounded-full group-hover:bg-cyan-900/30 transition-colors border border-gray-800 group-hover:border-cyan-500/30">
            <ArrowLeft size={20} />
          </div>
          <span className="font-medium">Back to Products</span>
        </motion.button>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* --- LEFT: Product Image --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative h-[400px] md:h-[600px] w-full bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl group">
              <Image
                src={product.image || "/placeholder.png"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              
              <div className="absolute inset-0 bg-linear-to-t from-gray-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-6 left-6 z-10">
                <PriorityBadge priority={product.priority} />
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT: Product Info --- */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Price & Meta */}
            <div className="flex flex-wrap items-center gap-6 mb-8 border-b border-gray-800 pb-8">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Price</span>
                <span className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
                  ${product.price}
                </span>
              </div>
              
              <div className="h-12 w-px bg-gray-800 hidden sm:block" />
              
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Added On</span>
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar size={18} className="text-purple-400" />
                  <span className="font-medium text-lg">
                    {new Date(product.createdAt).toLocaleDateString("en-GB", {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Tag size={18} className="text-cyan-500" /> Description
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button className="flex-1 bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] flex items-center justify-center gap-3 active:scale-95">
                <ShoppingCart size={20} /> Add to Cart
              </button>
              
              <div className="flex gap-4">
                <button className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-red-400 p-4 rounded-xl transition-all border border-gray-700 hover:border-red-500/30">
                  <Heart size={24} />
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-cyan-400 p-4 rounded-xl transition-all border border-gray-700 hover:border-cyan-500/30">
                  <Share2 size={24} />
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><CheckCircle size={16} className="text-green-500" /> In Stock</span>
              <span className="flex items-center gap-1.5"><CheckCircle size={16} className="text-green-500" /> Fast Delivery</span>
              <span className="flex items-center gap-1.5"><CheckCircle size={16} className="text-green-500" /> Official Warranty</span>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}

function PriorityBadge({ priority }) {
  const styles = {
    high: "bg-purple-600 text-white shadow-lg shadow-purple-900/50 border-purple-400/50",
    medium: "bg-blue-600 text-white shadow-lg shadow-blue-900/50 border-blue-400/50",
    low: "bg-gray-800 text-gray-300 border-gray-600",
  };

  const key = priority ? priority.toLowerCase() : "medium";
  const currentStyle = styles[key] || styles.low;

  return (
    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${currentStyle}`}>
      {priority || "Standard"} Priority
    </span>
  );
}