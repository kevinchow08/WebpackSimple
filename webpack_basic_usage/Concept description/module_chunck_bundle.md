## webpack 中，module，chunk 和 bundle 的区别是什么？
### Module
首先来说module，Webpack可以看做是模块打包机，我们编写的任何文件，对于Webpack来说，都是一个个模块。
所以Webpack的配置文件，有一个module字段，module下有一个rules字段，rules下有就是处理模块的规则，配置哪类的模块，交由哪类loader来处理。

## Chunk
Chunk是Webpack打包过程中，一堆module的集合。
我们知道Webpack的打包是从一个入口文件开始，也可以说是入口模块。
入口模块引用这其他模块，模块再引用模块。Webpack通过引用关系逐个打包模块，这些module就形成了一个Chunk。
所以：我们有多个入口文件，可能会产出多条打包路径，一条路径就会形成一个Chunk。多条路径会形成多个Chunk。

### 产生Chunk的三种途径
+ entry入口
+ 异步加载模块
+ 代码分割（code spliting）

## Bundle
Bundle就是我们最终输出的一个或多个打包文件。
确实，大多数情况下，一个Chunk会生产一个Bundle。
但有时候也不完全是一对一的关系，比如我们把 devtool配置成'source-map'。然后只有一个入口文件，也不配置代码分割：

`
entry: {
main: __dirname + "/app/main.js",
},
output: {
path: __dirname + "/public",
filename: "[name].js",
},
devtool: 'source-map'
`

这样的配置，会产生一个Chunk，但是会产生两个bundle,多出一个.map文件的bundle。

所以：Chunk是过程中的代码块，Bundle是结果的代码块
