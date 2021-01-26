const $ = require("jquery");

const hide = () => {
    try {
        let style = document.createElement("style")
        style.type = "text/css"
        style.id = "rotic-hotfix"
        style.appendChild(document.createTextNode(""));
        style.innerHTML = "#raychatBtn { display: none !important; }"
        document.body.appendChild(style)
    } catch (err) {
    }
}

const show = () => {
    try {
        $("#rotic-hotfix")[0].disabled = true;

        var date = new Date()
        date.setTime(date.getTime() + 86400000)
        let expire = "expires=" + date.toUTCString();
        document.cookie = `__rotic-driver=true;${expire};path=/`
    } catch (err) {
    }
}

const open = () => {
    try {
        let script = document.createElement("script");
        script.id = "rotic-raycaht-open"
        script.innerHTML = `
            window.Raychat.open(); 
        `
        document.body.appendChild(script)
    } catch (err) {
    }
}

const showInitMessage = () => {
    try {
        setTimeout(() => {
            let script = document.createElement("script");
            script.id = "rotic-raycaht-message"
            script.innerHTML = `
            window.Raychat.sendOfflineMessage("شما از چت بات هوشمند روتیک به اینجا منتقل شدید"); 
        `
            document.body.appendChild(script)

            setTimeout(() => {
                let script1 = document.createElement("script");
                script1.id = "rotic-raycaht-message1"
                script1.innerHTML = `
                    window.Raychat.sendOfflineMessage("در خواست شما چیست"); 
                `
                document.body.appendChild(script1)
            }, 1000)
        }, 1000)

    } catch (err) {}
}

module.exports = {
    hide,
    showInitMessage,
    show,
    open
}