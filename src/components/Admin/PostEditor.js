"use client";
import { useState } from "react";
import MediaLibrary from "./MediaLibrary";

export default function PostEditor() {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  
  const insertImage = (imagePath) => {
    setContent((prev) => prev + `\n![Alt text](${imagePath})\n`);
    setSelectedImage(null);
  };

  return (
    <div className="p-6 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      <textarea
        className="w-full h-48 p-2 bg-gray-800 text-white rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your blog post here..."
      />
      
      <MediaLibrary onSelect={insertImage} />

      <button className="mt-4 bg-blue-500 p-2 rounded text-white">Save Post</button>
    </div>
  );
}
