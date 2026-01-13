import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { schoolStructure } from "@/lib/school-structure";

export default function KemiPage() {
  const courses = Object.keys(schoolStructure.Kemi);

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f0f0]">
      <Header />

      <main className="flex-1 p-8 max-w-5xl mx-auto">
        {/* Intro */}
        <section className="mb-12 text-center bg-[#FF6F3C] text-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Kemi</h1>
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
                href={`/kemi/${encodeURIComponent(course)}`}
                className="bg-white flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg
                           text-[#FF6F3C] font-semibold text-lg hover:shadow-2xl hover:-translate-y-1 transition
                           border-2 border-transparent hover:border-[#FF6F3C]"
              >
                <h3 className="text-xl font-bold mb-2">{course}</h3>
                <p className="text-gray-600 text-sm text-center">
                  Klicka för att se arbetsområden och material
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
