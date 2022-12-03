const refs = {
    filmCard: document.querySelector('.modal'),
    filmsContainer: document.querySelector('.films__list'),
    cardTitle : document.querySelector('[data-card-title]'),
    cardAvarageVotes : document.querySelector('[data-card-avarage-votes]'),
    cardTotalVotes : document.querySelector('[data-card-total-votes]'),
    cardPopularity: document.querySelector('[data-card-popularity]'),
    cardOriginalTitle : document.querySelector('[data-card-original-title]'),
    cardGenres : document.querySelector('[data-card-genre]'),
    cardOverview : document.querySelector('[data-card-overview]'),
    cardImage : document.querySelector('[data-card-image]'),
    cardModal : document.querySelector('[data-card-modal]')
};

export function renderFilmCard(e) {
    const dataset = e.target.closest('li').dataset;
    const filmObject = {
        ...dataset
    };
    const { genres, originalTitle, overview, posterPath, title, voteAverage, voteCount, populatiry} = filmObject;
    const arrOfGenres = genres.split(',');
    const fixedGenres = arrOfGenres.length > 3 ? arrOfGenres[0] + ', ' + arrOfGenres[1] + ' and others' : arrOfGenres.join(', ') || 'No genre';
    refs.cardTitle.innerHTML = title;
    refs.cardAvarageVotes.innerHTML = Number.parseFloat(voteAverage).toFixed(1);
    refs.cardTotalVotes.innerHTML = voteCount;
    refs.cardPopularity.innerHTML = Number.parseFloat(populatiry).toFixed(1);
    refs.cardOriginalTitle.innerHTML = originalTitle;
    refs.cardGenres.innerHTML = fixedGenres;
    refs.cardOverview.innerHTML = overview;
    refs.cardImage.src = posterPath;

    console.log(filmObject);
    
    for(let key in filmObject) {
        refs.cardModal.dataset[key] = filmObject[key];
    }
}

