import axios from 'axios';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

if (!API_KEY) {
  console.error('RAWG API key is missing. Please add it to your .env file');
}

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const getGames = async (page = 1, filters = {}) => {
  try {
    const params = {
      page,
      page_size: 20,
      ...filters,
    };

    const response = await api.get('/games', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw new Error('Failed to fetch games. Please try again later.');
  }
};

export const getGameDetails = async (id) => {
  try {
    const response = await api.get(`/games/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game details:', error);
    throw new Error('Failed to fetch game details. Please try again later.');
  }
};

export const searchGames = async (query, page = 1) => {
  try {
    const params = {
      search: query,
      page,
      page_size: 20,
    };

    const response = await api.get('/games', { params });
    return response.data;
  } catch (error) {
    console.error('Error searching games:', error);
    throw new Error('Failed to search games. Please try again later.');
  }
}; 