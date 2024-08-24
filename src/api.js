import axios from 'axios';

const api = axios.create({
  baseURL: 'https://zual-backend.onrender.com/'
});

export default api;
