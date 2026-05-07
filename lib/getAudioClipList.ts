import { AudioClipListItem } from "@/types";

export async function getAudioClipList(): Promise<AudioClipListItem[]> {

    
    //Pull info from CloudFront if it's there
    // try {
    //     const cloudFrontResponse = await fetch(process.env.CLOUDFRONT_URL + )

    //     //If it was there, return it
    //     if (cloudFrontResponse.ok) {
    //         return await cloudFrontResponse.json();
    //     } 
    // } 
    // catch (error) {
    //     console.log("CloudFront failed to retrieve data.")
    // }

    //If it isn't in CloudFront, pull from DB
    const apiResponse = await fetch(process.env.API_URL + "getAudioClipList", {
        method: "GET",
        cache: "no-store"
    });

    if (!apiResponse.ok) {
        throw new Error("APIGateway failed to retrieve Audio metadata.")
    }

    return apiResponse.json();
}