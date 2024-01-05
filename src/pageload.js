// Helper - generate header
function createHead(headClass, logoText) {
  const header = document.createElement('header');
  header.classList.add(headClass);
  const logo = document.createElement('h1');
  logo.textContent = logoText;
  header.appendChild(logo);
  
  const nav = createNav('nav');
  header.appendChild(nav);
  return header;
}

// Helper - generate buttons (for navbar)
function createBtn(id, btnText) {
  const btn = document.createElement('button');
  btn.id = id;
  btn.textContent = btnText;
  return btn;
}

// Helper - generate nav links (for header)
function createNav(navClass) {
  const nav = document.createElement('nav');
  nav.classList.add(navClass);

  const homeBtn = createBtn('home-btn', 'Home');
  const menuBtn = createBtn('nav-btn', 'Menu');
  const contactBtn = createBtn('contact-btn', 'Contact');

  nav.appendChild(homeBtn);
  nav.appendChild(menuBtn);
  nav.appendChild(contactBtn);
  return nav;
}

// Helper - generate main content
function createMain(mainClass) {
  const main = document.createElement('main');
  main.classList.add(mainClass);
  return main;
}

// Helper - generate footer
function createFoot(footClass) {
  const footer = document.createElement('footer');
  footer.classList.add(footClass);

  const footerText = document.createElement('p');
  footerText.classList.add('foot-text');
  footerText.textContent = 'Made by sorrrb';
  footer.appendChild(footerText);
  return footer;
}

// Module - generate page content using helpers
function loadPage() {
  const content = document.getElementById('content');

  const header = createHead('header', 'Sample Restaurant');
  content.appendChild(header);

  const main = createMain('page-content');
  content.appendChild(main);

  const footer = createFoot('footer');
  content.appendChild(footer);
}

export default loadPage;