import Header from "../components/Header";
import Footer from "../components/Footer";
import UploadForm from "./UploadForm";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f0f0f0]">
      <Header />

      <main className="flex-1 p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-[#3B5D4A] text-center">
          Lärar-CMS
        </h1>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <UploadForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
