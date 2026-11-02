// Temporary memory for this open page. Supabase is the long-term storage.
// Changing state does not change HTML until a refresh function runs.
export const state = {
    allPhotos: [], // All photo objects read from the photos table.
    allCategories: [], // All category rows read from the categories table.
    photosMatchingFilter: [], // Photo objects behind the shown cards; the viewer browses this list.
    selectedCategory: "all", // "all" or the category chosen with a filter button.
    openPhotoIndex: 0 // Position of the open photo in photosMatchingFilter.
};




