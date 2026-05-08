'use client';

import TagBar from "@/app/_components/tagBar";
import { getPhotos } from "@/lib/data";
import { Photo } from "@/lib/types";
import PhotoMasonry from "@/app/_components/photoMasonry"
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function PhotosContent() {
    const searchParams = useSearchParams();
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPhotos = async () => {
            const tags = searchParams.getAll('tags');
            const tagMode = (searchParams.get('tagMode') || 'all') as 'any' | 'all';
            
            const fetchedPhotos = await getPhotos(tags, tagMode === 'any');
            setPhotos(fetchedPhotos);
            setLoading(false);
        };

        loadPhotos();
    }, [searchParams]);

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <>
            <TagBar />
            <PhotoMasonry photos={photos as Photo[]} />
        </>
    );
}

export default function Photos() {
    return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="flex flex-1 w-full max-w-6xl flex-col items-center px-16 bg-white">
        <h1 className="font-semibold text-center contents-center text-2xl pt-32">
            Filter or Search Photos
        </h1>

        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading photos...</div>}>
            <PhotosContent />
        </Suspense>

      </main>
    </div>
  );
}