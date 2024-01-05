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

function createBtn(btnClass, btnText) {
  const btn = document.createElement('button');
  btn.textContent = btnText;
  return btn;
}

function createNav(navClass) {
  const nav = document.createElement('nav');
  nav.classList.add(navClass);

  const homeBtn = createBtn('nav-btn', 'Home');
  const menuBtn = createBtn('nav-btn', 'Menu');
  const contactBtn = createBtn('nav-btn', 'Contact');

  nav.appendChild(homeBtn);
  nav.appendChild(menuBtn);
  nav.appendChild(contactBtn);
  return nav;
}

function loadPage() {
  const content = document.getElementById('content');

  const header = createHead('header', 'Restaurant');
  content.appendChild(header);
}

export default loadPage;