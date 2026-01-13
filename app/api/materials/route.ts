import { connectDB } from "@/lib/db";
import Material from "@/models/Material";
import { getServerSession } from "next-auth";

export async function GET() {
  // PUBLIK – alla får se
  await connectDB();
  const materials = await Material.find().sort({ createdAt: -1 });
  return Response.json(materials);
}

export async function POST(req: Request) {
  // SKYDDAD – bara lärare
  const session = await getServerSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  await connectDB();
  const body = await req.json();
  const material = await Material.create(body);

  return Response.json(material);
}