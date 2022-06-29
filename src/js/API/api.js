import axios from 'axios';

class pixabayAPI {
  #query;
  #page;
  #perPage;
  #totalHits;
  #totalPages;
  #currentlyLoaded;

  constructor() {
    this.#query = '';
    this.#page = 1;
    this.#perPage = 40;
    this.#totalHits = 0;
    this.#totalPages = 1;
    this.#currentlyLoaded = 0;
  }

  async getImages() {
    const KEY = '28342095-bdb3373d4270e11a929e663ef';

    const axiosOptions = {
      baseURL: 'https://pixabay.com/api/',
      params: {
        key: `${KEY}`,
        q: `${this.#query}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',

        page: this.page,
        per_page: this.perPage,
      },
    };
    const { data } = await axios(axiosOptions);
    return data;
  }

  get query() {
    return this.#query;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }

  get page() {
    return this.#page;
  }

  set page(newPage) {
    this.#page = newPage;
  }

  get perPage() {
    return this.#perPage;
  }

  set perPage(newPerPage) {
    this.#perPage = newPerPage;
  }

  get totalHits() {
    return this.#totalHits;
  }

  set totalHits(newHits) {
    this.#totalHits = newHits;
  }

  get totalPages() {
    return this.#totalPages;
  }

  set totalPages(newTotal) {
    this.#totalPages = newTotal;
  }

  get currentlyLoaded() {
    return this.#currentlyLoaded;
  }

  set currentlyLoaded(newCurrently) {
    this.#currentlyLoaded = newCurrently;
  }
}
export default pixabayAPI;
