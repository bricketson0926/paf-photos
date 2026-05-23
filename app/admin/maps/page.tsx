import Link from "next/link";

export default function MapsPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="flex flex-1 w-full max-w-6xl flex-col items-center px-16 bg-white">
        <h1 className="font-semibold text-center contents-center text-2xl pt-32">
          Filter or Search Maps (ADMIN)
        </h1>

        <div className="mt-12 flex w-full max-w-2xl flex-col items-center rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center">
          <p className="text-zinc-700">
            Map browsing tools are coming soon.
          </p>
        </div>
      </main>
    </div>
  );
}