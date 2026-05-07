'use client';
import { get } from "http";
import {usePathname, useSearchParams, useRouter} from "next/navigation";
import { getPossibleTags } from "@/lib/data";

export default function TagBar() {
    // this component is used to search for a term
    const searchParams = useSearchParams() // get the search params
    const pathname = usePathname(); // get the pathname
    const {replace} = useRouter(); // get the router
    const currentMode = searchParams.get('tagMode') ?? 'any';

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

    const possibleTags = getPossibleTags();

    return (
        // return the search bar
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
                    <button
                        type="button"
                        onClick={() => handleFilterMode('any')}
                        className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                            currentMode === 'any' ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        Filter Any
                    </button>
                    <button
                        type="button"
                        onClick={() => handleFilterMode('all')}
                        className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                            currentMode === 'all' ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        Filter All
                    </button>
                </div>
        </div>
    );
}