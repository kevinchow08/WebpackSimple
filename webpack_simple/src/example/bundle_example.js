(() => {
    // 建立模块集合
    var __webpack_modules__ = ({
        "./src/action.js": ((__unused_webpack_module, exports) => {
            eval("let action = \"making webpack\";\nexports.action = action;\n\n\n//# sourceURL=webpack://simple_package/./src/action.js?");
        }),
        "./src/family-name.js":
            ((__unused_webpack_module, exports) => {
                eval("exports.name = 'kevin凯文';\n\n\n//# sourceURL=webpack://simple_package/./src/family-name.js?");
            }),

        "./src/index.js":
            ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
                eval("let action = __webpack_require__(/*! ./action.js */ \"./src/action.js\").action;   // 引入aciton.js\nlet name = __webpack_require__(/*! ./name.js */ \"./src/name.js\").name;         // 引入name.js\nlet message = `${name} is ${action}`;\nconsole.log(message);\n\n\n//# sourceURL=webpack://simple_package/./src/index.js?");
            }),

        "./src/name.js":
            ((__unused_webpack_module, exports, __webpack_require__) => {
                eval("let familyName = __webpack_require__(/*! ./family-name.js */ \"./src/family-name.js\").name;\nexports.name = `${familyName} 坟都人，在Shenzhen`;\n\n\n//# sourceURL=webpack://simple_package/./src/name.js?");
            })
    });
// The module cache 接收模块缓存
    var __webpack_module_cache__ = {};

// The require function 模块执行函数
    function __webpack_require__(moduleId) {
        // Check if module is in cache
        // 首先检查是否有模块缓存
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== undefined) {
            return cachedModule.exports;
        }
        // Create a new module (and put it into the cache)
        // 再没有缓存模块的情况下，创建一个新的模块，export对象用来接收模块导出的属性
        var module = __webpack_module_cache__[moduleId] = {
            // no module.id needed
            // no module.loaded needed
            exports: {}
        };

        // Execute the module function  执行对应模块的代码，通过调用模块集合的value值函数来允许。
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

        // Return the exports of the module
        return module.exports;
    }

// startup  开始
// Load entry module and return exports 加载入口模块并返回exports
    var __webpack_exports__ = __webpack_require__("./src/index.js");

})();

// 我们可以发现，文件最终打包后就是一个立即执行函数。这个函数由三部分组成：
// 1，模块集合 这个模块集合是所有模块的集合，以路径作为key值，模块内容作为value值。
// 2，模块函数执行 每一个模块对应于一个函数，当遇到require(xxx)的时候实际上就是去执行引入的这个模块函数。
// 3，入口文件立即执行

// 其中最关键的就是实现模块集合和模块执行。
