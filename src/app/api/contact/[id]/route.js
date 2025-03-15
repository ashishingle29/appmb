import { NextResponse } from "next/server";
import dbConnect from "@/src/lib/mongodb";
import Contact from "@/src/lib/models/Contact";

export async function PATCH(req, { params }) {
  await dbConnect();

  const { id } = params;

  try {
    await Contact.findByIdAndUpdate(id, { isDeleted: true });
    return NextResponse.json(
      { success: true, message: "Contact soft deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete contact." },
      { status: 500 }
    );
  }
}
