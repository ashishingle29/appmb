import connectToDatabase from "@/src/lib/mongodb";
export async function GET(req, { params }) {
  await connectToDatabase();
  const tag = await Tag.findById(params.id);
  if (!tag) return NextResponse.json({ error: "Tag not found" }, { status: 404 });
  return NextResponse.json(tag);
}

export async function PUT(req, { params }) {
  await connectToDatabase();
  const { name, slug } = await req.json();

  try {
    const updatedTag = await Tag.findByIdAndUpdate(
      params.id,
      { name, slug },
      { new: true }
    );
    return NextResponse.json(updatedTag);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await connectToDatabase();
  await Tag.findByIdAndUpdate(params.id, { isDeleted: true }); // Soft delete
  return NextResponse.json({ success: true });
}
