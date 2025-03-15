import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/src/lib/mongodb";
import User from "@/src/lib/models/User";

export async function POST(req) {
  try {
    await connectToDatabase();

    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      return NextResponse.json({ error: "Registration is closed" }, { status: 403 });
    }

    const { email, password } = await req.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({ email, password: hashedPassword });

    return NextResponse.json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    return NextResponse.json({ error: "Error registering user" }, { status: 500 });
  }
}
