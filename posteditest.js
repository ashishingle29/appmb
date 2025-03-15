// import React from 'react'
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

// function posteditest() {
//   return (
    
//               {/* Drag & Drop Sections */}
//               <DragDropContext onDragEnd={handleDragEnd}>
//                 <Droppable droppableId="sections">
//                   {(provided) => (
//                     <div
//                       {...provided.droppableProps}
//                       ref={provided.innerRef}
//                       className="space-y-4"
//                     >
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
//                               className="p-0 w-full d-flex bg-gray-700 rounded-lg relative"
//                             >
//                               {/* Floating + Button for Adding New Sections */}
//                               <button
//                                 className="absolute-top-5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-black rounded-full p-2 transition hover:bg-blue-600"
//                                 onClick={() => setSelectedSectionIndex(index)}
//                               >
//                                 <Plus size={20} />
//                               </button>

//                               {/* Section Type Selector */}
//                               {selectedSectionIndex === index && (
//                                 <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 p-3 rounded shadow-lg">
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
//                                   <button
//                                     onClick={() => addSection("table", index)}
//                                     className="block text-black p-2"
//                                   >
//                                     Table
//                                   </button>
//                                 </div>
//                               )}

//                               {/* Section Content */}
//                               {section.type === "text" && (
//                                 <textarea
//                                   className="w-full p-3 bg-gray-600 rounded-lg"
//                                   value={section.content}
//                                   placeholder="Write text here..."
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
//                                 <pre className="w-full p-3 bg-black text-green-400 rounded-lg">
//                                   {section.content}
//                                 </pre>
//                               )}

//                               {/* Delete Button */}
//                               <button
//                                 onClick={() => deleteSection(index)}
//                                 className="mt-2 bg-red-500 p-2 rounded absolute right-2 top-2 transition hover:bg-red-600"
//                               >
//                                 <Trash size={16} />
//                               </button>
//                             </div>
//                           )}
//                         </Draggable>
//                       ))}
//                       {provided.placeholder}
//                     </div>
//                   )}
//                 </Droppable>
//               </DragDropContext>
//   )
// }

// export default posteditest




// {postData.sections.map((section, index) => (
//   <div key={index} className="mb-4">
//     {section.type === "text" && (
//       <p className="text-lg">{section.content}</p>
//     )}
//     {section.type === "image" && (
//       <img
//         src={section.content}
//         className="w-full h-auto rounded-lg"
//       />
//     )}
//     {section.type === "video" && (
//       <iframe
//         src={section.content}
//         className="w-full h-64 rounded-lg"
//       />
//     )}
//     {section.type === "code" && (
//       <pre className="w-full p-3 bg-gray-900 text-green-400 rounded-lg overflow-x-auto">
//         {section.content}
//       </pre>
//     )}
//   </div>
// ))}