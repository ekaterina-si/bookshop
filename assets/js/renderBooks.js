import fetchBooks from './fetchBooks.js';
import { addToCart, getCart, removeFromCart } from './cart.js';

let pageNum = 1;

const renderBooks = async (query, page = pageNum) => {
  if (page !== pageNum) {
    pageNum = page;
  }
  const books = await fetchBooks(query, pageNum);
  const cardGrid = document.querySelector('.card-container');
  if (books.length === 0) {
    cardGrid.innerHTML = '<p>No books found</p>';
    return;
  }
  const template = document.querySelector('#book-card-template');

  books.forEach((book) => {
    const card = template.content.firstElementChild.cloneNode(true);
    card.dataset.bookId = book.id;

    const img = card.querySelector('img');
    img.src = book.volumeInfo.imageLinks?.thumbnail || 'assets/img/gag.jpg';
    img.alt = book.volumeInfo.title;

    const author = card.querySelector('.author');
    author.textContent = book.volumeInfo.authors?.join(', ') || 'Unknown Author';

    const title = card.querySelector('.title');
    title.textContent = book.volumeInfo.title;

    const ratingContainer = card.querySelector('.rating');
    const ratingValue = book.volumeInfo.averageRating;

    if (!ratingValue) {
      ratingContainer.classList.add('hidden');
    } else {
      const fullStars = Math.floor(ratingValue);
      const halfStar = ratingValue % 1 !== 0;

      ratingContainer.querySelectorAll('.rating__star').forEach((star, index) => {
        if (index < fullStars) {
          star.querySelector('use').setAttribute('mask', `url(#mask-100)`);
        } else if (index === fullStars && halfStar) {
          star.querySelector('use').setAttribute('mask', `url(#mask-50)`);
        } else {
          star.querySelector('use').setAttribute('mask', `url(#mask-1)`);
        }
      });

      const ratingsCount = book.volumeInfo.ratingsCount || 0;

      ratingContainer.appendChild(
        document.createElement('span')
      ).textContent = `${ratingsCount} review`;
    }

    const desc = card.querySelector('.desc');
    desc.textContent = book.volumeInfo.description || 'Description is missing';

    const price = card.querySelector('.price');
    price.textContent = `$${book.saleInfo?.listPrice?.amount || 'N/A'}`;

    const button = card.querySelector('.button');
    const cart = getCart();
    const isBookInCart = cart.some((item) => item.id === book.id);

    if (isBookInCart) {
      button.classList.add('inCart');
      button.textContent = 'in the cart';
    } else {
      button.textContent = 'buy now';
    }

    button.addEventListener('click', () => {
      const cart = getCart();
      const isBookInCart = cart.some((item) => item.id === book.id);
      if (isBookInCart) {
        button.textContent = 'buy now';
        button.classList.remove('inCart');
        removeFromCart(book.id);
        return;
      }
      addToCart({
        id: book.id,
        title: book.volumeInfo.title,
        price: price.textContent,
      });
      button.classList.add('inCart');
      button.textContent = 'in the cart';
    });

    cardGrid.appendChild(card);
  });
};

const getPage = () => pageNum;

export { getPage, renderBooks };