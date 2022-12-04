import { addToLocalStorage, getFromLocalStorage } from './storage';
import { Notify } from 'notiflix';
export {watchedArr,queueArr};

const refs = {
  addToWatchedBtn: document.querySelector('.btn-add-watched'),
  addToQueueBtn: document.querySelector('.btn-add-queue'),
};


const WATCHED_KEY = 'watchedList';
const QUEUE_KEY = 'queueList';

const watchedArr = getFromLocalStorage(WATCHED_KEY) || [];
const queueArr = getFromLocalStorage(QUEUE_KEY) || [];


refs.addToWatchedBtn.addEventListener('click', onWatchedClick);
refs.addToQueueBtn.addEventListener('click', onQueueClick);

function onWatchedClick(e) {
  const filmObj = {...e.target.closest('#film-modal').dataset};

if(!watchedArr.length) {
    watchedArr.push(filmObj)
    addToLocalStorage(WATCHED_KEY, watchedArr)
    Notify.success('The movie has been successfully added to your watch list');
    return
}
console.log(filmObj.id);
const exist = watchedArr.some(film => film.id === filmObj.id);

if(!exist) {
    watchedArr.push(filmObj);
    addToLocalStorage(WATCHED_KEY, watchedArr)
    Notify.success('The movie has been successfully added to your watch list');
}

if(exist) {
    Notify.info('This movie is already in your watch list');
}
}

function onQueueClick (e) {
    const filmObj = {...e.target.closest('#film-modal').dataset};

    if(!queueArr.length) {
        queueArr.push(filmObj)
        addToLocalStorage(QUEUE_KEY, queueArr)
        Notify.success('The movie has been successfully added to your queue list');
        return
    }
    console.log(filmObj.id);
    const exist = queueArr.some(film => film.id === filmObj.id);
    
    if(!exist) {
        queueArr.push(filmObj);
        addToLocalStorage(QUEUE_KEY, queueArr)
        Notify.success('The movie has been successfully added to your queue list');
    }
    
    if(exist) {
        Notify.info('This movie is already in your queue list');
    }
}




