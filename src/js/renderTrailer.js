import { trailerKey } from './trailer-api';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

const filmTrailer = () => {
  const onBtnStartTrailer = document.querySelector('.trailer__btn');

  onBtnStartTrailer.addEventListener('click', function (e) {
    console.log(helo);
    trailerLaunch(e.target.dataset.id);
  });
};

function trailerLaunch(id) {
  trailerKey(id)
    .then(data => {
      const key = data.results[0].key;
      const lightBox = basicLightbox.create(`
  <iframe width="680" height="415" src="https://www.youtube.com/embed/${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
      lightBox.show();
    })
    .catch(error => {
      console.log(error);
    });
}
