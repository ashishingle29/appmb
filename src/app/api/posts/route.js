import { NextResponse } from "next/server";
import connectToDatabase from "@/src/lib/mongodb";
import Post from "@/src/lib/models/Post";
import mongoose from "mongoose";
import Category from "@/src/lib/models/Category";
import Tag from "@/src/lib/models/Tag";

// export async function GET() {
//   await connectToDatabase();
//   const posts = await Post.find({ isDeleted: false }).sort({ createdAt: -1 });
//   return NextResponse.json(posts);
// }

export async function GET(req) {
  await connectToDatabase();

  // Extract query parameters from request
  const { searchParams } = new URL(req.url);
  const categorySlug = searchParams.get("category");
  const tagSlug = searchParams.get("tag");
  const size = searchParams.get("size");

  const filter = { isDeleted: false };


  // ✅ Handle category slug to ObjectId
  if (categorySlug && categorySlug !== "all") {
    const category = await Category.findOne({ slug: categorySlug });
    if (category) {
      filter.category = category._id;
    }
  }

  // ✅ Handle tag slug to ObjectId
  if (tagSlug && tagSlug !== "all") {
    const tag = await Tag.findOne({ slug: tagSlug });
    if (tag) {
      filter.tags = tag._id;
    }
  }
console.log(filter, "<==============filter");
  // ✅ Use the correct field name for populate
  let query = Post.find(filter)
    .sort({ createdAt: -1 })
    .populate("category") // ✅ Populate category
    .populate("tags") // ✅ Fixed here to match schema
    .limit(size ? parseInt(size) : 100);

  const posts = await query.exec();
  
  console.log(posts, "<==============posts");
  
  return NextResponse.json(posts);
}



export async function POST(req) {
  await connectToDatabase();
  const { title, slug, category, tags, content, isPublished, featuredImage, metadescription } = await req.json();

  // Validate required fields
  if (!title || !slug) {
    return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
  }

  try {
    // Convert empty category to null
    const categoryId = category ? new mongoose.Types.ObjectId(category) : null;
    
    // Ensure tags are an array
    const tagIds = Array.isArray(tags) ? tags.map(tag => new mongoose.Types.ObjectId(tag)) : [];

    // Ensure featuredImage is properly handled
    const image = featuredImage || null;

    const newPost = new Post({ 
      title, 
      slug, 
      category: categoryId, 
      tags: tagIds, 
      content: content || {}, 
      isPublished: isPublished ?? false, 
      featuredImage: image,
      metadescription
    });

    await newPost.save();
    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error || "Failed to create post" }, { status: 500 });
  }
}
