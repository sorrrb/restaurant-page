"use strict";
(self["webpackChunkrestaurant_page"] = self["webpackChunkrestaurant_page"] || []).push([["page"],{

/***/ "./src/pageload.js":
/*!*************************!*\
  !*** ./src/pageload.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _assets_github_mark_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/github-mark.png */ "./src/assets/github-mark.png");


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
  const menuBtn = createBtn('menu-btn', 'Menu');
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

  const source = document.createElement('a');
  source.classList.add('footer-source');
  source.href = 'https://github.com/sorrrb';

  const gitHubLink = new Image();
  gitHubLink.src = _assets_github_mark_png__WEBPACK_IMPORTED_MODULE_0__;
  gitHubLink.classList.add('footer-logo')
  source.appendChild(gitHubLink);

  const footerText = document.createElement('p');
  footerText.classList.add('foot-text');
  footerText.textContent = 'sorrrb';
  source.appendChild(footerText);

  footer.appendChild(source);
  return footer;
}

// Module - generate page content using helpers
function loadPage() {
  const content = document.getElementById('content');

  const header = createHead('header', 'Yours & Mine: Craft Cuisine');
  content.appendChild(header);

  const main = createMain('page-content');
  content.appendChild(main);

  const footer = createFoot('footer');
  content.appendChild(footer);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadPage);

/***/ }),

/***/ "./src/assets/github-mark.png":
/*!************************************!*\
  !*** ./src/assets/github-mark.png ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "3524c849ab38de4be923.png";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/pageload.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBZ0Q7O0FBRWhEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLG9EQUFRO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGlFQUFlLFFBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZXN0YXVyYW50LXBhZ2UvLi9zcmMvcGFnZWxvYWQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZvb3RMb2dvIGZyb20gJy4vYXNzZXRzL2dpdGh1Yi1tYXJrLnBuZyc7XG5cbi8vIEhlbHBlciAtIGdlbmVyYXRlIGhlYWRlclxuZnVuY3Rpb24gY3JlYXRlSGVhZChoZWFkQ2xhc3MsIGxvZ29UZXh0KSB7XG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xuICBoZWFkZXIuY2xhc3NMaXN0LmFkZChoZWFkQ2xhc3MpO1xuICBjb25zdCBsb2dvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgbG9nby50ZXh0Q29udGVudCA9IGxvZ29UZXh0O1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQobG9nbyk7XG4gIFxuICBjb25zdCBuYXYgPSBjcmVhdGVOYXYoJ25hdicpO1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQobmF2KTtcbiAgcmV0dXJuIGhlYWRlcjtcbn1cblxuLy8gSGVscGVyIC0gZ2VuZXJhdGUgYnV0dG9ucyAoZm9yIG5hdmJhcilcbmZ1bmN0aW9uIGNyZWF0ZUJ0bihpZCwgYnRuVGV4dCkge1xuICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgYnRuLmlkID0gaWQ7XG4gIGJ0bi50ZXh0Q29udGVudCA9IGJ0blRleHQ7XG4gIHJldHVybiBidG47XG59XG5cbi8vIEhlbHBlciAtIGdlbmVyYXRlIG5hdiBsaW5rcyAoZm9yIGhlYWRlcilcbmZ1bmN0aW9uIGNyZWF0ZU5hdihuYXZDbGFzcykge1xuICBjb25zdCBuYXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKTtcbiAgbmF2LmNsYXNzTGlzdC5hZGQobmF2Q2xhc3MpO1xuXG4gIGNvbnN0IGhvbWVCdG4gPSBjcmVhdGVCdG4oJ2hvbWUtYnRuJywgJ0hvbWUnKTtcbiAgY29uc3QgbWVudUJ0biA9IGNyZWF0ZUJ0bignbWVudS1idG4nLCAnTWVudScpO1xuICBjb25zdCBjb250YWN0QnRuID0gY3JlYXRlQnRuKCdjb250YWN0LWJ0bicsICdDb250YWN0Jyk7XG5cbiAgbmF2LmFwcGVuZENoaWxkKGhvbWVCdG4pO1xuICBuYXYuYXBwZW5kQ2hpbGQobWVudUJ0bik7XG4gIG5hdi5hcHBlbmRDaGlsZChjb250YWN0QnRuKTtcbiAgcmV0dXJuIG5hdjtcbn1cblxuLy8gSGVscGVyIC0gZ2VuZXJhdGUgbWFpbiBjb250ZW50XG5mdW5jdGlvbiBjcmVhdGVNYWluKG1haW5DbGFzcykge1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbWFpbicpO1xuICBtYWluLmNsYXNzTGlzdC5hZGQobWFpbkNsYXNzKTtcbiAgcmV0dXJuIG1haW47XG59XG5cbi8vIEhlbHBlciAtIGdlbmVyYXRlIGZvb3RlclxuZnVuY3Rpb24gY3JlYXRlRm9vdChmb290Q2xhc3MpIHtcbiAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9vdGVyJyk7XG4gIGZvb3Rlci5jbGFzc0xpc3QuYWRkKGZvb3RDbGFzcyk7XG5cbiAgY29uc3Qgc291cmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICBzb3VyY2UuY2xhc3NMaXN0LmFkZCgnZm9vdGVyLXNvdXJjZScpO1xuICBzb3VyY2UuaHJlZiA9ICdodHRwczovL2dpdGh1Yi5jb20vc29ycnJiJztcblxuICBjb25zdCBnaXRIdWJMaW5rID0gbmV3IEltYWdlKCk7XG4gIGdpdEh1Ykxpbmsuc3JjID0gZm9vdExvZ287XG4gIGdpdEh1YkxpbmsuY2xhc3NMaXN0LmFkZCgnZm9vdGVyLWxvZ28nKVxuICBzb3VyY2UuYXBwZW5kQ2hpbGQoZ2l0SHViTGluayk7XG5cbiAgY29uc3QgZm9vdGVyVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgZm9vdGVyVGV4dC5jbGFzc0xpc3QuYWRkKCdmb290LXRleHQnKTtcbiAgZm9vdGVyVGV4dC50ZXh0Q29udGVudCA9ICdzb3JycmInO1xuICBzb3VyY2UuYXBwZW5kQ2hpbGQoZm9vdGVyVGV4dCk7XG5cbiAgZm9vdGVyLmFwcGVuZENoaWxkKHNvdXJjZSk7XG4gIHJldHVybiBmb290ZXI7XG59XG5cbi8vIE1vZHVsZSAtIGdlbmVyYXRlIHBhZ2UgY29udGVudCB1c2luZyBoZWxwZXJzXG5mdW5jdGlvbiBsb2FkUGFnZSgpIHtcbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50Jyk7XG5cbiAgY29uc3QgaGVhZGVyID0gY3JlYXRlSGVhZCgnaGVhZGVyJywgJ1lvdXJzICYgTWluZTogQ3JhZnQgQ3Vpc2luZScpO1xuICBjb250ZW50LmFwcGVuZENoaWxkKGhlYWRlcik7XG5cbiAgY29uc3QgbWFpbiA9IGNyZWF0ZU1haW4oJ3BhZ2UtY29udGVudCcpO1xuICBjb250ZW50LmFwcGVuZENoaWxkKG1haW4pO1xuXG4gIGNvbnN0IGZvb3RlciA9IGNyZWF0ZUZvb3QoJ2Zvb3RlcicpO1xuICBjb250ZW50LmFwcGVuZENoaWxkKGZvb3Rlcik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxvYWRQYWdlOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==