import imgPath from '../images/sprite.svg#icon-close';
import createImg from '../templates/modalMarkup.hbs';

const someObj = {
  firstName: 'Artem',
};

someObj.imgPath = imgPath;

const imgEl = createImg(someObj);

document.modal.insertAdjacentHTML('afterbegin', imgEl);
