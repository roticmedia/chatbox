const hide = () => {
    try {
        let style = document.createElement("style");
        style.type = "text/css"
        style.id = "rotic-hotfix"
        style.appendChild(document.createTextNode(""));
        style.innerHTML = "#imber-top-parent { display: none !important; }"
        document.body.appendChild(style)

    } catch (err) {
    }
}

const show = () => {
    try {
        document.querySelector("#rotic-hotfix").disabled = true;

        var date = new Date()
        date.setTime(date.getTime() + 86400000)
        let expire = "expires=" + date.toUTCString();
        document.cookie = `__rotic-driver=true;${expire};path=/`
    } catch (err) {
        console.log(err)
    }
}

const open = () => {
    try {} catch (err) {}
}

const showInitMessage = () => {
    try {} catch (err) {}
}

module.exports = {
    hide,
    show,
    open,
    showInitMessage
}

