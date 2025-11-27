import Link from "next/link";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">

      {/* 404 text */}
      <h1 className="text-7xl font-extrabold text-blue-600 mb-4">404</h1>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
        Page Not Found
      </h2>

      {/* Subtitle */}
      <p className="text-gray-600 max-w-md mb-8">
        Oops! The page you&#39;re looking for doesn&#39;t exist or has been moved.
        Let&#8217;s get you back on track.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <Link
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Go to Home
        </Link>

        <Link
          href="/products"
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
        >
          Browse Products
        </Link>
      </div>

      {/* Decoration */}
      <div className="w-60 mt-12">
        <Image
          src="/placeholder.png"
          alt="Not found illustration"
          width={240}
          height={240}
          className="opacity-80"
        />
      </div>
    </div>
  );
}