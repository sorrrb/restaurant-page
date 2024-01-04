import './style.css';
import Background from './assets/background.jpg';
import loadMe from './pageload';

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  btn.onclick = loadMe;
  btn.textContent = 'Button';

  element.appendChild(btn);
  return element;
}

document.body.appendChild(component());
console.log('Testing');