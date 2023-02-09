// fetch data
// change h1
// change p
// change img src

const getData = (url) =>
  new Promise(function (res, rej) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        const gegevens = JSON.parse(xhttp.responseText);
        res(gegevens);
      }
      if (xhttp.readyState === 4 && xhttp.status === 404) {
        rej('server could not be accessed');
      }
    };

    xhttp.open('GET', url);

    xhttp.send();
  });

getData('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
