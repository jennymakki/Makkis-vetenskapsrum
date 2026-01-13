import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

export async function POST(req: Request) {
  await connectDB();

  const { subject, course, unitName } = await req.json();

  if (!subject || !course || !unitName) {
    return new Response(
      JSON.stringify({ error: "Missing subject, course or unitName" }),
      { status: 400 }
    );
  }

  const cleanUnit = unitName.trim();

  if (!cleanUnit) {
    return new Response(
      JSON.stringify({ error: "Unit name empty" }),
      { status: 400 }
    );
  }

  let courseDoc = await Course.findOne({ subject, course });

  if (!courseDoc) {
    courseDoc = new Course({
      subject,
      course,
      units: [],
    });
  }

  const exists = courseDoc.units?.some(
    (u: { name: string }) => u.name === cleanUnit
  );

  if (!exists) {
    courseDoc.units.push({ name: cleanUnit, files: [] });
    await courseDoc.save();
  }

  return new Response(
    JSON.stringify({ success: true, unit: cleanUnit }),
    { status: 200 }
  );
}