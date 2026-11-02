// This object holds the data the app is using right now.
// Changing a value here does not update the page; the gallery must be rendered again.
export const state = {
    allPhotos: [], // Every photo loaded from Supabase.
    photosMatchingFilter: [], // Photos matching the filter; the viewer moves through them.
    selectedCategory: "all", // The selected filter.
    openPhotoIndex: 0 // Position of the open photo in photosMatchingFilter.
};




