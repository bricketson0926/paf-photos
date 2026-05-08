'use client';
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    const handleBack = () => {
        // Try to restore saved filter state from sessionStorage
        const savedFilters = sessionStorage.getItem('photoFilters');
        
        if (savedFilters) {
            try {
                const { tags, tagMode } = JSON.parse(savedFilters);
                
                // Build URL with restored params
                const params = new URLSearchParams();
                if (tags && Array.isArray(tags)) {
                    tags.forEach(tag => params.append('tags', tag));
                }
                if (tagMode) {
                    params.append('tagMode', tagMode);
                }
                
                const queryString = params.toString();
                router.push(queryString ? `/photos?${queryString}` : '/photos');
            } catch (error) {
                // Fallback to regular back if parsing fails
                router.back();
            }
        } else {
            // No saved filters, use regular back button
            router.back();
        }
    };

    return (
        <button onClick={handleBack} className="inline-flex mb-4 text-white hover:scale-105 active:scale-90 bg-blue-500 px-3 py-1 rounded-md self-start">
            ← Back
        </button>
    );
}
