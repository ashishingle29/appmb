"use client";
import CommonMaterialReactTable from "@/src/components/MaterialReactTable/MaterialReactTable";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Posts() {

  const [postsList, setPostsList] = useState([]);

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPostsList(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const columns = [
    {
      accessorKey: "Image",
      header: "featuredImage",
      Cell: ({ row }) => {
        return row.original.featuredImage ? (
          <img
            src={row.original.featuredImage}
            alt="featuredImage"
            width="100px"
          />
        ) : (
          "No Image"
        );
      },
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      accessorKey: "published",
      header: "isPublished",
      Cell: ({ cell, row }) => {
        return row.original.isPublished ? "Published" : "Draft";
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created Date",
      Cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString(
          "en-US",
          { hour: "2-digit", minute: "2-digit", hour12: true }
        )}`;
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      Cell: ({ row }) => {
        return (
          <div className="flex items-center space-x-2">
            <button
              className="p-1 text-sm bg-blue-500 text-white rounded"
            >
              <Link href={`/admin/posts/p/${row.original.slug}`}>Edit</Link>
            </button>
            <button
              className="p-1 text-sm bg-red-500 text-white rounded"
              onClick={() => handleDelete(row.original.slug)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  //   const handleSave = async () => {
  //     const url = editingTag ? `/api/tags/${editingTag._id}` : "/api/tags";
  //     const method = editingTag ? "PUT" : "POST";

  //     await fetch(url, {
  //       method,
  //       body: JSON.stringify(tagData),
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     resetForm();
  //     fetchTags();
  //   };

  //   const handleEdit = (tag) => {
  //     setTagData(tag);
  //     setEditingTag(tag);
  //     setShowTagForm(true);
  //   };

  const handleDelete = async (slug) => {
    if (!confirm("Are you sure you want to delete this posts?")) return;
    await fetch(`/api/posts/${slug}`, { method: "DELETE" });
    fetchPosts();
  };

  //   const resetForm = () => {
  //     setTagData({ name: "", slug: "" });
  //     setEditingTag(null);
  //     setShowTagForm(false);
  //   };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-black">
      {/* Heading & Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Posts</h2>
      </div>
      {/* Posts Table */}
      <CommonMaterialReactTable columns={columns} data={postsList} />
    </div>
  );
}
