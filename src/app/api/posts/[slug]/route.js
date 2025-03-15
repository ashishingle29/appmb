import connectToDatabase from "@/src/lib/mongodb";
import Post from "@/src/lib/models/Post";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const { params } = await context;
  const { slug } = await params;
  await connectToDatabase();
  const post = await Post.findOne({ slug }).populate("category").populate("tags");
  if (!post)
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req, { params }) {
  await connectToDatabase();
  const {
    title,
    slug,
    category,
    tags,
    content,
    isPublished,
    featuredImage,
    metadescription,
  } = await req.json();

  try {
    const updatedPost = await Post.findOneAndUpdate(
      {slug: params.slug},
      {
        title,
        slug,
        category,
        tags,
        isPublished,
        featuredImage,
        content,
        metadescription,
      },
      { new: true }
    );
    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json(
      { error: error || "Update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  await connectToDatabase();
  await Post.findByIdAndUpdate({slug: params.slug}, { isDeleted: true }); // Soft delete
  return NextResponse.json({ success: true });
}
