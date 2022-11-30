import { MovieApi } from './movieApi';
import Notiflix from 'notiflix';
import { registerIntersectionObserver } from './io';
export { movieApi, refs, createMarkUp, createGenreFromId };
export {addGenresToSessionStorage};
import {addToSessionStorage,getFromSessionStorage,removeFromSessionStorage} from './session-storage'

const refs = {
	filmsContainer: document.querySelector('.films__list'),
	form: document.querySelector('#header-form'),
	wrongSearchEl: document.querySelector('.header__form-message'),
	sentinel: document.querySelector('#sentinel')
};

const movieApi = new MovieApi();
registerIntersectionObserver(refs.sentinel);
window.addEventListener('load', onWindowLoad);
refs.form.addEventListener('submit', onFormSubmit);



async function onWindowLoad() {
	try {
		const genresList = await addGenresToSessionStorage();
		const { data: { results, page, total_pages, total_results } } = await movieApi.fetchTrendingMovies();
		createGenreFromId(results, genresList);
		refs.filmsContainer.innerHTML = createMarkUp(results);
	} catch (error) {
		console.log(error);
	}
}

async function onFormSubmit(e) {
	try {
		e.preventDefault();
		movieApi.query = e.currentTarget.elements.movie_title.value;
		if (!movieApi.query) {
			Notiflix.Notify.warning(`Please, enter search query`);
			return;
		}
		refs.wrongSearchEl.classList.add('hidden');
		const { data: { results, page, total_pages, total_results } } = await movieApi.fetchMoviesbyName();
		if (!total_pages) {
			refs.wrongSearchEl.classList.remove('hidden');
			return;
		}
		const genresList = await addGenresToSessionStorage();
		createGenreFromId(results, genresList);
		refs.filmsContainer.innerHTML = createMarkUp(results);
		e.target.reset();
	} catch (error) {
		console.log(error);
	}

}

function createMarkUp(filmsArray) {
	return filmsArray.map(({ title, release_date, poster_path, genres }) => {
		const releaseDate = new Date(release_date).getFullYear();
		const placeholderUrl = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
		const posterPath = poster_path ? `${movieApi.imgUrl}${movieApi.imgSize}${poster_path}` : placeholderUrl;
		return ` <li class='films__item'>
                    <a class='films__link'>
                    <img class='films__poster' src='${posterPath}' alt='${title} poster' />
                    <div class='films__info'>
                    <h2 class='films__title'>${title}</h2>
                    <p class='films__genres'>${genres.length > 3 ? genres[0] + ', ' + genres[1] + ' and others' : genres.join(', ') || 'No genre'} | ${releaseDate || 'Unknown release date'}</p>
                    </div></a>
                </li>`;
	}).join('');
}

function createGenreFromId(moviesList, genresList) {
	moviesList.forEach(film => {
		film.genres = [];
		genresList.forEach(genre => {
			if (film.genre_ids.includes(genre.id)) {
				film.genres.push(genre.name);
			}
		});
	});
}

async function addGenresToSessionStorage () {
	try {
		if(!getFromSessionStorage('genresList')) {
			const { data: { genres } } = await movieApi.fetchMoviesGenres();
			addToSessionStorage('genresList', genres)
			}
			return getFromSessionStorage('genresList')
	} catch (error) {
		console.log(error);
	}
}

