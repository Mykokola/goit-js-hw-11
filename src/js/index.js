import { fetchGallary } from './fetchGallary';
import {
  drawGallary,
  gallaryEl,
  btnLoadMoreEl,
  submitPhoto,
} from './drawGallaryRow';
let cauntPage = 0;

btnLoadMoreEl.style.opacity = 0;
btnLoadMoreEl.addEventListener('click', e => {
  e.preventDefault();
  cauntPage += 1;
  fetchGallary(cauntPage).then(gallary => drawGallary(gallary, e));
});

submitPhoto.addEventListener('click', e => {
  if (gallaryEl.children.length) {
    btnLoadMoreEl.style.opacity = 0;
    gallaryEl.innerHTML = '';
  }
  cauntPage = 1;
  e.preventDefault();
  fetchGallary(cauntPage)
    .then(gallary => drawGallary(gallary, e))
    .catch(error => {
      console.log(error);
    });
});
