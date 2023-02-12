import fetcher from './fetcher';
import { sortArrayOfObject } from './helpers';

async function getStations() {
  try {
    // get all the stations from the api
    const {
      data: { station: stations },
    } = await fetcher('/stations/?format=json&lang=en');

    // create options html tags for every station
    const optionsHTML = sortArrayOfObject(stations, 'name')
      .map(({ id, name }) => `<option value="${id}">${name}</option>`)
      .join('');

    // insert into both selects the options
    const selects = document.querySelectorAll('select');
    selects.forEach((select) => (select.innerHTML = optionsHTML));
  } catch (error) {
    console.error(error);
  }
}

async function getConnections(from, to) {
  const {
    data: { connection: connections },
  } = await fetcher(
    // after "to" -> "&date=090223&time=1230"
    `/connections/?from=${from}&to=${to}&format=json&lang=en`
  );
  console.log(connections);
}

getStations();

const searchForm = document.querySelector('form');
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const from = document.querySelector('#stationFrom').value;
  const to = document.querySelector('#stationTo').value;
  getConnections(from, to);
});
