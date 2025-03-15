// "use client";
// import { useState, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import {
//   MoreVertical,
//   Plus,
//   Trash,
//   Image,
//   Video,
//   Code,
//   Heading,
//   Table,
// } from "lucide-react";
// import MediaUploader from "@/src/components/Admin/MediaUploader";
// import MediaLibrary from "@/src/components/Admin/MediaLibrary";

// export default function PostsPage() {
//   const [posts, setPosts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [tags, setTags] = useState([]);
//   const [postData, setPostData] = useState({
//     title: "",
//     slug: "",
//     category: "",
//     tags: [],
//     sections: [1],
//     featuredImage: "",
//     isPublished: false,
//   });
//   const [editingPost, setEditingPost] = useState(null);
//   const [showPostForm, setShowPostForm] = useState(false);
//   const [previewMode, setPreviewMode] = useState(false);
//   const [selectedSectionIndex, setSelectedSectionIndex] = useState(null); // For showing section menu

//   useEffect(() => {
//     fetchPosts();
//     fetchCategories();
//     fetchTags();
//   }, []);

//   const fetchPosts = async () => {
//     const res = await fetch("/api/posts");
//     const data = await res.json();
//     setPosts(data);
//   };

//   const fetchCategories = async () => {
//     const res = await fetch("/api/categories");
//     const data = await res.json();
//     setCategories(data);
//   };

//   const fetchTags = async () => {
//     const res = await fetch("/api/tags");
//     const data = await res.json();
//     setTags(data);
//   };

//   const handleImageUpload = (imagePath) => {
//     setPostData({ ...postData, featuredImage: imagePath });
//   };

//   const handleSave = async () => {
//     const url = editingPost ? `/api/posts/${editingPost._id}` : "/api/posts";
//     const method = editingPost ? "PUT" : "POST";

//     await fetch(url, {
//       method,
//       body: JSON.stringify(postData),
//       headers: { "Content-Type": "application/json" },
//     });

//     resetForm();
//     fetchPosts();
//   };

//   const addSection = (type, index) => {
//     const newSection = { type, content: "" };
//     const updatedSections = [...postData.sections];
//     updatedSections.splice(index + 1, 0, newSection); // Add after the clicked row
//     setPostData({ ...postData, sections: updatedSections });
//     setSelectedSectionIndex(null); // Hide the selection menu
//   };

//   const updateSectionContent = (index, content) => {
//     const updatedSections = [...postData.sections];
//     updatedSections[index].content = content;
//     setPostData({ ...postData, sections: updatedSections });
//   };

//   const deleteSection = (index) => {
//     const updatedSections = postData.sections.filter((_, i) => i !== index);
//     setPostData({ ...postData, sections: updatedSections });
//   };

//   const handleDragEnd = (result) => {
//     if (!result.destination) return;
//     const reorderedSections = [...postData.sections];
//     const [movedItem] = reorderedSections.splice(result.source.index, 1);
//     reorderedSections.splice(result.destination.index, 0, movedItem);
//     setPostData({ ...postData, sections: reorderedSections });
//   };

//   return (
//     <div className="p-6 bg-gray-900 min-h-screen text-black">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">Create Post</h2>
//         <button onClick={handleSave} className="bg-green-500 p-2 rounded">
//           Publish Post
//         </button>
//       </div>

//       <div className="grid grid-cols-3 gap-4 mt-4">
//         {/* Left Column - Post Editor */}
//         <div className="col-span-2 bg-gray-800 p-4 rounded-lg">
//           <div className="flex justify-between mb-2">
//             <h3 className="text-lg font-semibold">
//               {editingPost ? "Edit Post" : "Add New Post"}
//             </h3>
//             <button
//               onClick={() => setPreviewMode(!previewMode)}
//               className="bg-gray-500 p-2 rounded"
//             >
//               {previewMode ? "Edit Mode" : "Preview Mode"}
//             </button>
//           </div>

//           {!previewMode ? (
//             <>
//               <input
//                 type="text"
//                 placeholder="Title"
//                 className="w-full p-2 mb-2 bg-gray-700"
//                 value={postData.title}
//                 onChange={(e) =>
//                   setPostData({
//                     ...postData,
//                     title: e.target.value,
//                     slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
//                   })
//                 }
//               />

