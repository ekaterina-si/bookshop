const slides = [
  'assets/img/banner.jpg',
  'assets/img/banner2.jpg',
  'assets/img/banner3.jpg',
];

let currentIndex = 0;
const sliderContainer = document.querySelector('.slider__image-container');
const dotsContainer = document.querySelector('#dots');

function createSlides() {
  slides.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Slide ${index + 1}`;
    img.classList.add('slider__image');
    sliderContainer.appendChild(img);

    const dot = document.createElement('span');
    dot.classList.add('slider__dot');
    if (index === 0) dot.classList.add('slider__dot_active');
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);
  });
}

function changeSlide(index) {
  const dots = document.querySelectorAll('.slider__dot');

  dots[currentIndex].classList.remove('slider__dot_active');
  dots[index].classList.add('slider__dot_active');

  sliderContainer.style.transform = `translateX(-${index * 100}%)`;

  currentIndex = index;
}

function startAutoplay() {
  setInterval(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    changeSlide(nextIndex);
  }, 5000);
}

function setupDots() {
  dotsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('slider__dot')) {
      const index = parseInt(event.target.dataset.index, 10);
      changeSlide(index);
    }
  });
}

function initSlider() {
  createSlides();
  setupDots();
  startAutoplay();
}

export default initSlider;