'use client';

import {getAudioClipList} from "@/lib/getAudioClipList";
import AudioList from "@/app/_components/AudioList";
import { useEffect, useState, Suspense } from "react";

function AudioContent() {
  const [clips, setClips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClips = async () => {
      try {
        const audioClips = await getAudioClipList();
        setClips(audioClips);
      } catch (error) {
        console.error("Failed to load audio clips:", error);
      } finally {
        setLoading(false);
      }
    };

    loadClips();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading audio clips...</div>;
  }

  return <AudioList clips={clips}/>;
}

export default function Audio() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <h1>Audio Clips</h1>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
          <AudioContent />
        </Suspense>
      </main>
    </div>
  );
}