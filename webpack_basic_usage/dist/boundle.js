/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mul": function() { return /* binding */ mul; },
/* harmony export */   "sum": function() { return /* binding */ sum; }
/* harmony export */ });
const sum = (s1, s2) => {
  return s1 + s2;
};
const mul = (s1, s2) => {
  return s1 * s2;
};

/***/ }),
/* 2 */
/***/ (function(module) {

const dateFormat = date => {
  return "2020-12-12";
};

const priceFormat = price => {
  return "100.00";
};

module.exports = {
  dateFormat,
  priceFormat
};

/***/ }),
/* 3 */
/***/ (function() {

// 有些浏览器不支持Promise新特性。需要使用polyfill来补齐API
// 注意：直接引入@babel/polyfill，会使得js打包体积突增，要考虑按需引入
const p = Promise.resolve('Hello Promise');
p.then(res => {
  console.log(res);
});
console.log('Hello Word');

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _css_component_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);



const component = () => {
  const element = document.createElement('div');
  element.innerHTML = ['Hello', 'Webpack'].join(' ');
  element.className = 'content';
  return element;
};

document.getElementById('app').appendChild(component());

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _js_test__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _js_test__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_test__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _js_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
// import '@babel/polyfill'


const {
  dateFormat,
  priceFormat
} = __webpack_require__(2);



console.log((0,_js_math__WEBPACK_IMPORTED_MODULE_0__.sum)(1, 2));
console.log((0,_js_math__WEBPACK_IMPORTED_MODULE_0__.mul)(2, 4));
console.log(dateFormat("1213"));
console.log(priceFormat("3123"));
}();
/******/ })()
;