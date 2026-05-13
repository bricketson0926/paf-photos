'use cache';
import { Photo } from "@/types/index";
import { title } from "process";

async function asyncToGetData() : Promise<Photo[]> {
    // Pull the meta data from the database and the image url from the database and return as JSON.
    // the url format is: process.env.CLOUDFRONT_URL/photo-metadata.json
    // image url format is the above, /id + '.' + 'extension' (jpg, png, etc)
    const url = process.env.CLOUDFRONT_URL + "photo-metadata.json";
    console.log("Fetching from URL:", url);
    const response = await fetch(url);
    
    if (!response.ok) {
        const text = await response.text();
        console.error("Response body:", text.substring(0, 200));
        throw new Error(`Failed to fetch photo metadata: ${response.status} ${response.statusText} from ${url}`);
    }
    
    const contentType = response.headers.get("content-type");
    const expectsBinaryStream = contentType?.includes("binary/octet-stream");
    const expectsJson = contentType?.includes("application/json");
    if (contentType && !expectsBinaryStream && !expectsJson) {
        console.warn(`Warning: Expected binary/octet-stream, got ${contentType}. Attempting to parse anyway...`);
    }
    
    const data = await response.json();
    data.forEach((photo: Photo) => {
        // Ensure all components exist and are properly typed. Also generates the full image url
        photo.id = photo.id.toString(); // Ensure ID is a string
        photo.description = photo.description || ""; // Ensure description is a string
        photo.ext = photo.ext || ""; // Ensure extension is a string
        photo.title = photo.title || ""; // Ensure title is a string
        photo.photographer = photo.photographer || "Unknown"; // Ensure photographer is a string
        photo.url = process.env.CLOUDFRONT_URL + photo.id + "." + photo.ext;
    });
    return data;
}


export async function getPhotoById(id: string): Promise<Photo | undefined> {
    const photoData = await asyncToGetData();
    return photoData.find(photo => photo.id.toString() === id);
}

export async function getAllPhotos(): Promise<Photo[]> {
    const photoData = await asyncToGetData();
    return photoData.map((photo: Photo) => ({
        id: photo.id,
        title: photo.title,
        url: photo.url,
        ext: photo.ext,
        tags: photo.tags,
        description: photo.description,
        photographer: photo.photographer
    }));
}

export async function getPhotos(tags: string[] = [], anyTags: boolean = false): Promise<Photo[]> {
    const photoData = await asyncToGetData();


    const activeTags = tags.filter(tag => tag.trim().length > 0);

    // Filter photos based on the provided tags
    if (activeTags.length > 0) {
        if (anyTags) {
            return photoData.filter(photo => photo.tags.some(tag => activeTags.includes(tag)));
        } else {
            return photoData.filter(photo => activeTags.every(tag => photo.tags.includes(tag)));
        }
    }

    return photoData.map((photo: Photo) => ({
        id: photo.id,
        title: photo.title,
        url: photo.url,
        tags: photo.tags,
        description: photo.description,
        photographer: photo.photographer,
        ext: photo.ext
    }));
}

export async function getPossibleTags(): Promise<string[]> {

    const photoData = await asyncToGetData();
    const allTags = photoData.flatMap((photo: Photo) => photo.tags);
    return [...new Set(allTags)];
}