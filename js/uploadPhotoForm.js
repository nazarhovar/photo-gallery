import { elements } from "./pageElements.js";
import { state } from "./galleryState.js";
import { uploadPhotoToSupabase, loadPhotosFromSupabase } from "./supabasePhotos.js";
import { refreshGalleryForSelectedCategory } from "./photoGallery.js";
import { markActiveFilterButton } from "./categoryFilterButtons.js";

// Connect the upload form buttons to their actions.
// This function runs once when the application starts.
export function connectUploadPhotoForm() {
    // Open the upload dialog when the user clicks Upload.
    elements.uploadOpen.addEventListener("click", () => {
        elements.uploadDialog.showModal();
    });

    // Close the dialog when the user clicks Cancel.
    elements.uploadCancel.addEventListener("click", () => {
        elements.uploadDialog.close();
    });

    // Run handlePhotoUpload when the user submits the form.
    // The function is not called here. It will run later.
    elements.uploadForm.addEventListener("submit", handlePhotoUpload);
}

// Handle the upload after the user clicks Add photo.
async function handlePhotoUpload(event) {
    // Stop the browser from submitting the form normally.
    // We will upload the photo using JavaScript.
    event.preventDefault();

    // Get the selected file, photo title, and category from the form.
    const file = elements.uploadFile.files[0];
    const title = elements.uploadTitle.value.trim();
    const category = elements.uploadCategory.value;

    // Check that the user selected a file and filled in all fields.
    // Stop the function if something is missing.
    if (!file || !title || !category) {
        elements.uploadMessage.textContent = "Choose an image, title, and category.";
        return;
    }

    try {
        // 1. Upload the image to Storage and save its details in Database.
        await uploadPhotoToSupabase(file, title, category);

        // 3. Get the updated photo list from Supabase.
        await loadPhotosFromSupabase();

        // 4. Create and display the updated gallery cards.
        refreshGalleryForSelectedCategory();

        // 5. Clear the form and close the upload dialog.
        elements.uploadForm.reset();
        elements.uploadDialog.close();
    } catch (error) {
        // Show an error if uploading or refreshing the gallery fails.
        console.error("Could not upload photo:", error);
        elements.uploadMessage.textContent = `Upload failed: ${error.message}`;
    } 
}