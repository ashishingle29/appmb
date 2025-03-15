import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    path: { type: String, required: true, unique: true },
    type: { type: String, enum: ["image", "video", "file"], required: true },
    usedIn: [{ type: { type: String }, id: { type: mongoose.Schema.Types.ObjectId } }],
    isDelete: { type: Boolean, default: false } // Soft delete support
  },
  { timestamps: true }
);

export default mongoose.models.Media || mongoose.model("Media", MediaSchema);
