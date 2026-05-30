import PhotosContent from "./PhotosContent";
import { Suspense } from "react";

export default function PhotosPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="flex flex-1 w-full flex-col items-center px-16 bg-white">

        <Suspense fallback={<div className="flex items-center justify-center min-h-screen pb-16">Loading photos...</div>}>
            <PhotosContent cloudfrontUrl={process.env.CLOUDFRONT_URL ?? ""} />
        </Suspense>

      </main>
    </div>
  );
}