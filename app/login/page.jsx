"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      router.push("/dashboard/manageproducts");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Login failed.");
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      toast.success("Signed in with Google!");
      router.push("/dashboard/manageproducts");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Google login failed.");
    }

    setGoogleLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-950 relative overflow-hidden font-sans">
      <Toaster position="top-center" />

      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-900/60 backdrop-blur-xl border border-gray-800 shadow-2xl rounded-2xl p-8 z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-sm">
            Sign in to manage your store
          </p>
        </div>

        {/* GOOGLE LOGIN */}
        <button
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg mb-6 disabled:opacity-70"
        >
          {googleLoading ? (
            <Loader2 size={20} className="animate-spin text-gray-600" />
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Sign in with Google</span>
            </>
          )}
        </button>

        <div className="relative flex py-2 items-center mb-6">
          <div className="grow border-t border-gray-700"></div>
          <span className="mx-4 text-gray-500 text-xs uppercase tracking-wider">
            Or continue with
          </span>
          <div className="grow border-t border-gray-700"></div>
        </div>

        {/* EMAIL/PASSWORD FORM */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="email"
              required
              placeholder="Email address"
              className="w-full bg-gray-800/50 border border-gray-700 text-white pl-12 pr-4 py-3 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="password"
              required
              placeholder="Password"
              className="w-full bg-gray-800/50 border border-gray-700 text-white pl-12 pr-4 py-3 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full bg-linear-to-r from-cyan-600 to-blue-600 hover:opacity-90 text-white font-bold py-3 px-4 rounded-xl shadow flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>
                Login <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <p className="text-sm text-center mt-8 text-gray-400">
          Don’t have an account?{" "}
          <Link href="/register" className="text-cyan-400 hover:underline">
            Create free account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}