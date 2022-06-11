import axios from 'axios';

export const finderInstance = axios.create({
  baseURL: 'https://pixabay.com/api/',
});