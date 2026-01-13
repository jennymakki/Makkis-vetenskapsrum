import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

export async function POST(req: Request) {
  await connectDB();

  const { subject, course, unitName } = await req.json();

  if (!subject || !course || !unitName) {
    return new Response(JSON.stringify({ error: "Missing data" }), { status: 400 });
  }

  let courseDoc = await Course.findOne({ subject, course });

  if (!courseDoc) {
    courseDoc = new Course({ subject, course, units: [] });
  }

  if (!courseDoc.units.find((u: { name: string }) => u.name === unitName)) {
    courseDoc.units.push({ name: unitName, files: [] });
    await courseDoc.save();
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}