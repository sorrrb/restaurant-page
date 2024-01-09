import GalleryOne from '../assets/rest-one.png';
import GalleryTwo from '../assets/rest-two.png';
import GalleryThree from '../assets/rest-three.png';
import GalleryFour from '../assets/rest-four.png';
import GalleryFive from '../assets/rest-five.png';

function createHeroSection() {
  const hero = document.createElement('section');
  hero.classList.add('hero');

  const heroHeader = document.createElement('div');
  heroHeader.classList.add('hero-head');

  const heroTitle = document.createElement('h2');
  heroTitle.classList.add('section-title');
  heroTitle.textContent = 'Bedrock & Java Menus Available!';
  heroHeader.appendChild(heroTitle);

  const divider = document.createElement('hr');
  divider.classList.add('divider');
  heroHeader.appendChild(divider);

  hero.appendChild(heroHeader);

  const heroInfo = document.createElement('div');
  heroInfo.classList.add('hero-info');

  const paraTitle = document.createElement('h4');
  paraTitle.classList.add('hero-para-title');
  paraTitle.textContent = 'Hours:';

  const paraOne = document.createElement('p');
  paraOne.classList.add('hero-para');
  paraOne.textContent = '10:00a - 9:00p / Mon thru Fri';

  const paraTwo = document.createElement('p');
  paraTwo.classList.add('hero-para');
  paraTwo.textContent = '10:00a - 11:00p / Sat & Sun';

  heroInfo.appendChild(paraTitle);
  heroInfo.appendChild(paraOne);
  heroInfo.appendChild(paraTwo);
  hero.appendChild(heroInfo);

  function createImageSlide(imageSrc, index) {
    const IMAGE_COUNT = 5;
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('hero-slide');

    const textContainer = document.createElement('p');
    textContainer.classList.add('hero-slide-text');
    textContainer.textContent = `(${index} / ${IMAGE_COUNT})`;

    const imageOverlay = document.createElement('div');
    imageOverlay.classList.add('hero-slide-image');

    const image = new Image();
    image.src = imageSrc;
    image.height = '500';

    imageOverlay.appendChild(image);

    imageContainer.appendChild(textContainer);
    imageContainer.appendChild(imageOverlay);

    return imageContainer;
  }

  const imageGallery = document.createElement('div');
  imageGallery.classList.add('hero-slide-container');

  const imageOne = createImageSlide(GalleryOne, 1);
  imageOne.classList.add('hero-slide-active');

  const imageTwo = createImageSlide(GalleryTwo, 2);
  const imageThree = createImageSlide(GalleryThree, 3);
  const imageFour = createImageSlide(GalleryFour, 4);
  const imageFive = createImageSlide(GalleryFive, 5);

  imageGallery.appendChild(imageOne);
  imageGallery.appendChild(imageTwo);
  imageGallery.appendChild(imageThree);
  imageGallery.appendChild(imageFour);
  imageGallery.appendChild(imageFive);
  
  function manageSlides(e) {
    const activeImage = document.querySelector('div.hero-slide-active');
    let index = activeImage.firstElementChild.textContent[1];
    const images = document.getElementsByClassName('hero-slide');

    if (e.target.classList.contains('hero-slide-next')) {
      for (let i = index-1; i < images.length; i++) {
        if (images[i] === activeImage) {
          const nextImage = (images[i].nextElementSibling);
          if (nextImage.tagName === 'A') return;
          images[i].nextElementSibling.classList.add('hero-slide-active');
          images[i].classList.toggle('hero-slide-active');
        }
      }
    }
    else if (e.target.classList.contains('hero-slide-previous')) {
      for (let i = index-1; i < images.length; i++) {
        if (images[i] === activeImage) {
          const prevImage = (images[i].previousElementSibling);
          if (!prevImage) return;
          images[i].previousElementSibling.classList.add('hero-slide-active');
          images[i].classList.toggle('hero-slide-active');
        }
      }
    }
  }

  const nextBtn = document.createElement('a');
  nextBtn.classList.add('hero-slide-next');
  nextBtn.innerHTML = '&#8250;';
  nextBtn.addEventListener('click', manageSlides);

  const prevBtn = document.createElement('a');
  prevBtn.classList.add('hero-slide-previous');
  prevBtn.innerHTML = '&#8249;';
  prevBtn.addEventListener('click', manageSlides);

  imageGallery.appendChild(prevBtn);
  imageGallery.appendChild(nextBtn);

  hero.appendChild(imageGallery);

  return hero;
}

function loadHome() {
  const content = document.querySelector('.page-content');
  content.textContent = '';

  const tabSwitch = document.querySelector('button.active');
  if (tabSwitch) tabSwitch.classList.toggle('active');

  const activeTab = document.getElementById('home-btn');
  activeTab.classList.add('active');

  const hero = createHeroSection();

  content.appendChild(hero);
}

export default loadHome;