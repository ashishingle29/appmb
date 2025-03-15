import { NextResponse } from "next/server";
import connectToDatabase from "@/src/lib/mongodb";
import Tag from "@/src/lib/models/Tag";

export async function GET() {
  await connectToDatabase();
  const tags = await Tag.find({ isDeleted: false }).sort({ createdAt: -1 }); // Fetch only active tags
  return NextResponse.json(tags);
}

export async function POST(req) {
  await connectToDatabase();
  const { name, slug } = await req.json();

  if (!name || !slug) {
    return NextResponse.json({ error: "Name and Slug are required" }, { status: 400 });
  }

  try {
    const newTag = new Tag({ name, slug });
    await newTag.save();
    return NextResponse.json({ success: true, tag: newTag });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create tag" }, { status: 500 });
  }
}
