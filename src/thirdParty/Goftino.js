const $ = require("jquery");

const hide = () => {
    try {
        window.addEventListener('goftino_ready', function () {
            let style = document.createElement("style");
            style.type = "text/css"
            style.id = "rotic-hotfix"
            style.appendChild(document.createTextNode(""));
            style.innerHTML = "#box-widget-icon { display: none !important; }"
            let frame = document.getElementById("goftino_w")

            frame.addEventListener("load", (e) => {
                e.target.contentDocument.head.appendChild(style)
            })

        });
    } catch (err) {
    }
}

const show = () => {
    try {
        let frame = document.getElementById("goftino_w")
        let style = frame.contentWindow.document.getElementById("rotic-hotfix")
        style.innerHTML = "#box-widget-icon { display: block !important; }"
    } catch (err) {
        console.log(err)
    }
}


const open = () => {
    try {
        let script = document.createElement("script");
        script.innerHTML = `
            Goftino.open(); 
        `
        document.body.appendChild(script)
    } catch (err) {}
}

module.exports = {
    hide,
    show,
    open
}