import { NextResponse } from "next/server";
import connectToDatabase from "@/src/lib/mongodb";
import Category from "@/src/lib/models/Category";

export async function GET(req, { params }) {
  await connectToDatabase();
  const category = await Category.findById(params.id);
  if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });
  return NextResponse.json(category);
}

export async function PUT(req, { params }) {
  await connectToDatabase();
  const { name, slug, description, image } = await req.json();

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      params.id,
      { name, slug, description, image },
      { new: true }
    );
    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// export async function DELETE(req, { params }) {
//   await connectToDatabase();
//   await Category.findByIdAndDelete(params.id);
//   return NextResponse.json({ success: true });
// }

export async function DELETE(req, { params }) {
    await connectToDatabase();
    await Category.findByIdAndUpdate(params.id, { isDeleted: true }); // Soft delete
    return NextResponse.json({ success: true });
  }
  
