"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Navbar() {
    const pathname = usePathname();

    if (pathname === "/") return null;

    return (
        <header className="object-center">
            <div className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
                <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-3">
                    <h1 className="py-2 text-center text-3xl font-bold">
                        Piercing Arrow & Frontier Media Database
                    </h1>

                    <nav className="flex w-full flex-wrap items-center justify-center gap-3 pb-2">
                        <Link
                            href="/photos"
                            className="rounded-xl bg-gray-200 px-3 py-1 text-sm font-medium transition hover:bg-gray-300"
                        >
                            Photos
                        </Link>
                        <Link
                            href="/audio"
                            className="rounded-xl bg-gray-200 px-3 py-1 text-sm font-medium transition hover:bg-gray-300"
                        >
                            Audio Recordings
                        </Link>
                        <Link
                            href="/maps"
                            className="rounded-xl bg-gray-200 px-3 py-1 text-sm font-medium transition hover:bg-gray-300"
                        >
                            Maps
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
