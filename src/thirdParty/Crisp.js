const $ = require("jquery")

const hide = () => {
    let style = document.createElement("style");
    style.type = "text/css"
    style.id = "rotic-crisp-hide"
    style.appendChild(document.createTextNode(""));
    style.innerHTML = ".crisp-client { display: none !important; }"
    document.body.appendChild(style)
}

const show = () => {
    $("#rotic-crisp-hide")[0].disabled = true;

    var date = new Date()
    date.setTime(date.getTime() + 86400000)
    let expire = "expires=" + date.toUTCString();
    document.cookie = `__rotic-driver=true;${expire};path=/`
}

const open = () => {

}

const showInitMessage = () => {

}

module.exports = {
    hide,
    show,
    showInitMessage,
    open
}