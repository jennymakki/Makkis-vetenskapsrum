import Header from "./components/Header";
import Footer from "./components/Footer";
import Link from "next/link";

export default function Home() {
  const subjects = [
    { name: "Naturkunskap", href: "/naturkunskap", icon: "leaf", color: "bg-[#4CAF50]" },
    { name: "Biologi", href: "/biologi", icon: "dna", color: "bg-[#42A5F5]" },
    { name: "Kemi", href: "/kemi", icon: "flask-conical", color: "bg-[#FF6F3C]" },
    { name: "Naturvetenskaplig Specialisering", href: "/naturvetenskapligspecialisering", icon: "atom", color: "bg-[#EDE623]" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f0f0]">
      <Header />

      <main className="flex-1 p-8 max-w-5xl mx-auto">
        {/* Intro */}
        <section className="mb-12 text-center bg-[#3B5D4A] text-[#F2F2F2] p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Välkommen till Makkis Vetenskapsrum!</h2>
          <p className="text-lg">
            Här kan du utforska lektionsmaterial, experiment och vetenskapens under.
          </p>
        </section>

        {/* Ämnen */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Ämnen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {subjects.map((subject) => (
              <Link
                key={subject.name}
                href={subject.href}
                className={`${subject.color} flex items-center justify-center gap-2 p-4 rounded-xl shadow-md text-white font-semibold hover:brightness-110 transition`}
              >
                {subject.name}
                <i data-lucide={subject.icon}></i>
              </Link>
            ))}
          </div>
        </section>

        {/* Om mig */}
        <section className="mb-12 flex flex-col md:flex-row items-center gap-6">
          <img
            src="/Fares.png"
            alt="Fares"
            className="w-48 h-48 rounded-full object-cover shadow-lg"
          />
          <div>
            <h3 className="text-xl font-semibold mb-2 text-center text-gray-800">Om mig</h3>
            <p className="text-[#000000] p-4 rounded-xl shadow-lg">
              Hej! Fares heter jag och undervisar i biologi, kemi, och naturkunskap.
              Här kan du lära dig mer om världen omkring dig och vad naturen har att erbjuda!
            </p>
          </div>
        </section>
      </main>

      <Footer />

      {/* Lucide icons */}
      <script src="/javascripts/main.js"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `lucide.createIcons();`,
        }}
      />
    </div>
  );
}