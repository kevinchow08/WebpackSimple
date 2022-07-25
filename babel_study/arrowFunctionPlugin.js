const types = require('@babel/types')

function ArrowFunctionExpression(nodePath) {
    const node = nodePath.node
    hoistFunctionEnvironment(nodePath)
    node.type = 'FunctionExpression'
}

function hoistFunctionEnvironment(path) {
    // 寻找箭头函数所在的上一层作用域
    const thisEnv = path.findParent((p) => {
        return !p.isArrowFunctionExpression && p.isFunction() || p.isProgram()
    })

    // 寻找哪些地方用到了this
    const thisPaths = getScopeInfoInformation(path)

    thisEnv.scope.push({
        id: types.identifier('_this'),
        init: types.thisExpression()
    })

    thisPaths.forEach((thisPath) => {
        const replaceNode = types.identifier('_this')
        thisPath.replaceWith(replaceNode)
    })
    
}

function getScopeInfoInformation(path) {
    const thisPaths = []
    path.traverse({
        ThisExpression(thisPath) {
            thisPaths.push(thisPath)
        }
    })
    return thisPaths
}
module.exports = {
    visitor: {
        // 用来匹配源码转成AST后的节点类型
        ArrowFunctionExpression
    }
}