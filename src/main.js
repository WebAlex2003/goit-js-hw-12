import pixabayApi from './js/pixabay-api.js';
import {
  renderImages,
  loadStart,
  loadFinish,
  displayLoadMore,
  hideLoadMore,
  displayNoMoreForLoad,
  scroll,
} from './js/render-function.js';

const search_form = document.querySelector('#search-form');
const load_more_form = document.querySelector('#load_more_form');
const per_page = 15;

let page = 1;
let search_value = '';

const get_new_images = (new_request = true) => {
  hideLoadMore();
  loadStart();

  pixabayApi(search_value, page, per_page).then(response => {
    const displayed_count = page * per_page;
    const data = response.data;

    loadFinish();
    renderImages(data, new_request);

    if (data.hits.length > 0 && data.totalHits > 0) {
      if (displayed_count < data.totalHits) {
        displayLoadMore();
      } else {
        displayNoMoreForLoad();
      }

      if (new_request) {
        search_form.text.value = '';
      }
    }

    if (!new_request) scroll();
  });
};

const search_action = event => {
  event.preventDefault();

  if (event.target.text.value.trim().length > 0) {
    page = 1;
    search_value = event.target.text.value.trim();
    get_new_images();
  }
};

const load_more_action = event => {
  page++;
  event.preventDefault();
  get_new_images(false);
};

search_form.addEventListener('submit', search_action);
load_more_form.addEventListener('submit', load_more_action);
