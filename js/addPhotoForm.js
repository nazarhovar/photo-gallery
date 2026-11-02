import { elements } from "./pageElements.js";
import { state } from "./galleryState.js";
import { uploadPhotoToSupabase, loadPhotosFromSupabaseIntoState } from "./supabasePhotos.js";
import { refreshGalleryForSelectedCategory } from "./photoGallery.js";

// Connect the three actions in the Add photo dialog once at startup.
export function connectUploadPhotoForm() {
    // + Upload photo opens the existing dialog from index.html.
    elements.uploadOpen.addEventListener("click", () => {
        elements.uploadDialog.showModal();
    });

    // Cancel closes the dialog without sending anything.
    elements.uploadCancel.addEventListener("click", () => {
        elements.uploadDialog.close();
    });

    // The named handler below runs later, when the form is submitted.
    elements.uploadForm.addEventListener("submit", handlePhotoUpload);
}

// Submit flow: form fields → Supabase → state.allPhotos → gallery cards.
async function handlePhotoUpload(event) {
    // Stop the normal page reload; JavaScript will send the file instead.
    event.preventDefault();

    // These values come from the HTML form, not from state.
    const file = elements.uploadFile.files[0];
    const title = elements.uploadTitle.value.trim();
    const category = elements.uploadCategory.value;

    // Without all three values, there is no complete photo to save.
    if (!file || !title || !category) {
        elements.uploadMessage.textContent = "Choose an image, title, and category.";
        return;
    }

    try {
        // First save the file in Storage and its details in the photos table.
        await uploadPhotoToSupabase(file, title, category);

        // Then read the server list again into state.allPhotos.
        await loadPhotosFromSupabaseIntoState();

        // Turn the updated list into cards on the page.
        refreshGalleryForSelectedCategory();

        // Finish by clearing the form and closing the dialog.
        elements.uploadForm.reset();
        elements.uploadDialog.close();
    } catch (error) {
        // Keep the dialog open and show the error if a server step fails.
        console.error("Could not upload photo:", error);
        elements.uploadMessage.textContent = `Upload failed: ${error.message}`;
    }
}

// Turn state.allCategories into the options inside the upload form's select.
export function populateUploadCategoryOptionsFromState() {
    const options = [];

    // This first option asks the visitor to choose a category.
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Choose category";
    options.push(defaultOption);

    // Each category row becomes one selectable option.
    for (let i = 0; i < state.allCategories.length; i++) {
        const category = state.allCategories[i];

        const option = document.createElement("option");
        option.value = category.category;
        option.textContent = category.name;

        options.push(option);
    }

    // Replace all old options so newly added categories appear here too.
    elements.uploadCategory.replaceChildren(...options);
}
