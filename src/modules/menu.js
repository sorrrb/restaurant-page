import Apple from '../assets/apple.png';
import EnchantedApple from '../assets/enchanted-apple.png';
import GoldenApple from '../assets/golden-apple.png';

function createMenuSection() {
  const hero = document.createElement('section');
  hero.classList.add('hero');

  const heroTitle = document.createElement('h2');
  heroTitle.classList.add('section-title');
  heroTitle.textContent = 'Menu';
  hero.appendChild(heroTitle);

  const apple = new Image();
  apple.src = Apple;
  apple.height = 25;
  hero.appendChild(apple);

  const enchantedApple = new Image();
  enchantedApple.src = EnchantedApple;
  enchantedApple.height = 25;
  hero.appendChild(enchantedApple);

  const goldenApple = new Image();
  goldenApple.src = GoldenApple;
  goldenApple.height = 25;
  hero.appendChild(goldenApple);

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