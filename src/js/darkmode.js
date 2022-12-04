const lightEl = document.querySelector('.theme__icon-light');
const darkEl = document.querySelector('.theme__icon-dark');

document.querySelector('.theme').addEventListener('click', event => {
  event.preventDefault();
  if (localStorage.getItem('theme') === 'dark') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', 'dark');
  }
  addDarkClassToHTML();
});

function addDarkClassToHTML() {
  try {
    if (localStorage.getItem('theme') === 'dark') {
      document.querySelector('html').classList.add('darkmode');
      darkEl.classList.add('theme__icon-dark--hide');
      lightEl.classList.remove('theme__icon-light--hide');
    } else {
      document.querySelector('html').classList.remove('darkmode');
      darkEl.classList.remove('theme__icon-dark--hide');
      lightEl.classList.add('theme__icon-light--hide');
    }
  } catch (err) {
    console.log('darkmode error');
  }
}

addDarkClassToHTML();
