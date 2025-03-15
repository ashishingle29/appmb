import { NextResponse } from "next/server";
import connectToDatabase from "@/src/lib/mongodb";
import Media from "@/src/lib/models/Media";

export async function GET(req, { params }) {
  await connectToDatabase();
  const media = await Media.findById(params.id);
  if (!media) return NextResponse.json({ error: "Media not found" }, { status: 404 });

  return NextResponse.json(media);
}
