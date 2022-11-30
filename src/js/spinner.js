window.onload = function () {
  const preloader = document.querySelector('.spinner');
  setTimeout(function () {
    preloader.classList.add('visually-hidden');
  }, 2000);
};
