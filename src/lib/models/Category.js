import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // Stores image path
    isDeleted: { type: Boolean, default: false } // Soft delete flag
  },
  { timestamps: true }
);

export default mongoose.models.category || mongoose.model("category", CategorySchema);
