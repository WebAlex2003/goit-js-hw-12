const API_KEY = '44082104-13032bddabedf7f071f678933';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}