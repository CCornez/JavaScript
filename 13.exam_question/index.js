import axios from 'axios';
import { getAverage } from './helpers.js';

// async function getTemperatures() {
//   try {
//     const data = await axios(
//       'https://ap-examen.surge.sh/temperaturen.json'
//     ).then((res) => res.data);
//     const d = data
//       .map(
//         (el) =>
//           `${el.stad.toUpperCase()} (${getAverage()}°C)\n` +
//           el.temperaturen
//             .map(
//               (el) =>
//                 `${el.datum}${' '.repeat(
//                   6 - el.temperatuur.toString().length
//                 )}${el.temperatuur}°C\n`
//             )
//             .join('')
//       )
//       .join('\n');

//     console.log(d);
//   } catch (error) {
//     console.error(error);
//   }
// }

async function getTemperatures() {
  try {
    const data = await axios(
      'https://ap-examen.surge.sh/temperaturen.json'
    ).then((res) => res.data);

    data.forEach((el) => {
      const average = Math.round(
        el.temperaturen.reduce((acc, el) => acc + el.temperatuur, 0) /
          el.temperaturen.length
      );
      console.log(`\n${el.stad.toUpperCase()} (${average}°C)`);

      el.temperaturen.forEach((el) =>
        console.log(
          `${el.datum}${' '.repeat(6 - el.temperatuur.toString().length)}${
            el.temperatuur
          }°C`
        )
      );
    });
    // console.log(data);
    // console.log(JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}

getTemperatures();
