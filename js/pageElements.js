// Find existing elements in index.html once and give them short names.
// Other files use these references; this file does not create new HTML.
export const elements = {
    // Containers filled later by JavaScript.
    gallery: document.querySelector("#gallery"),
    filters: document.querySelector(".filters"),

    // Add photo button, dialog and form fields.
    uploadOpen: document.querySelector("#upload-open"),
    uploadDialog: document.querySelector("#upload-dialog"),
    uploadForm: document.querySelector("#upload-form"),
    uploadFile: document.querySelector("#upload-file"),
    uploadTitle: document.querySelector("#upload-title"),
    uploadCategory: document.querySelector("#upload-category"),
    uploadMessage: document.querySelector("#upload-message"),
    uploadSubmit: document.querySelector("#upload-submit"),
    uploadCancel: document.querySelector("#upload-cancel"),

    // Add category button, dialog and form fields.
    categoryOpen: document.querySelector("#category-open"),
    categoryDialog: document.querySelector("#category-dialog"),
    categoryForm: document.querySelector("#category-form"),
    categoryName: document.querySelector("#category-name"),
    categoryMessage: document.querySelector("#category-message"),
    categorySubmit: document.querySelector("#category-submit"),
    categoryCancel: document.querySelector("#category-cancel"),

    // Large photo dialog and its navigation buttons.
    lightbox: document.querySelector("#lightbox"),
    lightboxImage: document.querySelector("#lightbox-image"),
    lightboxTitle: document.querySelector("#lightbox-title"),
    lightboxClose: document.querySelector("#lightbox-close"),
    lightboxPrev: document.querySelector("#lightbox-prev"),
    lightboxNext: document.querySelector("#lightbox-next")
};
