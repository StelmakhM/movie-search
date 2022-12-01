import { createGenreFromId, createMarkUp, movieApi, refs, addGenresToSessionStorage, isSearchActive } from "./films";
import { playSpinner, stopSpinner } from "./spinner";

export function registerIntersectionObserver(target) {
    const options = {
        root: null,
        rootMargin: "0px 0px 700px 0px",
        threshold: 0
    };

    const io = new IntersectionObserver(loadMoreMovies, options);

    io.observe(target);

    function loadMoreMovies(entries) {
        entries.forEach(async entry => {
            if (entry.isIntersecting && movieApi.query) {
                try {
                    loadMoreSearchMovies();
                } catch (error) {
                    console.log(error);
                }
            }
            if (entry.isIntersecting && !movieApi.query) {
                try {
                    loadMoreTrendMovies();
                } catch (error) {
                    console.log(error);
                }
            }
        });
    }

    async function loadMoreSearchMovies() {
        playSpinner();
        movieApi.incrementPage();
        const { data: { results } } = await movieApi.fetchIoMoviesbyName();
        const genresList = await addGenresToSessionStorage();
        createGenreFromId(results, genresList);
        refs.filmsContainer.insertAdjacentHTML('beforeend', createMarkUp(results));
        stopSpinner();
    }

    async function loadMoreTrendMovies() {
        playSpinner();
        movieApi.incrementPage();
        const { data: { results } } = await movieApi.fetchIoTrendingMovies();
        const genresList = await addGenresToSessionStorage();
        createGenreFromId(results, genresList);
        refs.filmsContainer.insertAdjacentHTML('beforeend', createMarkUp(results));
        stopSpinner();
    }
}