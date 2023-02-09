import 'animate.css';
import '../css/style.scss';
import axios from 'axios';

const { data } = await axios(
  'https://api.coindesk.com/v1/bpi/currentprice.json'
);

document.querySelector(
  'h1'
).innerText = `the price of bitcoin is €${data.bpi.EUR.rate}`;
