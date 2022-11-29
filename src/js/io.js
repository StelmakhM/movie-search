import {createGenreFromId, createMarkUp, movieApi, refs} from "./films";


export function registerIntersectionObserver (target) {
const options = {
        root: null,
        rootMargin: '700px',
        threshold: 0
    }
    
const io = new IntersectionObserver(loadMoreMovies,options);
io.observe(target)

function loadMoreMovies(entries) {
    entries.forEach( async entry => {
        if(entry.isIntersecting && movieApi.query !== null) {
            try {
            movieApi.incrementPage();
            const {data: {results}} = await movieApi.fetchMoviesbyName();
            const { data: { genres } } = await movieApi.fetchMoviesGenres();
            createGenreFromId(results, genres);
            refs.filmsContainer.insertAdjacentHTML('beforeend', createMarkUp(results))
            } catch (error) {
                console.log(error);
            }
        }
    })
}
}