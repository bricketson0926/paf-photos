import {AudioClip} from "@/types";

export default function AudioList({
    clips,
    cloudfrontUrl,
    onClipClick,
}: {
    clips: AudioClip[];
    cloudfrontUrl?: string;
    onClipClick?: (id: string) => void;
}) {
    if (!clips || clips.length === 0 || clips[0]['duration'] === -1) {
        return <div>No Audio Clips Found</div>;
    }

    const base = cloudfrontUrl ?? process.env.CLOUDFRONT_URL ?? '';

    return (
        <div className="w-full space-y-6">
            {clips.map((clip) => (
                <div
                    key={clip.id}
                    className={`border rounded-md p-4 ${onClipClick ? 'cursor-pointer' : ''}`}
                    role={onClipClick ? 'button' : undefined}
                    tabIndex={onClipClick ? 0 : undefined}
                    onClick={onClipClick ? () => onClipClick(clip.id.toString()) : undefined}
                    onKeyDown={
                        onClipClick
                            ? (e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        onClipClick(clip.id.toString());
                                    }
                                }
                            : undefined
                    }
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-medium">{clip.title}</h2>
                        {onClipClick && (
                            <button
                                className="text-sm text-blue-600"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClipClick(clip.id.toString());
                                }}
                            >
                                Open
                            </button>
                        )}
                    </div>

                    <div className="mt-3">
                        <audio
                            controls
                            src={`${base}${clip.id}.${clip.ext}`}
                            className="w-full"
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => e.stopPropagation()}
                        >
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </div>
            ))}
        </div>
    );
}