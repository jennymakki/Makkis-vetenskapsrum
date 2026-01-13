import Link from "next/link";
import { schoolStructure } from "@/lib/school-structure";

export default function NaturkunskapPage() {
  const courses = Object.keys(schoolStructure.Naturkunskap);

  return (
    <div className="min-h-screen p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Naturkunskap</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link
            key={course}
            href={`/naturkunskap/${encodeURIComponent(course)}`}
            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition flex flex-col items-center justify-center"
          >
            <h2 className="text-xl font-semibold text-[#3B5D4A]">{course}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}