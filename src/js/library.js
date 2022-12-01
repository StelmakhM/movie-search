

const refs = {
	filmsContainer: document.querySelector('.films__list'),
	buttonWatched: document.querySelector('.header__button.js-watched'),
	buttonQueued: document.querySelector('.header__button.js-queue'),
};

window.addEventListener('load', onWindowLoad);
refs.buttonWatched.addEventListener('click', loadWatched);
refs.buttonQueued.addEventListener('click', loadQueued);

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
		refs.filmsContainer.innerHTML = createMarkUpForLibrary(itemQueue);
	} catch (error) {
		console.log(error);
	}
}

async function loadWatched() {
	try {
		let items = JSON.parse(localStorage.getItem('watched')) ?? [];
		refs.filmsContainer.innerHTML = createMarkUpForLibrary(items);
	} catch (error) {
		console.log(error);
	}
}

function createMarkUpForLibrary(filmsArray) {
	return filmsArray.map(({ title, poster_path, genres }) => {
		//const releaseDate = new Date(release_date).getFullYear();
		const placeholderUrl = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
		const posterPath = poster_path ?? placeholderUrl;
		return ` <li class='films__item'>
                    <a class='films__link'>
                    <img class='films__poster' src='${posterPath}' alt='${title} poster' />
                    <div class='films__info'>
                    <h2 class='films__title'>${title}</h2>
                    <p class='films__genres'>${genres || 'No genre'}</p>
                    </div></a>
                </li>`;
	}).join('');
}


