import axios from 'axios';
import { YOUTUBE_API_URL, YOUTUBE_API_KEY } from '@env';

const apiURL = YOUTUBE_API_URL;
const apiToken = YOUTUBE_API_KEY;

export const youtubeDB = axios.create({
  baseURL: apiURL,
  params: {
    key: apiToken,
    type: 'video',
  },
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});
