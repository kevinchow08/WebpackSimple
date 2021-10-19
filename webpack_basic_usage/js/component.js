import "../css/index.css";
import "../css/component.less";

const component = () => {
    const element = document.createElement('div')

    element.innerHTML = ['Hello', 'Webpack'].join(' ')
    element.className = 'content'

    return element
}
document.getElementById('app').appendChild(component())
