module.exports = function (content) {
    console.log('此处开始处理css模块代码')
    console.log(content)
    // content此时大概率是对象形式，所以通过JSON.stringify来转换
    return `
        var str = ${JSON.stringify(content)}
        if (document) {
            var styleHtml = document.createElement('style')
            styleHtml.innerHTML = str
            document.head.appendChild(styleHtml)
        }
        exports.default = str
    `
}

// 注意：return 字符串的原因：loader的执行过程要放在依赖集合的执行函数中执行。
// 执行函数中的代码由eval()所包裹。所以此处自定义loader需返回字符串。
