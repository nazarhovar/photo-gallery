import { elements } from "./pageElements.js";
import { state } from "./galleryState.js";
import { openPhotoViewer } from "./photoViewer.js";

// Main flow: choose photos and show every matching card.
export function refreshGalleryForSelectedCategory() {
    // 1. Read state.allPhotos and keep the photos for the selected filter.
    const filteredPhotos = getPhotosMatchingCurrentFilter();
    // 2. Save this list so the large-photo viewer knows which photos to show.
    state.photosMatchingFilter = filteredPhotos;

    // 3. Create and show a card for every matching photo.
    showPhotoCardsInGallery(filteredPhotos);
}

// Return photos for the selected filter without changing state.allPhotos.
function getPhotosMatchingCurrentFilter() {
    // "all" means every photo loaded from the server.
    if (state.selectedCategory === "all") {
        return state.allPhotos;
    }

    // For Nature, City, or Animals, compare each photo's category.
    const categoryPhotos = [];
    for (let i = 0; i < state.allPhotos.length; i++) {
        const photo = state.allPhotos[i];
        if (photo.category === state.selectedCategory) {
            categoryPhotos.push(photo);
        }
    }
    return categoryPhotos;
}

// Build one photo card from one photo object.
function createPhotoCardElement(photo) {
    // "photo" is one object from state.allPhotos, with title, category, and src.
    // createElement builds HTML in memory; showPhotoCardsInGallery inserts it later.
    const card = document.createElement("figure");
    card.classList.add("photo-card");

    // This button will contain the image. Clicking the image opens the viewer.
    const openButton = document.createElement("button");
    openButton.type = "button";
    openButton.classList.add("photo-open");

    // src tells the browser where the image file is;
    const image = document.createElement("img");
    image.src = photo.src;

    openButton.addEventListener("click", () => {
        // This code runs later, when the image is clicked.
        // indexOf finds this photo's number in the filtered list.
        openPhotoViewer(state.photosMatchingFilter.indexOf(photo));
    });
    openButton.append(image);

    // Create the text shown on the card: title and category.
    const caption = document.createElement("figcaption");
    const title = document.createElement("h2");
    title.textContent = photo.title;
    const category = document.createElement("p");
    category.classList.add("photo-category");
    category.textContent = photo.category;

    // Put the smaller pieces inside the card and return the finished card.
    caption.append(title, category);
    card.append(openButton, caption);
    return card;
}

// Show the photos passed in "items" inside the #gallery element on the page.
function showPhotoCardsInGallery(items) {
    // "items" is the array of photos selected by the current filter.
    const cards = [];
    for (let i = 0; i < items.length; i++) {
        // Turn one photo object into one HTML card.
        cards.push(createPhotoCardElement(items[i]));
    }
    // Remove the cards currently on the page and insert these new cards.
    elements.gallery.replaceChildren(...cards);
}




