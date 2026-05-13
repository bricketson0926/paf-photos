export type AudioClip = {
    id: string;
    title: string;
    duration: number;
    createdAt: string;
    ext: string;
};

export type Photo = {
    id: string;
    url: string; // Will be generated based on the ID and extension, so it can be a string in the database but will be transformed into a full URL when retrieved.
    ext: string; // file extension
    title: string;
    description: string;
    photographer: string;
    tags: string[];
}

export type Map = {
    id: number;
    url: string; // Will potentially be a different way to store the map
    title: string;
    description: string;
    creator: string; // Won't be shown for maps, but good to have for data consistency
    dateCreated: string; // ISO date string
}