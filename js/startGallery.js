import { elements } from "./pageElements.js";
import { loadPhotosFromSupabaseIntoState } from "./supabasePhotos.js";
import { loadCategoriesFromSupabaseIntoState } from "./supabaseCategories.js";
import { refreshGalleryForSelectedCategory } from "./photoGallery.js";
import { refreshCategoryFilterButtonsFromState } from "./categoryFilterButtons.js";
import { connectUploadPhotoForm, populateUploadCategoryOptionsFromState } from "./addPhotoForm.js";
import { connectNewCategoryForm } from "./addCategoryForm.js";
import { connectPhotoViewerButtons } from "./photoViewer.js";

// index.html loads this file, so this is where the gallery starts.
async function initializeGalleryApp() {
    // Give the existing HTML buttons and forms their click/submit actions.
    // These functions only connect actions; the actions run after a user click.
    connectUploadPhotoForm();
    connectNewCategoryForm();

    connectPhotoViewerButtons();

    try {
        // Read categories from the Supabase table into state.allCategories.
        await loadCategoriesFromSupabaseIntoState();
        // Use that array to build filter buttons and upload form options.
        refreshCategoryFilterButtonsFromState();

        populateUploadCategoryOptionsFromState();

        // Read photo records into state.allPhotos.
        await loadPhotosFromSupabaseIntoState();
        // Turn the selected photos into visible cards in #gallery.
        refreshGalleryForSelectedCategory();

    } catch (error) {
        // A failed Supabase request stops startup; log the reason for debugging.
        console.error("Gallery startup failed:", error);
    }
}

// Run the startup steps as soon as this module loads.
initializeGalleryApp();
