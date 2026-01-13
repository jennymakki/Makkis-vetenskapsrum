import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const subject = searchParams.get("subject");
  const course = searchParams.get("course");

  if (!subject || !course) {
    return new Response(JSON.stringify({ units: [] }), { status: 200 });
  }

  const courseDoc = await Course.findOne({ subject, course });

  if (!courseDoc || !courseDoc.units) {
    return new Response(JSON.stringify({ units: [] }), { status: 200 });
  }

  const units = courseDoc.units.map(
    (u: { name: string }) => u.name
  );

  return new Response(JSON.stringify({ units }), { status: 200 });
}