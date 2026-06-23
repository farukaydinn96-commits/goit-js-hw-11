import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");

// Pixabay API Anahtarın
const API_KEY = "56419387-b9216e8761a1aa448b5b4bea2";

// SimpleLightbox kurulumu
let lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = e.currentTarget.elements.searchQuery.value.trim();

  // Boş arama yapılmasını engelle
  if (query === "") {
    return;
  }

  // Yeni arama öncesi galeriyi temizle ve loader'ı göster
  gallery.innerHTML = "";
  loader.style.display = "block";

  // Pixabay API URL'si ve parametreleri
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`;

  // Sunucuya istek at (Fetch)
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Eğer sonuç bulunamazsa
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

      // Sonuçlar bulunduysa galeriyi oluştur
      renderGallery(data.hits);

      // Yeni resimler eklendiği için kütüphaneyi yenile
      lightbox.refresh();
    })
    .catch((error) => {
      // Hata yönetimi (sayfanın çökmesini engeller)
      iziToast.error({
        title: "Error",
        message:
          "Something went wrong while fetching data. Please try again later.",
        position: "topRight",
      });
      console.error("Fetch error:", error);
    })
    .finally(() => {
      // İşlem bitince (başarılı veya başarısız) loader'ı gizle ve formu temizle
      loader.style.display = "none";
      form.reset();
    });
});

// Galeriyi ekrana basan yardımcı fonksiyon
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
        <p class="info-item"><b>Likes</b>${likes}</p>
        <p class="info-item"><b>Views</b>${views}</p>
        <p class="info-item"><b>Comments</b>${comments}</p>
        <p class="info-item"><b>Downloads</b>${downloads}</p>
      </div>
    </li>
  `,
    )
    .join("");

  gallery.innerHTML = markup;
}
