import fetcher from './fetcher';
import { sortArrayOfObject, getTime } from './helpers';

/******************** API ********************/

/**
 * stations
 */

// Api call -> get all the stations
async function getStations() {
  try {
    const {
      data: { station },
    } = await fetcher('/stations/?format=json&lang=en');
    return station;
  } catch (error) {
    console.error(error);
  }
}

async function renderStations() {
  // get all the stations
  const stations = await getStations();

  // sort the array of objects by name alphabetically
  // create options html tags for every station
  const optionsHTML = sortArrayOfObject(stations, 'name')
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');

  // insert into both selects the options
  const selects = document.querySelectorAll('select');
  selects.forEach((select) => (select.innerHTML = optionsHTML));
}

renderStations();

/**
 * Connections
 */

// initialize map info:
// station names,
// latitudes and longitudes for the map
let mapInfo = [];

// Api call -> get connections with 2 parameters: from (station) and to (station)
async function getConnections(from, to) {
  try {
    const {
      data: { connection },
    } = await fetcher(
      // OPTIONAL: add date parameter (after "to" -> "&date=090223&time=1230")
      `/connections/?from=${from}&to=${to}&format=json&lang=en`
    );
    return connection;
  } catch (error) {
    console.error(error);
  }
}

function renderConnections(connections) {
  const connectionsObj = connections
    // map the connections array (from getConnection) atm
    .map(
      (
        // destructure the connection object
        {
          departure: {
            station: departureStation,
            direction,
            platform: departurePlatform,
            time: departureDate,
            stops,
            // for map
            stationinfo: { locationX: departureLong, locationY: departureLat },
          },
          duration,
          vias,
          arrival: {
            station: arrivalStation,
            platform: arrivalPlatform,
            time: arrivalDate,
            // for map
            stationinfo: { locationX: arrivalLong, locationY: arrivalLat },
          },
        },
        // index
        i
      ) => {
        // MAP DEPARTURE
        let stationNames = [];
        let latLongs = [];

        stationNames.push(departureStation);
        latLongs.push([+departureLat, +departureLong]);

        // DURATION
        const durationHours = Math.floor(duration / 3600);
        const durationMinutes = Math.floor(
          (duration - durationHours * 3600) / 60
        );
        const durationFormat = durationHours
          ? durationHours + 'h ' + durationMinutes + 'm'
          : durationMinutes + 'm';

        // DEPARTURE TIME
        // get hours and minutes form a unix timestamp format (hh:mm)
        const departureTime = getTime(departureDate);

        // STOPS
        // create default value
        let stopsHTML = '';
        // if there are stops, create html to insert later (could use a template)
        if (stops) {
          stopsHTML = `<ul>${stops.stop
            .map(
              ({
                station,
                scheduledArrivalTime,
                // for map
                stationinfo: { locationX: stopLong, locationY: stopLat },
              }) => {
                //add stops to map
                stationNames.push(station);
                latLongs.push([+stopLat, +stopLong]);

                return `<li>${getTime(scheduledArrivalTime)} ${station}</li>`;
              }
            )
            .join('')}</ul>`;
        }

        // ARRIVAL TIME
        // get hours and minutes form a unix timestamp format (hh:mm)
        const arrivalTime = getTime(arrivalDate);

        // VIAS REDO MORE EFFICIENT
        // create default values
        let viasNumber = 0;
        let viasHTML = '';

        // if there are vias, create html to insert later
        // --- This code is very similar the the code above ⤵ ---
        if (vias) {
          viasNumber = vias.number;
          viasHTML = vias.via
            .map(
              (
                // destructure the vias object
                {
                  station,
                  // for map
                  stationinfo: {
                    locationX: departureLong,
                    locationY: departureLat,
                  },
                  departure: {
                    direction,
                    platform: departurePlatform,
                    time: departureDate,
                    stops,
                  },
                  arrival: { platform: arrivalPlatform, time: arrivalDate },
                },
                i
              ) => {
                // MAP DEPARTURE

                stationNames.push(station);
                latLongs.push([+departureLat, +departureLong]);

                // DEPARTURE TIME
                // get hours and minutes form a unix timestamp format (hh:mm)
                const departureTime = getTime(departureDate);

                // STOPS
                // create default value
                let stopsHTML = '';
                // if there are stops, create html to insert later (could use a template)
                if (stops) {
                  stopsHTML = `<ul>${stops.stop
                    .map(
                      ({
                        station,
                        scheduledArrivalTime, // for map
                        stationinfo: {
                          locationX: stopLong,
                          locationY: stopLat,
                        },
                      }) => {
                        //add stops to map
                        stationNames.push(station);
                        latLongs.push([+stopLat, +stopLong]);

                        return `<li>${getTime(
                          scheduledArrivalTime
                        )} ${station}</li>`;
                      }
                    )
                    .join('')}</ul>`;
                }

                // arrival time
                const arrivalTime = getTime(arrivalDate);

                // --- This code is very similar the the code above ⤴ ---
                // --- This code is very similar the the code below ⤵ ---

                // insert connection vias into the template
                return document
                  .querySelector('#via')
                  .innerHTML.replaceAll('%STATION%', station)
                  .replaceAll('%ARRIVAL_TIME%', arrivalTime)
                  .replace('%ARRIVAL_PLATFORM%', arrivalPlatform)
                  .replaceAll('%DEPARTURE_TIME%', departureTime)
                  .replace('%DEPARTURE_PLATFORM%', departurePlatform)
                  .replace('%DIRECTION%', direction.name)
                  .replace('%STOPS%', stopsHTML);
              }
            )
            .join('');
          // --- This code is very similar the the code below ⤴ ---
        }

        // MAP ARRIVAL
        stationNames.push(arrivalStation);
        latLongs.push([+arrivalLat, +arrivalLong]);

        mapInfo.push({ stationNames, latLongs });

        // insert connection summary into the template
        const connectionSummary = document
          .querySelector('#summary')
          .innerHTML.replace('%ID%', i)
          .replaceAll('%DEPARTURE_TIME%', departureTime)
          .replaceAll('%ARRIVAL_TIME%', arrivalTime)
          .replace('%NUMBER_VIAS%', viasNumber)
          .replace('%DURATION%', durationFormat);

        // insert connection detail into the template
        const connectionDetail = document
          .querySelector('#detail')
          .innerHTML.replace('%ID%', i)
          .replaceAll('%DEPARTURE_TIME%', departureTime)
          .replace('%DEPARTURE_STATION%', departureStation)
          .replace('%DEPARTURE_PLATFORM%', departurePlatform)
          .replace('%DIRECTION%', direction.name)
          .replace('%STOPS%', stopsHTML)
          .replace('%VIAS%', viasHTML)
          .replaceAll('%ARRIVAL_TIME%', arrivalTime)
          .replace('%ARRIVAL_STATION%', arrivalStation)
          .replace('%ARRIVAL_PLATFORM%', arrivalPlatform);

        // return an object to separate summary and detail
        return { connectionSummary, connectionDetail };
      }
    )
    .reduce(
      // concatenate every summary with each other and every detail with each other
      // keeping them separate
      ({ summaries, details }, { connectionSummary, connectionDetail }) => {
        summaries += connectionSummary;
        details += connectionDetail;
        // in the end you have 1 object with every summary concatenated and every detail concatenated
        return { summaries, details };
      },
      { summaries: '', details: '' }
    );

  // destructure the object
  const { summaries, details } = connectionsObj;

  // insert connections summaries into html
  document.querySelector('#connections__summaries').innerHTML = summaries;

  // insert connections details into html
  document.querySelector('#connections__details').innerHTML = details;

  console.log(mapInfo);
  console.log(connections);
}

