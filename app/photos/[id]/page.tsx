import { auth } from "@/auth";
import { getPhotoById } from "@/lib/data";

export default async function IndividualPhoto({params}: {params: {id: number}}) {
    const user = auth();
    const photo = await getPhotoById(params.id);

    // If no photo exists, show an error message
    if (photo === undefined) {
        return <div className="bg-gray-100 p-4 rounded-lg">
            <h1 className="text-xl font-bold">
                Photo ID is missing.
            </h1>
        </div>
    }
    
    return (
    <div className="bg-gray-100 p-4 rounded-lg">
        <h1 className="text-xl font-bold">
            {photo.description}
        </h1>
        <p className="text-gray-700">
            Taken by {photo.photographer} on {photo.dateTaken}
        </p>
        <div className="mt-4">
            <img src={photo.url} alt={photo.description} className="w-full rounded-lg" />
        </div>
    </div>
    )
}