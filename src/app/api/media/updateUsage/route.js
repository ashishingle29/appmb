import { NextResponse } from "next/server";
import connectToDatabase from "@/src/lib/mongodb";
import Media from "@/src/lib/models/Media";

export async function POST(req) {
  await connectToDatabase();
  const { mediaId, usageType, contentId } = await req.json();

  await Media.findByIdAndUpdate(mediaId, {
    $push: { usedIn: { type: usageType, id: contentId } },
  });

  return NextResponse.json({ success: true });
}
