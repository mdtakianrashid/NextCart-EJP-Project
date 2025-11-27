"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShoppingBag, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Loader2,
  CheckCircle,
  XCircle,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [toast, setToast] = useState(null);
  const handleEmailChange = (e) => {
    const cleanValue = e.target.value.replace(/\s/g, "");
    setEmail(cleanValue);
    
    if (status === "error") setStatus("idle");
  };

  const handleSubscribe = (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!email) {
      showToast("Please enter an email address.", "error");
      setStatus("error");
      return;
    }

    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address.", "error");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      showToast("Welcome to the club! 🚀", "success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800 pt-16 pb-8 font-sans relative overflow-hidden">
      
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-4 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-xl border ${
              toast.type === "success" 
                ? "bg-green-900/90 border-green-500 text-green-100 shadow-green-900/50" 
                : "bg-red-900/90 border-red-500 text-red-100 shadow-red-900/50"
            }`}
          >
            <div className={`p-2 rounded-full ${toast.type === "success" ? "bg-green-800" : "bg-red-800"}`}>
              {toast.type === "success" ? <CheckCircle size={20} /> : <XCircle size={20} />}
            </div>
            <div>
              <h4 className="font-bold text-sm">{toast.type === "success" ? "Success!" : "Error"}</h4>
              <p className="text-xs opacity-90 font-medium">{toast.message}</p>
            </div>
            <button 
              onClick={() => setToast(null)} 
              className="ml-2 opacity-60 hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* NEWSLETTER */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-16 border-b border-gray-800 pb-12">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Join our Newsletter</h3>
            <p className="text-gray-400">Get the latest updates, discounts, and tech news delivered to your inbox.</p>
          </div>
          
          <form onSubmit={handleSubscribe} className="flex w-full relative">
            <input 
              type="text" 
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email" 
              disabled={status === "loading" || status === "success"}
              className={`w-full bg-gray-900 border text-white pl-5 pr-4 py-3 rounded-l-lg focus:outline-none transition-all duration-300 ${
                status === "error" 
                  ? "border-red-500 placeholder-red-400/50" 
                  : status === "success"
                  ? "border-green-500 text-green-400"
                  : "border-gray-700 focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              }`}
            />
            
            <button 
              type="submit"
              disabled={status === "loading" || status === "success"}
              className={`px-6 py-3 rounded-r-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 min-w-[140px] ${
                status === "success" 
                  ? "bg-green-600 hover:bg-green-500 text-white cursor-default"
                  : "bg-cyan-600 hover:bg-cyan-500 text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              }`}
            >
              {status === "loading" ? (
                <Loader2 size={20} className="animate-spin" />
              ) : status === "success" ? (
                <>Signed Up <CheckCircle size={18} /></>
              ) : (
                <>Subscribe <Send size={18} /></>
              )}
            </button>
          </form>
        </div>

        {/* LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-linear-to-br from-cyan-500 to-blue-600 p-2 rounded-lg group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all">
                <ShoppingBag className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Next<span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">Cart</span>
              </span>
            </Link>
            <p className="text-gray-500 leading-relaxed text-sm">
              The ultimate destination for next-gen tech. Built with performance and design in mind.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialIcon icon={<Facebook size={18} />} href="#" />
              <SocialIcon icon={<Twitter size={18} />} href="#" />
              <SocialIcon icon={<Instagram size={18} />} href="#" />
              <SocialIcon icon={<Linkedin size={18} />} href="#" />
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/" text="Home" />
              <FooterLink href="/products" text="All Products" />
              <FooterLink href="/about" text="About Us" />
              <FooterLink href="/blog" text="Tech Blog" />
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Customer Care</h4>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/login" text="My Account" />
              <FooterLink href="/orders" text="Order History" />
              <FooterLink href="/faq" text="FAQs" />
              <FooterLink href="/support" text="Support Center" />
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={20} className="text-cyan-500 shrink-0" />
                <span>123 Tech Street, Silicon Valley, CA 94043, USA</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={20} className="text-cyan-500 shrink-0" />
                <a href="mailto:support@nextcart.com" className="hover:text-cyan-400 transition">support@nextcart.com</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={20} className="text-cyan-500 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>© {currentYear} NextCart Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-gray-400 transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, text }) {
  return (
    <li>
      <Link href={href} className="text-gray-400 hover:text-cyan-400 hover:pl-2 transition-all duration-300 flex items-center gap-1">
         {text}
      </Link>
    </li>
  );
}

function SocialIcon({ icon, href }) {
  return (
    <a 
      href={href} 
      className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-cyan-900/30 hover:text-cyan-400 hover:scale-110 transition-all duration-300 border border-gray-800 hover:border-cyan-500/50"
    >
      {icon}
    </a>
  );
}