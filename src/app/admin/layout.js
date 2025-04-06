import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Sidebar from "@/src/components/Admin/Sidebar";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-2 border-t">{children}</div>
    </div>
  );
}
