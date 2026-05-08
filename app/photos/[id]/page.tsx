import { getPhotoById, getAllPhotos } from "@/lib/data";
import BackButton from "@/app/_components/backButton";

export async function generateStaticParams() {
    const photos = await getAllPhotos();
    return photos.map((photo) => ({
        id: photo.id.toString(),
    }));
}

export default async function IndividualPhoto({
    params
}: {
    params: Promise<{id: string}>
}) {
    const id = Number((await params).id);
    const photo = await getPhotoById(id);

    // If no photo exists, show an error message
    if (photo === undefined) {
        return <div className="min-h-screen p-4">
            <BackButton />
            <div className="bg-gray-100 p-4 rounded-lg">
                <h1 className="text-xl font-bold">
                    Photo ID is missing.
                </h1>
            </div>
        </div>
    }
    
    return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col ">
            <BackButton />
            <div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow-lg">
        <div className="flex gap-6">
            <div className="shrink-0">
                <img
                    src={photo.url}
                    alt={photo.title}
                    className="max-w-full max-h-[80vh] w-auto h-auto rounded-lg object-contain"
                />
            </div>
            <div className="flex-1 flex flex-col gap-3">
                <h1 className="text-2xl font-bold">
                    {photo.title}
                </h1>
                <p className="text-gray-600">
                    {photo.dateTaken}
                </p>
                <p className="text-gray-600">
                    {photo.photographer}
                </p>
                {photo.tags && photo.tags.length > 0 && (
                    <div className="flex gap-2">
                        {photo.tags.map((tag, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                <p className="text-gray-700">
                    Description: {photo.description}
                </p>
            </div>
        </div>
        </div>
        </div>
    </div>
    )
}