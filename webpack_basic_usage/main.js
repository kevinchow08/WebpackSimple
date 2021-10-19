// import '@babel/polyfill'
import { sum, mul } from "./js/math";
const { dateFormat, priceFormat } = require('./js/format')

import './js/test'
import './js/component'

console.log(sum(1, 2))
console.log(mul(2, 4))

console.log(dateFormat("1213"))
console.log(priceFormat("3123"))
