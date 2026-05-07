import Searchbar from "@/app/_components/searchbar";
import { getPhotos } from "@/lib/data";
import { Photo } from "@/lib/types";
import PhotoMasonry from "@/app/_components/photoMasonry"

type PhotosProp = {
  searchParams?: {
    tags?: string[];
  };
};

export default async function Page(props: PhotosProp | Promise<PhotosProp>) {
  
  const {searchParams} = await props;

  const tags = searchParams?.tags ?? [];
  const photos = await getPhotos(tags);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white">
        <h1 className="font-semibold text-center contents-center text-2xl">
            Filter or Search Photos
        </h1>
        <Searchbar />
        <PhotoMasonry photos={photos as Photo[]} />

      </main>
    </div>
  );
}