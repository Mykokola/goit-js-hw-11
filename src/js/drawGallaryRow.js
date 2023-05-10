import Notiflix from 'notiflix';
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
export { drawGallary, btnLoadMoreEl, submitPhoto, gallaryEl };
const btnLoadMoreEl = document.querySelector('.load-more'),
  submitPhoto = document.querySelector('[type=submit]'),
  gallaryEl = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.gallery a');

function showMasseage(gallaryMass, e, submitEl, loadMoreEl, totalImg) {
  const massLengthCheck = !gallaryMass.length;
  if (massLengthCheck && e.target == submitEl) {
    btnLoadMoreEl.style.opacity = 0;
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else if (massLengthCheck && e.target == loadMoreEl) {
    return Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  } else if (e.target == submitEl) {
    return Notiflix.Notify.success(`Hooray! We found ${totalImg} images`);
  }
}
function slowScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
function drawGallary(gallary, event) {
  btnLoadMoreEl.style.opacity = 1;
  const gallaryMass = gallary.hits;
  showMasseage(gallaryMass, event, submitPhoto, btnLoadMoreEl, gallary.total);
  const gallaryList = gallaryMass.map(e => getGallaryRow(e));
  gallaryEl.insertAdjacentHTML('beforeend', gallaryList.join(''));
  lightbox.refresh();
  slowScroll();
}
function getGallaryRow(photo) {
  const {
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads,
    largeImageURL,
  } = photo;
  return `<div class="photo-card">
  <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
           <div class="info">
             <p class="info-item">
               <b>Likes</b>
               ${likes}
             </p>
             <p class="info-item">
               <b>Views</b>
               ${views}
             </p>
                <p class="info-item">
               <b>Comments </b>
               ${comments}
             </p>
             <p class="info-item">
               <b>Downloads</b>
               ${downloads}
             </p>
           </div>
         </div>`;
}
