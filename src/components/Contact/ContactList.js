"use client";

import { useEffect, useState } from "react";
import Loader from "../Loader";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();

      if (data.success) {
        setContacts(data.data);

      } else {
        console.error("Failed to fetch contacts");
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(contacts, "contacts");

  const deleteContact = async (id) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      try {
        const res = await fetch(`/api/contact/${id}`, {
          method: "PATCH",
        });

        const data = await res.json();

        if (data.success) {
          alert("Contact deleted successfully!");
          fetchContacts(); // Refresh the list
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  if (loading) {
    return <Loader size="md" />
  }

  if (contacts.length === 0) {
    return <div className="text-center">No contact requests found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Details</th>
            <th className="border px-4 py-2">Submitted At</th>
            {/* <th className="border px-4 py-2">Action</th> */}
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={contact._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2">{contact.name}</td>
              <td className="border px-4 py-2">{contact.email}</td>
              <td className="border px-4 py-2">{contact.phone || "-"}</td>
              <td className="border px-4 py-2 max-w-xs truncate">
                {contact.details || "-"}
              </td>
              <td className="border px-4 py-2">
                {new Date(contact.createdAt).toLocaleString()}
              </td>
              {/* <td className="border px-4 py-2">
                <button
                  onClick={() => deleteContact(contact._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
