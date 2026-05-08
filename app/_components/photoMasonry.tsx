"use client"

import useMasonry from "@/app/_components/useMasonry";
import { Photo } from "@/lib/types";

export default function PhotoMasonry({photos, onPhotoClick}: {photos: Photo[], onPhotoClick: (id: number) => void}) {
  const masonryContainer = useMasonry();

  return (
    <div
      ref={masonryContainer}
      className="grid items-start gap-4 sm:grid-cols-3 md:gap-6"
    >          
        {photos && photos.length > 0 ? (
            photos.map((photo: Photo) => (
                <div key={photo.id} className="bg-gray-100 p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onPhotoClick(photo.id)}>
                    <h2 className="text-md font-bold">{photo.description}</h2>
                    <img src={photo.url} alt={photo.description} className="w-full mt-4 rounded-lg" />
                </div>
            ))
        ) : (
            <p className="col-span-full text-center text-gray-500">No photos found with the specified tags.</p>
        )}
    </div>
  )
}