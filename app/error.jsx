"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ErrorPage({ error, reset }) {
  useEffect(() => {
    console.error("APP ERROR:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">

      <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
        <span className="text-4xl">⚠️</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-3">
        Something went wrong
      </h1>

      <p className="text-gray-600 max-w-md mb-8">
        We couldn’t load this page due to an unexpected error.
        Please try again — or return to a safe page.
      </p>

      <div className="flex flex-col md:flex-row gap-4">

        <button
          onClick={() => reset()}
          className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Try Again
        </button>

        <Link
          href="/"
          className="border border-red-600 text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition"
        >
          Go to Home
        </Link>
      </div>

      <div className="w-60 mt-12">
        <Image
          src="/placeholder.png"
          alt="Error illustration"
          width={240}
          height={240}
          className="opacity-80"
        />
      </div>
    </div>
  );
}