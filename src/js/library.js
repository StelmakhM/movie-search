import { MovieApi } from './movieApi';

const refs = {
	filmsContainer: document.querySelector('.films__list'),
	buttonWatched: document.querySelector('.header__button.js-watched'),
	buttonQueued: document.querySelector('.header__button.js-queue'),
};

window.addEventListener('load', onWindowLoad);
refs.buttonWatched.addEventListener('click', loadWatched);
refs.buttonQueued.addEventListener('click', loadQueued);
const movieApi = new MovieApi();

async function onWindowLoad() {
	try {
		await loadWatched();
	} catch (error) {
		console.log(error);
	}
}

async function loadQueued() {
	try {
		let itemQueue = JSON.parse(localStorage.getItem('queued')) ?? [];
        let items = [];

        for(let filmId of itemQueue){
            console.log(filmId);
            const { data } = await movieApi.fetchFilmById(filmId);
            items.push(data);
        }
		refs.filmsContainer.innerHTML = createMarkUp(items);
	} catch (error) {
		console.log(error);
	}
}

async function loadWatched() {
	try {
		let itemWatched = JSON.parse(localStorage.getItem('watched')) ?? [];
        let items = [];

        for(let filmId of itemWatched){
            const { data } = await movieApi.fetchFilmById(filmId);
            items.push(data);
        }
		refs.filmsContainer.innerHTML = createMarkUp(items);
	} catch (error) {
		console.log(error);
	}
}


function createMarkUp(filmsArray) {
	return filmsArray.map(({ title, release_date, poster_path, genres, id, vote_average, vote_count, original_title, overview, popularity
	}) => {
		const releaseDate = new Date(release_date).getFullYear();
		const placeholderUrl = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
		const posterPath = poster_path ? `${movieApi.imgUrl}${movieApi.imgSize}${poster_path}` : placeholderUrl;
        
        let genresNames = [];
        for(let genre in genres) {
            genresNames.push(genres[genre].name);
        }
		return ` <li class='films__item' style="min-height:100px" data-id='${id}' data-title='${title}' data-release-date='${releaseDate}' data-poster-path='${posterPath}' data-genres='${genres}' data-vote-average='${vote_average}' data-vote-count='${vote_count}' data-original-title='${original_title}' data-overview='${overview}' data-populatiry='${popularity}'>
                    <a class='films__link'>
                    <img class='films__poster' src='${posterPath}' alt='${title} poster' />
                    <div class='films__info'>
                    <h2 class='films__title'>${title}</h2>
                    <p class='films__genres'>${genresNames.length > 3 ? genresNames[0] + ', ' + genresNames[1] + ' and others' : genresNames.join(', ') || 'No genre'} | ${releaseDate || 'Unknown release date'}</p>
                    </div></a>
                </li>`;
	}).join('');
}