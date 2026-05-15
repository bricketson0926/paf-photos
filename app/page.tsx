"use client";
import { useState, useEffect } from "react";

export default function Auth() {
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-san">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <h1 className="font-semibold text-center contents-center text-2xl">
          Enter Password to Access Site
        </h1>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-6 px-4 py-2 border rounded-md w-full text-center text-lg"
          placeholder="Password"
        />
        <input
          type="button"
          value="Submit"
          onClick={() => {
            setSubmitted(true);
            if (password === "") {
              window.location.href = "/photos";
            }
          }}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition"
        />
        <p className="mt-4 text-sm text-gray-500">
          {submitted && (password === "" ? "Correct password! Redirecting..." : "Incorrect password. Please try again.")}
        </p>
      </main>
    </div>
  );
}
