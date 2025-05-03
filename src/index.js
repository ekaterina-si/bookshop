import initSlider from '../assets/js/slider.js';
import { renderBooks, getPage } from '../assets/js/renderBooks.js';
import { selectCategory, getSelectedCategory } from '../assets/js/selectCategory.js';

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('category')) {
    selectCategory(e.target);
    renderBooks(getSelectedCategory());
  }
});

document.addEventListener('DOMContentLoaded', () => {
  initSlider();
  selectCategory();
  renderBooks(getSelectedCategory());

  document.querySelector('.load-more button').addEventListener('click', async (e) => {
    e.target.disabled = true;
    e.target.textContent = 'Loading...';
    await renderBooks(getSelectedCategory(), getPage() + 1);
    e.target.disabled = false;
    e.target.textContent = 'Load more';
  });

  const cartIcon = document.querySelector('.cart-icon');
  const cartDropdown = document.querySelector('.cart-dropdown');

  if (cartIcon && cartDropdown) {
    cartIcon.addEventListener('click', (e) => {
      cartDropdown.classList.toggle('hidden');
    });

    cartDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    })

    document.addEventListener('click', (e) => {
      if (!cartIcon.contains(e.target) && !cartDropdown.contains(e.target)) {
        cartDropdown.classList.add('hidden');
      }
    });
  }

  const toggleMenu = document.querySelector('.toggle-menu');
  const hiddenMenu = document.querySelector('.header__hidden');

  if (toggleMenu && hiddenMenu) {
    toggleMenu.addEventListener('click', () => {
      hiddenMenu.classList.toggle('active');
      toggleMenu.classList.toggle('active');
    });
  }
});