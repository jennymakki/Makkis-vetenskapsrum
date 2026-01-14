import { connectDB } from "@/lib/db";
import Material from "@/models/Material";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get("fileId");

  if (!fileId) {
    return new Response("Missing fileId", { status: 400 });
  }

  await connectDB();

  const material = await Material.findById(fileId);
  if (!material) {
    return new Response("File not found", { status: 404 });
  }

  // Fetch file from Cloudinary
  const cloudinaryResponse = await fetch(material.fileUrl);
  const buffer = await cloudinaryResponse.arrayBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type":
        cloudinaryResponse.headers.get("content-type") ||
        "application/octet-stream",
      "Content-Disposition": `attachment; filename="${material.title}"`,
    },
  });
}
