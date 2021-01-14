const $ = require("jquery");



const hide = () => {
    try {
        window.addEventListener('goftino_ready', function () {
            let style = document.createElement("style");
            style.type = "text/css"
            style.id = "rotic-hotfix"
            style.appendChild(document.createTextNode(""));
            style.innerHTML = "#goftino_w { display: none !important; }"
            document.body.appendChild(style)
        });
    } catch (err) {
    }
}

const show = () => {
    try {
        let style = document.getElementById("rotic-hotfix")
        style.innerHTML = "#goftino_w { display: block !important; }"
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