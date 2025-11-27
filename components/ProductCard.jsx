import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <div className="w-full h-40 relative mb-3">
        <Image
          src={product.image || "/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover rounded-md"
        />
      </div>

      <h2 className="text-xl font-semibold">{product.name}</h2>

      <p className="text-gray-600 text-sm line-clamp-2 mb-2">
        {product.shortDescription}
      </p>

      <p className="font-semibold text-green-600 mb-3">
        Price: ${product.price}
      </p>

      <Link
        href={`/products/${product._id}`}
        className="inline-block mt-2 text-sm text-blue-600 hover:underline"
      >
        View Details →
      </Link>
    </div>
  );
}