import { MovieApi } from './movieApi';
import Notiflix from 'notiflix';

const refs = {
  filmsContainer: document.querySelector('.films__list'),
  form: document.querySelector('#header-form'),
  wrongSesarchEl: document.querySelector('.header__form-message'),
};

const movieApi = new MovieApi();

window.addEventListener('load', onWindowLoad);
refs.form.addEventListener('submit', onFormSubmit);

async function onWindowLoad() {
  try {
    const {
      data: { results, page, total_pages, total_results },
    } = await movieApi.fetchTrendingMovies();
    const {
      data: { genres },
    } = await movieApi.fetchMoviesGenres();
    createGenreFromId(results, genres);
    createMarkUp(results);
  } catch (error) {
    console.log(error);
  }
}

async function onFormSubmit(e) {
  try {
    e.preventDefault();
    movieApi.query = e.currentTarget.elements.movie_title.value;
    if (!movieApi.query) {
      Notiflix.Notify.info(`Please, enter search query`);
      return;
    }
    refs.wrongSesarchEl.classList.add('hidden');
    const {
      data: { results, page, total_pages, total_results },
    } = await movieApi.fetchQueryMovies();
    if (!total_pages) {
      Notiflix.Notify.failure(
        'Sorry, there are no movies matching your search query. Please try again.'
      );
      refs.wrongSesarchEl.classList.remove('hidden');
      return;
    }
    const {
      data: { genres },
    } = await movieApi.fetchMoviesGenres();
    createGenreFromId(results, genres);
    createMarkUp(results);
    e.target.reset();
  } catch (error) {
    console.log(error);
  }
}

function createMarkUp(filmsArray) {
  const markUp = filmsArray
    .map(({ title, release_date, poster_path, genres }) => {
      const releaseDate = new Date(release_date).getFullYear();
      return ` <li class='films__item'>
                    <a class='films__link'>
                    <img class='films__poster' src='${movieApi.imgUrl}${
        movieApi.imgSize
      }${poster_path}' alt='${title} poster' />
                    <div class='films__info'>
                    <h2 class='films__title'>${title}</h2>
                    <p class='films__genres'>${
                      genres.length > 3
                        ? genres[0] + ', ' + genres[1] + ' and others'
                        : genres.join(', ')
                    } | ${releaseDate}</p>
                    </div></a>
                </li>`;
    })
    .join('');

  refs.filmsContainer.innerHTML = markUp;
}

function createGenreFromId(moviesList, genreIds) {
  moviesList.forEach(film => {
    film.genres = [];
    genreIds.forEach(genre => {
      if (film.genre_ids.includes(genre.id)) {
        film.genres.push(genre.name);
      }
    });
  });
}
