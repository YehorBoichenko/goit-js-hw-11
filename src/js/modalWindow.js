import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const openModal = galleryitems => {
  const modalWindow = new simpleLightbox(galleryitems, {
    captionsData: 'alt',
    animationSpeed: 300,
    fadespeed: 250,
    scrollZoom: false,
    captionDelay: 500,
  });
  return modalWindow;
};
export default openModal;
