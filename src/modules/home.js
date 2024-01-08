import Picture from '../assets/hero.jpg';

function createHeroSection() {
  const hero = document.createElement('section');
  hero.classList.add('hero');

  const heroTitle = document.createElement('h2');
  heroTitle.classList.add('section-title');
  heroTitle.textContent = 'Bedrock & Java Menus';
  hero.appendChild(heroTitle);

  const divider = document.createElement('hr');
  divider.classList.add('divider');
  hero.appendChild(divider);

  const para = document.createElement('p');
  para.classList.add('hero-para');
  para.textContent = 'Get the best food Minecraft has to offer here!'
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

  const tabSwitch = document.querySelector('button.active');
  if (tabSwitch) tabSwitch.classList.toggle('active');

  const activeTab = document.getElementById('home-btn');
  activeTab.classList.add('active');

  const hero = createHeroSection();

  content.appendChild(hero);
}

export default loadHome;