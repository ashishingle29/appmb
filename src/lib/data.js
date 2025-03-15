import Post from "@/src/lib/models/Post";
import Category from "@/src/lib/models/Category";
import Tag from "@/src/lib/models/Tag";
import connectDB from "@/src/lib/mongodb";

// ✅ Fetch all posts
export async function getAllPosts() {
    await connectDB();
    return await Post.find()
      .select("slug updatedAt featuredImage title metadescription")
      .sort({ updatedAt: -1 });
  }
  
  // ✅ Fetch all categories
  export async function getAllCategories() {
    await connectDB();
    return await Category.find()
      .select("slug updatedAt name image")
      .sort({ updatedAt: -1 });
  }
  
  // ✅ Fetch all tags
  export async function getAllTags() {
    await connectDB();
    return await Tag.find().select("slug updatedAt").sort({ updatedAt: -1 });
  }
  