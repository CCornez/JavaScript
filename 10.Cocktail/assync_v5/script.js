async function main() {
  try {
    const cocktailResponse = await axios(
      'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    );
    const teslaResponse = await axios(
      'https://api.spacexdata.com/v2/info/roadster'
    );
    document.querySelector('#loader').classList.add('hidden');
    console.log(cocktailResponse.data, teslaResponse.data);
  } catch (error) {
    console.log(error);
  }
}

main();
