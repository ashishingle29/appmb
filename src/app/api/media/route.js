import { NextResponse } from "next/server";
import connectToDatabase from "@/src/lib/mongodb";

import Media from "@/src/lib/models/Media";

export async function GET() {
  await connectToDatabase();
  const media = await Media.find().sort({ createdAt: -1 });
  return NextResponse.json(media);
}
