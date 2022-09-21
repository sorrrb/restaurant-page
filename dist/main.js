(()=>{"use strict";var n,e,t,r,o,a,i,c,s,p,l,d,u,f,g={426:(n,e,t)=>{t.d(e,{Z:()=>u});var r=t(81),o=t.n(r),a=t(645),i=t.n(a),c=t(667),s=t.n(c),p=new URL(t(556),t.b),l=i()(o());l.push([n.id,"@import url(https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&display=swap);"]);var d=s()(p);l.push([n.id,"* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\n#content {\n  display: flex;\n  flex-direction: column;\n  height: 100vh;\n  width: 100%;\n  font-family: 'Caveat', cursive;\n\n  background-image: url("+d+");\n  background-color: #A5ABAF;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\n/*\nElement selectors\n*/\n\na {\n  color: inherit;\n  text-decoration: none;\n}\n\n/*\nClass/ID selectors\n*/\n\n.header, .hero, .footer {\n  backdrop-filter: blur(6px);\n}\n\n.header {\n  background-color: rgb(54,56,54);\n  background: linear-gradient(90deg, rgba(54,56,54,0.8) 0%, rgba(54,56,54,0.65) 50%, rgba(54,56,54,0.5) 100%);\n  border-bottom: 1px solid #DFB16F;\n  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n  padding: 12px 48px;\n  width: 100%;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.head-left {\n  display: flex;\n  gap: 72px;\n}\n\n.logo-wrapper {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n\n.logo {\n  color: #DFB16F;\n  font-size: 4rem;\n  font-weight: 700;\n  letter-spacing: 4px;\n}\n\n.nav-tabs {\n  list-style: none;\n  display: flex;\n  align-items: center;\n  gap: 48px;\n}\n\n.nav-tabs li {\n  color: #C4CACE;\n  font-size: 2.25rem;\n  font-weight: 600;\n}\n\n.order {\n  background: none;\n  backdrop-filter: blur(24px);\n  background-color: rgba(201, 135, 44, 0.5);\n  border: 2px solid #DFB16F;\n  border-radius: 8px;\n  color: #F4E4CD;\n  font-size: 1.25rem;\n  font-weight: 700;\n  padding: 8px 32px;\n}\n\n\n\n.hero {\n  flex: 1;\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n}\n\n.hero-content, .media-wrapper {\n  background-color: #000000B0;\n  grid-row: 1 / 2;\n  margin: 24px 12px;\n  padding: 8px;\n}\n\n.hero-content {\n  border-bottom-left-radius: 12px;\n  border-top-right-radius: 12px;\n  border-top-left-radius: 12px;\n  border-right: 16px solid #DFB16F;\n  color: #F4E4CD;\n  grid-column: 1 / 2;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  padding: 16px;\n}\n\n.hero-content h1 {\n  text-align: center;\n  font-size: 2.5rem;\n  font-weight: 700;\n}\n\n.hero-content p {\n  font-size: 1.75rem;\n  font-weight: 600;\n}\n\n.hero-content button {\n  align-self: center;\n  font-size: 1.25rem;\n  padding: 12px 48px;\n}\n\n.hero-bottom {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.hero-bottom p {\n  font-size: 2rem;\n  font-weight: 700;\n}\n\n.hero-bottom hr {\n  border: none;\n  outline: 1px solid #F4E4CD;\n  margin: 8px;\n  width: 75%;\n}\n\n.media-wrapper {\n  border-bottom-right-radius: 12px;\n  border-top-right-radius: 12px;\n  border-top-left-radius: 12px;\n  border-left: 16px solid #DFB16F;\n  grid-column: 2 / 4;\n  display: flex;\n  justify-content: space-around;\n}\n\n.media-wrapper img {\n  border: 1px solid #ffffff1a;\n  border-radius: 4px;\n  box-shadow: 0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a;\n  flex: 1 1 auto;\n  max-height: 70%;\n  max-width: 30%;\n}\n\n.media-wrapper img:nth-child(2) {\n  align-self: center;\n}\n\n.media-wrapper img:nth-child(3) {\n  align-self: flex-end;\n}\n\n\n\n.footer {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-family: Arial, Helvetica, sans-serif;\n  font-size: 0.75rem;\n  font-weight: 500;\n  background-color: rgb(134,90,29);\n  background: radial-gradient(circle, rgba(134,90,29,0.75) 0%, rgba(134,90,29,0.7) 25%, rgba(134,90,29,0.65) 50%, rgba(134,90,29,0.6) 75%, rgba(134,90,29,0.5) 100%);\n  border-top: 1px solid #DFB16F20;\n  color: #C4CACE;\n  padding: 8px 0;\n  width: 100%;\n}\n\n.footer span {\n  font-size: 0.875rem;\n  font-style: italic;\n  font-weight: 700;\n  margin: 0 6px;\n}",""]);const u=l},645:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",r=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),r&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),r&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,r,o,a){"string"==typeof n&&(n=[[null,n,void 0]]);var i={};if(r)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(i[s]=!0)}for(var p=0;p<n.length;p++){var l=[].concat(n[p]);r&&i[l[0]]||(void 0!==a&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=a),t&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=t):l[2]=t),o&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=o):l[4]="".concat(o)),e.push(l))}},e}},667:n=>{n.exports=function(n,e){return e||(e={}),n?(n=String(n.__esModule?n.default:n),/^['"].*['"]$/.test(n)&&(n=n.slice(1,-1)),e.hash&&(n+=e.hash),/["'() \t\n]|(%20)/.test(n)||e.needQuotes?'"'.concat(n.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):n):n}},81:n=>{n.exports=function(n){return n[1]}},379:n=>{var e=[];function t(n){for(var t=-1,r=0;r<e.length;r++)if(e[r].identifier===n){t=r;break}return t}function r(n,r){for(var a={},i=[],c=0;c<n.length;c++){var s=n[c],p=r.base?s[0]+r.base:s[0],l=a[p]||0,d="".concat(p," ").concat(l);a[p]=l+1;var u=t(d),f={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==u)e[u].references++,e[u].updater(f);else{var g=o(f,r);r.byIndex=c,e.splice(c,0,{identifier:d,updater:g,references:1})}i.push(d)}return i}function o(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,o){var a=r(n=n||[],o=o||{});return function(n){n=n||[];for(var i=0;i<a.length;i++){var c=t(a[i]);e[c].references--}for(var s=r(n,o),p=0;p<a.length;p++){var l=t(a[p]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}a=s}}},569:n=>{var e={};n.exports=function(n,t){var r=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},216:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},565:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},795:n=>{n.exports=function(n){var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(r,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},589:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}},556:(n,e,t)=>{n.exports=t.p+"9dce6fde825aee20fa5a.jpg"}},h={};function m(n){var e=h[n];if(void 0!==e)return e.exports;var t=h[n]={id:n,exports:{}};return g[n](t,t.exports,m),t.exports}m.m=g,m.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return m.d(e,{a:e}),e},m.d=(n,e)=>{for(var t in e)m.o(e,t)&&!m.o(n,t)&&Object.defineProperty(n,t,{enumerable:!0,get:e[t]})},m.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),m.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),(()=>{var n;m.g.importScripts&&(n=m.g.location+"");var e=m.g.document;if(!n&&e&&(e.currentScript&&(n=e.currentScript.src),!n)){var t=e.getElementsByTagName("script");t.length&&(n=t[t.length-1].src)}if(!n)throw new Error("Automatic publicPath is not supported in this browser");n=n.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),m.p=n})(),m.b=document.baseURI||self.location.href,m.nc=void 0,n=m(379),e=m.n(n),t=m(795),r=m.n(t),o=m(569),a=m.n(o),i=m(565),c=m.n(i),s=m(216),p=m.n(s),l=m(589),d=m.n(l),u=m(426),(f={}).styleTagTransform=d(),f.setAttributes=c(),f.insert=a().bind(null,"head"),f.domAPI=r(),f.insertStyleElement=p(),e()(u.Z,f),u.Z&&u.Z.locals&&u.Z.locals,m.p,m.p,m.p,m.p,m.p,console.log(document.querySelector("div#content"))})();