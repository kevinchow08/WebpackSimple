// Common.js 引入，导出方式
// let familyName = require("./family-name.js").name;
// exports.name = `${familyName} 坟都人，在Shenzhen`;

// EsModule 引入，导出方式
import familyName from './family-name.js'
const name = familyName
console.log(name)
export {
    name
}
