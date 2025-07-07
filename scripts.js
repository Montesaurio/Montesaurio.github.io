//Hamburguer 
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

//Image Slider
const slider = document.querySelector('.slider');
const slides = document.querySelector('.slides');
const images = Array.from(slides.querySelectorAll('img'));
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let index = 0;

let imageWidths = [];

function recalcImageWidths(height) {
  imageWidths = images.map(img => {
    const aspect = img.naturalWidth / img.naturalHeight;
    return height * aspect;
  });
}

function getOffset(index) {
  return imageWidths.slice(0, index).reduce((a, b) => a + b, 0);
}

const texts = document.querySelectorAll('.pImage');

function updateSlide() {
  const baseHeight = window.innerHeight * 0.6;
  const maxWidth = window.innerWidth * 0.95;

  const aspectRatio = images[index].naturalWidth / images[index].naturalHeight;
  let height = baseHeight;
  let width = height * aspectRatio;

  if (width > maxWidth) {
    width = maxWidth;
    height = width / aspectRatio;
  }

  slider.style.height = `${height}px`;
  slider.style.width = `${width}px`;

  recalcImageWidths(height);

  const offset = getOffset(index);
  slides.style.transform = `translateX(-${offset}px)`;

  // Mostrar solo el texto activo según la imagen actual
  texts.forEach((textDiv, i) => {
    textDiv.classList.toggle('active', i === index);
  });
}

nextBtn.addEventListener('click', () => {
  index = (index + 1) % images.length;
  updateSlide();
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + images.length) % images.length;
  updateSlide();
});

window.addEventListener('load', () => {
  recalcImageWidths(window.innerHeight * 0.6);
  updateSlide();
});

window.addEventListener('resize', updateSlide);
