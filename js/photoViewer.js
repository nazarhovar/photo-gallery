import { elements } from "./pageElements.js";
import { state } from "./galleryState.js";

// Open the clicked photo. "index" is its position in photosMatchingFilter.
// Array positions start at 0, so 0 means the first shown photo.
export function openPhotoViewer(index) {
    // Save the position so the arrows know where to move from.
    state.openPhotoIndex = index;

    // Fill the existing HTML dialog before making it visible.
    showCurrentPhotoInViewer();
    elements.lightbox.showModal();
}

// Read the currently selected photo and put its data into the open dialog.
function showCurrentPhotoInViewer() {
    // The filtered list matches the cards the visitor sees behind the dialog.
    const photo = state.photosMatchingFilter[state.openPhotoIndex];

    // src loads the picture; textContent shows its title.
    elements.lightboxImage.src = photo.src;
    elements.lightboxTitle.textContent = photo.title;
}

// Move one photo left or right in the filtered list.
function showPreviousOrNextPhoto(step) {
    // Previous passes -1 and Next passes 1.
    const nextIndex = state.openPhotoIndex + step;

    // Stay on the first or last photo instead of going past the list.
    if (nextIndex < 0 || nextIndex >= state.photosMatchingFilter.length) {
        return;
    }

    // Remember the new position and replace the picture in the dialog.
    state.openPhotoIndex = nextIndex;
    showCurrentPhotoInViewer();

    // Remove and add the class so the CSS slide starts again for this photo.
    // Reading offsetWidth makes the browser apply the removal first.
    elements.lightboxImage.classList.remove("slide-animation");
    void elements.lightboxImage.offsetWidth;
    elements.lightboxImage.classList.add("slide-animation");
}

// Connect Close, Previous and Next once when the app starts.
export function connectPhotoViewerButtons() {
    // Each function runs later, when its button is clicked.
    elements.lightboxClose.addEventListener("click", () => elements.lightbox.close());
    elements.lightboxPrev.addEventListener("click", () => showPreviousOrNextPhoto(-1));
    elements.lightboxNext.addEventListener("click", () => showPreviousOrNextPhoto(1));
}
