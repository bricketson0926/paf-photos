'use client';

import TagBar from "@/app/_components/tagBar";
import { Photo } from "@/types/index";
import PhotoMasonry from "@/app/_components/photoMasonry"
import PhotoModal from "@/app/_components/photoModal"
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PhotosContentProps = {
  cloudfrontUrl: string;
};

export default function PhotosContent({ cloudfrontUrl }: PhotosContentProps) {
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
            
            try {
                const url = cloudfrontUrl + "photo-metadata.json";
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to fetch photos: ${response.status}`);
                }
                const allPhotos = await response.json();
                const filteredPhotos = allPhotos
                    .map((photo: Photo) => ({
                        ...photo,
                        url: cloudfrontUrl + photo.id + "." + photo.ext,
                    }))
                    .filter((photo: Photo) => {
                        if (tags.length === 0) return true;
                        if (tagMode === 'any') {
                            return photo.tags.some(tag => tags.includes(tag));
                        } else {
                            return tags.every(tag => photo.tags.includes(tag));
                        }
                    });
                setPhotos(filteredPhotos);
            } catch (error) {
                console.error("Error loading photos:", error);
                setPhotos([]);
            } finally {
                setLoading(false);
            }
        };
        loadPhotos();
    }, [searchParams, cloudfrontUrl]);

    useEffect(() => {
        const loadSelectedPhoto = async () => {
            if (photoId) {
                try {
                    const url = cloudfrontUrl + "photo-metadata.json";
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch photo: ${response.status}`);
                    }
                    const allPhotos = await response.json();
                    const photo = allPhotos.find((p: Photo) => p.id.toString() === photoId);
                    if (photo) {
                        setSelectedPhoto({
                            ...photo,
                            url: cloudfrontUrl + photo.id + "." + photo.ext,
                        });
                    } else {
                        setSelectedPhoto(null);
                    }
                } catch (error) {
                    console.error("Error loading selected photo:", error);
                    setSelectedPhoto(null);
                }
            } else {
                setSelectedPhoto(null);
            }
        };

        loadSelectedPhoto();
    }, [photoId, cloudfrontUrl]);

    const handlePhotoClick = (id: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('photoId', id.toString());
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const handleCloseModal = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('photoId');
        router.push(params.toString() ? `?${params.toString()}` : '/photos', { scroll: false });
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center w-full pb-16">
            {/* <TagBar cloudfrontUrl={cloudfrontUrl} /> */}
            <p className="pb-2 text-gray-400">
                {photos.length} photo{photos.length !== 1 && 's'} match{photos.length === 1 && 'es'} your criteria
            </p>
            <PhotoMasonry photos={photos as Photo[]} onPhotoClick={handlePhotoClick} />
            <PhotoModal photo={selectedPhoto} onClose={handleCloseModal} />
        </div>
    );
}
