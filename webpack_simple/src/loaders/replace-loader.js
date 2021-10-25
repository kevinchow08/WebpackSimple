module.exports = function (source) {
    // console.log(source)
    // console.log(this.query)
    var content = source.replace('凯文', this.query.name).replace('坟都人', this.query.address)
    // return content
    this.callback(null, content)
}

// loader返回值
/*
* callback({
    // 报错
    error: Error | Null,
    // 转换后的内容
    content: String | Buffer,
    // 转换后的内容得出的sourceMap
    sourceMap?: SourceMap,
    // ast
    abstractSyntaxTree?: AST
})
* */

// 多个返回值时用this.callback

// 异步loader处理：
// 可以在主逻辑使用await，async。
// 也可以this.async(null, content, SourceMap)作为返回值。    async用来处理异步loader
