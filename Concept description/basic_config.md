# 基本配置的简要说明

1. 首先针对css, js, html，图片，文件 来进行相应的配置
    + 打包html需要用到`html-webpack-plugin`这个插件，根据对应模板输出html。输出的html自动引入打包后的js文件
    
    + 处理css需要用到: `css-loader`使webpack具有打包css的能力.  `style-loader` 会将 `css-loader`处理后的结果插入style标签中，放进文档之中使用.`mini-css-extract-plugin`：可将css代码打包成一个单独的css文件.
    + 处理图片,文件可用`file-loader`,`url-loader`,但webpack5可以使用asset-module来处理.

    ```js
    module: {
      rules: [
        // 刚刚的代码...
        {
          // 匹配文件后缀的规则
          test: /\.(png|jpe?g|gif|svg|webp)$/,
          type: 'asset',
          parser: {
            // 转base64的条件
            dataUrlCondition: {
               maxSize: 25 * 1024, // 25kb
            }
          },
          generator: {
            // 打包到 dist/image 文件下
           filename: 'images/[contenthash][ext][query]',
          },
       }
      ]
    }
    ```

    + babel可以将我们项目中的高级语法转化成比较低级的语法，比如可以将ES6转为ES5. 安装所需的包：
        1. `@babel/core、babel-loader`：转换语法的工具.
        2. `@babel/preset-env`：转换的一套现成规则(babel的插件集合).
        3. `@babel/plugin-transform-runtime`：转换async/await所需插件

    ```js
    // webpack.config.js
    module: {
      rules: [
        {
          // 匹配js后缀文件
          test: /\.js$/,
          // 排除node_modules中的js
          exclude: /node_modules/,
          use: [
             // 可以看作是babel与webpack沟通桥梁,具体的转换操作都是用@babel/core和babel插件
            'babel-loader'
          ],
        }
      ]
    }

    // babel.config.js
    module.exports = {
      presets: [
        // 配置规则
        "@babel/preset-env"
      ],
      // 配置插件
      plugins: ["@babel/plugin-transform-runtime"]
    }
    ```

    + `babel-prest-env` 仅仅只会转化最新的es语法，并不会转化对应的Api和实例方法,比如说 `ES6` 中的`Array.from`静态方法。babel是不会转译这个方法的，如果想在低版本浏览器中识别并且运行`Array.from`方法达到我们的预期就需要额外引入`@babel/polyfill`进行在`Array`上添加实现这个方法。

    + 应用@babel/polyfill: 在`babel-preset-env`中存在一个useBuiltIns参数，这个参数决定了如何在`preset-env`中使用`@babel/polyfill`
    ```js
    {
        "presets": [
            ["@babel/preset-env", {
                "useBuiltIns": false
                // useBuiltIns--"usage"| "entry"| false
            }]
        ]
    }
    ```
    + 当我们使用preset-env传入useBuiltIns参数时候，默认为false。它表示仅仅会转化最新的ES语法，并不会转化任何Api和方法。

    + 当传入entry时，需要我们在项目入口文件中手动引入一次`@babel/polyfill`，它会根据我们配置的浏览器兼容性列表(browserList)然后全量引入不兼容的polyfill。

    + 当我们配置useBuintIns:usage时，会根据配置的浏览器兼容，以及代码中 使用到的Api 进行引入polyfill按需添加。
    当使用usage时，我们不需要额外在项目入口中引入polyfill了，它会根据我们项目中使用到的进行按需引入。
    ```js
    {
        "presets": [
            ["@babel/preset-env", {
                "useBuiltIns": "usage",
                // 指定core-js的版本
                "core-js": 3
            }]
        ]
    }
    ```
2. 配置路径别名

```js
module.exports = {
  // 刚才的代码...
  resolve: {
    // 路径别名
    alias: {
      '@': path.resolve('./src'),
      assets: '~/assets',
      tools: '~/tools'
    },
    // 引入文件时省略后缀
    extensions: ['.js', '.ts', '.less', '.vue'],
  },
}
```

3. 配置devServer方便开发调试.

4. 区分环境:
    + 通过属性`mode: development | production`来区分打包环境.
    + 可以编写多个配置文件,其中`webpack.base.js`为各个环境共用的配置. 安装插件`webpack-merge`,可以将不同环境的配置与`webpack.base.js`进行合并后使用.

5. 环境变量: 配置devlopment、production这两个环境的环境变量
    ```js
    // webpack.dev.js
    const webpack = require('webpack')

    module.exports = merge(base, {
      // 刚才的代码...
      plugins: [
        // 定义全局变量
        new webpack.DefinePlugin({
          process: {
            env: {
              NODE_DEV: JSON.stringify('development'),
            },
          },
        }),
      ]
    })
    ```

6.  source-map的作用：代码报错时，能快速定位到出错位置. 相当于源码与构建后的代码的一个映射关系.
    + development：使用eval-cheap-module-source-map模式，能具体定位到源码位置和源码展示，适合开发模式，体积较小
    + production：使用nosources-source-map，只能定位源码位置，不用源码展示，体积较小，适合生产模式
    + map文件只要不打开开发者工具，浏览器是不会加载的。
    ```js
    // webpack.dev.js

    // 刚才的代码...
    module.exports = merge(base, {
      // 刚才的代码...
      devtool: 'eval-cheap-module-source-map'
    })
    
    
    // webpack.prod.js
    
    // 刚才的代码...
    module.exports = merge(base, {
      // 刚才的代码...
      devtool: 'nosources-source-map'
    })
    ```