import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

interface File {
  name: string;
  url: string;
}

interface Unit {
  name: string;
  files: File[];
}

interface Props {
  params: { course: string };
}

export default async function CoursePage({ params }: Props) {
    const resolvedParams = await params;  // <-- unwrap Promise
    const courseName = decodeURIComponent(resolvedParams.course);
  
    await connectDB();
    const courseDoc = await Course.findOne({ course: courseName });
  
    if (!courseDoc) {
      return <p>Ingen kurs hittades.</p>;
    }
  
    const units: Unit[] = courseDoc.units || [];
  
    return (
      <main className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#3B5D4A] mb-6">{courseName}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {units.map((unit) => (
            <div
              key={unit.name}
              className="p-6 bg-white rounded-xl shadow-lg flex flex-col gap-4"
            >
              <h2 className="text-xl font-semibold text-[#3B5D4A]">{unit.name}</h2>
              <ul className="space-y-2">
                {unit.files.map((file) => (
                  <li key={file.name}>
                    <a
                      href={file.url}
                      download
                      className="text-white bg-[#3B5D4A] px-3 py-1 rounded hover:bg-[#2e4b3a] transition inline-block"
                    >
                      {file.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    );
  }
  