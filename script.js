const accesskey = "1mgVcsuxdFlo68kl0WDnlzSTcEV47LCsC0lR3u5QAX0";
const formE1 = document.querySelector("form");
const inputE1 = document.querySelector(".search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-btn");

let page = 1;

async function searchImages() {
    const inputData = inputE1.value.trim(); 
    if (inputData === "") {
        alert("Please enter a search term");
        return;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;

        if (page === 1) {
            searchResults.innerHTML = "";
        }

        results.forEach((result) => {
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("search-result");

            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description;

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);
        });

        page++;
        showMore.style.display = "block"; 
    } catch (error) {
        console.error("Error fetching images:", error);
        alert("Failed to fetch images. Please try again later.");
    }
}

formE1.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages();
});
