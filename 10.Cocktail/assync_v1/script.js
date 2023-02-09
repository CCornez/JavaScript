// fetch data
// change h1
// change p
// change img src

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {
  if (xhttp.readyState === 4 && xhttp.status === 200) {
    const gegevens = JSON.parse(xhttp.responseText);
    console.log(gegevens.drinks[0].strDrink);
    console.log(gegevens.drinks[0].strInstructions);
    console.log(gegevens.drinks[0].strDrinkThumb);
  }
};

xhttp.open('GET', 'https://www.thecocktaildb.com/api/json/v1/1/random.php');

xhttp.send();
