import ContactList from "@/src/components/Contact/ContactList";

export default function ContactPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Contact Requests</h1>
      <ContactList />
    </div>
  );
}
