import Apple from '../assets/apple.png';
import EnchantedApple from '../assets/enchanted-apple.png';
import GoldenApple from '../assets/golden-apple.png';
import Bread from '../assets/bread.png';
import Cookie from '../assets/cookie.png';
import Stew from '../assets/stew.png';
import Mutton from '../assets/mutton.png';
import Porkchop from '../assets/porkchop.png';
import Rabbit from '../assets/rabbit.png';
import Steak from '../assets/steak.png';
import Cod from '../assets/cod.png';
import Salmon from '../assets/salmon.png';

function createMenuSection() {
  const hero = document.createElement('section');
  hero.classList.add('hero');

  const heroHeader = document.createElement('div');
  heroHeader.classList.add('hero-head');

  const heroTitle = document.createElement('h2');
  heroTitle.classList.add('section-title');
  heroTitle.textContent = 'Menu';
  heroHeader.appendChild(heroTitle);

  const divider = document.createElement('hr');
  divider.classList.add('divider');
  heroHeader.appendChild(divider);

  hero.appendChild(heroHeader);

  const menuNoticeContainer = document.createElement('div');
  menuNoticeContainer.classList.add('menu-text-container');

  const menuNotice = document.createElement('p');
  menuNotice.classList.add('menu-notice');
  menuNotice.textContent = 'Please be advised that food prepared here may contain these ingredients:'

  const menuNoticeItems = document.createElement('p');
  menuNoticeItems.classList.add('menu-warning');
  menuNoticeItems.textContent = 'milk, eggs, wheat, soybean, peanuts, tree nuts, fish, and shellfish';

  menuNoticeContainer.appendChild(menuNotice);
  menuNoticeContainer.appendChild(menuNoticeItems);
  hero.appendChild(menuNoticeContainer);

  const cardContainer = document.createElement('div');
  cardContainer.classList.add('hero-menu');
  hero.appendChild(cardContainer);

  function makeNewCard(source, title, price, description) {
    const container = document.createElement('div');
    container.classList.add('menu-card');

    const leftCard = document.createElement('div');
    leftCard.classList.add('card-left');

    const rightCard = document.createElement('div');
    rightCard.classList.add('card-right');

    const foodTitle = document.createElement('h4');
    foodTitle.textContent = title;
    leftCard.appendChild(foodTitle);
    
    const priceTitle = document.createElement('h4');
    priceTitle.textContent = `Price: ${price}`;
    rightCard.appendChild(priceTitle)

    const newImage = new Image();
    newImage.src = source;
    newImage.height = 35;
    leftCard.appendChild(newImage);

    const foodDescription = document.createElement('p');
    foodDescription.classList.add('menu-description');
    foodDescription.textContent = description;
    rightCard.appendChild(foodDescription);

    container.appendChild(leftCard);
    container.appendChild(rightCard);

    return container;
  }

  const apple = makeNewCard(Apple, "Apple", "$0.75", "Varieties available: Gala, Fuji, Golden Delicious, Honeycrisp, Granny Smith, Braeburn & McIntosh");
  cardContainer.appendChild(apple);

  const goldenApple = makeNewCard(GoldenApple, "Golden Apple", "$9.99", "The best individual apples of our harvests, meticulously shrouded in 14K edible gold");
  cardContainer.appendChild(goldenApple);

  const enchantedApple = makeNewCard(EnchantedApple, "Enchanted Apple", "$19.99", "[NOTICE: WAIVER MUST BE SIGNED PRIOR TO PURCHASE/CONSUMPTION]");
  cardContainer.appendChild(enchantedApple);

  const bread = makeNewCard(Bread, "Bread", "$2.99", "A finely baked (dare I say one of the finest baked) loaves of bread in all of the world");
  cardContainer.appendChild(bread);

  const cookie = makeNewCard(Cookie, "Cookie", "$0.99", "The kind that makes you think of your mom's baked goods");
  cardContainer.appendChild(cookie);

  const stew = makeNewCard(Stew, "Mushroom Stew", "$7.99", "Delicious blend of oyster, portabello, shiitake, cremini, porcini & lion's mane in a hearty stew");
  cardContainer.appendChild(stew);

  const mutton = makeNewCard(Mutton, "Mutton", "$19.99", "Cut of free-range, grass fed adult lamb, grilled to your preferred internal temperature (Default: Medium Rare)");
  cardContainer.appendChild(mutton);

  const porkchop = makeNewCard(Porkchop, "Porkchop", "$18.99", "Cut of free-range, grass fed pork, grilled to your preferred internal temperature (Default: Medium Rare)");
  cardContainer.appendChild(porkchop);

  const rabbit = makeNewCard(Rabbit, "Rabbit", "$21.99", "Cut of free-range, grass fed rabbit, grilled to your preferred internal temperature (Default: Medium Rare)");
  cardContainer.appendChild(rabbit);

  const steak = makeNewCard(Steak, "Steak", "$24.99", "Cut of free-range, grass fed beef, grilled to your preferred internal temperature (Default: Medium Rare)");
  cardContainer.appendChild(steak);

  const cod = makeNewCard(Cod, "Cod", "$16.99", "Fresh daily, wild cod filet served with lemon and butter");
  cardContainer.appendChild(cod);

  const salmon = makeNewCard(Salmon, "Salmon", "$19.99", "Fresh daily, wild salmon filet served with lemon and butter");
  cardContainer.appendChild(salmon);

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