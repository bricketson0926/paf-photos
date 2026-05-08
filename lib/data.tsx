'use cache';
import { Photo } from "@/lib/types";

const photos: Photo[] = [
    {
        id: 1,
        url: 'https://picsum.photos/seed/picsum/300/250',
        title: 'Sunset over the mountains',
        description: 'A beautiful sunset over the mountains.',
        photographer: 'John Doe',
        dateTaken: '2023-08-15',
        tags: ['sunset', 'mountains', 'nature', 'city']
    },
    {
        id: 2,
        url: 'https://picsum.photos/id/12/300/250',
        title: 'Serene beach with crystal clear water',
        description: 'A serene beach with crystal clear water.',
        photographer: 'Jane Smith',
        dateTaken: '2023-07-10',
        tags: ['beach', 'ocean', 'nature', 'animals']
    }
];

export async function getPhotoById(id: number): Promise<Photo | undefined> {
    // This is a placeholder implementation. This would use thingToGetData to fetch the photo data from a database or API.
    return photos.find(photo => photo.id === id);
}

export async function getAllPhotos(): Promise<Photo[]> {
    // This is a placeholder implementation. This would use thingToGetData to fetch all photos from a database or API.
    return photos;
}

export async function getPhotos(tags: string[] = [], anyTags: boolean = false): Promise<Photo[]> {
    // This is a placeholder implementation. This would use thingToGetData to fetch the photo data from a database or API.


    const activeTags = tags.filter(tag => tag.trim().length > 0);

    // Filter photos based on the provided tags
    if (activeTags.length > 0) {
        if (anyTags) {
            return photos.filter(photo => photo.tags.some(tag => activeTags.includes(tag)));
        } else {
            return photos.filter(photo => activeTags.every(tag => photo.tags.includes(tag)));
        }
    }

    return photos;
}

export async function getPossibleTags(): Promise<string[]> {
    // This is a placeholder implementation. This would use thingToGetData to fetch the possible tags from a database or API.
    return ['nature', 'city', 'people', 'animals', 'technology'];
}