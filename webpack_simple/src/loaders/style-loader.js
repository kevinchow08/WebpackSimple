module.exports = function (content) {
    // console.log(content)
    return `
        if (document) {
            var styleHtml = document.createElement('style')
            styleHtml.innerHTML = ${content}
            document.head.appendChild(styleHtml)
        }
    `
}
