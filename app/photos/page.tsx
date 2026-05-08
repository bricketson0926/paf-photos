'use client';

import TagBar from "@/app/_components/tagBar";
import { getPhotos, getPhotoById } from "@/lib/data";
import { Photo } from "@/lib/types";
import PhotoMasonry from "@/app/_components/photoMasonry"
import PhotoModal from "@/app/_components/photoModal"
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function PhotosContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [loading, setLoading] = useState(true);
    const photoId = searchParams.get('photoId');

    useEffect(() => {
        // Save current filter state to sessionStorage for back navigation
        const tags = searchParams.getAll('tags');
        const tagMode = searchParams.get('tagMode') || 'any';
        
        sessionStorage.setItem('photoFilters', JSON.stringify({
            tags,
            tagMode
        }));
    }, [searchParams]);

    useEffect(() => {
        const loadPhotos = async () => {
            const tags = searchParams.getAll('tags');
            const tagMode = (searchParams.get('tagMode') || 'any') as 'any' | 'all';
            
            const fetchedPhotos = await getPhotos(tags, tagMode === 'any');
            setPhotos(fetchedPhotos);
            setLoading(false);
        };

        loadPhotos();
    }, [searchParams]);

    useEffect(() => {
        const loadSelectedPhoto = async () => {
            if (photoId) {
                const photo = await getPhotoById(Number(photoId));
                setSelectedPhoto(photo || null);
            } else {
                setSelectedPhoto(null);
            }
        };

        loadSelectedPhoto();
    }, [photoId]);

    const handlePhotoClick = (id: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('photoId', id.toString());
        router.push(`?${params.toString()}`);
    };

    const handleCloseModal = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('photoId');
        router.push(params.toString() ? `?${params.toString()}` : '/photos');
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <>
            <TagBar />
            <p className="pb-2 text-gray-400">
                {photos.length} photo{photos.length !== 1 && 's'} match{photos.length === 1 && 'es'} your criteria.
            </p>
            <PhotoMasonry photos={photos as Photo[]} onPhotoClick={handlePhotoClick} />
            <PhotoModal photo={selectedPhoto} onClose={handleCloseModal} />
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