import { elements } from "./pageElements.js";
import { state } from "./galleryState.js";

// Called when a visitor clicks a photo card.
// "index" is that photo's position in state.photosMatchingFilter (starting at 0).
export function openPhotoViewer(index) {
    // Remember which photo is open.
    state.openPhotoIndex = index;
    // Put the photo into the dialog first, then show the dialog.
    showCurrentPhotoInViewer();
    elements.lightbox.showModal();
}

// Update the image and title inside the already created HTML dialog.
function showCurrentPhotoInViewer() {
    // Use the saved index to get one photo from the filtered list.
    const photo = state.photosMatchingFilter[state.openPhotoIndex];
    // src is the image URL;
    elements.lightboxImage.src = photo.src;
    elements.lightboxTitle.textContent = photo.title;
}

// Show the photo before or after the current one.
function showPreviousOrNextPhoto(step) {
    // The Previous button passes -1; the Next button passes 1.
    const nextIndex = state.openPhotoIndex + step;

    // An index below 0 or past the last photo does not exist, so do nothing.
    if (nextIndex < 0 || nextIndex >= state.photosMatchingFilter.length) {
        return;
    }

    // Save the new position and replace the content in the open dialog.
    state.openPhotoIndex = nextIndex;
    showCurrentPhotoInViewer();
}

// Run once at startup: tell the viewer buttons what to do when clicked.
export function connectPhotoViewerButtons() {
    // These functions run later, when a visitor actually clicks a button.
    elements.lightboxClose.addEventListener("click", () => elements.lightbox.close());
    elements.lightboxPrev.addEventListener("click", () => showPreviousOrNextPhoto(-1));
    elements.lightboxNext.addEventListener("click", () => showPreviousOrNextPhoto(1));
}




