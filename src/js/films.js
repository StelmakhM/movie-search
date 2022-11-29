import { MovieApi } from './movieApi';

const refs = {
    filmsContainer: document.querySelector('.films__list'),
};

const movieApi = new MovieApi();

window.addEventListener('load', onWindowLoad);

async function onWindowLoad() {
    try {
        const { data: { results: trendFilms } } = await movieApi.fetchTrendingMovies();
        const { data: { genres } } = await movieApi.fetchMoviesGenres();
        const queryFilms = await movieApi.fetchQueryMovies();
        console.log('queryFilms :>> ', queryFilms);
        trendFilms.forEach(film => {
            film.genres = [];
            genres.forEach(genre => {
                if (film.genre_ids.includes(genre.id)) {
                    film.genres.push(genre.name);
                }
            });
        });
        refs.filmsContainer.innerHTML = createMarkUp(trendFilms);
    } catch (error) {
        console.log(error);
    }
}


function createMarkUp(array) {
    return markUp = array.map(({ title, release_date, poster_path, genres }) => {
        const releaseDate = new Date(release_date).getFullYear();
        return ` <li class='films__item'>
                    <a class='films__link'>
                    <img class='films__poster' src='${movieApi.imgUrl}${movieApi.imgSize}${poster_path}' alt='${title} poster' />
                    <div class='films__info'>
                    <h2 class='films__title'>${title}</h2>
                    <p class='films__genres'>${(genres.length > 3) ? genres[0] + ", " + genres[1] + ", " + ' and others' : genres.join(', ')} | ${releaseDate}</p>
                    </div></a>
                </li>`;
    }).join('');
}