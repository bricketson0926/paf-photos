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
    tags: string[];
    url: string; // not stored in the database, but constructed from the ID and extension and stored in the same type for convenience
}

export type Map = {
    id: string;
    title: string;
    description: string;
    creator: string; // Won't be shown for maps, but good to have for data consistency
    dateCreated: string; // ISO date string
}