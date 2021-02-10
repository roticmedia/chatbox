const $ = require("jquery");
const showdown = require("showdown")
const { v4 } = require("uuid")
const anime = require("./util/anime")
const ProgressBar = require("progressbar.js")

var $rotic = $.noConflict();

const append = require("./ui/append");
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
let uniqueToken = 0;
let toasted = false;
(async () => {
    uniqueToken = await unique_token();
    setCookie("_utok", uniqueToken)
})()

$rotic(document).ready(function () {
    $rotic("body").append(append.Chatbox());

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
    $(window).scroll(function (e) {

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
    $rotic(document).on("change", "#rotic-input-file", function (e) {
        let t = e.target || window.event.srcElement;
        let files = t.files;
        if (FileReader && files && files.length) {
            let fileTypes = ['jpg', 'jpeg', 'png'];
            let extension = files[0].name.split('.').pop().toLowerCase()
            let isSuccess = fileTypes.indexOf(extension) > -1;

            if (isSuccess) {
                let fr = new FileReader();
                fr.onload = function () {
                    let uuid = v4();
                    $rotic(".rotic-chat-window").append(append.ImageSelf(fr.result, uuid));
                    imageAnimationSelf(uuid)
                    setTimeout(function () {
                        $rotic(".rotic-chat-window").scrollTop(10000000000000);
                    }, 10)

                    t.files = new DataTransfer().files
                }
                fr.readAsDataURL(files[0]);
            }
        }
    })
    $rotic(document).on("mouseover", ".rotic-chatbox", function (e) {
        $rotic(window).scroll(function (ev) {
            ev.preventDefault()
        })
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
const imageAnimationSelf = (uuid) => {
    let el = document.querySelectorAll(`.rotic-response-image-container-self[uuid="${uuid}"]`)
    anime({
        targets: el,
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
                $rotic(document.querySelectorAll(`.rotic-loading-container[uuid="${uuid}"]`)).remove()
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
                    imageAnimation(uuid)
                }
            } else {
                handleNull(text, uuid)
            }
        },
        error: function (e) {
            $rotic(document.querySelectorAll(`.rotic-loading-container[uuid="${uuid}"]`)).remove()
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
