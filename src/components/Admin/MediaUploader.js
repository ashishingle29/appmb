"use client";
import { useState } from "react";

export default function MediaUploader({ onUpload, usageType="general" }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  console.log(file, "fileData")
  const handleUpload = async () => {
    if (!file) return setError("Please select a file.");

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("usageType", usageType); // Change dynamically (post/category/tag)
    const slug = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension for slug
    formData.append("slug", slug); // Use real slug

    const res = await fetch("/api/media/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUploading(false);

    if (data.success) {
      onUpload(data.path);
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      <button className="mt-2 bg-blue-500 p-2 rounded text-white" onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
