export {fetchGallary}
const API_KEY_PIXABAY = '36188877-ae51794140c6baf89581d8279',
searchPhotoInput = document.querySelector('[name=searchQuery]');

async function fetchGallary(cauntPage) {
    const response = await fetch(
      `https://pixabay.com/api/?key=${API_KEY_PIXABAY}&q=${fixSearchPhoto(
        searchPhotoInput.value
      )}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${cauntPage}`
    );
    const gallary = await response.json();
    return gallary;
  }
    function fixSearchPhoto(photoValue) {
    if (photoValue.trim()) {
      return photoValue;
    }
  }