import refs from './references';
const ref = refs();

const smoothScroll = currentpage => {
  if (currentpage === 1) {
    return window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};
export default smoothScroll;
