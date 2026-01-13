"use client";

import { useState, useEffect } from "react";
import { schoolStructure, Subject } from "@/lib/school-structure";

export default function UploadForm() {
  const [subject, setSubject] = useState<Subject | "">("");
  const [course, setCourse] = useState<string>("");
  const [units, setUnits] = useState<string[]>([]);
  const [newUnit, setNewUnit] = useState<string>("");
  const [selectedUnit, setSelectedUnit] = useState<string>("");

  // Hämta units
  useEffect(() => {
    if (!subject || !course) {
      setUnits([]);
      return;
    }
  
    fetch(`/api/course/units?subject=${subject}&course=${course}`)
      .then((res) => res.json())
      .then((data) => setUnits(data.units || []));
  }, [subject, course]);

  // Skapa ny unit
  async function createUnit() {
    if (!newUnit.trim() || !subject || !course) return;
  
    const res = await fetch("/api/course/add-unit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, course, unitName: newUnit }),
    });
  
    if (!res.ok) {
      alert("Fel vid skapande av unit");
      return;
    }
  
    // Hämta units från databasen igen
    const unitsRes = await fetch(
      `/api/course/units?subject=${subject}&course=${course}`
    );
    const data = await unitsRes.json();
  
    setUnits(data.units || []);
    setSelectedUnit(newUnit.trim());
    setNewUnit("");
  
    alert("Unit skapad!");
  }

  // Ladda upp material
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedUnit) {
      alert("Välj en unit först!");
      return;
    }

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    formData.set("unit", selectedUnit);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Material uppladdat!");
      form.reset();
      setSubject("");
      setCourse("");
      setUnits([]);
      setSelectedUnit("");
    } else {
      alert("Fel vid uppladdning");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg">
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
        onChange={(e) => {
          setSubject(e.target.value as Subject);
          setCourse("");
          setUnits([]);
          setSelectedUnit("");
        }}
        className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B5D4A]"
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
          onChange={(e) => {
            setCourse(e.target.value);
            setUnits([]);
            setSelectedUnit("");
          }}
          className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B5D4A]"
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
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B5D4A]"
          >
            <option value="">Välj unit</option>
            {units.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Skapa ny unit"
              value={newUnit}
              onChange={(e) => setNewUnit(e.target.value)}
              className="flex-1 p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3B5D4A]"
            />
            <button
              type="button"
              onClick={createUnit}
              className="bg-[#3B5D4A] text-white px-4 rounded-xl hover:bg-[#2e4b3a] transition"
            >
              Skapa
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
