// 打包器核心代码：
// 将项目中所有的文件生成一个大的模块集合
// 模块执行函数。遇到引入模块时，执行对应的函数。
const fs = require("fs")
const path = require("path")

/*
* 1，生成模块集合
    1.1，给每个文件内容加壳
    1.2，每个模块以路径作为模块id
    1.3，将所有的模块合在一起形成一个集合
* */

// 给文件加壳
const fileToModule = (path) => {
    // 同步读取文件
    const fileContent = fs.readFileSync(path).toString().trim()
    return {
        moduleId: path,
        dependencies: getDependencies(fileContent),
        code: `function(module, exports, require) {
            ${fileContent}
        }`
        // code: `(export, require) => {
        //     ${fileContent}
        // }`
    }
}
// 单个文件转module测试：
// const result = fileToModule('../src/index.js')
// modules[result.moduleId] = result.code
// console.log('modules =', modules)

// 获取当前文件内容中的所有依赖
const getDependencies = (fileContent) => {
    const reg = /require\(['"](.+?)['"]\)/g;
    const result = fileContent.matchAll(reg)
    const dependencies = []
    for (let v of result) {
        dependencies.push(v[1])
    }
    return dependencies
}

/*
* 将所有的模块合在一起形成一个集合
* 入参：入口文件的路径
* 关键点：层序遍历获取所有模块
* 返回：生成一个模块集合
* */
const createGraph = (indexPath) => {
    const module = fileToModule(indexPath)
    // 定义一个队列,放入由入口文件解析成module的对象
    const queue = [module]

    // 判断队列中module的依赖字段，存在则向队列中插入module
    // 目的：获取由index.js开始的所有依赖模块从而生成一个集合
    // 层序遍历整个依赖树结构 =》 广度优先搜索
    for (let v of queue) {
        // 当前文件路径所在的目录名
        const dirname = path.dirname(v.moduleId)
        v.dependencies.forEach(pathItem => {
            const requireName = path.join(dirname, pathItem)
            const child = fileToModule(requireName)
            queue.push(child)
        })
    }
    // 此时的queue就已经收集了目前所有引用到的模块
    // console.log(queue)

    // 将queue转对象，变成打包后需要的集合形式：
    let modules = {}

    queue.forEach(item => {
        modules[`${item.moduleId}`] = item.code
    })
    return modules
}

// 记录生成依赖集合
let modules = createGraph('../src/index.js')

/*
* 模块执行函数
* 执行模块中的代码内容,执行过程中往exports中赋值属性
* 描述：这就是一个递归的过程，不断查找依赖，然后执行对应的函数
* 返回：exports
* */

/*
* 描述下执行过程：从入口函数开始调用模块执行函数，遇到require(./action.js)依赖则继续调用模块执行函数，直到没有遇到依赖为止（递归的边界条件）
* */

// 定义一个缓存对象，用来存储已经执行过的模块的导出对象
// 用moduleId作为key，exports作为value
const module_cache = {}

const exec = (moduleId) => {
    // 首先检查是否有模块缓存
    // 有缓存的情况下直接返回exports对象，不进行模块中的代码执行。
    // 目的：防止require循环引用导致的循环执行。
    if (module_cache[moduleId]) {
        return module_cache.exports
    }

    // 再没有缓存模块的情况下，创建一个新的模块，export对象用来接收模块导出的属性
    const module = module_cache[moduleId] = {
        exports: {}
    }
    const simple_require = (filename) => {
        const dirname = path.dirname(moduleId)
        const execPath = path.join(dirname, filename)
        return exec(execPath)
    }
    // 获取当前模块对应的code片段
    // const fn = modules[moduleId]
    // fn(module, module.exports, simple_require)

    // 执行当前模块对应的code片段
    modules[moduleId](module, module.exports, simple_require)
    return module.exports
}

// exec('../src/index.js')

// 生成bundle文件。
const createBundle = (modules) => {
    // 将modules依赖集合转成字符串形式，再写入文件
    let _modules = ''
    for (let moduleId in modules) {
        // _modules += `` + `${modules[moduleId]}`
        _modules += `\n"${moduleId}": ` + modules[moduleId] + ','
    }
    const result = `var simple_modules = {${_modules}}
var module_cache = {}
function exec(moduleId) {
    if (module_cache[moduleId]) {
        return module_cache.exports
    }
    var module = module_cache[moduleId] = {
        exports: {}
    }
    var simple_require = function(filename) {
        var dirname = path.dirname(moduleId)
        var execPath = path.join(dirname, filename)
        return exec(execPath)
    }
    simple_modules[moduleId](module, module.exports, simple_require)
    return module.exports
}
exec('../src/index.js')
`
    // 写入文件
    fs.mkdirSync('../dist')
    fs.writeFileSync('../dist/bundle.js', result)
}
//  入参：入口文件相对路径
// entry，input可通过配置文件获取
createBundle(modules)
