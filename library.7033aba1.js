const e=document.querySelector(".nav__logo-title");window.onresize=function(){window.matchMedia("(max-width: 767px)").matches?e.classList.add("visually-hidden"):e.classList.remove("visually-hidden")};const t=document.querySelector(".js-watched"),o=document.querySelector(".js-queue");t.addEventListener("click",(function(){t.classList.toggle("header__button--active"),o.classList.remove("header__button--active")})),o.addEventListener("click",(function(){t.classList.remove("header__button--active"),o.classList.toggle("header__button--active")}));const c={closeModalBtn:document.querySelector(".modal__btn-close"),filmCard:document.querySelector(".films__list"),backdropEl:document.querySelector(".backdrop")};function n(e){c.backdropEl.classList.add("is-hidden"),document.removeEventListener("keydown",d),document.body.style.overflow=""}function d(e){"Escape"===e.code&&(n(),console.log(e.code))}function s(e){e.target===c.backdropEl&&(n(),console.log(e.target))}c.filmCard.addEventListener("click",(function(e){if(!e.target.closest(".films__list"))return;c.backdropEl.classList.remove("is-hidden"),document.addEventListener("keydown",d),document.addEventListener("click",s),document.body.style.overflow="hidden"})),c.closeModalBtn.addEventListener("click",n);
//# sourceMappingURL=library.7033aba1.js.map
