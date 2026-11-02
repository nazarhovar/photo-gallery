import { supabaseClient } from "./supabaseClient.js";
import { state } from "./galleryState.js";

// Read the categories table in display order and store its rows in state.
export async function loadCategoriesFromSupabaseIntoState() {
    const { data, error } = await supabaseClient
        .from("categories")
        .select("category, name, sort_order")
        .order("sort_order", { ascending: true });

    // Throw the server error so startGallery.js or addCategoryForm.js can handle it.
    if (error) {
        throw error;
    }

    state.allCategories = data;
}

// Save the name passed by addCategoryForm.js as a new table row.
export async function saveNewCategoryToSupabase(name) {
    // "My Trips" becomes "my-trips" for filtering and photo records.
    const category = name.toLowerCase().trim().replace(/\s+/g, "-");

    // The visible name and filter value are stored together.
    const { error } = await supabaseClient
        .from("categories")
        .insert({
            category: category,
            name: name,
            sort_order: state.allCategories.length + 1
        });

    // The form will show this error instead of pretending the category was saved.
    if (error) {
        throw error;
    }
}
