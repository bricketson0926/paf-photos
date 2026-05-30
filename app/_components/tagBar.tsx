'use client';
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type TagBarProps = {
  cloudfrontUrl: string;
};

export default function TagBar({ cloudfrontUrl }: TagBarProps) {
    // this component is used to search for a term
    const searchParams = useSearchParams() // get the search params
    const pathname = usePathname(); // get the pathname
    const {replace} = useRouter(); // get the router
    const currentMode = searchParams.get('tagMode') ?? 'any';
    const [possibleTags, setPossibleTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useEffect(() => {
        const loadTags = async () => {
            try {
                const url = cloudfrontUrl + "photo-metadata.json";
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to fetch tags: ${response.status}`);
                }
                const photos = await response.json();
                const allTags = photos.flatMap((photo: any) => photo.tags ?? []);
                // filter out null/undefined/non-string/empty tags
                const stringTags = (allTags as any[]).filter((t): t is string => typeof t === 'string' && t.trim() !== '');
                const uniqueTags = Array.from(new Set<string>(stringTags)).sort();
                setPossibleTags(uniqueTags);
            } catch (error) {
                console.error("Error loading tags:", error);
                setPossibleTags([]);
            }
        };
        loadTags();
    }, [cloudfrontUrl]);

    function handleSort(tag: string) {
        // this function handles the sort
        const params = new URLSearchParams(searchParams)
        const selectedTags = params.getAll('tags')

        if (selectedTags.includes(tag)) {
            params.delete('tags')
            selectedTags
                .filter((selectedTag) => selectedTag !== tag)
                .forEach((selectedTag) => params.append('tags', selectedTag))
        } else {
            params.append('tags', tag)
        }
        // replace the url with the new search params
        const queryString = params.toString();
        replace(queryString ? `${pathname}?${queryString}` : pathname);
    }

    function handleFilterMode(mode: 'any' | 'all') {
        const params = new URLSearchParams(searchParams);
        params.set('tagMode', mode);

        const queryString = params.toString();
        replace(queryString ? `${pathname}?${queryString}` : pathname);
    }

    return (
        <div className="flex flex-col items-center justify-between p-8">
            <div className="flex flex-row items-center space-x-2">
                {possibleTags.map((tag) => {
                    const isActive = searchParams.getAll('tags').includes(tag);
                    
                    return (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => handleSort(tag)}
                            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                                isActive
                                    ? 'border-blue-600 bg-blue-600 text-white'
                                    : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-100'
                            }`}
                        >
                            {tag}
                        </button>
                    );
                })}
                </div>
                <div className="mt-4 flex w-full flex-row items-center justify-center gap-2">
                    <div className="flex w-full flex-row items-center justify-center gap-2">
                        <select
                            value={currentMode}
                            onChange={(e) => handleFilterMode(e.target.value as 'any' | 'all')}
                            className="rounded-full border px-3 py-1.5 text-xs transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                            >
                            <option value="any" disabled={currentMode === 'any'}>Contains Any Tag</option>
                            <option value="all" disabled={currentMode === 'all'}>Contains All Tags</option>
                        </select>
                    </div>
                </div>
        </div>
    );
}