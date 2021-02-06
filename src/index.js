const $ = require("jquery");
const showdown = require("showdown")
const { v4 } = require("uuid")
const anime = require("./util/anime")

var $rotic = $.noConflict();

const helper = require("./helper")
const append = require("./append");
const {setCookie, getCookie} = require("./cookie")
const {handleThirdParty} = require("./thirdParty/index");
const unique_token = require("./util/unique_token")
const resolve = require("./request/resolve")
const storage = require("./util/localStorage")
const font = require("./util/font")()

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
    setUser(username, name, otherData) {
        this.userData = {
            username,
            name,
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

Rotic.setDriver("");
const startEvent = new Event("rotic-start")

let welcomeMessage = "welcome_message";
let toastMessages = "toast_message".split(",,").reverse();
let welcomeButton = "welcome_button".split(",");
let checkScrolled = false;
let chats = getCookie("__rotic-bot");
let uniqueToken = 0;
let toasted = false;
(async () => {
    uniqueToken = await unique_token();
})()

$rotic(document).ready(function () {
    $rotic("body").append(append.Chatbox());

    $rotic(".rotic-chat-window").append(
        append.Image(test)
    );
    window.dispatchEvent(startEvent);

    if (getCookie("__rotic-driver") !== "true") {
        thirdParty.hide();
    } else if (Rotic.setting.driver !== ""){
        setCookie("__rotic-driver", "false")
        $rotic("#rotic-btn-show").css("display", "none")
    }

    window.addEventListener("goftino_ready", () => {
        try {
            Rotic.setDriver("goftino")
            if (getCookie("__rotic-driver") === "true") {
                $rotic("#rotic-btn-show").css("display", "none")
            }
        } catch (err) {
        }
    })
    window.addEventListener("raychat_ready", () => {
        try {
            Rotic.setDriver("raychat")
            if (getCookie("__rotic-driver") === "true") {
                $rotic("#rotic-btn-show").css("display", "none")
            }
        } catch (err) {
        }
    })


    $rotic("#rotic-btn-show").click(function () {
        openChat()
        if (toasted === true) {
            toastEndAnimation()
            toasted = false;
        }
    });
    $rotic(".rotic-close-text").click(function () {
        closeChat()
    });
    $(window).scroll(function (event) {
        let scroll = $(window).scrollTop();
        if (scroll > Rotic.setting.scroll && Rotic.setting.scroll !== 0) {
            if (checkScrolled === false) {
                checkScrolled = true;
                toastMessages.forEach((toastMessage, index) => {
                    toast(toastMessage, 40, 100 + (index * 40))
                })
                toasted = true;
            }
        }
    });

    if (chats !== "") {
    }


    if (welcomeMessage !== "") {
        $rotic(".rotic-chat-window").append(
            append.RemoteNoBtnNoAnimation(converter.makeHtml(welcomeMessage))
        );
    }
    if (welcomeButton.length > 0) {
        welcomeButton.forEach((button) => {
            $rotic(".rotic-chat-window").append(
                append.ButtonNoAnimation(button, button)
            );
        })
    }


    $rotic("#rotic-btn").click(function () {
        if ($rotic("#rotic-text").val().trim()) {
            const uuid = v4()
            $rotic(".rotic-chat-window").append(append.Self($rotic("#rotic-text").val(), uuid));
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
                    user_data: this.userData
                }),
                success: function (res) {
                    if (res.status && res.response != null) {
                        $rotic(".rotic-chat-window").append(
                            append.Remote(converter.makeHtml(res.response), uuid)
                        );
                        remoteMessage(uuid)
                        $rotic(".rotic-chat-window").scrollTop(10000000000000);
                        storage.set(text, res.response, res.options.buttons)
                        $rotic("#rotic-text").focus();

                        if (res.options.buttons) {
                            JSON.parse(res.options.buttons).forEach(function (chat) {
                                $rotic(".rotic-chat-window").append(
                                    append.Button(Object.keys(chat)[0])
                                );
                                $rotic(".rotic-chat-window").scrollTop(10000000000000);
                            });
                            buttonAnimation(uuid)
                        }
                        if (res.options.images) {
                            JSON.parse(res.options.images).forEach(function (chat) {
                                $rotic(".rotic-chat-window").append(
                                    append.Image(chat, uuid)
                                );
                                $rotic(".rotic-chat-window").scrollTop(10000000000000);
                            });
                        }
                    } else {
                        handleNull(text, uuid);
                    }
                },
                error: function (e) {
                    $rotic(".rotic-chat-window").append(
                        append.RemoteNoBtn("مشکلی در اتصال اینترنت وجود دارد" , uuid)
                    );
                    remoteMessage(uuid)
                    $rotic(".rotic-chat-window").scrollTop(10000000000000);
                    $rotic("#rotic-text").focus();
                },
            });
        } else {
            $rotic("#rotic-text").focus();
        }
    });
    $rotic(document).on("click", ".rotic-response-button", function (e) {
        const uuid = v4()
        const text = $rotic(e.target).text();
        $rotic(".rotic-chat-window").append(append.Self($rotic(e.target).text(), uuid));
        selfMessage(uuid)
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
                user_data: this.userData
            }),
            success: function (res) {
                if (res.status && res.response != null) {
                    $rotic(".rotic-chat-window").append(
                        append.Remote(converter.makeHtml(res.response), uuid)
                    );
                    remoteMessage(uuid)
                    $rotic(".rotic-chat-window").scrollTop(10000000000000);
                    storage.set(text, res.response, res.options.buttons)
                    $rotic("#rotic-text").focus();

                    if (res.options.buttons) {
                        JSON.parse(res.options.buttons).forEach(function (chat) {
                            $rotic(".rotic-chat-window").append(
                                append.Button(Object.keys(chat)[0])
                            );
                            $rotic(".rotic-chat-window").scrollTop(10000000000000);
                        });
                        buttonAnimation(uuid)
                    }
                    if (res.options.images) {
                        JSON.parse(res.options.images).forEach(function (chat) {
                            $rotic(".rotic-chat-window").append(
                                append.Image(chat, uuid)
                            );
                            $rotic(".rotic-chat-window").scrollTop(10000000000000);
                        });
                    }
                } else {
                    handleNull(text, uuid)
                }
            },
            error: function (e) {
                $rotic(".rotic-chat-window").append(
                    append.Remote("مشکلی در اتصال اینترنت وجود دارد", uuid)
                );
                remoteMessage(uuid)
                $rotic(".rotic-chat-window").scrollTop(10000000000000);
                $rotic("#rotic-text").focus();
            },
        });
    });
    $rotic(document).on("click", ".rotic-resolve", (e) => {
        resolve(uniqueToken);
    })
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
const closeForever = () => {
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
}
const selfMessage = (uuid) => {
    let el = document.querySelectorAll(`[uuid="${uuid}"]`)
    anime({
        targets: el[0].querySelector(".rotic-msg-self .rotic-msg-box"),
        translateX: {
            value: -16,
            duration: 500,
            easing: "easeOutExpo",
        },
        opacity: {
            value: 1,
            duration: 500,
            easing: "easeOutExpo"
        }
    })

}
const remoteMessage = (uuid) => {
    let el = document.querySelectorAll(`[uuid="${uuid}"]`)
    anime({
        targets: el[1].querySelector(".rotic-msg-remote .rotic-msg-box"),
        translateX: {
            value: 16,
            duration: 500,
            easing: "easeOutExpo",
        },
        opacity: {
            value: 1,
            duration: 500,
            easing: "easeOutExpo"
        }
    })
    if (el[2]) {
        anime({
            targets: el[2].querySelector(".rotic-msg-remote .rotic-msg-box"),
            translateX: {
                value: 16,
                duration: 500,
                easing: "easeOutExpo",
            },
            opacity: {
                value: 1,
                duration: 500,
                easing: "easeOutExpo"
            }
        })
    }
}
const buttonAnimation = (uuid) => {
    let el = document.querySelectorAll(`button[uuid="${uuid}"]`)
    anime({
        targets: el,
        translateX: {
            value: 16,
            duration: 500,
            easing: "easeOutExpo",
        },
        opacity: {
            value: 1,
            duration: 500,
            easing: "easeOutExpo"
        }
    })
}
const toastStartAnimation = () => {
    anime({
        targets: document.querySelectorAll(".rotic-chatbox-toast"),
        opacity: {
            value: 1,
            duration: 400,
            easing: "easeOutExpo"
        },
    })
}
const toastEndAnimation = () => {
    anime({
        targets: document.querySelectorAll(".rotic-chatbox-toast"),
        opacity: {
            value: 0,
            duration: 400,
            easing: "easeOutExpo"
        },
        complete: () => {
            $rotic(".rotic-chatbox-toast").css("display", "none")
        }
    })
}
const handleNull = (text, uuid) => {
    storage.set(text, null)
    if (Rotic.setting.driver === "") {
        $rotic(".rotic-chat-window").append(
            append.RemoteNoBtn(converter.makeHtml("برای دریافت پاسخ مناسب از روتیک لطفا با شماره تماس ۰۲۵۹۱۰۱۴۷۸۴ و یا ایمیل support@rotic.ir در ارتباط باشید"), uuid)
        );
        remoteMessage(uuid)
        $rotic(".rotic-chat-window").scrollTop(10000000000000);
        return;
    }
    resolve(getCookie("__utok"));
    $rotic(".rotic-chat-window").append(
        appendRemoteNoBtn(converter.makeHtml("پاسخی برای شما یافت نشد!"), uuid)
    );
    remoteMessage(uuid)
    $rotic(".rotic-chat-window").scrollTop(10000000000000);
    setTimeout(() => {
        $rotic(".rotic-chat-window").append(
            appendRemoteNoBtn(converter.makeHtml("تا 4 ثانیه آینده به کارشناس انسانی هدایت میشوید"), uuid)
        );
        remoteMessage(uuid)
        $rotic(".rotic-chat-window").scrollTop(10000000000000);
    }, 1000)

    setTimeout(() => {
        thirdParty.show();
        thirdParty.open();
        thirdParty.showInitMessage(text)
        closeForever()
        Rotic.isOpen = false;
    }, 3000)
}
const toast = (message, x, y) => {
    if (Rotic.isOpen === false) {
        $rotic("body").append(appendToast(message, x, y));
        toastStartAnimation();
    }
    $rotic(".rotic-chatbox-toast").click(() => {
        toastEndAnimation()
        openChat()
    })
}

let test = "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"

