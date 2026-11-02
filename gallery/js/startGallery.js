import { elements } from "./pageElements.js";
import { loadPhotosFromSupabase } from "./supabasePhotos.js";
import { refreshGalleryForSelectedCategory } from "./photoGallery.js";
import { connectCategoryFilterButtons } from "./categoryFilterButtons.js";
import { connectUploadPhotoForm } from "./uploadPhotoForm.js";
import { connectPhotoViewerButtons } from "./photoViewer.js";

// The browser starts the app here after loading index.html.
async function initializeGalleryApp() {
    // 1. Tell the filter, upload, and viewer buttons what to do when clicked.
    // These functions connect clicks; they do not click the buttons now.
    connectCategoryFilterButtons();
    connectUploadPhotoForm();
    connectPhotoViewerButtons();

    try {
        // 2. Get photo data from Supabase and store it in state.allPhotos.
        await loadPhotosFromSupabase();
        // 3. Use that data to create the cards the visitor sees.
        refreshGalleryForSelectedCategory();
    } catch (error) {
        // If loading fails, keep the page open and log the problem.
        console.error("Gallery startup failed:", error);
    } finally {
        // finally runs whether loading succeeded or failed.
        elements.uploadOpen.disabled = false;
    }
}

// Start the steps above as soon as the browser loads this file.
initializeGalleryApp();