//               <DragDropContext onDragEnd={handleDragEnd}>
//                 <Droppable droppableId="sections">
//                   {(provided) => (
//                     <div {...provided.droppableProps} ref={provided.innerRef}>
//                       {postData.sections.map((section, index) => (
//                         <Draggable
//                           key={index}
//                           draggableId={index.toString()}
//                           index={index}
//                         >
//                           {(provided) => (
//                             <div
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                               className="p-4 bg-gray-700 rounded-lg mb-2 relative"
//                             >
//                               {/* Add Section Button */}
//                               <button
//                                 className="absolute-top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white rounded-full p-1"
//                                 onClick={() => setSelectedSectionIndex(index)}
//                               >
//                                 <Plus size={20} />
//                               </button>

//                               {/* Section Type Selector */}
//                               {selectedSectionIndex === index && (
//                                 <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 p-2 rounded shadow-lg">
//                                   <button
//                                     onClick={() => addSection("text", index)}
//                                     className="block text-black p-2"
//                                   >
//                                     Text
//                                   </button>
//                                   <button
//                                     onClick={() => addSection("image", index)}
//                                     className="block text-black p-2"
//                                   >
//                                     Image
//                                   </button>
//                                   <button
//                                     onClick={() => addSection("video", index)}
//                                     className="block text-black p-2"
//                                   >
//                                     Video
//                                   </button>
//                                   <button
//                                     onClick={() => addSection("code", index)}
//                                     className="block text-black p-2"
//                                   >
//                                     Code
//                                   </button>
//                                 </div>
//                               )}

//                               {/* Section Content */}
//                               {section.type === "text" && (
//                                 <textarea
//                                   className="w-full p-2 bg-gray-600"
//                                   value={section.content}
//                                   onChange={(e) =>
//                                     updateSectionContent(index, e.target.value)
//                                   }
//                                 />
//                               )}
//                               {section.type === "image" && (
//                                 <img
//                                   src={section.content}
//                                   className="w-full h-auto rounded"
//                                 />
//                               )}
//                               {section.type === "video" && (
//                                 <iframe
//                                   src={section.content}
//                                   className="w-full h-64 rounded"
//                                 />
//                               )}
//                               {section.type === "code" && (
//                                 <pre className="w-full p-2 bg-black text-green-400">
//                                   {section.content}
//                                 </pre>
//                               )}
//                               {postData.sections?.length > 1 && (
//                                 <button
//                                   onClick={() => deleteSection(index)}
//                                   className="mt-2 bg-red-500 p-2 rounded absolute right-2 top-2"
//                                 >
//                                   <Trash size={16} />
//                                 </button>
//                               )}
//                             </div>
//                           )}
//                         </Draggable>
//                       ))}
//                       {provided.placeholder}
//                     </div>
//                   )}
//                 </Droppable>
//               </DragDropContext>
//             </>
//           ) : (
//             <div className="p-6 bg-black text-black rounded-lg">
//               <h1 className="text-3xl font-bold mb-4">{postData.title}</h1>
//               <img
//                 src={postData.featuredImage}
//                 alt="Featured"
//                 className="w-full h-auto rounded mb-4"
//               />
//               {postData.sections.map((section, index) => (
//                 <div key={index} className="mb-4">
//                   {section.type === "text" && <p>{section.content}</p>}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";
// import MediaUploader from "@/src/components/Admin/MediaUploader";
// import MediaLibrary from "@/src/components/Admin/MediaLibrary";

// export default function PostsPage() {
//   const [posts, setPosts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [tags, setTags] = useState([]);
//   const [postData, setPostData] = useState({
//     title: "",
//     metadescription:"",
//     slug: "",
//     category: "",
//     tags: [],
//     sections: [{ type: "text", content: "" }],
//     featuredImage: "",
//     isPublished: false,
//   });
//   const [editingPost, setEditingPost] = useState(null);
//   const [previewMode, setPreviewMode] = useState(false);
//   const [selectedSectionIndex, setSelectedSectionIndex] = useState(null); // For showing section menu

//   useEffect(() => {
//     fetchPosts();
//     fetchCategories();
//     fetchTags();
//   }, []);

//   const fetchPosts = async () => {
//     const res = await fetch("/api/posts");
//     const data = await res.json();
//     setPosts(data);
//   };

