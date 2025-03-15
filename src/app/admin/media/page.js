"use client";
import { useState, useEffect } from "react";
import MediaLibrary from "@/src/components/Admin/MediaLibrary";
import MediaUploader from "@/src/components/Admin/MediaUploader";

export default function MediaPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-black">
      <h2 className="text-2xl font-bold mb-4">Media Manager</h2>

      {/* Image Upload Section */}
      <div className="mb-6 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold">Upload Media</h3>
        <MediaUploader onUpload={(imagePath) => setSelectedImage(imagePath)} />
      </div>

      {/* Media Library Section */}
      <div className="p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold">Your Media Library</h3>
        <MediaLibrary onSelect={(imagePath) => setSelectedImage(imagePath)} />
      </div>

      {selectedImage && (
        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold">Selected Image</h3>
          <img src={selectedImage} alt="Selected media" className="w-48 h-48 object-cover mt-2 rounded" />
          <p className="text-gray-400 mt-2">Path: {selectedImage}</p>
        </div>
      )}
    </div>
  );
}
