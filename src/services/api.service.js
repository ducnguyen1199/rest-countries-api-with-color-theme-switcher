import axios from 'axios';
import API_URL from './config';

export const init = () => {
  axios.defaults.baseURL = API_URL;
};

export const getAll = () => {
  return axios.get('all');
};

export const getDetail = (name) => {
  return axios.get(`name/${name}`);
};