//   const fetchCategories = async () => {
//     const res = await fetch("/api/categories");
//     const data = await res.json();
//     setCategories(data);
//   };

//   const fetchTags = async () => {
//     const res = await fetch("/api/tags");
//     const data = await res.json();
//     setTags(data);
//   };

//   const handleImageUpload = (imagePath) => {
//     setPostData({ ...postData, featuredImage: imagePath });
//   };

//   const handleSave = async () => {
//     const url = editingPost ? `/api/posts/${editingPost._id}` : "/api/posts";
//     const method = editingPost ? "PUT" : "POST";

//     await fetch(url, {
//       method,
//       body: JSON.stringify(postData),
//       headers: { "Content-Type": "application/json" },
//     });

//     resetForm();
//     fetchPosts();
//   };

//   const addSection = (type, index) => {
//     const newSection = { type, content: "" };
//     const updatedSections = [...postData.sections];
//     updatedSections.splice(index + 1, 0, newSection); // Add after the clicked row
//     setPostData({ ...postData, sections: updatedSections });
//     setSelectedSectionIndex(null); // Hide the selection menu
//   };

//   const updateSectionContent = (index, content) => {
//     const updatedSections = [...postData.sections];
//     updatedSections[index].content = content;
//     setPostData({ ...postData, sections: updatedSections });
//   };

//   const deleteSection = (index) => {
//     const updatedSections = postData.sections.filter((_, i) => i !== index);
//     setPostData({ ...postData, sections: updatedSections });
//   };

//   const handleDragEnd = (result) => {
//     if (!result.destination) return;
//     const reorderedSections = [...postData.sections];
//     const [movedItem] = reorderedSections.splice(result.source.index, 1);
//     reorderedSections.splice(result.destination.index, 0, movedItem);
//     setPostData({ ...postData, sections: reorderedSections });
//   };

//   return (
//     <div className="bg-gray-900 min-h-screen text-black pb-10">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-gray-700">
//         <h2 className="text-2xl font-bold">
//           {postData.title ? "Edit Post" : "Create Post"}
//         </h2>
//         <div className="flex gap-2 mt-2 sm:mt-0">
//           <button
//             onClick={handleSave}
//             className="bg-green-500 px-4 py-2 rounded-lg text-black font-bold transition hover:bg-green-600"
//           >
//             Publish Post
//           </button>
//           <button
//             onClick={() => setPreviewMode(!previewMode)}
//             className="bg-blue-500 px-4 py-2 rounded-lg text-black font-bold transition hover:bg-blue-600"
//           >
//             {previewMode ? "Back to Edit" : "Preview Post"}
//           </button>
//         </div>
//       </div>

//       {/* Main Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-4">
//         {/* Post Editor */}
//         <div className="lg:col-span-2 bg-gray-800 p-2 rounded-lg">
//           {!previewMode ? (
//             <>
//               <input
//                 type="text"
//                 placeholder="Enter Post Title..."
//                 className="w-full mb-4 bg-gray-700 text-xl font-bold text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
//                 value={postData.title}
//                 onChange={(e) =>
//                   setPostData({
//                     ...postData,
//                     title: e.target.value,
//                     slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
//                   })
//                 }
//               />
//             </>
//           ) : (
//             <div className="p-6 bg-black text-black rounded-lg">
//               <h1 className="text-3xl font-bold mb-4">{postData.title}</h1>
//               {postData.featuredImage && (
//                 <img
//                   src={postData.featuredImage}
//                   alt="Featured"
//                   className="w-full h-auto rounded-lg mb-4"
//                 />
//               )}
//             </div>
//           )}
//         </div>

