import axios from 'axios';

const myAxios = axios.create({
  baseURL: 'https://api.irail.be',
});

export default myAxios;
