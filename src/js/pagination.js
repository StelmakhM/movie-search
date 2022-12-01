import Pagination from 'tui-pagination';
import { createGenreFromId, createMarkUp, movieApi, addGenresToSessionStorage } from "./films";
import { playSpinner, stopSpinner } from './spinner';
const refs = {
    paginationContainer: document.querySelector('#tui-pagination-container'),
    filmsContainer: document.querySelector('.films__list'),
};

export function createPagination(totalPages) {
    const paginationOptions = {
        totalItems: totalPages,
        itemsPerPage: 20,
        visiblePages: 5,
        page: 1,
        centerAlign: true,
        usageStatistics: false,
    };

    const pagination = new Pagination(refs.paginationContainer, paginationOptions);
    pagination.on('afterMove', paginationHandler);
}

async function paginationHandler(event) {
    try {
        if (!movieApi.query) {
            playSpinner();
            const { data: { results } } = await movieApi.fetchTrendingMovies(event.page);
            const genresList = await addGenresToSessionStorage();
            createGenreFromId(results, genresList);
            refs.filmsContainer.innerHTML = createMarkUp(results);
            stopSpinner();
            window.scrollTo(0, 0);
            return;
        }
        playSpinner();
        const { data: { results } } = await movieApi.fetchMoviesbyName(event.page);
        const genresList = await addGenresToSessionStorage();
        createGenreFromId(results, genresList);
        refs.filmsContainer.innerHTML = createMarkUp(results);
        stopSpinner();
        window.scrollTo(0, 0);
    } catch (error) {
        console.log(error);
    }
}