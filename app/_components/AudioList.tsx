import {AudioClip} from "@/types";


export default function AudioList({clips}: {clips: AudioClip[] }) {
    if (!clips || clips[0]['duration'] == -1) {
        return (
            <div >
                No Audio Clips Found
            </div>
        )
    }

    console.log("Clips: " + JSON.stringify(clips))
    console.log("URL to Pull from: " + process.env.CLOUDFRONT_URL + clips[0]['title'] + '.m4a')

    return (
        <div>
            {clips.map((clip) => (
                <div key={clip.id}>
                    <h2>{clip.title}</h2>
                    <div>
                        <audio controls src={process.env.CLOUDFRONT_URL + clip.id + '.m4a'}>
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </div>
            ))}
        </div>
    )
}