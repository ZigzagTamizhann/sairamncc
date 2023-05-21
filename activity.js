// JavaScript code for the slideshow
const slideshow = document.querySelector('.slideshow');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');
let currentSlide = 0;
let isSlideFrozen = false;

function showSlide(index) {
  // Hide all slides
  slides.forEach((slide) => {
    slide.style.transform = `translateY(-${index * 100}%)`;
  });

  // Update the active dot
  const dots = dotsContainer.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  if (isSlideFrozen) {
    return;
  }

  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Show the initial slide
showSlide(currentSlide);

// Create dots for each slide
slides.forEach((slide, index) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dot.addEventListener('click', () => showSlide(index));
  dotsContainer.appendChild(dot);
});

// Automatically go to the next slide every 7 seconds
setInterval(nextSlide, 5000);

// Scroll to next slide on mouse wheel event
slideshow.addEventListener('wheel', (event) => {
  event.preventDefault();
  const deltaY = event.deltaY;

  if (deltaY > 0) {
    // Scroll down
    nextSlide();
  } else {
    // Scroll up
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }
});

// Pause the slideshow when the cursor is inside a slide
slides.forEach((slide) => {
  slide.addEventListener('mouseenter', () => {
    isSlideFrozen = true;
  });

  slide.addEventListener('mouseleave', () => {
    isSlideFrozen = false;
  });
});