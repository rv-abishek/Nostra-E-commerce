import { products } from "./products.js";

const offerBar = document.querySelector(".offer-bar");
const sideNavMenu = document.querySelector(".navbar-menu-toggle");
const sidenavbar = document.querySelector(".side-navbar");
const container = document.querySelector(".products");
const searchInput = document.querySelector(".navbar-search input");

document.getElementById("offer-close").addEventListener("click", () => {
    offerBar.style.display = "none";
});

sideNavMenu.addEventListener("click", () => {
    sidenavbar.style.marginLeft = "0px";
});

document.getElementById("side-navbar-close").addEventListener("click", () => {
    sidenavbar.style.marginLeft = "-60%";
});

// Dynamically add products to the container
products.forEach((product) => {
    const createItem = document.createElement("div");
    createItem.classList.add("product");
    createItem.setAttribute("data-tags", product.tags);
    createItem.innerHTML = `
        <img style="width: 20vw;" src="img/${product.src}" alt="${product.name}">
        <h1>${product.name}</h1>
        <p>₹${product.price}</p>`;
    container.append(createItem);
});

let filterList = [];

// Filter products based on selected tags
const tags = Array.from(document.getElementsByName("tags"));
tags.forEach((tag) => {
    tag.addEventListener("change", (e) => {
        if (e.target.checked) {
            filterList.push(e.target.value);
        } else {
            filterList = filterList.filter((item) => item !== e.target.value);
        }
        updateFilter();
    });
});

// Update displayed products based on filter
function updateFilter() {
    const productList = document.querySelectorAll(".product");
    productList.forEach((product) => {
        const productTags = product.getAttribute("data-tags").split(",");
        const hasMatch = filterList.some((tag) => productTags.includes(tag));
        product.style.display = filterList.length === 0 || hasMatch ? "block" : "none";
    });
}

// Search products by name
searchInput.addEventListener("keyup", function () {
    const searchQuery = searchInput.value.toLowerCase();
    const productList = document.querySelectorAll(".product");
    productList.forEach((product) => {
        const productName = product.querySelector("h1").textContent.toLowerCase();
        product.style.display = productName.includes(searchQuery) ? "block" : "none";
    });
});
