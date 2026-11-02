import { elements } from "./pageElements.js";
import { state } from "./galleryState.js";
import { openPhotoViewer } from "./photoViewer.js";

// Read the selected category and redraw the cards shown in #gallery.
export function refreshGalleryForSelectedCategory() {
    // Start with every photo loaded from Supabase; keep only the selected ones.
    const filteredPhotos = getPhotosMatchingCurrentFilter();
    // The viewer uses this same list when Previous or Next is clicked.
    state.photosMatchingFilter = filteredPhotos;

    // Replace the old cards with cards made from these photo objects.
    showPhotoCardsInGallery(filteredPhotos);
}

// Return photo objects that match state.selectedCategory; keep allPhotos intact.
function getPhotosMatchingCurrentFilter() {
    // "all" means no filtering: show the full server list.
    if (state.selectedCategory === "all") {
        return state.allPhotos;
    }

    // For any other category, check each photo one by one.
    const categoryPhotos = [];
    for (let i = 0; i < state.allPhotos.length; i++) {
        const photo = state.allPhotos[i];
        if (photo.category === state.selectedCategory) {
            categoryPhotos.push(photo);
        }
    }
    return categoryPhotos;
}

// Connect the photo button: a click opens this photo in the large viewer.
function connectPhotoCardOpenButtonClick(openButton, photo) {
    openButton.addEventListener("click", () => {
        // indexOf finds this photo's position in the list behind the shown cards.
        openPhotoViewer(state.photosMatchingFilter.indexOf(photo));
    });
}

// Turn one plain photo object into one <figure> with an image and caption.
function createPhotoCardElement(photo) {
    // photo has title, category and src. It is data, not an HTML element.
    // createElement builds the card in memory; it is inserted later.
    const card = document.createElement("figure");
    card.classList.add("photo-card");

    // The image sits inside a button so a click can open the viewer.
    const openButton = document.createElement("button");
    openButton.type = "button";
    openButton.classList.add("photo-open");

    // src is the public image URL prepared by supabasePhotos.js.
    const image = document.createElement("img");
    image.src = photo.src;

    connectPhotoCardOpenButtonClick(openButton, photo);
    openButton.append(image);

    // The caption shows text from this photo object.
    const caption = document.createElement("figcaption");
    const title = document.createElement("h2");
    title.textContent = photo.title;
    const category = document.createElement("p");
    category.classList.add("photo-category");
    category.textContent = photo.category;

    // Assemble the pieces and return the card; it is not on the page yet.
    caption.append(title, category);
    card.append(openButton, caption);
    return card;
}

// Turn every photo in "items" into a card and put the cards on the page.
function showPhotoCardsInGallery(items) {
    // "items" is the filtered array passed by refreshGalleryForSelectedCategory.
    const cards = [];
    for (let i = 0; i < items.length; i++) {
        // One photo object becomes one <figure> element.
        cards.push(createPhotoCardElement(items[i]));
    }
    // This is where the cards actually appear in the #gallery HTML container.
    elements.gallery.replaceChildren(...cards);
}




