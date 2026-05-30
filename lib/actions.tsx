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
    // only allows the update of title, description, and tags. Not the file itself.
    const url = process.env.NEXT_PUBLIC_API_URL + "editPhoto";
    // console.log("Sending update request to URL:", url, "for photo ID:", photoId);

    // Clean the data... Null is ''

    const title = data.get("title");
    if (typeof title === "string") {
        data.set("title", title.trim());
    }

    const description = data.get("description");
    if (typeof description === "string") {
        data.set("description", description.trim().replace(/^b(["'])(.*)\1$/, "$2"));
    }

    const tags = data.getAll("tags").map(tag => tag.toString().trim()).filter(Boolean).join(",");
    data.set("tags", tags);
    
    const yearTaken = data.get("yearTaken") ?? data.get("taken");
    if (typeof yearTaken === "string") {
        const normalizedYearTaken = yearTaken.trim();
        data.set("yearTaken", normalizedYearTaken);
    }


    const toNullIfEmpty = (value: FormDataEntryValue | null): string | null => {
        if (typeof value !== "string") return null;
        const normalized = value.trim();
        return normalized === "" ? null : normalized;
    };

    const payload = {
        id: photoId,
        title: toNullIfEmpty(data.get("title")),
        description: toNullIfEmpty(data.get("description")),
        tags: toNullIfEmpty(data.get("tags")),
        yearTaken: toNullIfEmpty(data.get("yearTaken") ?? data.get("taken"))
    };

    let lastResponse: Response | null = null;
    let lastResponseBody = "";

    // Intentionally omit Content-Type so browser sends a simple request
    // (text/plain for string body), avoiding CORS preflight rejection.
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        return true;
    }

    const text = await response.text();
    lastResponse = response;
    lastResponseBody = text.substring(0, 200);
    console.error("Response body:", lastResponseBody);

    if (response.status === 404) {
        throw new Error(`Photo with ID ${photoId} not found. Server responded with 404 at ${url}. Response body: ${lastResponseBody}`);
    }

    throw new Error(`Failed to update photo: ${response.status} ${response.statusText} for ID ${photoId} at ${url}`);

}