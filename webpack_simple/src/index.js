import "./style.css";
let action = require("./action.js").action;   // 引入aciton.js
let name = require("./name.js").name;         // 引入name.js

let message = `${name} is ${action}`;
// console.log(message);

const element = document.createElement('div')
element.innerHTML = message
element.className = 'content'

document.getElementById('app').appendChild(element)
element.addEventListener('click', () => {
    import('./async1').then(() => {
        console.log('async1 加载完毕')
    })
    import('./async2').then(() => {
        console.log('async2 加载完毕')
    })
})
