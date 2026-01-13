"use client";

import { signIn, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-[#3B5D4A] text-[#F2F2F2] p-12 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Makkis Vetenskapsrum</h1>
      {!session ? (
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="bg-white text-[#3B5D4A] px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Logga in som lärare
        </button>
      ) : (
        <span className="text-sm">Inloggad som {session.user?.email}</span>
      )}
    </header>
  );
}