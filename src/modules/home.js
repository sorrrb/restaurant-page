import Picture from '../assets/background.jpg';

function createHeroSection() {
  const hero = document.createElement('section');
  hero.classList.add('hero');

  const heroTitle = document.createElement('h2');
  heroTitle.classList.add('section-title');
  heroTitle.textContent = 'Sample Home Title';
  hero.appendChild(heroTitle);

  const para = document.createElement('p');
  para.classList.add('hero-para');
  para.textContent = 'This is some sample text content for the home page hero paragraph!'
  hero.appendChild(para);

  const heroImg = new Image();
  heroImg.src = Picture;
  heroImg.height = 600;
  hero.appendChild(heroImg);

  return hero;
}

function loadHome() {
  const content = document.querySelector('.page-content');
  content.textContent = '';

  const hero = createHeroSection();

  content.appendChild(hero);
}

export default loadHome;