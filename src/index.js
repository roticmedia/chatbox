const showdown = require("showdown")
const {v4} = require("uuid")
const anime = require("./lib/anime")
const ProgressBar = require("progressbar.js")
const {scrollTo} = require("scroll-js")

const append = require("./ui/append");
const {setCookie, getCookie} = require("./util/cookie")
const {handleThirdParty} = require("./thirdParty/index");
const unique_token = require("./util/unique_token")
const resolve = require("./request/resolve")
const storage = require("./util/localStorage")
require("./util/font")()

showdown.setOption("openLinksInNewWindow", "true");
let converter = new showdown.Converter();

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
                select(".rotic-chatbox").css.left = amount;
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
let chatScrolled = false;
let chatWindow;
let uniqueToken = 0;
let api = "6a105d7f17b029f067615f47b6e6b43211";
let token = "6a105d7f17b029f067615f47b6e6b432"
let toasted = false;
(async () => {
    uniqueToken = await unique_token();
    setCookie("_utok", uniqueToken)
})()

document.onreadystatechange = function () {
    if (document.readyState === "interactive") {

        select("body").insertAdjacentHTML('beforeend', append.Chatbox());
        chatWindow = document.querySelector(".rotic-chat-window");
        storage.reset(10)
        window.dispatchEvent(startEvent);

        if (getCookie("__rotic-driver") !== "true") {
            thirdParty.hide();
        } else if (Rotic.setting.driver !== "") {
            setCookie("__rotic-driver", "false")
            select("#rotic-btn-show").style.display = "none";
        }

        window.addEventListener("goftino_ready", () => {
            try {
                Rotic.setDriver("goftino")
                if (getCookie("__rotic-driver") === "true") {
                    select("#rotic-btn-show").style.display = "none"
                }
            } catch (err) {
            }
        })
        window.addEventListener("raychat_ready", () => {
            try {
                Rotic.setDriver("raychat")
                if (getCookie("__rotic-driver") === "true") {
                    select("#rotic-btn-show").style.display = "none"
                }
            } catch (err) {
            }
        })


        select("#rotic-btn-show").addEventListener("click", () => {
            openChat()
            if (toasted === true) {
                toastEndAnimation()
                toasted = false;
            }
        })
        select(".rotic-close-text").addEventListener("click", () => {
            closeChat()
        })
        window.addEventListener("scroll", () => {
            let scroll = window.scrollY;
            if (scroll > Rotic.setting.scroll && Rotic.setting.scroll !== 0) {
                if (checkScrolled === false) {
                    checkScrolled = true;
                    toastMessages.forEach((toastMessage, index) => {
                        toast(toastMessage, 40, 100 + (index * 40))
                    })
                    toasted = true;
                }
            }
        })
        select(".rotic-chat-window").addEventListener("scroll", () => {
            hideScroll();
        })

        if (welcomeMessage !== "") {
            appendTo(append.RemoteNoBtnNoAnimation(converter.makeHtml(welcomeMessage)))
        }
        if (welcomeButton.length > 0) {
            welcomeButton.forEach((button) => {
                appendTo(append.ButtonNoAnimation(button, button))
            })
        }
        storage.get().map((message) => {
            const uuid = v4()
            appendTo(append.Self(message.message, uuid));
            selfMessage(uuid)
            if (message.response) {
                appendTo(append.Remote(converter.makeHtml(message.response), uuid));
            }
            message.buttons.map((button) => {
                appendTo(append.ButtonNoAnimation(button, button));
            })
        })

        select("#rotic-btn").addEventListener("click", () => {
            if (select("#rotic-text").value.trim()) {
                sendMessage(select("#rotic-text").value.trim())
                select("#rotic-text").value = "";
            } else {
                select("#rotic-text").focus()
            }
        })
        document.addEventListener("click", (e) => {
            let el = e.target;

            if (el.classList.contains("rotic-response-button")) {
                sendMessage(e.target.innerText)
            } else if (el.classList.contains("rotic-response-button-noAnimation")) {
                sendMessage(e.target.innerText)
            } else if (el.classList.contains("rotic-resolve-button")) {
                let uuid = v4()
                appendTo(append.Loading(uuid));
                loadingAnimation(uuid)
                scroll()
                resolve(uniqueToken, api, token, () => {
                    showScroll()
                    select(`.rotic-loading-container[uuid="${uuid}"]`).replaceWith(stringToNode(append.RemoteNoBtnNoAnimation(converter.makeHtml("مشکل شما با موفقیت ثبت شد"), uuid)))
                });
            } else if (el.id === "rotic-scroll") {
                scroll()
            }
        })
// $(document).on("change", "#rotic-input-file", function (e) {
//     let t = e.target || window.event.srcElement;
//     let files = t.files;
//     if (FileReader && files && files.length) {
//         let imagesTypes = ['jpg', 'jpeg', 'png'];
//         let extension = files[0].name.split('.').pop().toLowerCase()
//         let isImage = imagesTypes.indexOf(extension) > -1;
//         let fr = new FileReader();
//         let uuid = v4();
//         $(".rotic-chat-window").append(
//             append.ProgressBar(uuid)
//         );
//         progressAnimation(uuid)
//         scroll()
//
//         fr.onload = function () {
//             $.ajax({
//                 xhr: function () {
//                     var xhr = new window.XMLHttpRequest();
//                     var bar = new ProgressBar.Line(`.rotic-progress-container[uuid="${uuid}"]`,
//                         {
//                             color: "#FFFFFF",
//                             easing: 'easeInOut',
//                             strokeWidth: 2,
//                             style: {
//                                 transform: "rotateX(180deg)"
//                             },
//                             text: {
//                                 value: "0",
//                                 style: {
//                                     position: "absolute",
//                                     top: "27px",
//                                     left: "11px",
//                                     fontSize: "11px",
//                                     transform: "rotateY(180deg)"
//                                 }
//                             },
//                             svgStyle: {
//                                 marginLeft: "30px",
//                             }
//                         });
//                     xhr.upload.addEventListener("progress", function (evt) {
//                         if (evt.lengthComputable) {
//                             var percentComplete = evt.loaded / evt.total;
//                             bar.animate(percentComplete);
//                             bar.setText(parseInt(percentComplete*100) + "%")
//                         }
//                     }, false);
//                     return xhr;
//                 },
//                 url: "https://httpbin.org/post",
//                 type: "POST",
//                 data: JSON.stringify(fr.result),
//                 contentType: "application/json",
//                 dataType: "json",
//                 success: function (result) {
//                     if (isImage) {
//                         $(`.rotic-progress-container[uuid="${uuid}"]`).replaceWith(append.ImageSelf(fr.result, uuid))
//                         setTimeout(function () {
//                             scroll()
//                         }, 10)
//                     } else {
//                         $(`.rotic-progress-container[uuid="${uuid}"]`).replaceWith(append.upload(uuid, files[0].name))
//                         scroll()
//                     }
//                 },
//                 error: function (e) {
//                     if (e.status === 500) {
//                         $(`.rotic-progress-container[uuid="${uuid}"]`).replaceWith(append.RemoteNoBtnNoAnimation("مشکلی در سرور وجود دارد", uuid))
//                         scroll()
//                         $("#rotic-text").focus();
//                     } else {
//                         $(`.rotic-progress-container[uuid="${uuid}"]`).replaceWith(append.RemoteNoBtnNoAnimation("مشکلی در اتصال اینترنت وجود دارد", uuid))
//                         scroll()
//                         $("#rotic-text").focus();
//                     }
//                 },
//             });
//         }
//         fr.readAsDataURL(files[0]);
//
//         t.files = new DataTransfer().files
//     }
// })
    }
}

