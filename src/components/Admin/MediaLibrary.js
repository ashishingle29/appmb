"use client";
import { useEffect, useState } from "react";

export default function MediaLibrary({ onSelect }) {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch("/api/media")
      .then((res) => res.json())
      .then((data) => {
        setMedia(data);
        setLoading(false);
      });
  }, []);

  const handleSelect = (imagePath) => {
    setSelectedImage(selectedImage === imagePath ? "" : imagePath);
    onSelect(selectedImage === imagePath ? "" : imagePath);
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-lg font-bold text-black">Media Library</h2>
      {loading ? (
        <p className="text-gray-400">Loading images...</p>
      ) : (
        <div className="grid grid-cols-3 gap-2 mt-4">
          {media.map((item) => (
            <div
              key={item._id}
              className={`p-1 border ${selectedImage === item.path ? "border-blue-500" : "border-gray-600"} rounded-lg cursor-pointer w-24`}
              onClick={() => handleSelect(item.path)}
            >
              <img src={item.path} alt="Uploaded media" className="w-full h-24 object-cover rounded" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
