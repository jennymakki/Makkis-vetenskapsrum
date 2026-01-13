"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
<header className="bg-[#3B5D4A] text-[#F2F2F2] px-6 py-4">
  <div className="flex items-center justify-between">
    {/* Clickable title */}
    <h1
      onClick={() => router.push("/")}
      className="text-xl md:text-2xl font-bold cursor-pointer hover:text-gray-200 transition-colors"
    >
      Makkis Vetenskapsrum
    </h1>

    {/* Desktop menu */}
    <div className="hidden md:flex items-center gap-4">
      {!session ? (
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="bg-white text-[#3B5D4A] px-4 py-2 rounded hover:bg-gray-200 hover:text-[#2a4d37] transition-colors"
        >
          Logga in som lärare
        </button>
      ) : (
        <>
          <button
            onClick={() => router.push("/")}
            className="bg-white text-[#3B5D4A] px-4 py-2 rounded hover:bg-gray-200 hover:text-[#2a4d37] transition-colors"
          >
            Home
          </button>

          <button
            onClick={() => router.push("/dashboard")}
            className="bg-white text-[#3B5D4A] px-4 py-2 rounded hover:bg-gray-200 hover:text-[#2a4d37] transition-colors"
          >
            Dashboard
          </button>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="border border-white px-4 py-2 rounded hover:bg-white hover:text-[#3B5D4A] transition-colors"
          >
            Logga ut
          </button>
        </>
      )}
    </div>

    {/* Mobile menu button */}
    <button
      onClick={() => setOpen(!open)}
      className="md:hidden text-2xl hover:text-gray-200 transition-colors"
      aria-label="Toggle menu"
    >
      ☰
    </button>
  </div>

  {/* Mobile menu */}
  {open && (
    <div className="md:hidden mt-4 flex flex-col gap-3">
      {!session ? (
        <button
          onClick={() => {
            signIn("google", { callbackUrl: "/" });
            setOpen(false);
          }}
          className="bg-white text-[#3B5D4A] px-4 py-2 rounded hover:bg-gray-200 hover:text-[#2a4d37] transition-colors"
        >
          Logga in som lärare
        </button>
      ) : (
        <>
          <button
            onClick={() => {
              router.push("/dashboard");
              setOpen(false);
            }}
            className="bg-white text-[#3B5D4A] px-4 py-2 rounded hover:bg-gray-200 hover:text-[#2a4d37] transition-colors"
          >
            Ladda upp material
          </button>

          <button
            onClick={() => {
              signOut({ callbackUrl: "/" });
              setOpen(false);
            }}
            className="border border-white px-4 py-2 rounded hover:bg-white hover:text-[#3B5D4A] transition-colors"
          >
            Logga ut
          </button>
        </>
      )}
    </div>
  )}
</header>
  );
}