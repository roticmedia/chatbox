const $ = require("jquery");
const showdown = require("showdown")
const { v4 } = require("uuid")

var $rotic = $.noConflict();

const helper = require("./helper")
const {appendRemote, appendSelf, appendChatbox, appendButton, appendRemoteNoBtn} = require("./append");
const {setCookie, getCookie} = require("./cookie")
const {handleThirdParty} = require("./thirdParty/index");

showdown.setOption("openLinksInNewWindow", "true");
var converter = new showdown.Converter();

class rotic {
    constructor() {
        try {
            this.setting = JSON.parse(getCookie("__rotic-setting"))
        } catch (err) {
            this.setting = {
                driver: "goftino",
                left: 32,
                scroll: 0
            };
        }
        this.userData = null;
        this.isOpen = false;
    }
    open() {
        openChat()
    }
    close() {
        closeChat()
    }
    setUser(userName, phoneNumber, otherData) {
        this.userData = {
            userName,
            phoneNumber,
            otherData
        }
    }
    setDriver(driver) {
        try {
            this.setting.driver = driver.toLowerCase();
            setCookie("__rotic-setting", JSON.stringify({
                ...this.setting
            }))
            thirdParty = handleThirdParty(driver)
        } catch (err) {
            console.log(err)
        }
    }
    setLeft(amount) {
        try {
            this.setting.left = amount;
            setCookie("__rotic-setting", JSON.stringify({
                ...this.setting,
                left: amount
            }))
            if (this.setting.left) {
                $rotic(".rotic-chatbox").css("left", amount)
            }
        } catch (err) {
            console.log(err)
        }
    }
    setScroll(scroll) {
        this.setting.scroll = scroll;
        setCookie("__rotic-setting", JSON.stringify({
            ...this.setting,
            scroll
        }))
    }
}

let thirdParty = handleThirdParty("")
window.Rotic = new rotic();


const startEvent = new Event("rotic-start")


