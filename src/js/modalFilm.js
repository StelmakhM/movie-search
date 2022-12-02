import filmCardMarkup from '../templates/modalMarkup.hbs';
import axios from 'axios';

BASE_URL = 'https://api.themoviedb.org/3/movie/';
API_KEY = 'api_key=9644f0ea42d355116080d8c56f2a2e95';
// iconURL = './img/symbol-defs.svg';

const refs = {
  filmCard: document.querySelector('.modal'),
};

function fetchFilm() {
  return fetch(`${BASE_URL}335?${API_KEY}`).then(responce => {
    return responce.json();
  });
}

fetchFilm()
  .then(renderFilmCard)
  .catch(error => console.log(error));

function renderFilmCard(film) {
  const markup = filmCardMarkup(film);
  refs.filmCard.innerHTML = markup;
}
//////////////////////////////////////// Робота над динамічним ID

// async function getMovie(id) {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}${id}?${API_KEY}&append_to_response=videos`
//     );
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// }
