const path = require('path')

module.exports = {
    entry: './src/index.js',
    // 没有css-loader的情况下，css依赖无法执行。
    // css文件内容肯定不能作为js的函数的内容进行执行，原来这就是只支持打包js文件的原因
    // (因为所有的内容最后都会放到js函数中来执行,非js内容不能执行，因此就不能打包)。

    // 解决：进一步把加载的css内容变成js支持的。
    // 比如我们能不能用一个变量来接收这些内容，这样就是一个普通的js语句
    /*
    * const str = `body {
        background: red;
      }`
    * */

    // loader的路径解析：默认走node_modules中的依赖模块，没有则走自定义路径下的模块。
    resolveLoader: {
        modules: ['node_modules', './src/loaders']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // 但要注意，webpack规定，loader要符合单一功能原则：
                // 也就是loader只能实现一个功能。
                // 比如less-loader用来处理less文件，css-loader用来处理css文件，style-loader用来将样式插入到style标签中，这些功能虽然可以放到一个loader中实现。
                // 但是为了确保loader的功能纯粹，能够让不同loader各司其职，同时进行功能组合，最好每个loader只负责一个功能
                // use: 'process-css'

                // 多个loader的使用规则：
                // 最后的一个loader，第一个被调用，它将接受文件最原始的内容
                // 第一个loader，最后一个被调用，它将接收最终的javascript代码和可选的sourceMap文件
                // 中间的loader，只接收上一个loader返回的文件内容
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                // loader使用参数：
                use: {
                    loader: 'replace-loader',
                    options: {
                        name: 'kevin',
                        address: 'Chinese'
                    }
                }
            }
        ]
    },
    // Webpack 中进行代码分割的方式有三个:
    // 多入口打包:配置 entry 加载多个入口文件
    // 提取公用模块:optimization.splitChunks.chunks: all
    // 动态导入:按需加载 | 预加载
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    mode: 'development'
}
