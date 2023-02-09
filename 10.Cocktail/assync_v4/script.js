axios('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  .then((resp1) => {
    axios('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then((resp2) => {
        document.querySelector('#loader').classList.add('hidden');
        console.log(resp2.data);
        console.log(resp1.data);
      })
      .catch((error2) => console.log(error2));
  })
  .catch((error1) => console.log(error1));
