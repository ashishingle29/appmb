"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, FileText, MessageSquare, Settings, LogOut, Image, TypeIcon, CatIcon, TagsIcon } from "lucide-react";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <Home size={20} /> },
    { name: "Posts", path: "/admin/posts", icon: <FileText size={20} /> },
    { name: "New Posts", path: "/admin/posts/p/0", icon: <FileText size={20} /> },
    { name: "Comments", path: "/admin/comments", icon: <MessageSquare size={20} /> },
    { name: "Categories", path: "/admin/categories", icon: <CatIcon size={20} /> },
    { name: "Tags", path: "/admin/tags", icon: <TagsIcon size={20} /> },
    { name: "Media", path: "/admin/media", icon: <Image size={20} /> }, // 🔥 New Media Section Added
    { name: "Contacts", path: "/admin/contact", icon: <Image size={20} /> }, // 🔥 New Media Section Added
    { name: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 h-full bg-black text-white border-r border-gray-700 shadow-xl">
      <div className="p-5 text-lg font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <ul className="mt-4">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link href={item.path}>
              <div
                className={`flex items-center gap-3 p-3 mx-2 my-2 rounded-lg cursor-pointer transition-all ${
                  pathname === item.path
                    ? "bg-gray-800 text-white shadow-lg border-l-4 border-blue-500"
                    : "hover:bg-gray-900 hover:shadow-md hover:border-l-4 hover:border-gray-600"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </div>
            </Link>
          </li>
        ))}
        <li>
          <div
            className="flex items-center gap-3 p-3 mx-2 my-2 rounded-lg cursor-pointer transition-all hover:bg-gray-900 hover:shadow-md hover:border-l-4 hover:border-gray-600"
            onClick={() => signOut()}
          >
            <LogOut />
            <span>Logout</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
