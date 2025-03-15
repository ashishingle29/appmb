import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      default: null, // Make category optional
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "tags", default: [] }], // Default to an empty array
    content: { type: mongoose.Schema.Types.Mixed, default: {} }, // Default empty object
    isPublished: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }, // Soft delete
    featuredImage: { type: String, default: null }, // Default to null
    metadescription: { type: String, default: "" }, // Default to an empty string
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
