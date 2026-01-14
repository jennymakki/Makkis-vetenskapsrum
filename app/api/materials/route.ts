import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import Material from "@/models/Material";

export async function GET() {
  await connectDB();
  const materials = await Material.find().sort({ createdAt: -1 });
  return NextResponse.json(materials);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session || session.user?.role !== "teacher") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await connectDB();
  const body = await req.json();
  const material = await Material.create(body);
  return NextResponse.json(material);
}
