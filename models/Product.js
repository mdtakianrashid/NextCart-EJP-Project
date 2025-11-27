import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: "/placeholder.png" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);