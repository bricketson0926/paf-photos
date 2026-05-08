export type AudioClip = {
    key: string;
    title: string;
    duration: number;
    url: string;
};

export type Photo = {
    id: number;
    url: string; // Will potentially be a different way to store the photo
    title: string;
    description: string;
    photographer: string;
    dateTaken: string; // ISO date string
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