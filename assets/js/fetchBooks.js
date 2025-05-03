const API_KEY = 'AIzaSyCwliiqKmImCsqN4N_6aYYCnRU7Nc5-zaM';
const maxResults = 6;

export default async function fetchBooks(query, page) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${query}&key=${API_KEY}&printType=books&startIndex=${ ( page - 1 ) * maxResults }&maxResults=${ maxResults }&langRestrict=en`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      throw new Error('Книги не найдены.');
    }

    return data.items;
  } catch (error) {
    console.error('Ошибка при получении данных:', error.message);
    return [];
  }
}