import { elements } from "./pageElements.js";
import { saveNewCategoryToSupabase, loadCategoriesFromSupabaseIntoState } from "./supabaseCategories.js";
import { refreshCategoryFilterButtonsFromState } from "./categoryFilterButtons.js";
import { populateUploadCategoryOptionsFromState } from "./addPhotoForm.js";

// Connect the three actions in the Add category dialog once at startup.
export function connectNewCategoryForm() {
    // This code runs later, when the visitor clicks + Add category.
    elements.categoryOpen.addEventListener("click", () => {
        elements.categoryDialog.showModal();
    });

    // Cancel closes the dialog without saving anything.
    elements.categoryCancel.addEventListener("click", () => {
        elements.categoryDialog.close();
    });

    // The named handler below runs only when the form is submitted.
    elements.categoryForm.addEventListener("submit", handleNewCategoryFormSubmit);
}

// Submit flow: form name → Supabase → state.allCategories → buttons and select.
async function handleNewCategoryFormSubmit(event) {
    // Keep the browser on this page while JavaScript sends the request.
    event.preventDefault();

    // The name comes from the input in index.html, not from state.
    const name = elements.categoryName.value.trim();

    // An empty name has nothing to save.
    if (!name) {
        return;
    }

    // Stop a second submit while the first request is still running.
    elements.categorySubmit.disabled = true;

    try {
        // Insert the new category into the categories table.
        await saveNewCategoryToSupabase(name);

        // Read the full table again so state includes the new category.
        await loadCategoriesFromSupabaseIntoState();

        // Both controls use state.allCategories, so rebuild both.
        refreshCategoryFilterButtonsFromState();
        populateUploadCategoryOptionsFromState();

        // Clear the input and close the dialog after success.
        elements.categoryForm.reset();
        elements.categoryDialog.close();
    } catch (error) {
        // Keep the dialog open and show the Supabase error.
        console.error("Could not add category:", error);
        elements.categoryMessage.textContent = `Could not add category: ${error.message}`;
    } finally {
        // Allow another submit after success or failure.
        elements.categorySubmit.disabled = false;
    }
}
