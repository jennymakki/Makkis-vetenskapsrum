"use client";

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
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-[#4CAF50]">
        {unit.name}
      </h3>

      {unit.files.length > 0 ? (
        <ul className="space-y-3">
          {unit.files.map((file) => (
            <li key={file._id}>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#4CAF50] text-white px-5 py-2 rounded-lg text-sm font-medium text-center
                           hover:bg-[#3a9e45] transition"
              >
                Visa {file.name}
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
  );
}
