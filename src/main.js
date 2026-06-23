import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");

const API_KEY = "56419387-b9216e8761a1aa448b5b4bea2";

let lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = e.currentTarget.elements.searchQuery.value.trim();

  if (query === "") {
    iziToast.warning({
      message: "Please enter a search query!",
      position: "topRight",
    });
    return;
  }

  gallery.innerHTML = "";
  loader.style.display = "block";

  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            "Sorry, there are no images matching your search query. Please try again!",
          position: "topRight",
          backgroundColor: "#ef4040",
          messageColor: "#fff",
        });
        return;
      }

      renderGallery(data.hits);

      lightbox.refresh();
    })
    .catch((error) => {
      iziToast.error({
        title: "Error",
        message:
          "Something went wrong while fetching data. Please try again later.",
        position: "topRight",
      });
      console.error("Fetch error:", error);
    })
    .finally(() => {
      loader.style.display = "none";
      form.reset();
    });
});

function renderGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes</b><span>${likes}</span></p>
        <p class="info-item"><b>Views</b><span>${views}</span></p>
        <p class="info-item"><b>Comments</b><span>${comments}</span></p>
        <p class="info-item"><b>Downloads</b><span>${downloads}</span></p>
      </div>
    </li>
  `,
    )
    .join("");

  gallery.innerHTML = markup;
}
