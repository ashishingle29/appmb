"use client";
import { useState, useEffect } from "react";
import MediaUploader from "@/src/components/Admin/MediaUploader";
import MediaLibrary from "@/src/components/Admin/MediaLibrary";
import Editor from "@/src/components/Admin/Editor";
import { useParams, useRouter } from "next/navigation";

import EditorJS from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
// import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import ColorPlugin from "editorjs-text-color-plugin";
import Undo from "editorjs-undo";
import Paragraph from "@editorjs/paragraph";
import Code from "@editorjs/code";
import Table from "@editorjs/table";
// import LinkTool from "@editorjs/link";
import Button from "editorjs-button";
import { MagnetIcon } from "lucide-react";
import MediaManagerModal from "@/src/components/Admin/MediaManagerModal";
import { NO_IMAGE_URL } from "@/src/utils/constants";

const uploadImageByUrl = async (e) => {
  let link = new Promise((resolve, reject) => {
    try {
      resolve(e);
    } catch (error) {
      reject(error);
    }
  });

  return link.then((url) => {
    return {
      success: 1,
      file: { url },
    };
  });
};

const uploadImageByFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("usageType", "post"); // Change dynamically if needed
  const slug = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension for slug
  formData.append("slug", slug); // Use real slug

  const res = await fetch("/api/media/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (data.success) {
    return {
      success: 1,
      file: { url: data.path },
    };
  } else {
    throw new Error(data.error);
  }
};

