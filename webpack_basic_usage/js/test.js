// 有些浏览器不支持Promise新特性。需要使用polyfill来补齐API
// 注意：直接引入@babel/polyfill，会使得js打包体积突增，要考虑按需引入
const p = Promise.resolve('Hello Promise')
p.then(res => {
    console.log(res)
})

console.log('Hello Word')
