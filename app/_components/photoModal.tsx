'use client';

import { Photo } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PhotoModal({ photo, onClose }: { photo: Photo | null; onClose: () => void }) {
    const router = useRouter();

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    if (!photo) return null;

    return (
        <>
            {/* Backdrop + Container */}
            <div
                className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                {/* Modal */}
                <div 
                    className="bg-white rounded-xl shadow-2xl w-auto h-auto max-w-5xl max-h-[85vh] overflow-auto flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <div className="sticky top-0 flex justify-end p-4 bg-white border-b border-gray-200 z-10">
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 text-3xl font-light transition-colors"
                            aria-label="Close modal"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col md:flex-row gap-8 p-8 overflow-auto">
                        {/* Image */}
                        <div className="flex items-center justify-center md:flex-1 md:min-w-0">
                            <img
                                src={photo.url}
                                alt={photo.title}
                                className="w-full h-auto max-h-[calc(95vh-200px)] object-contain rounded-lg"
                            />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col gap-6 md:py-4">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">{photo.title}</h1>
                                <p className="text-lg text-gray-600">{photo.description}</p>
                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Photographer</p>
                                        <p className="text-lg text-gray-900">{photo.photographer}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Date Taken</p>
                                        <p className="text-lg text-gray-900">{photo.dateTaken}</p>
                                    </div>
                                </div>
                            </div>

                            {photo.tags && photo.tags.length > 0 && (
                                <div className="border-t border-gray-200 pt-6">
                                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Tags</p>
                                    <div className="flex flex-wrap gap-2">
                                        {photo.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
