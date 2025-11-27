"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Loader2,
  ArrowRight,
  UserPlus,
  CheckCircle,
  Eye,
  EyeOff
} from "lucide-react";

// Firebase
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      toast.success("Account created successfully! 🚀");
      router.push("/dashboard/manageproducts");
    } catch (error) {
      console.error("Registration Error:", error.message);
      toast.error(error.message);
    }

    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      toast.success("Signed in with Google! 🎉");
      router.push("/dashboard/manageproducts");
    } catch (error) {
      console.error("Google Login Error:", error.message);
      toast.error(error.message);
    }

    setGoogleLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-950 relative overflow-hidden font-sans">
      <Toaster position="top-center" />

      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-900/60 backdrop-blur-xl border border-gray-800 shadow-2xl rounded-2xl p-8 z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-2">Create Account</h1>
          <p className="text-gray-400 text-sm">Join the future of shopping today</p>
        </div>

        {/* GOOGLE SIGNUP */}
        <button
          onClick={handleGoogleSignup}
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg mb-6 disabled:opacity-70"
        >
          {googleLoading ? (
            <Loader2 size={20} className="animate-spin text-gray-600" />
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92..." />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66..." />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36..." />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64..." />
              </svg>
              <span>Sign up with Google</span>
            </>
          )}
        </button>

        <div className="relative flex py-2 items-center mb-6">
          <div className="grow border-t border-gray-700"></div>
          <span className="mx-4 text-gray-500 text-xs uppercase tracking-wider">
            Or register with email
          </span>
          <div className="grow border-t border-gray-700"></div>
        </div>

        {/* REGISTER FORM */}
        <form onSubmit={handleRegister} className="space-y-4">

          {/* Email */}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400" size={20} />
            <input
              type="email"
              required
              placeholder="Email address"
              className="w-full bg-gray-800/50 border border-gray-700 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type={passwordVisible ? "text" : "password"}
              required
              placeholder="Password"
              className="w-full bg-gray-800/50 border border-gray-700 text-white pl-12 pr-12 py-3 rounded-xl focus:border-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Show/Hide Toggle */}
            <span
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
            >
              {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative group">
            <CheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type={confirmVisible ? "text" : "password"}
              required
              placeholder="Confirm Password"
              className="w-full bg-gray-800/50 border border-gray-700 text-white pl-12 pr-12 py-3 rounded-xl focus:border-purple-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <span
              onClick={() => setConfirmVisible(!confirmVisible)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
            >
              {confirmVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full flex justify-center items-center gap-4 bg-linear-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg mt-2"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>
                Create Account <UserPlus size={20} />
              </>
            )}
          </button>
        </form>

        <p className="text-sm text-center mt-8 text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}