"use client";

import { useState, useEffect } from "react";
import { schoolStructure, Subject } from "@/lib/school-structure";

export default function UploadForm() {
  const [subject, setSubject] = useState<Subject | "">("");
  const [course, setCourse] = useState<string>("");
  const [units, setUnits] = useState<string[]>([]);
  const [newUnit, setNewUnit] = useState("");

  // Hämta units från DB när ämne/kurs ändras
  useEffect(() => {
    if (subject && course) {
      fetch(`/api/course/units?subject=${subject}&course=${course}`)
        .then(res => res.json())
        .then(data => setUnits(data.units || []));
    }
  }, [subject, course]);

  async function handleAddUnit() {
    if (!newUnit) return;
    await fetch("/api/course/add-unit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, course, unitName: newUnit }),
    });
    setNewUnit("");
    // Hämta units igen
    const res = await fetch(`/api/course/units?subject=${subject}&course=${course}`);
    const data = await res.json();
    setUnits(data.units || []);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const res = await fetch("/api/upload", { method: "POST", body: formData });

    if (res.ok) {
      alert("Material uppladdat!");
      form.reset();
      setSubject("");
      setCourse("");
      setUnits([]);
    } else {
      alert("Fel vid uppladdning");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Titel */}
      <input
        name="title"
        placeholder="Titel"
        required
        className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B5D4A]"
      />

      {/* Ämne */}
      <select
        name="subject"
        required
        value={subject}
        className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B5D4A]"
        onChange={(e) => { setSubject(e.target.value as Subject); setCourse(""); setUnits([]); }}
      >
        <option value="">Välj ämne</option>
        {Object.keys(schoolStructure).map((subj) => (
          <option key={subj} value={subj}>{subj}</option>
        ))}
      </select>

      {/* Kurs */}
      {subject && (
        <select
          name="course"
          required
          value={course}
          className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B5D4A]"
          onChange={(e) => { setCourse(e.target.value); setUnits([]); }}
        >
          <option value="">Välj kurs</option>
          {Object.keys(schoolStructure[subject]).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      )}

      {/* Unit */}
      {subject && course && (
        <>
          <select
            name="unit"
            required
            className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B5D4A]"
          >
            <option value="">Välj unit</option>
            {units.map(u => <option key={u} value={u}>{u}</option>)}
          </select>

          {/* Lägg till unit */}
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Ny unit"
              value={newUnit}
              onChange={(e) => setNewUnit(e.target.value)}
              className="flex-1 p-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B5D4A]"
            />
            <button
              type="button"
              onClick={handleAddUnit}
              className="bg-[#3B5D4A] text-white px-4 rounded-xl hover:bg-[#2e4b3a] transition"
            >
              Lägg till
            </button>
          </div>
        </>
      )}

      {/* Fil */}
      <input
        type="file"
        name="file"
        required
        className="w-full p-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B5D4A]"
      />

      <button
        type="submit"
        className="w-full bg-[#3B5D4A] text-white py-3 rounded-xl font-semibold hover:bg-[#2e4b3a] transition"
      >
        Ladda upp
      </button>
    </form>
  );
}