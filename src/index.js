const $ = require("jquery");
const showdown = require("showdown")
const { v4 } = require("uuid")
const anime = require("./util/anime")

var $rotic = $.noConflict();

const append = require("./append");
const {setCookie, getCookie} = require("./util/cookie")
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
    setCookie("_utok", uniqueToken)
})()

$rotic(document).ready(function () {
    $rotic("body").append(append.Chatbox());

    $rotic(".rotic-chat-window").append(
        append.Loading(11)
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
            sendMessage($rotic("#rotic-text").val())
            $rotic("#rotic-text").val("")
        } else {
            $rotic("#rotic-text").focus();
        }
    });
    $rotic(document).on("click", ".rotic-response-button", function (e) {
        sendMessage($rotic(e.target).text())
    });
    $rotic(document).on("click", ".rotic-response-button-noAnimation", function (e) {
        sendMessage($rotic(e.target).text())
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
    resolve(getCookie("_utok"));
    $rotic(".rotic-chat-window").append(
        append.RemoteNoBtn(converter.makeHtml("پاسخی برای شما یافت نشد!"), uuid)
    );
    remoteMessage(uuid)
    $rotic(".rotic-chat-window").scrollTop(10000000000000);
    setTimeout(() => {
        $rotic(".rotic-chat-window").append(
            append.RemoteNoBtn(converter.makeHtml("تا 4 ثانیه آینده به کارشناس انسانی هدایت میشوید"), uuid)
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
        $rotic("body").append(append.Toast(message, x, y));
        toastStartAnimation();
    }
    $rotic(".rotic-chatbox-toast").click(() => {
        toastEndAnimation()
        openChat()
    })
}
const imageAnimation = (uuid) => {
    let el = document.querySelectorAll(`.rotic-response-image-container[uuid="${uuid}"]`)
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
const loadingAnimation = (uuid) => {
    let el = document.querySelectorAll(`.rotic-loading-message[uuid="${uuid}"]`)
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
const sendMessage = (text) => {
    const uuid = v4()
    $rotic(".rotic-chat-window").append(append.Self(text, uuid));
    selfMessage(uuid)
    $rotic(".rotic-chat-window").append(append.Loading(uuid));
    loadingAnimation(uuid)
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
                $rotic(document.querySelectorAll(`.rotic-loading-message[uuid="${uuid}"]`)).remove()
                $rotic(".rotic-chat-window").append(
                    append.RemoteNoBtnNoAnimation(converter.makeHtml(res.response), uuid)
                );
                //remoteMessage(uuid)
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
            $rotic(document.querySelectorAll(`.rotic-loading-message[uuid="${uuid}"]`)).remove()
            if (e.status === 500) {
                $rotic(".rotic-chat-window").append(
                    append.RemoteNoBtnNoAnimation("مشکلی در سرور وجود دارد", uuid)
                );
                //remoteMessage(uuid)
                $rotic(".rotic-chat-window").scrollTop(10000000000000);
                $rotic("#rotic-text").focus();
            }  else {
                $rotic(".rotic-chat-window").append(
                    append.RemoteNoBtnNoAnimation("مشکلی در اتصال اینترنت وجود دارد", uuid)
                );
                //remoteMessage(uuid)
                $rotic(".rotic-chat-window").scrollTop(10000000000000);
                $rotic("#rotic-text").focus();
            }
        },
    });
}

let test = "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"
