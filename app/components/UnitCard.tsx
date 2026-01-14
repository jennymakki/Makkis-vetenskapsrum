"use client";

import { useEffect, useState } from "react";

interface File {
  _id: string;
  name: string;
  url: string;
}

interface Unit {
  name: string;
  files: File[];
}

export default function UnitCard({ unit }: { unit: Unit }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent));
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <h3 className="text-xl font-semibold text-[#4CAF50]">{unit.name}</h3>

      {unit.files.length > 0 ? (
        <ul className="space-y-3">
          {unit.files.map((file: File) => (
            <li key={file._id}>
              {isMobile ? (
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-[#4CAF50] text-white px-5 py-2 rounded-lg text-sm font-medium
                     hover:bg-[#3a9e45] hover:scale-105 transition transform duration-200 text-center"
                >
                  Visa {file.name}
                </a>
              ) : (
                <a
                  href={`${file.url}?dl=1`}
                  download
                  className="block bg-[#4CAF50] text-white px-5 py-2 rounded-lg text-sm font-medium
                     hover:bg-[#3a9e45] hover:scale-105 transition transform duration-200 text-center"
                >
                  Ladda ner {file.name}
                </a>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm italic">Inget material än.</p>
      )}
    </div>
  );
}
