import axios from 'axios';
import '../css/style.scss';
import {
  preloadImage,
  setToLocalStorage,
  getFromLocalStorage,
} from './helpers';
import topbar from 'topbar';

/******************** local storage ********************/

const likes = JSON.parse(getFromLocalStorage('likes')) || [];

/******************** API ********************/

/**
 *  COCKTAIL DRINKS
 */

// API call: get

async function getDrinks() {
  try {
    const {
      data: { drinks },
    } = await axios(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput.value}`
    );
    return drinks;
  } catch (error) {
    console.error(error);
  }
}

// render

async function renderDrinks(drinks) {
  cocktailGrid.innerHTML = '';
  await Promise.all(
    drinks.map(({ strDrinkThumb }) => preloadImage(strDrinkThumb))
  );
  cocktailGrid.innerHTML = drinks
    .map(({ idDrink, strDrink, strDrinkThumb }) =>
      cocktailCardTemplate.innerHTML
        .replace('%ID%', idDrink)
        .replaceAll('%IMG%', strDrinkThumb)
        .replaceAll('%COCKTAIL%', strDrink)
        .replace(
          '%STATUS%',
          likes.find((like) => like.id === idDrink) ? 'liked' : 'unliked'
        )
    )
    .join('');
}

/******************** EVENTS ********************/

/**
 * FORM
 */

// variables
const form = document.querySelector('form');
const searchInput = document.querySelector('form input');
const cocktailGrid = document.querySelector('.cocktailGrid');
const cocktailCardTemplate = document.querySelector('#cocktailCard');

// form submit

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  topbar.show();
  const drinks = await getDrinks();
  console.log(drinks);
  await renderDrinks(drinks);
  topbar.hide();
});

/**
 *  cocktail card
 */

// like button click

cocktailGrid.addEventListener('click', (e) => {
  // check if clicked on likeBtn
  const likeBtn = e.target.closest('.likeBtn');
  if (likeBtn) {
    const { id, name, img } = likeBtn.closest('.cocktailCard').dataset;
    const svg = likeBtn.querySelector('svg');

    // check if cocktail is in array
    const index = likes.findIndex((like) => like.id === id);
    if (index !== -1) {
      // unlike
      likes.splice(index, 1);
      svg.innerHTML = '<use href="./icons/icons.svg#icon-heart-unliked"></use>';
    } else {
      // like
      likes.push({ id, name, img });
      svg.innerHTML = '<use href="./icons/icons.svg#icon-heart-liked"></use>';
    }
    setToLocalStorage('likes', likes);
  }
});
