import AudioContent from "./AudioContent";
import { Suspense } from "react";

export default function AudioPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="flex flex-1 w-full max-w-6xl flex-col items-center px-16 bg-white">
        <h1 className="font-semibold text-center contents-center text-2xl pt-32">
            Filter or Search Audio Clips
        </h1>

        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading audio clips...</div>}>
            <AudioContent cloudfrontUrl={process.env.CLOUDFRONT_URL ?? ""} />
        </Suspense>

      </main>
    </div>
  );
}