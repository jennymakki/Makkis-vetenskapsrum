import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"; // OBS: /next
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import Material from "@/models/Material";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession({ req, ...authOptions });

  if (!session || session.user?.role !== "teacher") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await connectDB();

  const deleted = await Material.findByIdAndDelete(params.id);
  if (!deleted) return new NextResponse("Not found", { status: 404 });

  return NextResponse.json({ success: true });
}
