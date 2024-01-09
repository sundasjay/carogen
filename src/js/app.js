
var swiper = new Swiper(".swiper", {
  slidesPerView: 3,
  spaceBetween: 10,
  centeredSlides: false,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 1,
      spaceBetween: 30
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 2,
      spaceBetween: 40
    },
    760: {
      slidesPerView: 2,
      spaceBetween: 50
    }
  }
});

const header = document.querySelector('header');
const toggleClass = "is-sticky";

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add(toggleClass);
  } else {
    header.classList.remove(toggleClass);
  }
});



$(document).ready(function(){
  new WOW().init();
   });