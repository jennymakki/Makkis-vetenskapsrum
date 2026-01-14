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
  params: { course: string };
}

export default async function CoursePage({ params }: Props) {
  const courseName = decodeURIComponent(params.course);

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
        {/* Intro */}
        <section className="mb-12 text-center bg-[#4CAF50] text-[#F2F2F2] p-10 rounded-2xl shadow-lg max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{courseName}</h1>
          <p className="text-lg">
            Välj ett arbetsområde för att ladda ner material och resurser.
          </p>
        </section>

        {/* Arbetsområden */}
        <section>
          <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
            Arbetsområden
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {unitsWithFiles.map((unit: Unit) => (
              <div
                key={unit.name}
                className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-[#4CAF50]">
                  {unit.name}
                </h3>

                {unit.files.length > 0 ? (
                  <ul className="space-y-3">
                    {unit.files.map((file: File) => (
                      <li key={file._id}>
                        <a
                          href={`${file.url}?dl=1`}
                          download
                          className="block bg-[#4CAF50] text-white px-5 py-2 rounded-lg text-sm font-medium
     hover:bg-[#3a9e45] hover:scale-105 transition transform duration-200 text-center"
                        >
                          {file.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm italic">
                    Inget material än.
                  </p>
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
