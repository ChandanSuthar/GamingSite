import axios from 'axios';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

if (!API_KEY) {
  throw new Error('RAWG API key is missing. Please add VITE_RAWG_API_KEY to your .env file');
}

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const getGames = async (params) => {
  try {
    const { 
      page = 1, 
      pageSize = 40, 
      search = '', 
      category = '', 
      tags = [], 
      releaseYear = '',
      ordering = '-rating' 
    } = params;

    const queryParams = {
      page,
      page_size: pageSize,
      search: search?.trim() || '',
      ordering,
    };

    // Add category filter
    if (category) {
      queryParams.genres = category.toLowerCase();
    }

    // Add tags filter
    if (tags && tags.length > 0) {
      queryParams.tags = tags.map(tag => tag.toLowerCase()).join(',');
    }

    // Add release year filter
    if (releaseYear) {
      const startDate = `${releaseYear}-01-01`;
      const endDate = `${releaseYear}-12-31`;
      queryParams.dates = `${startDate},${endDate}`;
    }

    const response = await api.get('/games', { params: queryParams });
    return {
      results: response.data.results || [],
      hasMore: response.data.next !== null,
      count: response.data.count || 0
    };
  } catch (error) {
    console.error('Error fetching games:', error);
    throw new Error(error.response?.data?.error || 'Failed to fetch games. Please try again later.');
  }
};

export const getGameDetails = async (gameId) => {
  if (!gameId) {
    throw new Error('Game ID is required');
  }

  try {
    const response = await api.get(`/games/${gameId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game details:', error);
    throw new Error(error.response?.data?.error || 'Failed to fetch game details. Please try again later.');
  }
};

export default api; 