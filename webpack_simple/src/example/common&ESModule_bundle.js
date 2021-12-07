/*
* ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
* This devtool is neither made for production nor for readable output files.
* It uses "eval()" calls to create a separate source file in the browser devtools.
* If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
* or disable the default devtool with "devtool: false".
* If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
*/
(() => { // webpackBootstrap
    var __webpack_modules__ = ({
        "./src/action.js":
            ((__unused_webpack_module, exports) => {
                eval("let action = \"making webpack\";\nexports.action = action;\n\n\n//# sourceURL=webpack://simple_package/./src/action.js?");
            }),

        "./src/family-name.js":
            ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
                "use strict";
                // eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst familyName = 'zhou'\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (familyName);\n\n\n//# sourceURL=webpack://simple_package/./src/family-name.js?");

                __webpack_require__.r(__webpack_exports__);
                __webpack_require__.d(__webpack_exports__, {
                    "default": () => (__WEBPACK_DEFAULT_EXPORT__)
                });
                const familyName = 'zhou'
                const __WEBPACK_DEFAULT_EXPORT__ = (familyName);
            }),

        "./src/index.js":
            ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
                "use strict";
                // eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_0__);\n\nlet action = __webpack_require__(/*! ./action.js */ \"./src/action.js\").action;   // 引入aciton.js\nlet name = __webpack_require__(/*! ./name.js */ \"./src/name.js\").name;         // 引入name.js\n\nlet message = `${name} is ${action}`;\n// console.log(message);\n\nconst element = document.createElement('div')\nelement.innerHTML = message\nelement.className = 'content'\n\ndocument.getElementById('app').appendChild(element)\n\n\n//# sourceURL=webpack://simple_package/./src/index.js?");

                // 处理css的引入
                __webpack_require__.r(__webpack_exports__);
                var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
                var _style_css__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_0__);

                let action = __webpack_require__("./src/action.js").action;   // 引入aciton.js
                let name = __webpack_require__("./src/name.js").name;         // 引入name.js

                let message = `${name} is ${action}`;

                const element = document.createElement('div')
                element.innerHTML = message
                element.className = 'content'

                document.getElementById('app').appendChild(element)
            }),

        "./src/name.js":
            ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
                "use strict";
                // eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"name\": () => (/* binding */ name)\n/* harmony export */ });\n/* harmony import */ var _family_name_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./family-name.js */ \"./src/family-name.js\");\n// Common.js 引入，导出方式\n// let familyName = require(\"./family-name.js\").name;\n// exports.name = `${familyName} Chinese，在Shenzhen`;\n\n// EsModule 引入，导出方式\n\nconst name = _family_name_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n\n\n\n//# sourceURL=webpack://simple_package/./src/name.js?");

                __webpack_require__.r(__webpack_exports__);
                __webpack_require__.d(__webpack_exports__, {
                    "name": () => (name)
                });
                var _family_name_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/family-name.js");
                const name = _family_name_js__WEBPACK_IMPORTED_MODULE_0__["default"]
            }),

        "./src/style.css":
            (() => {
                eval("\n        if (document) {\n            var styleHtml = document.createElement('style')\n            styleHtml.innerHTML = \".content {\\n    background:red;\\n}\\n\"\n            document.head.appendChild(styleHtml)\n        }\n    \n\n//# sourceURL=webpack://simple_package/./src/style.css?");
            })
    });

    // The module cache 接收模块缓存
    var __webpack_module_cache__ = {};

    // The require function 模块执行函数
    function __webpack_require__(moduleId) {
        // Check if module is in cache
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== undefined) {
            return cachedModule.exports;
        }
        // Create a new module (and put it into the cache)
        var module = __webpack_module_cache__[moduleId] = {
            // no module.id needed
            // no module.loaded needed
            exports: {}
        };

        // Execute the module function
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

        // Return the exports of the module
        return module.exports;
    }


    (() => {
        // getDefaultExport function for compatibility with non-harmony modules
        __webpack_require__.n = (module) => {
            var getter = module && module.__esModule ?
                () => (module['default']) :
                () => (module);
            __webpack_require__.d(getter, { a: getter });
            return getter;
        };
    })();

    (() => {
        // d => definedProperties
        // 将definition对象中的属性添加到exports中。
        // 此时的exports中已经有__esModule属性和自定义toStringTag
        __webpack_require__.d = (exports, definition) => {
            for(var key in definition) {
                if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
                }
            }
        };
    })();

    (() => {
        // o => ownProperty
        // 判断prop参数是否属于obj对象中的自身属性。
        __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
    })();

    (() => {
        // r => rankEsModule
        // define __esModule on exports: 在exports中定义__esModule属性，值为true
        __webpack_require__.r = (exports) => {
            if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                // 设置自定义toStringTag
                // Object.prototype.toString.call(exports) =》 '[object Module]'
                Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            }
            Object.defineProperty(exports, '__esModule', { value: true });
        };
    })();

    // startup： 入口文件执行
    // Load entry module and return exports
    // This entry module can't be inlined because the eval devtool is used.
    var __webpack_exports__ = __webpack_require__("./src/index.js");

})();
