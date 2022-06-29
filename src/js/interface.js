import galleryTemplate from '../Templates/items.hbs';
import refs from './references';

const ref = refs();

const show = element => element.classList.remove('is-hidden');
const hide = element => element.classList.add('is-hidden');
const enable = element => element.removeAttribute('disabled');
const disable = element => element.setAttribute('disabled', true);

const clear = () => (ref.gallery.innerHTML = '');
const render = (element, markup) =>
  element.insertAdjacentHTML('beforeend', markup);
const renderGallary = items => render(ref.gallery, galleryTemplate(items));
export default { renderGallary, clear, enable, disable, hide, show };
