// components/MediaManagerModal.jsx
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function MediaManagerModal({
  isOpen,
  onClose,
  onSelect,
  usageType = "general",
  selectedImage,
}) {
  const [mediaList, setMediaList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const fetchMedia = async () => {
    const res = await fetch("/api/media");
    const data = await res.json();
    setMediaList(data);
  };

  useEffect(() => {
    if (isOpen) fetchMedia();
  }, [isOpen]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("usageType", usageType); // Change dynamically (post/category/tag)
    const slug = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension for slug
    formData.append("slug", slug); // Use real slug

    setUploading(true);
    const res = await fetch("/api/media/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setUploading(false);
    setMediaList((prev) => [data, ...prev]);
    setError(data.error || ""); // Set error if any
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl p-6 w-[95vw] h-[90vh] relative shadow-2xl overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        {/* Upload Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload New Media
          </label>
          <input type="file" onChange={handleUpload} className="mt-1" />
          {uploading && (
            <p className="text-sm text-blue-600 mt-2">Uploading...</p>
          )}
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </div>

        <hr className="my-4" />

        {/* Media Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mediaList.map((item) => (
            <div
              key={item._id}
              onClick={() => {
                onSelect(item.path);
                onClose();
              }}
              className={`cursor-pointer border rounded hover:ring-2 ring-blue-500 ${
                selectedImage === item.path ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <img
                src={item.path}
                alt={item.slug || "Media"}
                className="w-full h-40 object-cover rounded"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
