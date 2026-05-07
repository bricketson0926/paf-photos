'use client';
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button onClick={() => router.back()} className="inline-flex mb-4 text-white hover:scale-105 active:scale-90 bg-blue-500 px-3 py-1 rounded-md self-start">
            ← Back
        </button>
    );
}
