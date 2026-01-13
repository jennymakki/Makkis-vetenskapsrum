import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { schoolStructure } from "@/lib/school-structure";

export default function NaturkunskapPage() {
  const courses = Object.keys(schoolStructure.Naturkunskap);

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f0f0]">
      <Header />

      <main className="flex-1 p-8 max-w-5xl mx-auto">
        {/* Intro */}
        <section className="mb-12 text-center bg-[#3B5D4A] text-[#F2F2F2] p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Naturkunskap</h1>
          <p className="text-lg">
            Välj kurs för att utforska lektionsmaterial, experiment och uppgifter.
          </p>
        </section>

        {/* Kurser */}
        <section>
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Kurser
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link
                key={course}
                href={`/naturkunskap/${encodeURIComponent(course)}`}
                className="bg-white flex items-center justify-center p-6 rounded-xl shadow-md text-[#3B5D4A] font-semibold text-lg
                           hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                {course}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}