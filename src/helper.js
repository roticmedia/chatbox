const $ = require("jquery");
var $rotic = $.noConflict();
const showdown = require("showdown")
showdown.setOption("openLinksInNewWindow", "true");
var converter = new showdown.Converter();


const { appendRemote, appendSelf, appendChatbox, appendButton } = require("./append")
const { setCookie, getCookie } = require("./cookie")

const initRequest = () => {
    $rotic.ajax({
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        dataType: "json",
        crossDomain: true,
        url:
            "https://rotic.ir/api/v4/services/6a105d7f17b029f067615f47b6e6b432/ai",
        data: JSON.stringify({
            data: "سلام",
            api: "6a105d7f17b029f067615f47b6e6b43211",
            other: ""
        }),
        success: function (res) {
            if (res.status && res.response != null) {
                if (res.options.buttons !== null) {
                    $rotic(".rotic-chat-window").append(
                        appendRemote(converter.makeHtml(res.response))
                    );
                    $rotic(".rotic-chat-window").scrollTop(10000000000000);
                    setCookie(
                        "__rotic-bot",
                        getCookie("__rotic-bot") +
                        "text" +
                        "*" +
                        "" +
                        "*" +
                        res.response +
                        "+"
                    );
                    $rotic("#rotic-text").focus();
                    JSON.parse(res.options.buttons).forEach(function (chat) {
                        $rotic(".rotic-chat-window").append(
                            appendButton(Object.keys(chat)[0])
                        );
                        $rotic(".rotic-chat-window").scrollTop(10000000000000);
                        setCookie(
                            "__rotic-bot",
                            getCookie("__rotic-bot") +
                            "button" +
                            "*" +
                            Object.keys(chat)[0] +
                            "*" +
                            Object.values(chat)[0] +
                            " + "
                        );
                    });
                } else {
                    $rotic(".rotic-chat-window").append(
                        appendRemote(converter.makeHtml(res.response))
                    );
                    setCookie(
                        "__rotic-bot",
                        getCookie("__rotic-bot") +
                        "text" +
                        "*" +
                        "" +
                        " * " +
                        res.response +
                        " + "
                    );
                    $rotic(".rotic-chat-window").scrollTop(10000000000000);
                    $rotic("#rotic-text").focus();
                }
            }
        },
    });
}

module.exports = {
    initRequest
}