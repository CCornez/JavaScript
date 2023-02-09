import 'mvp.css';
import '../css/style.scss';
import 'animate.css';
import axios from 'axios';

document.querySelector('form').onsubmit = async (e) => {
  e.preventDefault();
  const { value } = document.querySelector('form input[type=text]');
  if (value.length >= 2) {
    const { data } = await axios(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`
    );
    data
      ? (document.querySelector('section').innerHTML = data.drinks
          .map(
            ({ strDrink, strDrinkThumb }) => `
            <aside>
                <h2>${strDrink}</h2>
                <img src="${strDrinkThumb}" alt="" />
                </aside>
                `
          )
          .join(''))
      : (document.querySelector('section').innerHTML =
          '<h2>No cocktails found :(</h2>');
  }
};
