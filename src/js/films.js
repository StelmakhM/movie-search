import { MovieApi } from './movieApi';

const refs = {
    filmsContainer: document.querySelector('.films__list'),
};

const movieApi = new MovieApi();

window.addEventListener('load', onWindowLoad);

async function onWindowLoad() {
    try {
        const { data: { results: films } } = await movieApi.fetchTrendingMovies();
        const { data: { genres } } = await movieApi.fetchMoviesGenres();
        films.forEach(film => {
            film.genres = [];
            genres.forEach(genre => {
                if (film.genre_ids.includes(genre.id)) {
                    film.genres.push(genre.name);
                }
            });
        });
        refs.filmsContainer.innerHTML = createMarkUp(films);
    } catch (error) {
        console.log(error);
    }
}


function createMarkUp(array) {
    return markUp = array.map(({ title, release_date, poster_path, genres }) => {
        const releaseDate = new Date(release_date).getFullYear();
        return ` <li class='films__item'>
                    <img class='films__poster' src='${movieApi.imgUrl}${movieApi.imgSize}${poster_path}' alt='${title} poster' />
                    <div class='films__info'>
                    <h2 class='films__title'>${title}</h2>
                    <p class='films__genres'>${(genres.length > 3) ? genres[0] + ", " + genres[1] + ", " + ' and others' : genres.join(', ')} | ${releaseDate}</p>
                    </div>
                </li>`;
    }).join('');
}