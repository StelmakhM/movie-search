// ----------------visually hidden для ЛОГО-----------------

const logoEl = document.querySelector('.nav__logo-title');

window.onresize = function () {
  if (window.matchMedia('(max-width: 767px)').matches) {
    logoEl.classList.add('visually-hidden');
  } else {
    logoEl.classList.remove('visually-hidden');
  }
};

// ----------------Переключение между кнопками-----------------

const headerWatchedButtonEl = document.querySelector('.js-watched');
const headerQueueButtonEl = document.querySelector('.js-queue');

headerWatchedButtonEl.addEventListener('click', onWatched);
headerQueueButtonEl.addEventListener('click', onQueue);

function onWatched() {
  headerWatchedButtonEl.classList.toggle('header__button--active');
  headerQueueButtonEl.classList.remove('header__button--active');
}

function onQueue() {
  headerWatchedButtonEl.classList.remove('header__button--active');
  headerQueueButtonEl.classList.toggle('header__button--active');
}

// ----------------          -----------------
