import axios from 'axios';
import { MOVIES_API_URL, MOVIES_ACCESS_KEY } from '@env';

const apiURL = MOVIES_API_URL;
const apiToken = MOVIES_ACCESS_KEY;

export const moviesDB = axios.create({
  baseURL: apiURL,
  params: {
    language: 'en-En',
  },
  headers: {
    Authorization: `Bearer ${apiToken}`,
    'Content-Type': 'application/json;charset=utf-8',
  },
});
