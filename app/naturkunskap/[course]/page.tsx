import { connectDB } from "@/lib/db";
import Course from "@/models/Course";
import Material from "@/models/Material";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import UnitCard from "@/app/components/UnitCard";

interface File {
  _id: string;
  name: string;
  url: string;
}

interface Unit {
  name: string;
  files: File[];
}

interface Props {
  params: { course: string } | Promise<{ course: string }>;
}

export default async function CoursePage({ params }: Props) {
  // Unwrap params if it's a Promise
  const resolvedParams = params instanceof Promise ? await params : params;
  const courseName = decodeURIComponent(resolvedParams.course);

  // Connect to MongoDB
  await connectDB();

  const courseDoc = await Course.findOne({ course: courseName });
  if (!courseDoc) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f0f0f0]">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-600 text-lg">Ingen kurs hittades.</p>
        </main>
        <Footer />
      </div>
    );
  }

  // Prepare units with files
  const units: { name: string; files?: any[] }[] = courseDoc.units || [];

  const unitsWithFiles: Unit[] = await Promise.all(
    units.map(async (unit: { name: string }) => {
      const files = await Material.find({
        course: courseName,
        unit: unit.name,
      });
      return {
        name: unit.name,
        files: files.map((f) => ({
          _id: f._id.toString(),
          name: f.title,
          url: f.fileUrl,
        })),
      } as Unit;
    })
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f0f0]">
      <Header />

      <main className="flex-1 p-8 max-w-6xl mx-auto">
        <section className="mb-12 text-center bg-[#4CAF50] text-white p-10 rounded-2xl shadow-lg max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{courseName}</h1>
          <p className="text-lg">
            Välj ett arbetsområde för att visa eller ladda ner material.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
            Arbetsområden
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {unitsWithFiles.map((unit) => (
              <UnitCard key={unit.name} unit={unit} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
