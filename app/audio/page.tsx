import Image from "next/image";
import {getAudioClipList} from "@/lib/getAudioClipList";
import AudioList from "@/app/_components/AudioList";

export default async function Audio() {

  const clips = await getAudioClipList();
  console.log(clips)

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <h1>Audio Clips</h1>
        <AudioList clips={clips}/>
      </main>
    </div>
  );
}