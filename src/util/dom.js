const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);
const stringToNode = (string) => {
    return new DOMParser().parseFromString(string, "text/html").body.childNodes[0]
}
const appendTo = (el) => {
    document.querySelector(".rotic-chat-window").insertAdjacentHTML('beforeend', el)
}

module.exports = {
    select,
    selectAll,
    stringToNode,
    appendTo
}