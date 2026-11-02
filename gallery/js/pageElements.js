// Find the HTML elements once so other files can use them by name.
// #gallery means the element with id="gallery".
// ".filters button" means every button inside the filters section.
export const elements = {
    // The empty container where photoGallery.js inserts photo cards.
    gallery: document.querySelector("#gallery"),
    // All category buttons, used by categoryFilterButtons.js.
    filterButtons: document.querySelectorAll(".filters button"),

    // Upload dialog, form fields, and its buttons.
    uploadOpen: document.querySelector("#upload-open"),
    uploadDialog: document.querySelector("#upload-dialog"),
    uploadForm: document.querySelector("#upload-form"),
    uploadFile: document.querySelector("#upload-file"),
    uploadTitle: document.querySelector("#upload-title"),
    uploadCategory: document.querySelector("#upload-category"),
    uploadMessage: document.querySelector("#upload-message"),
    uploadSubmit: document.querySelector("#upload-submit"),
    uploadCancel: document.querySelector("#upload-cancel"),

    // Large-photo dialog and its controls.
    lightbox: document.querySelector("#lightbox"),
    lightboxImage: document.querySelector("#lightbox-image"),
    lightboxTitle: document.querySelector("#lightbox-title"),
    lightboxClose: document.querySelector("#lightbox-close"),
    lightboxPrev: document.querySelector("#lightbox-prev"),
    lightboxNext: document.querySelector("#lightbox-next")
};




