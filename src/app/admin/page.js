"use client";

export default function AdminDashboard() {
  return (
    <div
      className="min-h-screen bg-gray-900 text-black
     p-4"
    >
      <nav className="flex justify-between items-center bg-gray-800 p-4 rounded-md">
        <h2>Admin Dashboard</h2>
      </nav>
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Manage Blog Posts</h3>
        {/* Later, we will add CRUD operations here */}
      </div>
    </div>
  );
}
