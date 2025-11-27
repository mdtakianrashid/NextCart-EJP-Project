"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingBag, Zap, ShieldCheck, Star, ArrowRight, TrendingUp } from "lucide-react";

const heroImages = [
  "/banner1.webp", 
  "/banner2.webp"
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch Products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data.slice(0, 3) : []);
      } catch (error) {
        console.log("Error loading products:", error);
      }
    };
    loadProducts();
  }, []);

  // Hero Slider Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-cyan-500 selection:text-black">

      <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-gray-900" /> 
            
            <Image
              src={heroImages[currentImageIndex]}
              alt="Hero Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-gray-950/90" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl mx-auto mt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-300 text-sm font-medium mb-6 backdrop-blur-md">
              <Zap size={14} className="fill-cyan-300" /> New Collection Live
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
              The Future of <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                Digital Shopping
              </span>
            </h1>

            <p className="text-base md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
              Discover premium gear with a seamless shopping experience. 
              Next-gen performance, powered by <span className="text-cyan-400 font-semibold">Next.js</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="w-full sm:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black rounded-full font-bold text-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={20} /> Shop Now
                </motion.button>
              </Link>
              <Link href="/register" className="w-full sm:w-auto">
                 <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg transition-all"
                >
                  Get Started
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
<section className="py-24 px-4 md:px-6 relative z-20">

  <div className="absolute inset-0 bg-linear-to-b from-gray-900 via-gray-950 to-black opacity-70 pointer-events-none" />

  <div className="relative max-w-7xl mx-auto">

    {/* Section Heading */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
        Why Shop with <span className="text-cyan-400">NextCart?</span>
      </h2>
      <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
        Premium quality, blazing-fast performance & a seamless shopping journey.
      </p>
    </div>

    {/* Feature Cards */}
    <div className="grid md:grid-cols-3 gap-10">
      
      <FeatureCard 
        icon={<TrendingUp size={38} className="text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />}
        title="Trending Styles"
        desc="Curated collections that define the modern aesthetic."
        color="border-purple-500/40 hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]"
      />

      <FeatureCard 
        icon={<ShieldCheck size={38} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />}
        title="Secure Platform"
        desc="Bank-grade encryption for every single transaction."
        color="border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]"
      />

      <FeatureCard 
        icon={<Star size={38} className="text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]" />}
        title="Premium Quality"
        desc="Verified products from top-tier global brands."
        color="border-yellow-500/40 hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(234,179,8,0.35)]"
      />

    </div>
  </div>
</section>

      <section className="py-20 px-4 md:px-6 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white">Trending Now</h2>
              <p className="text-gray-400 mt-2 text-lg">Hottest picks of the week</p>
            </div>
            <Link href="/products" className="group flex items-center text-cyan-400 font-semibold hover:text-cyan-300 transition-all gap-1">
              View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.length === 0 ? (
              [1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-gray-800/50 rounded-2xl animate-pulse border border-gray-700" />
              ))
            ) : (
              products.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden group hover:shadow-[0_10px_30px_-10px_rgba(6,182,212,0.15)] transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.png"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    
                    <button className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg font-bold">
                       <ShoppingBag size={20} />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {product.name}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4 h-10">
                      {product.shortDescription}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                      <span className="text-2xl font-bold text-white">
                        ${product.price || "99.00"}
                      </span>
                      <Link href={`/products/${product._id}`}>
                        <span className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                          Details
                        </span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden relative border border-gray-800 bg-linear-to-r from-blue-900 to-purple-900">
          
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

          <div className="grid md:grid-cols-2 items-center gap-10 p-8 md:p-16 relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Level Up Your Setup
              </h2>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Unlock exclusive deals on the latest tech. High performance meets stunning design. 
                Don&apos;t miss out on the season&apos;s best drops.
              </p>
              <Link href="/products">
                <button className="bg-white text-blue-950 px-8 py-3 rounded-full font-bold hover:scale-105 transition shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  Explore Collection
                </button>
              </Link>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="relative h-64 md:h-80 w-full"
            >
              <Image 
                src="/promobanner.webp" 
                alt="Promo" 
                fill 
                className="object-contain drop-shadow-2xl rounded-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
            Trusted by Developers & Shoppers
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <TestimonialCard 
              quote="The cleanest template I've ever used. The performance is incredible and the code is so easy to understand."
              author="Alex D."
              role="Software Engineer"
            />
            <TestimonialCard 
              quote="I bought my first mechanical keyboard here. Shipping was fast and the packaging was excellent!"
              author="Sarah J."
              role="Verified Buyer"
            />
          </div>
        </div>
      </section>

    </div>
  );
}

function FeatureCard({ icon, title, desc, color }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border ${color} shadow-lg transition-all duration-300`}
    >
      <div className="bg-gray-800/50 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function TestimonialCard({ quote, author, role }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="p-8 bg-gray-800/40 rounded-2xl text-left border border-gray-700 hover:border-gray-600 transition-all"
    >
      <div className="flex gap-1 text-yellow-400 mb-4">
        <Star size={16} fill="currentColor" />
        <Star size={16} fill="currentColor" />
        <Star size={16} fill="currentColor" />
        <Star size={16} fill="currentColor" />
        <Star size={16} fill="currentColor" />
      </div>
      <p className="text-gray-300 text-lg italic mb-6">&quot;{quote}&quot;</p>
      <div>
        <h4 className="font-bold text-white">{author}</h4>
        <p className="text-cyan-500 text-sm">{role}</p>
      </div>
    </motion.div>
  );
}