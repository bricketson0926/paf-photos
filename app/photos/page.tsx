import TagBar from "@/app/_components/tagBar";
import { getPhotos } from "@/lib/data";
import { Photo } from "@/lib/types";
import PhotoMasonry from "@/app/_components/photoMasonry"

export const dynamic = 'force-dynamic';

export default async function Photos({searchParams,}: {
    searchParams?: Promise<{
        tags?: string | string[];
        tagMode?: 'any' | 'all';
    }>
}) {

  const resolvedSearchParams = await searchParams;
  const tags = Array.isArray(resolvedSearchParams?.tags)
    ? resolvedSearchParams.tags
    : resolvedSearchParams?.tags
      ? [resolvedSearchParams.tags]
      : [];
  const tagMode = resolvedSearchParams?.tagMode || 'all';

  const photos = await getPhotos(tags, tagMode === 'any');
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="flex flex-1 w-full max-w-6xl flex-col items-center px-16 bg-white">
        <h1 className="font-semibold text-center contents-center text-2xl pt-32">
            Filter or Search Photos
        </h1>

        <TagBar />
        
        <PhotoMasonry photos={photos as Photo[]} />

      </main>
    </div>
  );
}