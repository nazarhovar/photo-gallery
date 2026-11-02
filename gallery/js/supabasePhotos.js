import { supabaseClient, bucketName } from "./supabaseClient.js";
import { state } from "./galleryState.js";

// The database stores a file path; an <img> needs a full URL.
function getPublicPhotoUrl(filePath) {
    // Ask Storage for the browser URL of this file path.
    const { data } = supabaseClient.storage.from(bucketName).getPublicUrl(filePath);
    return data.publicUrl;
}

// Get photo records from the database and save them in the app state.
export async function loadPhotosFromSupabase() {
    // 1. Read photo details from the table, oldest first.
    // The actual image files live in Storage, not in this table.
    const { data, error } = await supabaseClient
        .from("photos")
        .select("title, category, file_path, created_at")
        .order("created_at", { ascending: true });

    if (error) {
        // Throwing lets the caller handle the error with one catch block.
        throw error;
    }

    // 2. Make a new array for the photo objects used by photoGallery.js.
    const photos = [];
    for (let i = 0; i < data.length; i++) {
        const photo = data[i];
        // One database row becomes one object with a ready-to-use image URL.
        photos.push({
            title: photo.title,
            category: photo.category,
            src: getPublicPhotoUrl(photo.file_path)
        });
    }
    // 3. Save the full list so photoGallery.js can filter and display it.
    state.allPhotos = photos;
}

// Upload the image file, then save its title, category, and path in the table.
export async function uploadPhotoToSupabase(file, title, category) {
    // Keep the extension (such as jpg) and give the file a unique name.
    const extension = file.name.split(".").pop().toLowerCase();
    const filePath = `${crypto.randomUUID()}.${extension}`;

    // 1. Save the actual image file in Storage.
    // await waits for the server before moving to the next step.
    const { error: storageError } = await supabaseClient.storage
        .from(bucketName)
        .upload(filePath, file);

    if (storageError) {
        // Stop here: there is no point adding a table row for a missing file.
        throw storageError;
    }

    // 2. Save the title, category, and file path in the photos table.
    // The table does not hold the image itself.
    const { error: databaseError } = await supabaseClient
        .from("photos")
        .insert({ title, category, file_path: filePath });

    if (databaseError) {
        throw databaseError;
    }
}





