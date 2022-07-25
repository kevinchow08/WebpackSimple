// babel的工作原理：
/*
* 1，Parse（解析）：将源码通过词法分析，语法分析转换为AST语法树。
* 2，Transfor（转换）：通过遍历AST树的过程，对某些节点进行操作修改。
* 3，Generate（生成）：将上一步转换过的AST树结构生成新的代码
* */


const core = require('@babel/core')
// const ArrowFunction = require('@babel/plugin-transform-arrow-functions');
const ArrowFunction1 = require('./arrowFunctionPlugin.js')

// 输入
const sourceCode = `const arrowFunc = (a, b) => {
	console.log(this)
    return a + b
}`;

// 直接使用babel来对源码进行转换，实现原理就是上述的说明
// core.transform等同于esprima+estraverse+escodegen
const targetCode = core.transform(sourceCode, {
    // 但注意要指定插件，来做具体的转换操作。
    plugins: [ArrowFunction1]
})

console.log(targetCode.code)
/** 输出：
 ** var _this = this;
 ** 
 ** const arrowFunc = function () {
 **   console.log(_this);
 ** };
 */

// 自己动手实现一个babel插件：
// 首先，我们可以通过astexplorer分别输入我们的源代码和期望的编译后代码得到对应的AST结构。
// 之后，我们在对比这两棵树的结构从而在原有的AST基础上进行修改得到我们最终的AST。
// 剩下，应该就没有什么剩下的步骤了。babel transform方法会根据我们修改后的AST生成对应的源代码。

// 这里，我们发现对比input和output:

// output中将箭头函数的节点ArrowFunctionExpression替换成为了FunctionDeclaration。
// output中针对箭头函数的body，调用表达式声明ExpressionStatement时，传入的arguments从ThisExpression更换成了Identifier: this => _this
// 同时output在箭头函数同作用域内额外添加了一个变量声明，const _this = this