$rotic(document).ready(function () {
    let loaded = false;
    let welcomeMessage = "welcomeMessage";
    let checkScrolled = false;


    $rotic("body").append(appendChatbox());

    $rotic(".rotic-chat-window").scrollTop(10000000000000);
    window.dispatchEvent(startEvent);

    if (getCookie("__rotic-driver") !== "true") {
        thirdParty.hide();
    }

    window.addEventListener("goftino_ready", () => {
        try {
            Rotic.setDriver("goftino")
            loaded = true;
            if (getCookie("__rotic-driver") === "true") {
                $rotic("#rotic-btn-show").css("display", "none")
            }
        } catch (err) {
        }
    })
    window.addEventListener("raychat_ready", () => {
        try {
            Rotic.setDriver("raychat")
            loaded = true
            if (getCookie("__rotic-driver") === "true") {
                $rotic("#rotic-btn-show").css("display", "none")
            }
        } catch (err) {
        }
    })


    $rotic("#rotic-btn-show").click(function () {
        openChat()
    });
    $rotic(".rotic-close-text").click(function () {
        closeChat()
    });
    $(window).scroll(function (event) {
        let scroll = $(window).scrollTop();
        if (scroll > Rotic.setting.scroll && Rotic.setting.scroll !== 0) {
            if (checkScrolled === false) {
                checkScrolled = true;
                openChat();
            }
        }
    });

    var chats = getCookie("__rotic-bot");

    if (chats !== "") {
    } else {
        if (welcomeMessage !== "") {
            $rotic(".rotic-chat-window").append(
                appendRemoteNoBtn(converter.makeHtml(welcomeMessage))
            );
        }
    }
    $rotic(".rotic-chat-window").scrollTop(10000000000000);

    $rotic("#rotic-btn").click(function () {
        if ($rotic("#rotic-text").val().trim()) {
            const uuid = v4()
            $rotic(".rotic-chat-window").append(appendSelf($rotic("#rotic-text").val(), uuid));
            selfMessage(uuid)
            var text = $rotic("#rotic-text").val().trim();
            $rotic("#rotic-text").val("");
            $rotic(".rotic-chat-window").scrollTop(10000000000000);
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
                    data: text.trim(),
                    api: "6a105d7f17b029f067615f47b6e6b43211",
                    other: this.userData
                }),
                success: function (res) {
                    if (res.status && res.response != null) {
                        if (res.options.buttons !== null) {
                            $rotic(".rotic-chat-window").append(
                                appendRemote(converter.makeHtml(res.response), uuid)
                            );
                            $rotic(".rotic-chat-window").scrollTop(10000000000000);
                            setCookie(
                                "__rotic-bot",
                                getCookie("__rotic-bot") +
                                "text" +
                                "*" +
                                text +
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
                                appendRemote(converter.makeHtml(res.response), uuid)
                            );
                            setCookie(
                                "__rotic-bot",
                                getCookie("__rotic-bot") +
                                "text" +
                                "*" +
                                text +
                                " * " +
                                res.response +
                                " + "
                            );
                            $rotic(".rotic-chat-window").scrollTop(10000000000000);
                            $rotic("#rotic-text").focus();
                        }
                    } else {
                        if (loaded === true) {
                            $rotic(".rotic-chat-window").append(
                                appendRemote(converter.makeHtml("پاسخی برای شما یافت نشد!"))
                            );
                            $rotic(".rotic-chat-window").scrollTop(10000000000000);
                            setTimeout(() => {
                                $rotic(".rotic-chat-window").append(
                                    appendRemote(converter.makeHtml("تا 4 ثانیه آینده به کارشناس انسانی هدایت میشوید"))
                                );
                                $rotic(".rotic-chat-window").scrollTop(10000000000000);
                            }, 1000)

                            setTimeout(() => {
                                thirdParty.show();
                                thirdParty.open();
                                thirdParty.showInitMessage()

                                anime({
                                    targets: ".rotic-chatbox",
                                    translateY: {
                                        value: +624,
                                        easing: "easeInExpo",
                                    },
                                    opacity: {
                                        value: 0,
                                        easing: "easeInExpo",
                                    },
                                    duration: 1000,
                                });
                                Rotic.isOpen = false;

                            }, 5000)

                            setCookie(
                                "__rotic-bot",
                                getCookie("__rotic-bot") +
                                "text" +
                                "*" +
                                text +
                                " * " +
                                "null" +
                                " + "
                            );
                        }
                    }
                },
                error: function (e) {
                    $rotic(".rotic-chat-window").append(
                        appendRemote("مشکلی در اتصال اینترنت وجود دارد")
                    );
                    $rotic(".rotic-chat-window").scrollTop(10000000000000);
                    setCookie(
                        "__rotic-bot",
                        getCookie("__rotic-bot") +
                        "text" +
                        "*" +
                        text +
                        " * " +
                        decodeURIComponent(" مشکلی در اتصال اینترنت وجود دارد ") +
                        " + "
                    );
                    $rotic("#rotic-text").focus();
                },
            });
        }
    });
    $rotic(document).on("click", ".rotic-response-button", function (e) {
        const uuid = v4()
        const text = $rotic(e.target).text();
        $rotic(".rotic-chat-window").append(appendSelf($rotic(e.target).text(), uuid));
        $rotic(".rotic-chat-window").scrollTop(10000000000000);
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
                data: text.trim(),
                api: "6a105d7f17b029f067615f47b6e6b43211",
                other: this.userData
            }),
            success: function (res) {
                if (res.status && res.response != null) {
                    if (res.options.buttons) {
                        $rotic(".rotic-chat-window").append(appendRemote(res.response), uuid);
                        $rotic(".rotic-chat-window").scrollTop(10000000000000);
                        setCookie(
                            "__rotic-bot",
                            getCookie("__rotic-bot") +
                            "text" +
                            "*" +
                            text +
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
                                "+"
                            );
                        });
                    } else {
                        $rotic(".rotic-chat-window").append(appendRemote(res.response), uuid);
                        $rotic(".rotic-chat-window").scrollTop(10000000000000);
                        setCookie(
                            "__rotic-bot",
                            getCookie("__rotic-bot") +
                            "text" +
                            "*" +
                            text +
                            "*" +
                            res.response +
                            "+"
                        );
                        $rotic("#rotic-text").focus();
                    }
                } else {
                    if (loaded === true) {
                        $rotic(".rotic-chat-window").append(
                            appendRemote(converter.makeHtml("پاسخی برای شما یافت نشد!"))
                        );
                        $rotic(".rotic-chat-window").scrollTop(10000000000000);
                        setTimeout(() => {
                            $rotic(".rotic-chat-window").append(
                                appendRemote(converter.makeHtml("تا 4 ثانیه آینده به کارشناس انسانی هدایت میشوید"))
                            );
                            $rotic(".rotic-chat-window").scrollTop(10000000000000);
                        }, 1000)

                        setTimeout(() => {
                            thirdParty.show();
                            thirdParty.open();
                            thirdParty.showInitMessage()

                            anime({
                                targets: ".rotic-chatbox",
                                translateY: {
                                    value: +624,
                                    easing: "easeInExpo",
                                },
                                opacity: {
                                    value: 0,
                                    easing: "easeInExpo",
                                },
                                duration: 1000,
                            });
                            Rotic.isOpen = false;

                        }, 5000)

                        setCookie(
                            "__rotic-bot",
                            getCookie("__rotic-bot") +
                            "text" +
                            "*" +
                            text +
                            " * " +
                            "null" +
                            " + "
                        );
                    }
                }
            },
            error: function (e) {
                $rotic(".rotic-chat-window").append(
                    appendRemote("مشکلی در اتصال اینترنت وجود دارد")
                );
                $rotic(".rotic-chat-window").scrollTop(10000000000000);
                setCookie(
                    "__rotic-bot",
                    getCookie("__rotic-bot") +
                    "text" +
                    "*" +
                    text +
                    " * " +
                    decodeURIComponent(" مشکلی در اتصال اینترنت وجود دارد ") +
                    " + "
                );
                $rotic("#rotic-text").focus();
            },
        });
    });
});


