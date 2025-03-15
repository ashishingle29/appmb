"use client";
import { useState, useEffect } from "react";
import MediaUploader from "@/src/components/Admin/MediaUploader"; 
import MediaLibrary from "@/src/components/Admin/MediaLibrary"; 

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState({ name: "", slug: "", description: "", image: "" });
  const [editingCategory, setEditingCategory] = useState(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  const handleImageUpload = (imagePath) => {
    setCategoryData({ ...categoryData, image: imagePath });
  };

  const handleSave = async () => {
    const url = editingCategory ? `/api/categories/${editingCategory._id}` : "/api/categories";
    const method = editingCategory ? "PUT" : "POST";

    await fetch(url, {
      method,
      body: JSON.stringify(categoryData),
      headers: { "Content-Type": "application/json" },
    });

    resetForm();
    fetchCategories();
  };

  const handleEdit = (category) => {
    setCategoryData(category);
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    fetchCategories();
  };
  

  const resetForm = () => {
    setCategoryData({ name: "", slug: "", description: "", image: "" });
    setEditingCategory(null);
    setShowCategoryForm(false);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-black">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Categories</h2>
        <button onClick={() => setShowCategoryForm(!showCategoryForm)} className="bg-blue-500 p-2 rounded">
          {showCategoryForm ? "Close Form" : "Add Category"}
        </button>
      </div>

      {showCategoryForm && (
        <div className="p-4 bg-gray-800 rounded-lg mb-4">
          <h3 className="text-lg font-semibold">{editingCategory ? "Edit Category" : "Add New Category"}</h3>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 mb-2 bg-gray-700"
            value={categoryData.name}
            onChange={(e) => setCategoryData({ 
              ...categoryData, 
              name: e.target.value, 
              slug: e.target.value.trim().toLowerCase().replace(/\s+/g, "-") 
            })}
          />
          <input
            type="text"
            placeholder="Slug"
            className="w-full p-2 mb-2 bg-gray-700"
            value={categoryData.slug}
            onChange={(e) => setCategoryData({ ...categoryData, slug: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 mb-2 bg-gray-700"
            value={categoryData.description}
            onChange={(e) => setCategoryData({ ...categoryData, description: e.target.value })}
          />

          {/* Upload & Select Image */}
          <div className="mt-2">
            <h4 className="text-md font-semibold">Upload or Select Image</h4>
            <MediaUploader onUpload={handleImageUpload} usageType="category" />
            <MediaLibrary onSelect={handleImageUpload} />
          </div>

          {categoryData.image && (
            <img src={categoryData.image} alt="Category Preview" className="w-20 h-20 mt-2 rounded" />
          )}

          <button onClick={handleSave} className="mt-4 bg-blue-500 p-2 rounded">
            {editingCategory ? "Update Category" : "Create Category"}
          </button>
          {editingCategory && (
            <button onClick={resetForm} className="ml-2 mt-4 bg-gray-500 p-2 rounded">
              Cancel
            </button>
          )}
        </div>
      )}

      {/* Category Table */}
      <table className="w-full bg-gray-800 rounded-lg">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2">Name</th>
            <th className="p-2">Slug</th>
            <th className="p-2">Image</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id} className="border-b border-gray-700">
              <td className="p-2">{cat.name}</td>
              <td className="p-2">{cat.slug}</td>
              <td className="p-2">
                <img src={cat.image} alt="Category" className="w-10 h-10 inline-block rounded" />
              </td>
              <td className="p-2">
                <button onClick={() => handleEdit(cat)} className="bg-yellow-500 p-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(cat._id)} className="bg-red-500 p-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
