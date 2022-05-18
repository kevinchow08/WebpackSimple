### 核心内容

+ webpack核心配置深入解析;
+ webpack常用Loaders和Plugins深入学习;
+ 自定义webpack中自己的Loader和Plugin;
+ Babel各种用法以及polyfill、TypeScript的支持;
+ ESLint的配置规则以及在VSCode、webpack中的使用;
+ 各种性能优化方案:打包抽取分包、Tree Shaking、动态链接库、CDN、gzip压缩等等
  + [如何使用 splitChunks 精细控制代码分割](https://juejin.cn/post/6844904103848443912)

+ webpack模块化原理解析、打包原理实现;
+ 掌握其他流行构件工具:gulp、rollup、vite;

+ 实现一个简易的打包器：具体位置在：webpack_simple/lib/simple_package.js

#### Webpack流程概括
+ 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数； 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
+ 确定入口：根据配置中的 entry 找出所有的入口文件；
+ 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
+ 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
+ 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；

> 在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

站在代码逻辑的角度就是：
1. webpack 在编译过代码程中，会触发一系列 Tapable 钩子事件。
2. 插件所做的，就是找到相应的钩子，往上面挂上自己的任务，也就是注册事件。
3. 这样，当 webpack 构建的时候，插件注册的事件就会随着钩子的触发而执行了。

流程图：

![avatar](https://champyin.com/images/webpack-basic-flow.png)
