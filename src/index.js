import './style.css';
import pageLoad from './pageload';

function init() {
  const content = document.createElement('div');
  content.id = 'content';
  document.body.appendChild(content);
  pageLoad();
}

init(); // Handle initial pageload