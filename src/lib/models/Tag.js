import mongoose from "mongoose";

const TagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    isDeleted: { type: Boolean, default: false } // Soft delete flag
  },
  { timestamps: true }
);

export default mongoose.models.tags || mongoose.model("tags", TagSchema);
