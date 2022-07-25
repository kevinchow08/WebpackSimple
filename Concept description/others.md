# 其他补充

## 自定义loaders

loader本质就是一个函数, 在函数中对资源进行转换, 将其变成js打包器可识别的.

eg:
```js
"use strict";

const marked = require("marked");
const loaderUtils = require("loader-utils");

module.exports = function (markdown) {
    // 使用 loaderUtils 来获取 loader 的配置项
    // this 是构建运行时的一些上下文信息
    const options = loaderUtils.getOptions(this);

    this.cacheable();

    // 把配置项直接传递给 marked
    marked.setOptions(options);

    // 使用 marked 处理 markdown 字符串，然后返回
    return marked(markdown);
};
```

markdown-loader 本身仅仅只是一个函数，接收模块代码的内容，然后返回代码内容转化后的结果。webpack loader 的本质就是这样的一个函数。

上述代码中用到的 [loader-utils](https://github.com/webpack/loader-utils) 是 webpack 官方提供的一个工具库，提供 loader 处理时需要用到的一些工具方法，例如用来解析上下文 loader 配置项的 `getOptions`。

自定义loader写好之后,如何使用??
```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: path.resolve('./loader/index.js'), // 使用本地的 ./loader/index.js 作为 loader
    },
  ],
},

// 在 resolveLoader 中添加本地开发的 loaders 存放路径
// 如果你同时需要开发多个 loader，那么这个方式会更加适合你
resolveLoader: {
  modules: [
    'node_modules',
    path.resolver(__dirname, 'loaders')
  ],
}
```

## 自定义plugin(功能拓展)
webpack 插件是一个具有apply方法的JS对象.

`apply` 方法在 webpack compiler 安装插件时会被调用一次，`apply` 接收 webpack compiler 对象实例的引用，你可以在 compiler 对象实例上注册各种事件钩子函数，来影响 webpack 的所有构建流程，以便完成更多其他的构建任务。

所以, webpack插件的本质就是在webpack生命周期钩子函数上注册事件，在适当的时机被触发.

eg:
```js
class FileListPlugin {
  constructor(options) {}

  apply(compiler) {
    // 在 compiler 的 emit hook 中注册一个方法，当 webpack 执行到该阶段时会调用这个方法
    compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
      // 给生成的 markdown 文件创建一个简单标题
      var filelist = 'In this build:\n\n'

      // 遍历所有编译后的资源，每一个文件添加一行说明
      for (var filename in compilation.assets) {
        filelist += ('- '+ filename +'\n')
      }

      // 将列表作为一个新的文件资源插入到 webpack 构建结果中
      compilation.assets['filelist.md'] = {
        source: function() {
          return filelist
        },
        size: function() {
          return filelist.length
        },
      }
    })
  }
}

module.exports = FileListPlugin
```

插件使用:
```js
// 假设我们上述那个例子的代码是 ./plugins/FileListPlugin 这个文件
const FileListPlugin = require('./plugins/FileListPlugin.js')

module.exports = {
  // ... 其他配置
  plugins: [
    new FileListPlugin(), // 实例化这个插件，有的时候需要传入对应的配置
  ],
}
```

## Webpack流程概括
+ 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数； 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
+ 确定入口：根据配置中的 entry 找出所有的入口文件；
+ 编译模块：从入口文件出发，调用所配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
+ 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
+ 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；

> 在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

站在代码逻辑的角度就是：webpack 在编译过代码程中，会触发一系列 Tapable 钩子事件，插件所做的，就是找到相应的钩子，往上面挂上自己的任务，也就是注册事件，这样，当 webpack 构建的时候，插件注册的事件就会随着钩子的触发而执行了。

流程图：

![avatar](https://champyin.com/images/webpack-basic-flow.png)

## 脚手架的搭建
脚手架的本质也是从远程下载一个模板来进行一个新项目, 一个脚手架一般可以维护多个模板, 用户通过指定的模板和项目名可以快速的生成一个模板化的项目.
[参考](https://juejin.cn/post/6844903807919325192)