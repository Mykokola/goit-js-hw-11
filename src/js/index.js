import { fetchGallary } from './fetchGallary';
import {
  drawGallary,
  gallaryEl,
  btnLoadMoreEl,
  submitPhoto,
} from './drawGallaryRow';
import Notiflix from 'notiflix';
let totalGallaryItem = 0;
let cauntPage = 0;
btnLoadMoreEl.style.opacity = 0;
submitPhoto.addEventListener('click', e => {
  if (gallaryEl.children.length) {
    btnLoadMoreEl.style.opacity = 0;
    gallaryEl.innerHTML = '';
  }
  
  cauntPage = 1;
  e.preventDefault();
  fetchGallary(cauntPage)
    .then(gallary =>{
       const massLengthCheck = !gallary.hits.length;
       if (massLengthCheck) {
        btnLoadMoreEl.style.opacity = 0;
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
       drawGallary(gallary)
       totalGallaryItem = gallary.total
        return Notiflix.Notify.success(`Hooray! We found ${gallary.total} images`);
      }}
      )
    .catch(error => {
      console.log(error);
    });
});
btnLoadMoreEl.addEventListener('click', e => {
  e.preventDefault();
  const numPage =Math.ceil(totalGallaryItem / 40)
  if(cauntPage !== numPage){
  cauntPage += 1;
  fetchGallary(cauntPage).then(gallary => drawGallary(gallary, e));
} else{
   Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
  }
});