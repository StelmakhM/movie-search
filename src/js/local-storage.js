const btnEl = document.querySelector('.btn-add-watched');
const btnQueued = document.querySelector('.btn-add-queue');

btnQueued.addEventListener('click', onBtnQueuedClick)
btnEl.addEventListener('click', onBtnClick)

function onBtnClick() {
    try { 
        const modal = document.querySelector('.modal');
        const id = modal.dataset.id
        let items = JSON.parse(localStorage.getItem('watched')) ?? [];
    
        if(!items.includes(id)) {
            items.push(id);
            localStorage.setItem('watched', JSON.stringify(items));
        }
    } catch(error) {
        console.log(error);
    }
   
}

function onBtnQueuedClick() {
    try { 
        const modal = document.querySelector('.modal');
        const id = modal.dataset.id
        let items = JSON.parse(localStorage.getItem('queued')) ?? [];
    
        if(!items.includes(id)) {
            items.push(id);
            localStorage.setItem('queued', JSON.stringify(items));
        }
    } catch(error) {
        console.log(error);
    }
 
}
