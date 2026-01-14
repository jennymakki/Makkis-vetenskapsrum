"use client";

import { useEffect, useState } from "react";

interface Material {
  _id: string;
  title: string;
  subject: string;
  course: string;
  unit: string;
  fileUrl: string;
}

export default function MaterialList() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMaterials() {
      try {
        const res = await fetch("/api/materials");
        if (!res.ok) throw new Error("Fel vid hämtning av material");
  
        const data: Material[] = await res.json();
        setMaterials(data);
      } catch (err) {
        console.error(err);
        setMaterials([]);
      } finally {
        setLoading(false);
      }
    }
  
    fetchMaterials();
  }, []);

  async function deleteMaterial(id: string) {
    if (!confirm("Är du säker på att du vill ta bort materialet?")) return;
  
    await fetch(`/api/materials/${id}`, {
      method: "DELETE",
      credentials: "include", // ✅ här
    });
  
    setMaterials((prev) => prev.filter((m) => m._id !== id));
  }

  if (loading) return <p>Laddar material…</p>;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4 text-[#3B5D4A]">
        Uppladdat material
      </h2>

      <div className="space-y-3">
        {materials.map((m) => (
          <div
            key={m._id}
            className="flex justify-between items-center bg-gray-50 p-4 rounded-xl shadow-sm"
          >
            <div className="text-sm">
              <p className="font-semibold">{m.title}</p>
              <p className="text-gray-500">
                {m.subject} → {m.course} → {m.unit}
              </p>
            </div>

            <button
              onClick={() => deleteMaterial(m._id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
            >
              Ta bort
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}