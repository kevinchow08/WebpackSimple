// 配置文件的作用是用来简化命令行选项的
// 配置文件是以Common.js规范来进行组织的
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'boundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    // 处理js语法转换,补齐API
                    loader: 'babel-loader',
                    // 排除不需要打包的文件
                    options: {
                        presets: [['@babel/preset-env', {
                            // 有三个参数可选：
                            // entry: 需要在入口文件引入 import '@babel/polyfill'
                            // usage: 不需要import，就可以实现按需使用polyfill，但要安装
                            // false: 不使用按需使用polyfill，导致打包后的文件体积过大。
                            useBuiltIns: 'usage',
                            // polyfill依赖core-js，指定core-js的版本
                            corejs: {
                                version: 2
                            },
                            // 指定兼容到哪个版本的浏览器
                            targets: {
                                chrome: '60',
                                firefox: '60'
                            }
                        }]]
                    }
                }
            },
            {
                test: /\.css$/,
                // loader的使用顺序由后到前
                // css-loader:将样式文件转换成CommonJs模块，加载到JS中
                // style-loader: 将Js中的样式文件，嵌入到页面style标签内.有几个样式文件就插入几个style标签。
                // use: ['style-loader', 'css-loader']
                use: [
                    // 将js中的样式内容打包到独立的css文件中
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [require('autoprefixer')]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                // 由后向前执行loader
                // use: ['style-loader', 'css-loader', 'less-loader']
                use: [
                    // 将js中的样式内容打包到独立的css文件中
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.png|gif|jpe?g$/,
                // 资源模块处理图片，字体的打包
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024
                    }
                },
                generator: {
                    filename: 'image/[name][ext]'
                }
            }
            // {
            //     test: /\.png|gif|jpe?g$/,
            //     use: {
            //         loader: 'url-loader',
            //         options: {
            //             limit: 8 * 1024,
            //             name: "[name].[contentHash:8].[ext]",
            //             outputPath: "image"
            //         }
            //     }
            // }
        ]
    },
    plugins: [
      new MiniCssExtractPlugin({
          // 生成单独css文件位置路径
          filename: './css/[name].css'
      }),
        // 用来创建html文件，创建后的文件自动引入打包后的所有资源文件js，css
      new HtmlWebpackPlugin({
        template: './public/index.html'
      }),
      // 压缩 打包后的css代码
      new OptimizeCssAssetsPlugin()
    ],
    mode: 'none'
}
