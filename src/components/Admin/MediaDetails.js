"use client";
import { useEffect, useState } from "react";
import Loader from "../Loader";

export default function MediaDetails({ mediaId }) {
  const [media, setMedia] = useState(null);

  useEffect(() => {
    fetch(`/api/media/${mediaId}`)
      .then((res) => res.json())
      .then((data) => setMedia(data));
  }, [mediaId]);

  if (!media) return <p><Loader size="md" /></p>;

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-lg font-bold text-black">Media Details</h2>
      <img src={media.path} alt="Media preview" className="w-full h-32 object-cover rounded" />
      <h3 className="text-white mt-2">Used In:</h3>
      <ul className="text-gray-400">
        {media.usedIn.map((item, index) => (
          <li key={index}>{item.type} - {item.id}</li>
        ))}
      </ul>
    </div>
  );
}
