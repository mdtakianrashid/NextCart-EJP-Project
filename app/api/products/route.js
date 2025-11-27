import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const newProduct = await Product.create(body);
    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    console.error("POST /api/products ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
