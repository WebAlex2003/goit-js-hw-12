import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

let lightbox;
let currentPage = 1;
let searchQuery = '';
const perPage = 15;

export async function fetchImages(query) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '44082104-13032bddabedf7f071f678933',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: perPage,
      },
    });
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');

  if (images.length === 0) {
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }

  const markup = images
    .map(
      ({
        webformatURL = '',
        largeImageURL = '',
        tags = '',
        likes = 0,
        views = 0,
        comments = 0,
        downloads = 0,
      }) => `
    <a class="gallery__item" href="${largeImageURL}" data-caption="${tags}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${likes}</p>
        <p class="info-item"><b>Views:</b> ${views}</p>
        <p class="info-item"><b>Comments:</b> ${comments}</p>
        <p class="info-item"><b>Downloads:</b> ${downloads}</p>
      </div>
    </a>
  `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }
}

export async function loadMoreImages() {
  currentPage += 1;
  const newImages = await fetchImages(searchQuery);
  renderImages(newImages);
}

export function showLoadingIndicator() {
  document.querySelector('.loader').classList.remove('hidden');
}

export function hideLoadingIndicator() {
  document.querySelector('.loader').classList.add('hidden');
}

export async function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector('.search-form input');
  searchQuery = input.value.trim();
  if (!searchQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
    });
    return;
  }
  currentPage = 1;
  document.querySelector('.gallery').innerHTML = ''; // Очистка галереи при новом запросе
  showLoadingIndicator();
  const images = await fetchImages(searchQuery);
  hideLoadingIndicator();
  renderImages(images);
}

document.querySelector('.search-form').addEventListener('submit', handleSubmit);
document
  .querySelector('.load-more-btn')
  .addEventListener('click', loadMoreImages);
