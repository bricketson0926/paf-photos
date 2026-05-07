export type Photo = {
    id: number;
    url: string; // Will potentially be a different way to store the photo
    title: string;
    description: string;
    photographer: string;
    dateTaken: string; // ISO date string
    tags: string[];
}