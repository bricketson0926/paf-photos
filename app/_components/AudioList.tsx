import {AudioClipListItem} from "@/types";

export default function AudioList({clips}: {clips: AudioClipListItem[] }) {
    if (!clips || clips.length == 0) {
        return (
            <div >
                No Audio Clips Found
            </div>
        )
    }

    return (
        <div>
            {clips.map((clip) => (
                <div key={clip.key}>
                    <h2>{clip.title}</h2>

                    
                </div>
            ))}
        </div>
    )
}