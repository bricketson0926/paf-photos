export async function sendToServer(data: FormData): Promise<boolean> {
    // push the meta data and the image url to the database and return as JSON.
    // they're of type multipart/form-data with file, title, tags, description, taken, and ext fields.
    const url = process.env.NEXT_PUBLIC_API_URL + "addPhoto";
    // console.log("Sending to URL:", url);
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

export async function deletePhoto(photoId: string): Promise<boolean> {
    const url = process.env.NEXT_PUBLIC_API_URL + "deletePhoto";
    console.log("Sending delete request to URL:", url, "for photo ID:", photoId);
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ id: photoId })
    });
    
    if (!response.ok) {
        const text = await response.text();
        console.error("Response body:", text.substring(0, 200));
        throw new Error(`Failed to delete photo: ${response.status} ${response.statusText} for ID ${photoId} at ${url}`);
    }
    
    return true;
}

export async function updatePhoto(photoId: string, data: FormData): Promise<boolean> {
    // only allows the update of title, description, tags, and taken. Not the file itself.
    const url = process.env.NEXT_PUBLIC_API_URL + "updatePhoto";
    // console.log("Sending update request to URL:", url, "for photo ID:", photoId);
    const payload = new FormData();
    payload.append("id", photoId);
    
    const title = data.get("title");
    if (typeof title === "string") {
        payload.append("title", title.trim());
    }

    const description = data.get("description");
    if (typeof description === "string") {
        payload.append("description", description.trim().replace(/^b(["'])(.*)\1$/, "$2"));
    }

    const tagsCsv = data
      .getAll("tags")
      .map((tag) => tag.toString().trim())
      .filter(Boolean)
      .join(",");

    if (tagsCsv.length > 0) {
        payload.append("tags", tagsCsv);
    }

    const yearCreated = data.get("yearCreated");
    if (typeof yearCreated === "string") {
        const normalizedYear = yearCreated.trim();
        if (normalizedYear.length > 0) {
            payload.append("taken", normalizedYear);
        }
    }

    const response = await fetch(url, {
        method: 'POST',
        body: payload
    });
    
    if (!response.ok) {
        const text = await response.text();
        console.error("Response body:", text.substring(0, 200));
        throw new Error(`Failed to update photo: ${response.status} ${response.statusText} for ID ${photoId} at ${url}`);
    }
    
    return true;
}