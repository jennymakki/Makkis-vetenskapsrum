"use client";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="p-10">
      <button
        onClick={() => signIn("google")}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Logga in som lärare
      </button>
    </div>
  );
}