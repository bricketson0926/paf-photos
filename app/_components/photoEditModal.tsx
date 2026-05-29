'use client';

import { Photo } from "@/types/index";
import { deletePhoto, updatePhoto } from "@/lib/actions";
import { useEffect } from "react";

export default function PhotoEditModal({ photo, onClose }: { photo: Photo | null; onClose: () => void }) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    // delete photo
    const handleDelete = async () => {
        if (!photo) return;

        if (confirm("Are you sure you want to delete this photo? This action cannot be undone.")) {
            try {
                await deletePhoto(photo.id);
                alert("Photo deleted successfully.");
                onClose();
            } catch (error) {
                console.error("Error deleting photo:", error);
                alert("Failed to delete photo. Please try again.");
            }
        }
    };

    const onSave = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!photo) return;

        if (confirm("Save changes to this photo?")) {
            try {
                await updatePhoto(photo.id, new FormData(event.currentTarget));
                alert("Photo updated successfully.");
                onClose();
            } catch (error) {
            console.error("Error saving photo changes:", error);
                alert("Failed to save changes. Please try again.");
            }
        }
    };

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
                    <form className="flex-1 flex flex-col md:flex-row gap-8 p-8 overflow-auto" onSubmit={onSave}>
                        {/* Image */}
                        <div className="flex items-center justify-center md:flex-1 md:min-w-0">
                            <img
                                src={photo.url}
                                alt={photo.title}
                                className="w-full h-auto max-h-[calc(95vh-200px)] object-contain rounded-lg"
                            />
                        </div>
                        {/* Vertical Flex Box */}
                        <div className="flex-1 flex flex-col gap-8">
                            {/* Details */}
                            <div className="flex-1 flex flex-col gap-6 md:py-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">Photo Title</label>
                                    <input name="title" type="text" defaultValue={photo.title} className="w-full text-4xl font-bold text-gray-900 mb-2 focus:ring-0 border-2 rounded border-gray-300" />
                                    <label className="block text-sm font-medium text-gray-500 mb-1">Description</label>
                                    <textarea name="description" defaultValue={photo.description} className="w-full text-lg text-gray-600 focus:ring-0 resize-none h-32 border-2 rounded border-gray-300" />
                                </div>
                                <div className="border-t border-gray-200 pt-6">
                                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Tags</p>
                                    <input
                                        name="tags"
                                        type="text"
                                        defaultValue={Array.isArray(photo.tags) ? photo.tags.join(",") : ""}
                                        className="w-full text-gray-600 border-2 focus:ring-0 rounded border-gray-300"
                                        placeholder="Comma-separated tags"
                                    />
                                </div>

                                { /*
                                <div className="border-t border-gray-200 pt-6">
                                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Taken</p>
                                    <input name="taken" type="text" defaultValue={photo.taken} className="w-full text-gray-600 border-2 focus:ring-0 rounded border-gray-300" placeholder="Date taken" />
                                </div>
                                */ }
                            </div>
                            {/* Admin Actions */}
                            <div className="flex flex-row gap-4 md:py-4">
                                <button type="button" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors" onClick={handleDelete}>
                                    Delete Photo
                                </button>
                                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors">
                                    Save Edits and Close
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
