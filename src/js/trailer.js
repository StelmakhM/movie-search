import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { MovieApi } from './movieApi';

const movieApi = new MovieApi();

export async function launchTrailer(e) {
  try {
    const id = e.target.closest('#film-modal').dataset.id;
    const key = await movieApi.fetchMovieTrailerById(id);
    const lightBox = basicLightbox.create(`
  <iframe width="680" height="415" src="https://www.youtube.com/embed/${key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
    lightBox.show();
  } catch (error) {
    console.log(error);
  }
}
