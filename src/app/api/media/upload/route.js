// import { NextResponse } from "next/server";
// import { join, extname } from "path";
// import fs from "fs-extra";
// import { IncomingForm } from "formidable";
// import sharp from "sharp";
// import connectToDatabase from "@/src/lib/mongodb";
// import Media from "@/src/lib/models/Media";

// // Ensure formidable doesn't parse the request automatically
// export const config = { api: { bodyParser: false } };

// export async function POST(req) {
//   await connectToDatabase();

//   const form = new IncomingForm({ multiples: false });
  
//   return new Promise((resolve, reject) => {
//     form.parse(req, async (err, fields, files) => {
//       if (err) return reject(NextResponse.json({ error: "Upload failed" }, { status: 500 }));

//       const file = files.file[0];
//       const { usageType, slug } = fields; // usageType: "post" | "category" | "tag"

//       if (!file) return reject(NextResponse.json({ error: "No file uploaded" }, { status: 400 }));

//       const ext = extname(file.originalFilename).toLowerCase();
//       const allowedTypes = [".jpg", ".jpeg", ".png", ".webp"];
      
//       if (!allowedTypes.includes(ext)) {
//         return reject(NextResponse.json({ error: "Invalid file type" }, { status: 400 }));
//       }

//       // Define upload path based on usageType
//       let uploadDir;
//       switch (usageType) {
//         case "post":
//           uploadDir = "uploads/post";
//           break;
//         case "category":
//           uploadDir = "uploads/category";
//           break;
//         case "tag":
//           uploadDir = "uploads/tag";
//           break;
//         default:
//           uploadDir = "uploads/media";
//       }

//       // Ensure the upload directory exists
//       const publicPath = join(process.cwd(), "public", uploadDir);
//       await fs.ensureDir(publicPath);

//       // Generate SEO-friendly filename
//       const timestamp = Date.now();
//       const filename = `${slug}-${timestamp}.webp`;
//       const filePath = join(publicPath, filename);
//       const dbPath = `/${uploadDir}/${filename}`;

//       try {
//         // Convert to WebP and save
//         await sharp(file.filepath)
//           .resize({ width: 1200 }) // Resize for better SEO
//           .toFormat("webp")
//           .toFile(filePath);

//         // Store in MongoDB
//         const mediaEntry = await Media.create({
//           filename,
//           path: dbPath,
//           type: "image",
//           usedIn: [],
//         });

//         resolve(NextResponse.json({ success: true, path: dbPath, media: mediaEntry }));
//       } catch (error) {
//         reject(NextResponse.json({ error: "Error processing file" }, { status: 500 }));
//       }
//     });
//   });
// }


import { NextResponse } from "next/server";
import { join, extname } from "path";
import fs from "fs-extra";
import sharp from "sharp";
import connectToDatabase from "@/src/lib/mongodb";
import Media from "@/src/lib/models/Media";

export async function POST(req) {
  await connectToDatabase();

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const usageType = formData.get("usageType") || "general";
    const slug = formData.get("slug") || `media-${Date.now()}`;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileExt = extname(file.name).toLowerCase();
    const allowedTypes = [".jpg", ".jpeg", ".png", ".webp", ".mp4", ".pdf", ".docx", ".ico"];

    if (!allowedTypes.includes(fileExt)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    // Determine upload folder dynamically
    let uploadDir;
    switch (usageType) {
      case "post":
        uploadDir = "uploads/post";
        break;
      case "category":
        uploadDir = "uploads/category";
        break;
      case "tag":
        uploadDir = "uploads/tag";
        break;
      default:
        uploadDir = "uploads/media";
    }

    // Ensure the upload directory exists
    const publicPath = join(process.cwd(), "public", uploadDir);
    await fs.ensureDir(publicPath);

    // Generate SEO-friendly filename
    const timestamp = Date.now();
    const filename = `${slug}-${timestamp}${fileExt}`;
    const filePath = join(publicPath, filename);
    const dbPath = `/${uploadDir}/${filename}`;

    // Save the file
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    if ([".jpg", ".jpeg", ".png"].includes(fileExt)) {
      await sharp(fileBuffer).resize({ width: 1200 }).toFormat("webp").toFile(filePath);
    } else {
      await fs.writeFile(filePath, fileBuffer);
    }

    // Store in MongoDB
    const mediaEntry = await Media.create({
      filename,
      path: dbPath,
      type: fileExt.includes(".mp4") ? "video" : fileExt.includes(".pdf") || fileExt.includes(".docx") ? "file" : "image",
      usedIn: [],
    });

    return NextResponse.json({ success: true, path: dbPath, media: mediaEntry });
  } catch (error) {
    return NextResponse.json({ error: "Error processing file", details: error.message }, { status: 500 });
  }
}
