import { NextResponse } from "next/server";
import connectToDatabase from "@/src/lib/mongodb";
import Category from "@/src/lib/models/Category";

export async function GET() {
  await connectToDatabase();
  const categories = await Category.find({ isDeleted: false }).sort({ createdAt: -1 });
  return NextResponse.json(categories);
}

export async function POST(req) {
  await connectToDatabase();
  const { name, slug, description, image } = await req.json();

  if (!name || !slug) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  try {
    const newCategory = new Category({ name, slug, description, image });
    await newCategory.save();
    return NextResponse.json({ success: true, category: newCategory });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
