import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/db";
import Material from "@/models/Material";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();

  if (!session || session.user?.role !== "teacher") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await connectDB(); 

  const { id } = await context.params;

  const deleted = await Material.findByIdAndDelete(id);

  if (!deleted) return new NextResponse("Not found", { status: 404 });

  return NextResponse.json({ success: true });
}
