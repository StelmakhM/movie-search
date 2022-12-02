import filmCardMarkup from '../templates/modalMarkup.hbs';

BASE_URL = 'https://api.themoviedb.org/3/';
API_KEY = '9644f0ea42d355116080d8c56f2a2e95';
// iconURL = './img/symbol-defs.svg';

const refs = {
  filmCard: document.querySelector('.modal'),
};

function fetchFilm() {
  return fetch(`${BASE_URL}movie/335?api_key=${API_KEY}`).then(responce => {
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