export default function PostsPage() {
  const { slug } = useParams(); // Get the ID from the URL
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [postData, setPostData] = useState({
    _id: "",
    title: "",
    metadescription: "",
    slug: "",
    category: "",
    tags: [],
    content: {}, // Store JSON data from Editor.js
    featuredImage: "",
    isPublished: false,
  });

  const [modalOpen, setModalOpen] = useState(false);
  

  // useEffect(() => {
  //   const editor = new EditorJS({
  //     holder: "textEditor",
  //     placeholder: "Start writing your blog...",
  //     data: postData?.content,
  //     tools: {
  //       embed: { class: Embed, inlineToolbar: true },
  //       list: { class: List, inlineToolbar: true },
  //       image: {
  //         class: Image,
  //         config: {
  //           uploader: {
  //             uploadByUrl: uploadImageByUrl,
  //             uploadByFile: uploadImageByFile,
  //           },
  //         },
  //       },
  //       header: {
  //         class: Header,
  //         config: {
  //           placeholder: "Enter a Heading....",
  //           levels: [2, 3, 4, 5, 6],
  //           defaultLevel: 2,
  //         },
  //       },
  //       quote: { class: Quote, inlineToolbar: true },
  //       marker: { class: Marker, inlineToolbar: true },
  //       inlineCode: InlineCode,
  //       // undo: Undo,

  //     },
  //     autofocus: true,
  //     onChange: async () => {
  //       const savedData = await editor.save();
  //       handleEditorChange(savedData);
  //     },
  //   });

  //   return () => {
  //     editor.isReady.then(() => {
  //       editor.destroy();
  //     });
  //   };
  // }, [postData._id]);

  useEffect(() => {
    const editor = new EditorJS({
      holder: "textEditor",
      placeholder: "Start writing your blog...",
      data: postData?.content,
      tools: {
        embed: { class: Embed, inlineToolbar: true },
        list: { class: List, inlineToolbar: true },
        paragraph: { class: Paragraph, inlineToolbar: true },
        code: { class: Code },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
            // maxRows: 5,
            // maxCols: 5,
          },
        },
        button: {
          class: Button,
          inlineToolbar: true,
          config: {
            colors: ["#007bff", "#28a745", "#dc3545", "#ffc107"], // Blue, Green, Red, Yellow
            target: "_blank", // Open in new tab
          },
        },

        // AnyButton: {
        //   class: AnyButton,
        //   inlineToolbar: false,
        // },
        image: {
          class: Image,
          config: {
            uploader: {
              uploadByUrl: uploadImageByUrl,
              uploadByFile: uploadImageByFile,
            },
          },
        },
        header: {
          class: Header,
          config: {
            placeholder: "Enter a Heading....",
            levels: [2, 3, 4, 5, 6],
            defaultLevel: 2,
          },
        },
        quote: { class: Quote, inlineToolbar: true },
        // marker: { class: Marker, inlineToolbar: true },
        // Add Text Color Plugin
        // Add Text Color Plugin
        // 🔴 Text Color Plugin Configuration
        textColor: {
          class: ColorPlugin,
          config: {
            type: "text",
            colorCollections: [
              "#FF5733",
              "#33FF57",
              "#3357FF",
              "#FF33A1",
              "#FFD700",
              "#8A2BE2",
              "#DC143C",
              "#00CED1",
              "#32CD32",
              "#FF4500",
            ], // Multiple colors
            defaultColor: "#FF5733",
            customPicker: true,
          },
        },

        // 🟡 Marker (Highlight) Color Plugin Configuration
        markerColor: {
          class: ColorPlugin,
          config: {
            type: "marker",
            colorCollections: [
              "#FFFA65",
              "#FCBA03",
              "#FF8C00",
              "#00FF00",
              "#ADD8E6",
              "#FFFF00",
              "#FF6347",
              "#87CEFA",
              "#7FFF00",
              "#FFD700",
            ], // Multiple highlight colors
            defaultColor: "#FFFA65",
            customPicker: true,
          },
        },

        inlineCode: InlineCode,
      },
      autofocus: true,
      onChange: async () => {
        const savedData = await editor.save();
        handleEditorChange(savedData);
      },
    });

    // Initialize Undo Plugin
    editor.isReady.then(() => {
      const undo = new Undo({ editor });
    });

    return () => {
      editor.isReady.then(() => {
        editor.destroy();
      });
    };
  }, [postData._id]);

  console.log(postData, "<<<<<<<<<========postData");

  useEffect(() => {
    fetchCategories();
    fetchTags();
  }, []);

  const fetchPost = async () => {
    const res = await fetch(`/api/posts/${slug}`);
    const data = await res.json();
    setPostData(data);
  };

  useEffect(() => {
    if (slug?.length > 1) {
      fetchPost();
    }
  }, [slug]);

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  const fetchTags = async () => {
    const res = await fetch("/api/tags");
    const data = await res.json();
    setTags(data);
  };

  // 🛠 Fix: Ensure Only the Content Updates
  const handleEditorChange = (newContent) => {
    setPostData((prev) => ({
      ...prev,
      content: newContent,
    }));
  };

  const handleImageUpload = (imagePath) => {
    setPostData((prev) => ({
      ...prev,
      featuredImage: imagePath,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const url = postData?._id ? `/api/posts/${postData?.slug}` : "/api/posts";
    const method = postData?._id ? "PUT" : "POST";

    console.log(postData, "submitpost");
    const res = await fetch(url, {
      method,
      body: JSON.stringify(postData),
      headers: { "Content-Type": "application/json" },
    });
    console.log(res, "submitpostres");
    if (res?.status === 200) {
      console.log("Post saved successfully");
      router.push("/admin/posts");
    } else {
      console.log("Failed to save post");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-black pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b border-gray-700">
        <h2 className="text-2xl font-bold">
          {postData?._id ? "Edit Post" : "Create Post"}
        </h2>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <button
            onClick={handleSave}
            className="bg-green-500 px-4 py-2 rounded-lg text-black font-bold transition hover:bg-green-600"
          >
            Publish Post
          </button>
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="bg-blue-500 px-4 py-2 rounded-lg text-black font-bold transition hover:bg-blue-600"
          >
            {previewMode ? "Back to Edit" : "Preview Post"}
          </button>
        </div>
      </div>

      {/* Main Layout */}
      {!previewMode ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-4">
          {/* Post Editor */}
          <div className="lg:col-span-2 bg-gray-800 rounded-lg">
            <input
              type="text"
              placeholder="Enter Post Title..."
              className="w-full mb-4 bg-gray-700 text-xl font-bold text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
              value={postData.title}
              onChange={(e) =>
                setPostData((prev) => ({
                  ...prev,
                  title: e.target.value,
                  // slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                }))
              }
            />
            <div
              id="textEditor"
              className="bg-gray-100 p-4 rounded-lg min-h-[300px]"
            ></div>
          </div>

          {/* Post Settings */}
          <div className="bg-gray-800 rounded-lg">
            <div className="border-b border-gray-700 mb-2">
              <h3 className="text-lg font-semibold mb-2">Slug</h3>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  className="w-full bg-gray-700 rounded-lg"
                  value={postData.slug}
                  onChange={(e) =>
                    setPostData((prev) => ({
                      ...prev,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                    }))
                  }
                />
                <button
                  onClick={() => {
                    setPostData((prev) => ({
                      ...prev,
                      slug: postData.title.toLowerCase().replace(/\s+/g, "-"),
                    }));
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  <MagnetIcon size={16} className="inline mr-1" />
                </button>
              </div>
            </div>
            <div className="border-b border-gray-700 mb-2">
              <label className="block text-md font-semibold mb-2">
                Meta Description
              </label>
              <textarea
                type="text"
                className="w-full bg-gray-700 rounded-lg"
                value={postData.metadescription}
                onChange={(e) =>
                  setPostData((prev) => ({
                    ...prev,
                    metadescription: e.target.value,
                  }))
                }
              />
            </div>
            <div className="border-b border-gray-700 mb-2">
              <label className="block text-md font-semibold mb-2">
                Post Status:
              </label>
              <input
                type="checkbox"
                className="m-2"
                onChange={(e) =>
                  setPostData((prev) => ({
                    ...prev,
                    isPublished: e.target.checked,
                  }))
                }
                checked={postData?.isPublished}
              />
              <span>{postData.isPublished ? "published" : "Draft"}</span>
            </div>
            <div className="border-b border-gray-700 mb-2">
              <label className="block text-md font-semibold mb-2">
                Category
              </label>
              <select
                className="w-full p-2 mb-4 bg-gray-700 rounded-lg"
                value={postData.category?._id}
                onChange={(e) =>
                  setPostData((prev) => ({ ...prev, category: e.target.value }))
                }
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="border-b border-gray-700 mb-2">
              <label className="block text-md font-semibold mb-2">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <label key={tag._id} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={postData.tags.find((t) => t?._id === tag._id)}
                      onChange={(e) => {
                        const newTags = e.target.checked
                          ? [...postData.tags, tag._id]
                          : postData.tags.filter((id) => id !== tag._id);
                        setPostData((prev) => ({ ...prev, tags: newTags }));
                      }}
                    />
                    {tag.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="border-b border-gray-700 mb-2">
              <h4 className="text-md font-semibold mb-2">Featured Image</h4>
              <img
                src={postData?.featuredImage || NO_IMAGE_URL}
                alt={postData.title || "Featured Image"}
                className="w-full h-64 object-cover rounded mb-2"
                loading="lazy"
                error={NO_IMAGE_URL}
              />

              <button
                className="px-4 py-2 bg-slate-700 text-white rounded mb-2"
                onClick={() => setModalOpen(true)}
              >
                Use Media
              </button>

              <MediaManagerModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSelect={(media) => handleImageUpload(media)}
                usageType="post"
                selectedImage={postData?.featuredImage}
              />

              {/* <MediaUploader onUpload={handleImageUpload} usageType="post" />
              <MediaLibrary onSelect={handleImageUpload} /> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-black p-6">
          <h1 className="text-3xl font-bold">{postData.title}</h1>
          <pre>{JSON.stringify(postData.content, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
