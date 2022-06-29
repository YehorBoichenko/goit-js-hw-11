const refs = () => ({
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('[data-gallery]'),
  searchButton: document.querySelector('.search-btn'),
  loadMore: document.querySelector('.load-more'),
  header: document.querySelector('.header'),
  main: document.querySelector('main'),
  modal: null,
});

export default refs;
