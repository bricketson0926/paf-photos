'use client';

import { AudioClip } from "@/types/index";
import { useEffect } from "react";

export default function AudioModal({ clip, onClose }: { clip: AudioClip | null; onClose: () => void }) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!clip) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex justify-end p-4 bg-white border-b border-gray-200 z-10">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl font-light">
            ✕
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{clip.title}</h1>
            {clip.createdAt && <p className="text-sm text-gray-500">{clip.createdAt}</p>}
          </div>

          <div>
            <audio controls src={clip.url} className="w-full">Your browser does not support the audio element.</audio>
          </div>

          {typeof clip.duration === 'number' && (
            <div className="text-sm text-gray-600">Duration: {clip.duration}s</div>
          )}
        </div>
      </div>
    </div>
  );
}
