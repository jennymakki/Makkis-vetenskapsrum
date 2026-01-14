import { connectDB } from "@/lib/db";
import Material from "@/models/Material";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession();

  if (!session || session.user?.role !== "teacher") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await connectDB();

  const deleted = await Material.findByIdAndDelete(params.id);

  if (!deleted) {
    return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.json({ success: true });
}
