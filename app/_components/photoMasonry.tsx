"use client"

import useMasonry from "@/app/_components/useMasonry";
import { Photo } from "@/lib/types";
import { redirect } from "next/navigation";

export default function PhotoMasonry({photos}: {photos: Photo[]}) {
  const masonryContainer = useMasonry();
  function handlePhotoClick(id: number) {
    redirect(`/photos/${id}`, 'push');
  }

  return (
    <div
      ref={masonryContainer}
      className="grid items-start gap-4 sm:grid-cols-3 md:gap-6"
    >          
        {photos && photos.length > 0 ? (
            photos.map((photo: Photo) => (
                <div key={photo.id} className="bg-gray-100 p-4 rounded-lg" onClick={() => handlePhotoClick(photo.id)}>
                    <h2 className="text-md font-bold">{photo.description}</h2>
                    <img src={photo.url} alt={photo.description} className="w-full mt-4 rounded-lg" />
                </div>
            ))
        ) : (
            <p className="text-gray-500">No photos found with the specified tags.</p>
        )}
    </div>
  )
}