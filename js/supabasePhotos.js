import { supabaseClient, bucketName } from "./supabaseClient.js";
import { state } from "./galleryState.js";

// A photos table row has file_path; an <img> needs a complete URL in src.
function getPublicPhotoUrl(filePath) {
    // Storage turns the saved file path into a public browser address.
    const { data } = supabaseClient.storage.from(bucketName).getPublicUrl(filePath);
    return data.publicUrl;
}

// Read photos from Supabase and put ready-to-display objects in state.allPhotos.
export async function loadPhotosFromSupabaseIntoState() {
    // The photos table holds text and file paths. Storage holds the image files.
    // Read table rows from oldest to newest.
    const { data, error } = await supabaseClient
        .from("photos")
        .select("title, category, file_path, created_at")
        .order("created_at", { ascending: true });

    if (error) {
        // Pass the error to the startup or upload form that called this function.
        throw error;
    }

    // Convert each database row into the simpler object used by the gallery.
    const photos = [];
    for (let i = 0; i < data.length; i++) {
        const photo = data[i];
        // src is the public URL that the card's <img> will use.
        photos.push({
            title: photo.title,
            category: photo.category,
            src: getPublicPhotoUrl(photo.file_path)
        });
    }
    // This only updates JavaScript data. A separate refresh builds HTML cards.
    state.allPhotos = photos;
}

// Save a new photo in two places: file in Storage, details in the photos table.
export async function uploadPhotoToSupabase(file, title, category) {
    // Keep the extension and add a random name so files do not overwrite each other.
    const extension = file.name.split(".").pop().toLowerCase();
    const filePath = `${crypto.randomUUID()}.${extension}`;

    // First wait for Storage to save the actual image file.
    const { error: storageError } = await supabaseClient.storage
        .from(bucketName)
        .upload(filePath, file);

    if (storageError) {
        // Do not create a table row if the image file was not saved.
        throw storageError;
    }

    // Then save the photo's text details and file path in the photos table.
    // The table row points to the file; it does not contain the image bytes.
    const { error: databaseError } = await supabaseClient
        .from("photos")
        .insert({ title, category, file_path: filePath });

    // Let the form show this error if the table write fails.
    if (databaseError) {
        throw databaseError;
    }
}





