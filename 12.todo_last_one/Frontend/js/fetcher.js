import axios from 'axios';

const myAxios = axios.create({
  baseURL: 'http://localhost:3000/todos',
});

export default myAxios;
