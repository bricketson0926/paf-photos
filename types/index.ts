export type AudioClip = {
    id: string;
    title: string;
    duration: number;
    createdAt: string;
    ext: string;
};

export type Photo = {
    id: string;
    ext: string; // file extension
    title: string;
    description: string;
    dateTaken: string; // ISO date string
    tags: string[];
}

export type Map = {
    id: string;
    title: string;
    description: string;
    creator: string; // Won't be shown for maps, but good to have for data consistency
    dateCreated: string; // ISO date string
}