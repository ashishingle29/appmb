"use client";
import { useState, useEffect } from "react";

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [tagData, setTagData] = useState({ name: "", slug: "" });
  const [editingTag, setEditingTag] = useState(null);
  const [showTagForm, setShowTagForm] = useState(false);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    const res = await fetch("/api/tags");
    const data = await res.json();
    setTags(data);
  };

  const handleSave = async () => {
    const url = editingTag ? `/api/tags/${editingTag._id}` : "/api/tags";
    const method = editingTag ? "PUT" : "POST";

    await fetch(url, {
      method,
      body: JSON.stringify(tagData),
      headers: { "Content-Type": "application/json" },
    });

    resetForm();
    fetchTags();
  };

  const handleEdit = (tag) => {
    setTagData(tag);
    setEditingTag(tag);
    setShowTagForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this tag?")) return;
    await fetch(`/api/tags/${id}`, { method: "DELETE" });
    fetchTags();
  };

  const resetForm = () => {
    setTagData({ name: "", slug: "" });
    setEditingTag(null);
    setShowTagForm(false);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-black">
      {/* Heading & Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Tags</h2>
        <button onClick={() => setShowTagForm(!showTagForm)} className="bg-blue-500 p-2 rounded">
          {showTagForm ? "Close Form" : "Add Tag"}
        </button>
      </div>

      {/* Add / Edit Tag Form */}
      {showTagForm && (
        <div className="p-4 bg-gray-800 rounded-lg mb-4">
          <h3 className="text-lg font-semibold">{editingTag ? "Edit Tag" : "Add New Tag"}</h3>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 mb-2 bg-gray-700"
            value={tagData.name}
            onChange={(e) => setTagData({ 
              ...tagData, 
              name: e.target.value, 
              slug: e.target.value.trim().toLowerCase().replace(/\s+/g, "-") 
            })}
          />
          <input
            type="text"
            placeholder="Slug"
            className="w-full p-2 mb-2 bg-gray-700"
            value={tagData.slug}
            onChange={(e) => setTagData({ ...tagData, slug: e.target.value })}
          />

          <button onClick={handleSave} className="mt-4 bg-blue-500 p-2 rounded">
            {editingTag ? "Update Tag" : "Create Tag"}
          </button>
          {editingTag && (
            <button onClick={resetForm} className="ml-2 mt-4 bg-gray-500 p-2 rounded">
              Cancel
            </button>
          )}
        </div>
      )}

      {/* Tags Table */}
      <table className="w-full bg-gray-800 rounded-lg">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Slug</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => (
            <tr key={tag._id} className="border-b border-gray-700">
              <td className="p-2">{tag.name}</td>
              <td className="p-2">{tag.slug}</td>
              <td className="p-2">
                <button onClick={() => handleEdit(tag)} className="bg-yellow-500 p-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(tag._id)} className="bg-red-500 p-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