// Animations
const openChat = () => {
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
        select(".rotic-chatbox").style.visibility = "visible"
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
            select(".rotic-chatbox-toast").style.display = "none"
        }
    })
}
const toast = (message, x, y) => {
    if (Rotic.isOpen === false) {
        select("body").insertAdjacentHTML('beforeend', append.Toast(message, x, y));
        toastStartAnimation();
    }
    select(".rotic-chatbox-toast").addEventListener("click", () => {
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
const progressAnimation = (uuid) => {
    let el = document.querySelector(`.rotic-progress-container[uuid="${uuid}"]`)
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
const showScrollAnimation = () => {
    anime({
        targets: "#rotic-scroll",
        translateY: {
            value: -10,
            duration: 500,
            easing: "easeOutExpo",
        },
        opacity: {
            value: 1,
            duration: 500,
            easing: "easeOutExpo"
        },
        begin: () => {
            select("#rotic-scroll").style.display = "block"
        },
        complete: () => {
            chatScrolled = true;
        }
    })
}
const hideScrollAnimation = () => {
    anime({
        targets: "#rotic-scroll",
        translateY: {
            value: 10,
            duration: 500,
            easing: "easeOutExpo",
        },
        opacity: {
            value: 0.2,
            duration: 500,
            easing: "easeOutExpo"
        },
        complete: () => {
            select("#rotic-scroll").style.display = "none"
            chatScrolled = false;
        }
    })
}


// tools
const sendMessage = (text) => {
    const uuid = v4()
    appendTo(append.Self(text, uuid));
    selfMessage(uuid)
    appendTo(append.Loading(uuid));
    loadingAnimation(uuid)
    scroll()

    fetch("https://api.rotic.ir/ai/v4", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        mode: 'cors',
        body: JSON.stringify({
            data: text.trim(),
            api,
            user_data: this.userData,
            token,
            unique_token: uniqueToken,
            username: "MyTestRoticBot"
        }),
    })
        .then(response => response.json())
        .then((res) => {
        if (res.status && res.response != null) {
            showScroll();
            storage.set(text, res.response, res.options.buttons)
            select("#rotic-text").focus()

            if (res.options.buttons) {
                select(`.rotic-loading-container[uuid="${uuid}"]`).replaceWith(stringToNode(append.Remote(converter.makeHtml(res.response), uuid)))
                res.options.buttons.forEach(function (chat) {
                    appendTo(append.Button(Object.keys(chat)[0], Object.keys(chat)[2], uuid));
                });
                buttonAnimation(uuid)
            }
            if (res.options.images) {
                select(`.rotic-loading-container[uuid="${uuid}"]`).replaceWith(stringToNode(append.Remote(converter.makeHtml(res.response), uuid)))
                JSON.parse(res.options.images).forEach(function (chat) {
                    appendTo(append.Image(chat, uuid));
                });
                imageAnimation(uuid)
            } else {
                select(`.rotic-loading-container[uuid="${uuid}"]`).replaceWith(stringToNode(append.Remote(converter.makeHtml(res.response), uuid)))
            }
        } else {
            handleNull(text, uuid)
        }
    }).catch((e) => {
        showScroll()
        if (e.status === 500) {
            select(`.rotic-loading-container[uuid="${uuid}"]`).replaceWith(stringToNode(append.RemoteNoBtnNoAnimation(converter.makeHtml("مشکلی در سرور وجود دارد"), uuid)))
            select("#rotic-text").focus()
        } else {
            select(`.rotic-loading-container[uuid="${uuid}"]`).replaceWith(stringToNode(append.RemoteNoBtnNoAnimation(converter.makeHtml("مشکلی در اتصال اینترنت وجود دارد"), uuid)))
            select("#rotic-text").focus()
        }
    })
}
const handleNull = (text, uuid) => {
    storage.set(text, null)
    if (Rotic.setting.driver === "") {
        appendTo(append.RemoteNoBtnNoAnimation(converter.makeHtml("برای دریافت پاسخ مناسب از روتیک لطفا با شماره تماس ۰۲۵۹۱۰۱۴۷۸۴ و یا ایمیل support@rotic.ir در ارتباط باشید"), uuid));
        remoteMessage(uuid)
        scroll()
        return;
    }
    resolve(getCookie("_utok"));
    appendTo(append.RemoteNoBtnNoAnimation(converter.makeHtml("پاسخی برای شما یافت نشد!"), uuid));
    remoteMessage(uuid)
    scroll()
    setTimeout(() => {
        appendTo(append.RemoteNoBtnNoAnimation(converter.makeHtml("تا 4 ثانیه آینده به کارشناس انسانی هدایت میشوید"), uuid));
        remoteMessage(uuid)
        scroll()
    }, 1000)

    setTimeout(() => {
        thirdParty.show();
        thirdParty.open();
        thirdParty.showInitMessage(text)
        closeForever()
        Rotic.isOpen = false;
    }, 3000)
}
const scrollHeight = () => {
    try {
        return Math.max(chatWindow.scrollHeight, chatWindow.offsetHeight, chatWindow.clientHeight, chatWindow.scrollHeight, chatWindow.offsetHeight);
    } catch (e) {
        return 0;
    }
}
const scroll = () => {
    scrollTo(chatWindow, {
        top: scrollHeight(),
        behavior: "smooth",
        duration: scrollHeight() - select(".rotic-chat-window").scrollTop + 1000,
        easing: 'ease-in-out'
    });
}
const showScroll = () => {
    if (scrollHeight() - select(".rotic-chat-window").scrollTop >= 550) {
        showScrollAnimation();
    } else if (scrollHeight() - select(".rotic-chat-window").scrollTop >= 455) {
        scroll()
    } else {
        scroll()
        // setTimeout(() => {
        //     $(".rotic-chat-window").scrollTop(99999999999999999999999999999999)
        // }, 1)
    }
}
const hideScroll = () => {
    if (scrollHeight() - select(".rotic-chat-window").scrollTop < 550) {
        if (chatScrolled === true) {
            hideScrollAnimation();
        }
    }
}
const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);
const stringToNode = (string) => {
    return new DOMParser().parseFromString(string,"text/html").body.childNodes[0]
}
const appendTo = (el) => {
    document.querySelector(".rotic-chat-window").insertAdjacentHTML('beforeend', el)
}


