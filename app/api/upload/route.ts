import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/db";
import Material from "@/models/Material";

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const title = formData.get("title") as string;
  const subject = formData.get("subject") as string;
  const type = formData.get("type") as string;
  const course = formData.get("course") as string;
  const unit = formData.get("unit") as string;

  if (!file) {
    return new NextResponse("No file", { status: 400 });
  }

  // Konvertera till buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Upload till Cloudinary
  const uploadResult: any = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "school-cms",
          resource_type: "auto",
        },
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      )
      .end(buffer);
  });

  await connectDB();

  const material = await Material.create({
    title,
    course,
    unit,
    subject,
    type,
    fileUrl: uploadResult.secure_url,
    fileName: file.name,
  });

  return NextResponse.json(material);
}