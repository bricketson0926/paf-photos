import { Photo } from "@/lib/types";

export async function getPhotoById(id: number): Promise<Photo | undefined> {
    // This is a placeholder implementation. This would use thingToGetData to fetch the photo data from a database or API.
    const photos: Photo[] = [
        {
            id: 1,
            url: 'https://example.com/photo1.jpg',
            description: 'A beautiful sunset over the mountains.',
            photographer: 'John Doe',
            dateTaken: '2023-08-15',
            tags: ['sunset', 'mountains', 'nature']
        },
        {
            id: 2,
            url: 'https://example.com/photo2.jpg',
            description: 'A serene beach with crystal clear water.',
            photographer: 'Jane Smith',
            dateTaken: '2023-07-10',
            tags: ['beach', 'ocean', 'nature']
        }
    ];

    return photos.find(photo => photo.id === id);
}

export async function getPhotos(tags: string[] = []): Promise<Photo[]> {
    // This is a placeholder implementation. This would use thingToGetData to fetch the photo data from a database or API.
    const photos: Photo[] = [
        {
            id: 1,
            url: 'https://picsum.photos/seed/picsum/300/250',
            description: 'A beautiful sunset over the mountains.',
            photographer: 'John Doe',
            dateTaken: '2023-08-15',
            tags: ['sunset', 'mountains', 'nature']
        },
        {
            id: 2,
            url: 'https://picsum.photos/id/12/300/250',
            description: 'A serene beach with crystal clear water.',
            photographer: 'Jane Smith',
            dateTaken: '2023-07-10',
            tags: ['beach', 'ocean', 'nature', 'animals']
        }
    ];

    const activeTags = tags.filter(tag => tag.trim().length > 0);

    // Filter photos based on the provided tags
    if (activeTags.length > 0) {
        return photos.filter(photo =>
            activeTags.every(tag => photo.tags.includes(tag))
        );
    }

    return photos;
}

export function getPossibleTags(): string[] {
    // This is a placeholder implementation. This would use thingToGetData to fetch the possible tags from a database or API.
    return ['nature', 'city', 'people', 'animals', 'technology'];
}