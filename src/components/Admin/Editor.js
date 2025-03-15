// "use client";
// import { useEffect, useRef, useState } from "react";
// import EditorJS from "@editorjs/editorjs";
// import Paragraph from "@editorjs/paragraph";
// import Header from "@editorjs/header";
// import List from "@editorjs/list";
// import Code from "@editorjs/code";
// import Table from "@editorjs/table";
// import ImageTool from "@editorjs/image";
// import Embed from "@editorjs/embed";
// import Quote from "@editorjs/quote";
// import Marker from "@editorjs/marker";
// import LinkTool from "@editorjs/link";
// import AnyButton from "editorjs-button";
// import Undo from "editorjs-undo";

// export default function Editor({ onChange, initialContent }) {
//   const editorRef = useRef(null);
//   const editorContainerRef = useRef(null);
//   const [isEditorMounted, setIsEditorMounted] = useState(false);

// console.log(initialContent, "initialContent")

//   useEffect(() => {
//     if (!editorContainerRef.current || isEditorMounted) return; // Prevent duplicate mounting

//     const initializeEditor = async () => {
//       if (editorRef.current) return; // Prevent multiple instances

//       try {
//         const editor = new EditorJS({
//           holder: editorContainerRef.current, // Directly use the ref
//           placeholder: "Start writing your blog...",
//           autofocus: true,
//           tools: {
//             paragraph: { class: Paragraph, inlineToolbar: true },
//             header: { class: Header, config: { placeholder: "Enter a Heading", levels: [1, 2, 3, 4, 5, 6], defaultLevel: 2 } },
//             list: { class: List, inlineToolbar: true },
//             code: { class: Code },
//             table: { class: Table },
//             image: {
//               class: ImageTool,
//               config: {
//                 endpoints: { byFile: "/api/media/upload" },
//               },
//             },
//             embed: { class: Embed, inlineToolbar: true },
//             quote: { class: Quote, inlineToolbar: true, config: { quotePlaceholder: "Enter a quote", captionPlaceholder: "Author" } },
//             marker: { class: Marker, shortcut: "CMD+SHIFT+M" },
//             link: { class: LinkTool, inlineToolbar: true },
//             undo: { class: Undo },
//             AnyButton: { class: AnyButton, inlineToolbar: false },
//           },
//           data: initialContent || {}, // Load initial content
//           onReady: () => {
//             console.log("Editor.js is ready!");
//             setIsEditorMounted(true);
//           },
//           onChange: async () => {
//             const savedData = await editor.save();
//             onChange(savedData);
//           },
//         });

//         editorRef.current = editor;
//       } catch (error) {
//         console.error("Failed to initialize Editor.js:", error);
//       }
//     };

//     initializeEditor();

//     return () => {
//       if (editorRef.current) {
//         editorRef.current.isReady
//           .then(() => editorRef.current.destroy())
//           .catch(() => console.warn("Editor.js was not ready to destroy"));
//         editorRef.current = null;
//         setIsEditorMounted(false);
//       }
//     };
//   }, [initialContent]);

//   return (
//     <div className="bg-gray-100 p-4 rounded-lg min-h-[300px]">
//       <div ref={editorContainerRef} className="min-h-[300px]"></div>
//     </div>
//   );
// }
"use client";
import React, { useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
// import Paragraph from "@editorjs/paragraph";
// import Code from "@editorjs/code";
// import Table from "@editorjs/table";
// import LinkTool from "@editorjs/link";
// import AnyButton from "editorjs-button";
// import Undo from "editorjs-undo";

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

function Editor({ onChange, content }) {
  console.log(content)
  useEffect(() => {
    const editor = new EditorJS({
      holder: "textEditor", // Directly use the ref
      placeholder: "Start writing your blog...",
      data: content,
      tools: {
        embed: { class: Embed, inlineToolbar: true },
        list: { class: List, inlineToolbar: true },
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
        marker: { class: Marker, inlineToolbar: true },
        inlineCode: InlineCode,

        //             paragraph: { class: Paragraph, inlineToolbar: true },
        //             list: { class: List, inlineToolbar: true },
        //             code: { class: Code },
        //             table: { class: Table },
        //             image: {
        //               class: ImageTool,
        //               config: {
        //                 endpoints: { byFile: "/api/media/upload" },
        //               },
        //             },
        //             quote: { class: Quote, inlineToolbar: true, config: { quotePlaceholder: "Enter a quote", captionPlaceholder: "Author" } },
        //             marker: { class: Marker, shortcut: "CMD+SHIFT+M" },
        //             link: { class: LinkTool, inlineToolbar: true },
        //             undo: { class: Undo },
        //             AnyButton: { class: AnyButton, inlineToolbar: false },
      },
      autofocus: true,
      onReady: () => {
        console.log("Editor.js is ready!");
      },
      onChange: async () => {
        const savedData = await editor.save();
        onChange(savedData);
      },
    });
  }, []);

  return (
    <div
      id="textEditor"
      className="bg-gray-100 p-4 rounded-lg min-h-[300px]"
    ></div>
  );
}

export default Editor;
