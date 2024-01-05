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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadPage);

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/pageload.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsUUFBUSIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3RhdXJhbnQtcGFnZS8uL3NyYy9wYWdlbG9hZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjcmVhdGVIZWFkKGhlYWRDbGFzcywgbG9nb1RleHQpIHtcbiAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaGVhZGVyJyk7XG4gIGhlYWRlci5jbGFzc0xpc3QuYWRkKGhlYWRDbGFzcyk7XG4gIGNvbnN0IGxvZ28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICBsb2dvLnRleHRDb250ZW50ID0gbG9nb1RleHQ7XG4gIGhlYWRlci5hcHBlbmRDaGlsZChsb2dvKTtcbiAgXG4gIGNvbnN0IG5hdiA9IGNyZWF0ZU5hdignbmF2Jyk7XG4gIGhlYWRlci5hcHBlbmRDaGlsZChuYXYpO1xuICByZXR1cm4gaGVhZGVyO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVCdG4oYnRuQ2xhc3MsIGJ0blRleHQpIHtcbiAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGJ0bi50ZXh0Q29udGVudCA9IGJ0blRleHQ7XG4gIHJldHVybiBidG47XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5hdihuYXZDbGFzcykge1xuICBjb25zdCBuYXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCduYXYnKTtcbiAgbmF2LmNsYXNzTGlzdC5hZGQobmF2Q2xhc3MpO1xuXG4gIGNvbnN0IGhvbWVCdG4gPSBjcmVhdGVCdG4oJ25hdi1idG4nLCAnSG9tZScpO1xuICBjb25zdCBtZW51QnRuID0gY3JlYXRlQnRuKCduYXYtYnRuJywgJ01lbnUnKTtcbiAgY29uc3QgY29udGFjdEJ0biA9IGNyZWF0ZUJ0bignbmF2LWJ0bicsICdDb250YWN0Jyk7XG5cbiAgbmF2LmFwcGVuZENoaWxkKGhvbWVCdG4pO1xuICBuYXYuYXBwZW5kQ2hpbGQobWVudUJ0bik7XG4gIG5hdi5hcHBlbmRDaGlsZChjb250YWN0QnRuKTtcbiAgcmV0dXJuIG5hdjtcbn1cblxuZnVuY3Rpb24gbG9hZFBhZ2UoKSB7XG4gIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udGVudCcpO1xuXG4gIGNvbnN0IGhlYWRlciA9IGNyZWF0ZUhlYWQoJ2hlYWRlcicsICdSZXN0YXVyYW50Jyk7XG4gIGNvbnRlbnQuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbG9hZFBhZ2U7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9