import { elements } from "./pageElements.js";
import { state } from "./galleryState.js";
import { refreshGalleryForSelectedCategory } from "./photoGallery.js";

// Highlight the button for the currently selected category.
export function markActiveFilterButton() {
    // Check every filter button: All, Nature, City, Animals.
    for (let i = 0; i < elements.filterButtons.length; i++) {
        const button = elements.filterButtons[i];
        // data-category comes from the button in index.html.
        // Add "active" if this is the selected category; remove it otherwise.
        button.classList.toggle("active",button.dataset.category === state.selectedCategory);
    }
}

// When the page starts, tell each filter button what to do when clicked.
export function connectCategoryFilterButtons() {
    // Go through every filter button and attach the same click instructions.
    for (let i = 0; i < elements.filterButtons.length; i++) {
        const button = elements.filterButtons[i];
        // The code inside runs later, only when the user clicks this button.
        button.addEventListener("click", () => {
            // 1. Remember this button's category, such as "nature".
            state.selectedCategory = button.dataset.category;
            // 2. Highlight this button.
            markActiveFilterButton();
            // 3. Show photos from the selected category.
            refreshGalleryForSelectedCategory();
        });
    }
}

