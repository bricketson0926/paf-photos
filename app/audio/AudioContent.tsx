'use client';

import AudioList from "@/app/_components/AudioList";
import AudioModal from "@/app/_components/audioModal";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AudioClip } from "@/types/index";

type AudioContentProps = {
  cloudfrontUrl: string;
};

export default function AudioContent({ cloudfrontUrl }: AudioContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [clips, setClips] = useState<AudioClip[]>([]);
  const [selectedClip, setSelectedClip] = useState<AudioClip | null>(null);
  const [loading, setLoading] = useState(true);
  const clipId = searchParams.get('clipId');

  useEffect(() => {
    const loadClips = async () => {
      try {
        const url = cloudfrontUrl + "audio-metadata.json";
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch audio metadata: ${response.status}`);
        const allClips = await response.json();
        const mapped = allClips.map((c: any) => ({
          ...c,
          duration: Number.parseInt(c.duration),
          url: `${cloudfrontUrl}${c.id}.${c.ext}`,
        }));
        setClips(mapped);
      } catch (error) {
        console.error("Error loading audio clips:", error);
        setClips([]);
      } finally {
        setLoading(false);
      }
    };

    loadClips();
  }, [cloudfrontUrl]);

  useEffect(() => {
    if (!clipId) {
      setSelectedClip(null);
      return;
    }

    const found = clips.find((c) => c.id.toString() === clipId);
    if (found) setSelectedClip(found);
    else setSelectedClip(null);
  }, [clipId, clips]);

  const handleClipClick = (id: string) => {
    const params = new URLSearchParams(searchParams as any);
    params.set('clipId', id.toString());
    router.push(`?${params.toString()}`);
  };

  const handleCloseModal = () => {
    const params = new URLSearchParams(searchParams as any);
    params.delete('clipId');
    router.push(params.toString() ? `?${params.toString()}` : '/audio');
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading audio clips...</div>;
  }

  return (
    <>
      <p className="pb-2 text-gray-400">
        {clips.length} audio clip{clips.length !== 1 && 's'} available.
      </p>

      <AudioList clips={clips} cloudfrontUrl={cloudfrontUrl} onClipClick={handleClipClick} />

      <AudioModal clip={selectedClip} onClose={handleCloseModal} />
    </>
  );
}