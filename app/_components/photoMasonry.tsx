"use client"

import { RowsPhotoAlbum, type Photo as AlbumPhoto } from "react-photo-album";
import "react-photo-album/rows.css";
import { Photo } from "@/types/index";
import { useEffect, useState } from "react";

export default function PhotoMasonry({photos, onPhotoClick}: {photos: Photo[], onPhotoClick: (id: string) => void}) {
  const [albumPhotos, setAlbumPhotos] = useState<(AlbumPhoto & { id: string; url: string })[]>([]);

  useEffect(() => {
    let cancelled = false;

    const loadImageSize = (src: string) =>
      new Promise<{ width: number; height: number }>((resolve) => {
        const image = new Image();
        image.onload = () => {
          resolve({
            width: image.naturalWidth || 1,
            height: image.naturalHeight || 1,
          });
        };
        image.onerror = () => {
          resolve({ width: 1, height: 1 });
        };
        image.src = src;
      });

    const loadPhotos = async () => {
      if (photos.length === 0) {
        setAlbumPhotos([]);
        return;
      }

      const nextPhotos = await Promise.all(
        photos.map(async (photo) => {
          const { width, height } = await loadImageSize(photo.url);
          return {
            ...photo,
            src: photo.url,
            width,
            height,
          };
        })
      );

      if (!cancelled) {
        setAlbumPhotos(nextPhotos);
      }
    };

    loadPhotos();

    return () => {
      cancelled = true;
    };
  }, [photos]);

  return (
    <div className="w-full">
      {albumPhotos.length > 0 ? (
        <RowsPhotoAlbum
          photos={albumPhotos}
          targetRowHeight={(containerWidth) => {
            if (!containerWidth) return 180;
            if (containerWidth < 640) return 160;
            if (containerWidth < 1024) return 170;
            return 180;
          }}
          rowConstraints={{ minPhotos: 1, maxPhotos: 7, singleRowMaxHeight: 220 }}
          spacing={(containerWidth) => {
            if (!containerWidth) return 10;
            if (containerWidth < 640) return 8;
            return 10;
          }}
          componentsProps={{
            container: { className: "w-full" },
          }}
          onClick={({ photo }) => onPhotoClick((photo as AlbumPhoto & { id: string }).id)}
          render={{
            photo: ({ onClick }, { photo, width, height }) => (
              <button
                type="button"
                onClick={onClick}
                className="group relative block w-full overflow-hidden rounded-2xl bg-zinc-100 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/15"
              >
                <img
                  src={(photo as AlbumPhoto & { src: string }).src}
                  alt={(photo as AlbumPhoto & { alt?: string; title?: string }).alt || (photo as AlbumPhoto & { title?: string }).title || "Photo"}
                  width={width}
                  height={height}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/55 via-black/20 to-transparent p-3 sm:p-4">
                  <h2 className="truncate text-[13px] font-medium tracking-wide text-white sm:text-sm">
                    {(photo as AlbumPhoto & { title?: string }).title}
                  </h2>
                </div>
              </button>
            ),
          }}
        />
      ) : (
        <p className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 px-4 py-8 text-center text-sm text-zinc-500">
          No photos found with the specified tags.
        </p>
      )}
    </div>
  )
}