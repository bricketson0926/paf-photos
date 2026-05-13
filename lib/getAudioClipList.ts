import { AudioClip } from "@/types";

export async function getAudioClipList(): Promise<AudioClip[]> {

    //Pull info from CloudFront
    try {
        const cloudFrontResponse = await fetch(process.env.CLOUDFRONT_URL + "audio-metadata.json")
        console.log("response: " + JSON.stringify(cloudFrontResponse))
        const audioClips = await cloudFrontResponse.json()
        console.log("audioClips: " + JSON.stringify(audioClips))
        for(let i = 0; i<audioClips.length; i++) {
            console.log("Clip: " + JSON.stringify(audioClips[i]))
            audioClips[i]['duration'] = Number.parseInt(audioClips[i]['duration'])
        }

        console.log("audioClips: " + JSON.stringify(audioClips))
        return audioClips;
    } 
    catch (error) {
        console.log("Error: " + error)
        console.log("CloudFront failed to retrieve data.")
        return [{'title' : 'failed retrieving metadata', 'id' : '-1', 'duration' : -1, 'ext' : 'none', 'createdAt' : '-1'}];
    }
}