const formatQuery = (query) => {
  return query
    .toLowerCase()
    .replace(/\s+/g, '+')
    .replace(/[^a-z0-9+]/g, '')
    .replace(/\+\+/g, '+')
}

let selectedCategory = '';

const saveCategoryToStorage = (category) => {
  localStorage.setItem('selectedCategory', category);
};

const loadCategoryFromStorage = () => {
  return localStorage.getItem('selectedCategory') || '';
};

const selectCategory = (categoryElem = null) => {
  const categories = document.querySelectorAll('.category');

  if (!categoryElem) {
    const savedCategory = loadCategoryFromStorage();
    if (savedCategory) {
      categoryElem = Array.from(categories).find(
        (category) => formatQuery(category.innerText) === savedCategory
      );
    }
    
    if (!categoryElem) {
      categoryElem = categories[0];
    }
  }

  categories.forEach((category) => {
    category.classList.remove('active');
  });

  categoryElem.classList.add('active');

  selectedCategory = formatQuery(categoryElem.innerText);
  saveCategoryToStorage(selectedCategory);

  const cardGrid = document.querySelector('.card-container');
  cardGrid.innerHTML = '';
  
  return selectedCategory;
}

const getSelectedCategory = () => selectedCategory;

export { selectCategory, getSelectedCategory };

