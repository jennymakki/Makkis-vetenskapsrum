import { connectDB } from "@/lib/db";
import Course from "@/models/Course";
import Material from "@/models/Material";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

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
  params: Promise<{ course: string }>;
}

export default async function CoursePage({ params }: Props) {
  const resolvedParams = await params;
  const courseName = decodeURIComponent(resolvedParams.course);

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

  const units = courseDoc.units || [];

  const unitsWithFiles: Unit[] = await Promise.all(
    units.map(async (unit) => {
      const files = await Material.find({ course: courseName, unit: unit.name });
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
        <section className="mb-12 text-center bg-[#3B5D4A] text-[#F2F2F2] p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{courseName}</h1>
          <p className="text-lg">
            Välj ett arbetsområde för att ladda ner material och resurser.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Arbetsområden
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {unitsWithFiles.map((unit: Unit) => (
              <div
                key={unit.name}
                className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4 hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold text-[#3B5D4A]">{unit.name}</h3>

                {unit.files.length > 0 ? (
                  <ul className="space-y-2">
                    {unit.files.map((file: File) => (
                      <li key={file._id}>
                        <a
                          href={file.url}
                          download
                          className="inline-block bg-[#3B5D4A] text-white px-4 py-2 rounded-lg text-sm
                                     hover:bg-[#2e4b3a] transition"
                        >
                          {file.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">Inget material än.</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
