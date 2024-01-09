function createMenuSection() {
  const hero = document.createElement('section');
  hero.classList.add('hero');

  const heroHeader = document.createElement('div');
  heroHeader.classList.add('hero-head');

  const heroTitle = document.createElement('h2');
  heroTitle.classList.add('section-title');
  heroTitle.textContent = 'Contact';
  heroHeader.appendChild(heroTitle);

  const divider = document.createElement('hr');
  divider.classList.add('divider');
  heroHeader.appendChild(divider);

  hero.appendChild(heroHeader);

  const para = document.createElement('p');
  para.classList.add('hero-para');
  para.textContent = 'This is some sample text content for a contact page!'
  hero.appendChild(para);

  return hero;
}

function loadContact() {
  const content = document.querySelector('.page-content');
  content.textContent = '';

  const tabSwitch = document.querySelector('button.active');
  if (tabSwitch) tabSwitch.classList.toggle('active');

  const activeTab = document.getElementById('contact-btn');
  activeTab.classList.add('active');

  const hero = createMenuSection();

  content.appendChild(hero);
}

export default loadContact;