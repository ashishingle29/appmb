import { NextResponse } from "next/server";
import dbConnect from "@/src/lib/mongodb";
import Contact from "@/src/lib/models/Contact";

export async function GET(req) {
  await dbConnect();

  try {
    const contacts = await Contact.find({ isDeleted: false }).sort({
      createdAt: -1,
    });
    return NextResponse.json(
      { success: true, data: contacts },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch contacts." },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const { name, email, phone, details } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Name and Email are required." },
        { status: 400 }
      );
    }

    const newContact = new Contact({
      name,
      email,
      phone,
      details,
    });

    await newContact.save();

    return NextResponse.json(
      { success: true, message: "Form submitted successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to submit the form." },
      { status: 500 }
    );
  }
}
