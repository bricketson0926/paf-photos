export async function sendToServer(data: FormData): Promise<boolean> {
    // push the meta data and the image url to the database and return as JSON.
    // they're of type multipart/form-data with file, title, tags, description, and ext fields.
    const url = process.env.API_URL + "addPhoto";
    console.log("Sending to URL:", url);
    const response = await fetch(url, {
        method: 'POST',
        body: data
    });
    
    if (!response.ok) {
        const text = await response.text();
        console.error("Response body:", text.substring(0, 200));
        throw new Error(`Failed to send photo data: ${response.status} ${response.statusText} to ${url}`);
    }
    
    return true;
}