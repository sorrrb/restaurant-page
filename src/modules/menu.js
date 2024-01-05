import Picture from '../assets/food.jpg';

function createMenuSection() {
  const hero = document.createElement('section');
  hero.classList.add('hero');

  const heroTitle = document.createElement('h2');
  heroTitle.classList.add('section-title');
  heroTitle.textContent = 'Menu';
  hero.appendChild(heroTitle);

  const para = document.createElement('p');
  para.classList.add('hero-para');
  para.textContent = 'This is some sample text content for a menu page!'
  hero.appendChild(para);

  const heroImg = new Image();
  heroImg.src = Picture;
  heroImg.height = 600;
  hero.appendChild(heroImg);

  return hero;
}

function loadMenu() {
  const content = document.querySelector('.page-content');
  content.textContent = '';

  const tabSwitch = document.querySelector('button.active');
  if (tabSwitch) tabSwitch.classList.toggle('active');

  const activeTab = document.getElementById('menu-btn');
  activeTab.classList.add('active');

  const hero = createMenuSection();

  content.appendChild(hero);
}

export default loadMenu;