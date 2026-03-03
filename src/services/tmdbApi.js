const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const DEFAULT_PARAMS = new URLSearchParams({
  language: 'en-US',
});

async function request(endpoint, query = {}) {
  const params = new URLSearchParams(DEFAULT_PARAMS);

  if (!API_TOKEN && API_KEY) {
    params.set('api_key', API_KEY);
  }

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, String(value));
    }
  });

  const headers = API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {};

  const response = await fetch(`${BASE_URL}${endpoint}?${params.toString()}`, {
    headers,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function fetchTrendingMovies() {
  const data = await request('/trending/movie/day');
  return data.results ?? [];
}

export async function fetchMoviesByQuery(query) {
  const data = await request('/search/movie', {
    query,
    include_adult: false,
    page: 1,
  });
  return data.results ?? [];
}

export async function fetchMovieDetails(movieId) {
  return request(`/movie/${movieId}`);
}

export async function fetchMovieCredits(movieId) {
  const data = await request(`/movie/${movieId}/credits`);
  return data.cast ?? [];
}

export async function fetchMovieReviews(movieId) {
  const data = await request(`/movie/${movieId}/reviews`, { page: 1 });
  return data.results ?? [];
}

export function getImageUrl(path) {
  return path ? `${IMAGE_BASE_URL}${path}` : null;
}
