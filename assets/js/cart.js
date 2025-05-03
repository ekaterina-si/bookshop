let cart = [];

const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCounter();
  }
};

const saveCartToStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const addToCart = (book) => {
  const existingBook = cart.find((item) => item.id === book.id);

  if (existingBook) {
    existingBook.quantity += 1;
  } else {
    cart.push({ ...book, quantity: 1 });
  }

  saveCartToStorage();
  updateCartCounter();
  updateCartDropdown();
};

const removeFromCart = (bookId) => {
  cart = cart.filter((item) => item.id !== bookId);
  saveCartToStorage();
  updateCartCounter();
  updateCartDropdown();
};

const getCart = () => cart;

const updateCartCounter = () => {
  const cartIcon = document.querySelector('.cart-icon');
  if (cartIcon) {
    cartIcon.dataset.count = cart.length;
  }
};

const updateCartDropdown = () => {
  const cartDropdown = document.querySelector('.cart-dropdown');
  if (!cartDropdown) return;

  cartDropdown.innerHTML = '';

  if (cart.length === 0) {
    cartDropdown.innerHTML = '<p>The cart is empty</p>';
    return;
  }

  cart.forEach((item) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <p>${item.title}</p>
      <button class="remove-from-cart" data-id="${item.id}">-</button>
    `;
    cartDropdown.appendChild(cartItem);
  });

  cartDropdown.querySelectorAll('.remove-from-cart').forEach((button) => {
    button.addEventListener('click', (e) => {
      const bookId = e.target.dataset.id;
      removeFromCart(bookId);

      const cards = document.querySelectorAll('.card[data-book-id]');
      cards.forEach((card) => {
        if (card.dataset.bookId === bookId) {
          card.querySelector('.button').textContent = 'buy now';
          card.querySelector('.button').classList.remove('inCart');
        }
      });
    });
  });
};

loadCartFromStorage();
updateCartDropdown();

export { addToCart, removeFromCart, getCart };