const openChat = () => {
    $rotic(".rotic-chat-window").scrollTop(10000000000000);
    anime({
        targets: "#rotic-btn-show",
        translateY: {
            delay: 0,
            easing: "easeInExpo",
            value: 250,
            duration: 1000,
        },
        opacity: {
            value: 0,
            easing: "easeInExpo",
            duration: 900,
        },
    });
    if (Rotic.isOpen === false) {
        Rotic.isOpen = true;
        $rotic(".rotic-chatbox").css({
            visibility: "visible",
        });
        anime({
            targets: ".rotic-chatbox",
            translateY: {
                value: -624,
                easing: "easeOutExpo",
                delay: 1100,
            },
            opacity: {
                value: 1,
                easing: "easeOutExpo",
                delay: 1300,
            },
        });
    }
}
const closeChat = () => {
    anime({
        targets: ".rotic-chatbox",
        translateY: {
            value: +624,
            easing: "easeInExpo",
        },
        opacity: {
            value: 0,
            easing: "easeInExpo",
        },
        duration: 1000,
    });
    Rotic.isOpen = false;
    anime({
        targets: "#rotic-btn-show",
        translateY: {
            delay: 1100,
            easing: "easeOutExpo",
            value: 0,
            duration: 1000,
        },
        opacity: {
            value: 1,
            easing: "easeOutExpo",
            duration: 900,
            delay: 1300,
        },
    });
}
const selfMessage = (uuid) => {
    let el = document.querySelector(`[uuid="${uuid}"]`)
    console.log(el)
    anime({
        targets: el,
        translateX: {
            value: -16,
            duration: 1000,
            easing: "easeOutExpo",
        }
    })
}

