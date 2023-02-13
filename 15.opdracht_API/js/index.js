import fetcher from './fetcher';
import { sortArrayOfObject, getTime } from './helpers';

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
  const summaryTemplate = document.querySelector('#summary');
  const detailTemplate = document.querySelector('#detail');

  const connectionsObj = connections
    .map(
      (
        {
          departure: {
            station: departureStation,
            direction,
            platform: departurePlatform,
            time: departureDate,
            stops,
          },
          duration,
          vias,
          arrival: {
            station: arrivalStation,
            platform: arrivalPlatform,
            time: arrivalDate,
          },
        },
        i
      ) => {
        // duration
        const durationHours = Math.floor(duration / 3600);
        const durationMinutes = Math.floor(
          (duration - durationHours * 3600) / 60
        );
        const durationFormat = durationHours
          ? durationHours + 'h ' + durationMinutes + 'm'
          : durationMinutes + 'm';

        // departure time
        // create date from unix timestamp
        const departureTime = getTime(departureDate);

        // stops
        let stopsHTML = '';
        if (stops) {
          stopsHTML = `<ul>${stops.stop
            .map(({ station, scheduledArrivalTime }) => {
              return `<li>${getTime(scheduledArrivalTime)} ${station}</li>`;
            })
            .join('')}</ul>`;
        }

        // arrival time
        const arrivalTime = getTime(arrivalDate);

        /**
         * VIAS REDO MORE EFFICIENT
         */
        const viaTemplate = document.querySelector('#via');
        let viasNumber = 0;
        let viasHTML = '';

        if (vias) {
          viasNumber = vias.number;
          viasHTML = vias.via
            .map(
              (
                {
                  station,
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
                // duration
                const durationHours = Math.floor(duration / 3600);
                const durationMinutes = Math.floor(
                  (duration - durationHours * 3600) / 60
                );
                const durationFormat = durationHours
                  ? durationHours + 'h ' + durationMinutes + 'm'
                  : durationMinutes + 'm';

                // departure time
                // create date from unix timestamp
                const departureTime = getTime(departureDate);

                // stops
                let stopsHTML = '';
                if (stops) {
                  stopsHTML = `<ul>${stops.stop
                    .map(({ station, scheduledArrivalTime }) => {
                      return `<li>${getTime(
                        scheduledArrivalTime
                      )} ${station}</li>`;
                    })
                    .join('')}</ul>`;
                }

                // arrival time
                const arrivalTime = getTime(arrivalDate);

                // insert connection information into the template
                return viaTemplate.innerHTML
                  .replaceAll('%STATION%', station)
                  .replaceAll('%ARRIVAL_TIME%', arrivalTime)
                  .replace('%ARRIVAL_PLATFORM%', arrivalPlatform)
                  .replaceAll('%DEPARTURE_TIME%', departureTime)
                  .replace('%DEPARTURE_PLATFORM%', departurePlatform)
                  .replace('%DIRECTION%', direction.name)
                  .replace('%STOPS%', stopsHTML);
              }
            )
            .join('');
        }

        // insert connection information into the template
        const connectionSummary = summaryTemplate.innerHTML
          .replace('%ID%', i)
          .replace('%NUMBER_VIAS%', viasNumber)
          .replace('%DURATION%', durationFormat)
          .replaceAll('%DEPARTURE_TIME%', departureTime)
          .replace('%DEPARTURE_STATION%', departureStation)
          .replace('%DEPARTURE_PLATFORM%', departurePlatform)
          .replace('%DIRECTION%', direction.name)
          .replace('%STOPS%', stopsHTML)
          .replace('%VIAS%', viasHTML)
          .replaceAll('%ARRIVAL_TIME%', arrivalTime)
          .replace('%ARRIVAL_STATION%', arrivalStation)
          .replace('%ARRIVAL_PLATFORM%', arrivalPlatform);

        // insert connection information into the template
        const connectionDetail = detailTemplate.innerHTML
          .replace('%ID%', i)
          .replace('%NUMBER_VIAS%', viasNumber)
          .replace('%DURATION%', durationFormat)
          .replaceAll('%DEPARTURE_TIME%', departureTime)
          .replace('%DEPARTURE_STATION%', departureStation)
          .replace('%DEPARTURE_PLATFORM%', departurePlatform)
          .replace('%DIRECTION%', direction.name)
          .replace('%STOPS%', stopsHTML)
          .replace('%VIAS%', viasHTML)
          .replaceAll('%ARRIVAL_TIME%', arrivalTime)
          .replace('%ARRIVAL_STATION%', arrivalStation)
          .replace('%ARRIVAL_PLATFORM%', arrivalPlatform);

        return { connectionSummary, connectionDetail };
      }
    )
    .reduce(
      ({ summaries, details }, { connectionSummary, connectionDetail }) => {
        summaries += connectionSummary;
        details += connectionDetail;
        return { summaries, details };
      },
      { summaries: '', details: '' }
    );

  const { summaries, details } = connectionsObj;

  // insert connections summaries into html
  const connectionsSummariesHTML = document.querySelector(
    '#connections__summaries'
  );
  connectionsSummariesHTML.innerHTML = summaries;

  // insert connections details into html
  const connectionsDetailsHTML = document.querySelector(
    '#connections__details'
  );
  connectionsDetailsHTML.innerHTML = details;

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

document
  .querySelector('#connections__summaries')
  .addEventListener('click', (e) => {
    const summary = e.target.closest('.summary');
    if (summary) {
      console.log(summary.dataset.id);
    }
  });