/******************** EVENTS ********************/

/**
 * form
 */

// submit

document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();
  // get submitted values
  const from = document.querySelector('#stationFrom').value;
  const to = document.querySelector('#stationTo').value;

  // Api call -> get connections with 2 submitted values
  const connections = await getConnections(from, to);

  // render the connections given by the api
  renderConnections(connections);
});

/**
 * connections summaries
 */

// click

document
  .querySelector('#connections__summaries')
  .addEventListener('click', (e) => {
    const summary = e.target.closest('.summary');
    // check if clicked target is inside an element with a class 'summary'
    if (summary) {
      const details = document.querySelectorAll('.detail');

      // hide every detail
      details.forEach((detail) => detail.classList.add('hidden'));

      // find the detail with the same id as the summary id
      const detail = [...details].filter(
        (detail) => detail.dataset.id === summary.dataset.id
      )[0];

      // unhide the filtered detail
      detail.classList.remove('hidden');
      getMap(summary.dataset.id);
    }
  });

/******************** MAP ********************/

let map = '';

function getMap(id) {
  if (map) {
    // remove previous map with markers and polyline
    map.remove();
  }

  // set map
  map = L.map('map', {
    center: [50.826, 4.3802],
    zoom: 12,
  });

  // add map layer
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // add stops as markers
  // add popup of the station name
  mapInfo[id].latLongs.forEach((latLong, i) =>
    L.marker(latLong).bindPopup(mapInfo[id].stationNames[i]).addTo(map)
  );

  // create a line between the markers
  let polyline = L.polyline(mapInfo[id].latLongs, {
    color: 'blue',
    snakingSpeed: 200,
  }).addTo(map);

  // zoom the map to the polyline
  map.fitBounds(polyline.getBounds());
}
