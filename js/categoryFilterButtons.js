import { elements } from "./pageElements.js";
import { state } from "./galleryState.js";
import { refreshGalleryForSelectedCategory } from "./photoGallery.js";

// Give "active" only to the button whose category matches state.selectedCategory.
export function highlightSelectedCategoryButton() {
    const buttons = elements.filters.querySelectorAll("button");

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        button.classList.toggle("active", button.dataset.category === state.selectedCategory);
    }
}

// A click changes the selected category, then updates the highlight and cards.
function connectCategoryFilterButtonClick(button, category) {
    button.addEventListener("click", () => {
        state.selectedCategory = category;
        highlightSelectedCategoryButton();
        refreshGalleryForSelectedCategory();
    });
}

// Create one button in memory. "category" is the filter value; "name" is its text.
function createCategoryFilterButton(category, name) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = name;
    button.dataset.category = category;

    connectCategoryFilterButtonClick(button, category);

    return button;
}

// Build the filter row from state.allCategories and put it into index.html.
export function refreshCategoryFilterButtonsFromState() {
    const buttons = [];

    // "All" is always available, even though it is not a database category.
    buttons.push(createCategoryFilterButton("all", "All"));

    // Each row from the categories table becomes one button.
    for (let i = 0; i < state.allCategories.length; i++) {
        const category = state.allCategories[i];
        buttons.push(createCategoryFilterButton(category.category, category.name));
    }

    // Replace old buttons, then highlight the currently selected one.
    elements.filters.replaceChildren(...buttons);
    highlightSelectedCategoryButton();
}
