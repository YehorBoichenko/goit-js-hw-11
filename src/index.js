import './sass/main.scss';
import axios from 'axios';
import { Notify } from 'notiflix';
import { Loading } from 'notiflix';

import debounce from 'lodash.debounce';
import pixabayAPI from './js/API/api';
import userInterface from './js/interface';
import refs from './js/references';
import openModal from './js/modalWindow';
import smoothScroll from './js/scroll';

const ref = refs();
console.log(ref.searchForm);
ref.modal = openModal('.gallery a');

const DEBOUNCE_DELAY = 300;
const DEBOUNCE_SETTINGS = { leading: true, trailing: false };
const notification = {
  timeout: 3000,
};

const imagesAPI = new pixabayAPI();
const notificationStatus = imageCount => {
  if (imageCount < 1) {
    Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`,
      notification
    );
    return 1;
  }
  if (imagesAPI.totalHits > 0 && imagesAPI.page === 1) {
    Notify.success(
      `Hooray! We found ${imagesAPI.totalHits} images.`,
      notification
    );
    return 0;
  }
};

const renderImages = async () => {
  try {
    const { hits, totalHits } = await imagesAPI.getImages();
    imagesAPI.totalHits = totalHits;
    imagesAPI.totalPages = Math.ceil(imagesAPI.totalHits / imagesAPI.perPage);
    imagesAPI.currentlyLoaded = imagesAPI.perPage * imagesAPI.page;

    if (notificationStatus(hits.length)) {
      return;
    }
    await userInterface.renderGallary(hits);
    smoothScroll(imagesAPI.page);
    ref.modal.refresh();

    if (imagesAPI.totalHits > imagesAPI.currentlyLoaded) {
      const completeImg = [...document.images]
        .filter(img => !img.complete)
        .map(
          img => new Promise(response => (img.onload = img.onerror = response))
        );
      await Promise.all(completeImg);
      userInterface.show(ref.loadMore);
    }
    if (imagesAPI.totalHits <= imagesAPI.currentlyLoaded) {
      return showEndResults();
    }
    imagesAPI.page += 1;
  } catch (error) {
    console.error(error);
  }
};

const showEndResults = () => {
  Notify.info(
    `We're sorry, but you've reached the end of search results.`,
    notification
  );
};

const submitGetIMG = async event => {
  event.preventDefault();
  console.log(ref.searchButton);
  userInterface.disable(ref.searchButton);

  setTimeout(() => userInterface.enable(ref.searchButton), 800);
  userInterface.hide(ref.loadMore);
  userInterface.clear();

  imagesAPI.query = event.target.elements.searchQuery.value.trim();
  imagesAPI.page = 1;
  if (imagesAPI.query === '') {
    return Notify.info(`Please fill in the search field`);
  }

  await renderImages();
};

const onImgClick = async event => {
  event.preventDefault();
};

const loadMore = async event => {
  userInterface.hide(ref.loadMore);
  await renderImages();
};
ref.searchForm.addEventListener(
  'submit',
  debounce(submitGetIMG, DEBOUNCE_DELAY, DEBOUNCE_SETTINGS)
);
ref.loadMore.addEventListener(
  'click',
  debounce(loadMore, DEBOUNCE_DELAY, DEBOUNCE_SETTINGS)
);
ref.gallery.addEventListener('click', onImgClick);
