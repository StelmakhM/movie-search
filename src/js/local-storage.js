const btnEl = document.querySelector('.btn-add-watched');
const btnQueued = document.querySelector('.btn-add-queue');

btnQueued.addEventListener('click', onBtnQueuedClick)
btnEl.addEventListener('click', onBtnClick)

function onBtnClick() {
  try { 
     let items = JSON.parse(localStorage.getItem('watched')) ?? [];
    console.log(items);
    const title = document.querySelector('.card__film-title');
    const titleSet = title.textContent;
   
    let found = items.find(element => element.title === titleSet);

    if(!found) {
        const genre = document.querySelector('.card__genre');
        const genreSet = genre.textContent;

        const poster_path = document.querySelector('.card__img-wrapper img');
        const poster_pathSet = poster_path.src;
        
        const watched = {
            genres: genreSet,
            title: titleSet,
            poster_path: poster_pathSet
        };
        items.push(watched)
    
        localStorage.setItem('watched', JSON.stringify(items))
    }} catch(error) {
        console.log(error);
    }
   
}

function onBtnQueuedClick() {
  
  try {  
    let itemQueue = JSON.parse(localStorage.getItem('queued')) ?? [];
    const title = document.querySelector('.card__film-title');
    const titleSet = title.textContent;
   
    let found = itemQueue.find(element => element.title === titleSet);

    if(!found) {
        const genre = document.querySelector('.card__genre');
        const genreSet = genre.textContent;

        const poster_path = document.querySelector('.card__img-wrapper img');
        const poster_pathSet = poster_path.src;
        
        const queued = {
            genres: genreSet,
            title: titleSet,
            poster_path: poster_pathSet
        };
        itemQueue.push(queued)
    
        localStorage.setItem('queued', JSON.stringify(itemQueue))
    }} catch(error) {
        console.log(error);
    }
 
}