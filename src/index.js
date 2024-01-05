import './style.css';
import loadPage from './pageload';
import loadHome from './modules/home';
import loadMenu from './modules/menu';
import loadContact from './modules/contact';

// Handle tab listening logic
// Get element references
// Add event listeners from modules
// Modules replace logListen
function addEventHandlers() {
  const home = document.getElementById('home-btn');
  const nav = document.getElementById('menu-btn');
  const contact = document.getElementById('contact-btn');

  home.addEventListener('click', loadHome);
  nav.addEventListener('click', loadMenu);
  contact.addEventListener('click', loadContact);
}

function init() {
  // Main content generated dynamically by JS to append elements
  const content = document.createElement('div');
  content.id = 'content';
  document.body.appendChild(content);

  // Calls to load page, load home and handle tab-switching logic
  loadPage();
  loadHome();
  addEventHandlers();
}

function logListen(e) {
  console.log(e);
}

init(); // Handle initial pageload