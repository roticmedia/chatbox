const Goftino = require("./Goftino")
const Raychat = require("./Raychat")
const Crisp = require("./Crisp")

const handleThirdParty = (driver) => {
    try {
        if (driver === "goftino") {
            return Goftino;
        } else if (driver === "raychat") {
            return Raychat;
        } else if (driver === "crisp") {
            return Crisp;
        } else {
            return {
                hide: () => {
                    let style = document.createElement("style");
                    style.type = "text/css"
                    style.id = "rotic-hotfix"
                    style.appendChild(document.createTextNode(""));
                    style.innerHTML = "#goftino_w { display: none !important; }"
                    style.innerHTML += "#raychatBtn { display: none !important; }"
                    document.body.appendChild(style)
                },
                show: () => {
                },
                open: () => {
                },
                showInitMessage: () => {
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    handleThirdParty
}