//         {/* Post Settings */}
//         <div className="bg-gray-800 p-2 rounded-lg">
//           <label className="block text-md font-semibold mb-2">Category</label>
//           <select
//             className="w-full p-2 mb-4 bg-gray-700 rounded-lg"
//             value={postData.category}
//             onChange={(e) =>
//               setPostData({ ...postData, category: e.target.value })
//             }
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat._id} value={cat._id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>

//           <label className="block text-md font-semibold mb-2">Tags</label>
//           <div className="flex flex-wrap gap-2 mb-4">
//             {tags.map((tag) => (
//               <label key={tag._id} className="flex items-center">
//                 <input
//                   type="checkbox"
//                   className="mr-2"
//                   checked={postData.tags.includes(tag._id)}
//                   onChange={(e) => {
//                     const newTags = e.target.checked
//                       ? [...postData.tags, tag._id]
//                       : postData.tags.filter((id) => id !== tag._id);
//                     setPostData({ ...postData, tags: newTags });
//                   }}
//                 />
//                 {tag.name}
//               </label>
//             ))}
//           </div>

//           <h4 className="text-md font-semibold mb-2">Featured Image</h4>
//           <MediaUploader onUpload={handleImageUpload} usageType="post" />
//           <MediaLibrary onSelect={handleImageUpload} />
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";
import { useState, useEffect } from "react";
import MediaUploader from "@/src/components/Admin/MediaUploader";
import MediaLibrary from "@/src/components/Admin/MediaLibrary";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [postData, setPostData] = useState({
    title: "",
    metadescription:"",
    slug: "",
    category: "",
    tags: [],
    sections: [{ type: "text", content: "" }],
    featuredImage: "",
    isPublished: false,
  });
  const [editingPost, setEditingPost] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(null); // For showing section menu

  useEffect(() => {
    fetchPosts();
    fetchCategories();
    fetchTags();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

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

  const handleImageUpload = (imagePath) => {
    setPostData({ ...postData, featuredImage: imagePath });
  };

  const handleSave = async () => {
    const url = editingPost ? `/api/posts/${editingPost._id}` : "/api/posts";
    const method = editingPost ? "PUT" : "POST";

    await fetch(url, {
      method,
      body: JSON.stringify(postData),
      headers: { "Content-Type": "application/json" },
    });

    resetForm();
    fetchPosts();
  };

  const addSection = (type, index) => {
    const newSection = { type, content: "" };
    const updatedSections = [...postData.sections];
    updatedSections.splice(index + 1, 0, newSection); // Add after the clicked row
    setPostData({ ...postData, sections: updatedSections });
    setSelectedSectionIndex(null); // Hide the selection menu
  };

  const updateSectionContent = (index, content) => {
    const updatedSections = [...postData.sections];
    updatedSections[index].content = content;
    setPostData({ ...postData, sections: updatedSections });
  };

  const deleteSection = (index) => {
    const updatedSections = postData.sections.filter((_, i) => i !== index);
    setPostData({ ...postData, sections: updatedSections });
  };

  return (
    <div className="bg-gray-900 min-h-screen text-black pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-gray-700">
        <h2 className="text-2xl font-bold">
          {postData.title ? "Edit Post" : "Create Post"}
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-4">
        {/* Post Editor */}
        <div className="lg:col-span-2 bg-gray-800 p-2 rounded-lg">
          {!previewMode ? (
            <>
              <input
                type="text"
                placeholder="Enter Post Title..."
                className="w-full mb-4 bg-gray-700 text-xl font-bold text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                value={postData.title}
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    title: e.target.value,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                  })
                }
              />
              
              {/* Block Section */}
              {postData.sections.map((section, index) => (
                <div key={index} className="my-2 border border-gray-600 rounded-lg">
                  <textarea
                    className="w-full p-2 bg-gray-700 text-black placeholder-gray-400 focus:outline-none"
                    value={section.content}
                    onChange={(e) => updateSectionContent(index, e.target.value)}
                  />
                  <div className="flex justify-end gap-2 p-2">
                    <button
                      onClick={() => addSection("text", index)}
                      className="bg-blue-500 px-2 py-1 rounded text-black"
                    >
                      Add Block
                    </button>
                    <button
                      onClick={() => deleteSection(index)}
                      className="bg-red-500 px-2 py-1 rounded text-black"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="p-6 bg-black text-black rounded-lg">
              <h1 className="text-3xl font-bold mb-4">{postData.title}</h1>
              {postData.featuredImage && (
                <img
                  src={postData.featuredImage}
                  alt="Featured"
                  className="w-full h-auto rounded-lg mb-4"
                />
              )}
            </div>
          )}
        </div>

        {/* Post Settings */}
        <div className="bg-gray-800 p-2 rounded-lg">
          <h4 className="text-md font-semibold mb-2">Featured Image</h4>
          <MediaUploader onUpload={handleImageUpload} usageType="post" />
          <MediaLibrary onSelect={handleImageUpload} />
        </div>
      </div>
    </div>
  );
}

