// js转AST语法树
const esprima = require('esprima')
// 深度遍历AST语法树，并对某个树节点进行操作
const estraverse = require('estraverse')
// 把修改过的AST语法树生成js代码
const escodegen = require('escodegen')

const program = 'let a = 1'
const AST = esprima.parseScript(program)
console.log(AST)

let indent = 0
const padding = () => {
    return ' '.repeat(indent)
}

estraverse.traverse(AST, {
    enter: (node) => {
        console.log(padding() + node.type + '进入')
        if (node.type === 'VariableDeclarator' && node.id) {
            node.id.name = 'b'
        }
        indent += 2
    },
    leave: (node) => {
        indent -= 2
        console.log(padding() + node.type + '离开')
    }
})

const result = escodegen.generate(AST)
console.log(result)
