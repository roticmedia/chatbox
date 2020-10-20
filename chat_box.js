$(document).ready(function () {
    $("body").append(appendChatbox());
    var chats = getCookie("__rotic-bot");
    var checkShowed = false;
    var converter = new showdown.Converter();
    let count = 0;
    var a = [
        { salam: "sdfsdf"},
        { khoobi: "ssdfa"}
    ]

    a.forEach(function (chat){
        $(".rotic-chat-window").append(appendButton(Object.keys(chat)[0], Object.values(chat)[0]));
    })
    if(chats !== "") {
        chats.split("+").forEach(function (chat) {
            if(chats.split("+").length - count <= 15) {
                var splitedChat = chat.split("*");
                if(splitedChat[2] !== undefined) {
                    if(splitedChat[0] === "text") {
                        $(".rotic-chat-window").append(appendSelf(converter.makeHtml(splitedChat[1])));
                        $(".rotic-chat-window").append(appendRemote(converter.makeHtml(splitedChat[2])));
                    } else if (splitedChat[0] === "button") {
                        $(".rotic-chat-window").append(appendButton(splitedChat[1], splitedChat[2]));
                    }

                }
            }
            count++;
        });
        $(".rotic-chat-window").animate(
            { scrollTop: 2000 },
            "fast"
        );
    }
    $("#rotic-btn").click(function () {
        if ($("#rotic-text").val().trim()) {
            $(".rotic-chat-window").append(appendSelf($("#rotic-text").val()));
            var text = $("#rotic-text").val().trim();
            $("#rotic-text").val("");
            $(".rotic-chat-window").animate(
                { scrollTop: 2000 },
                "slow"
            );
            $.ajax({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                dataType: "json",
                crossDomain: true,
                url:
                    "https://rotic.ir/api/v3/services/6a105d7f17b029f067615f47b6e6b432/ai",
                data: JSON.stringify({
                    data: text.trim(),
                    api: "6a105d7f17b029f067615f47b6e6b43211",
                }),
                success: function (res) {
                    if (res.status) {
                        if(res.provider.source == "public conversation" || res.provider.source == "private conversation") {
                            if(res.response.buttons) {
                                $(".rotic-chat-window").append(appendRemote(converter.makeHtml(res.response.string)));
                                setCookie("__rotic-bot", getCookie("__rotic-bot") + "text" + "*" + text + " * " + res.response.string + " + ")
                                $("#rotic-text").focus();
                                res.response.buttons.forEach(function (chat) {
                                    $(".rotic-chat-window").append(appendButton(Object.keys(chat)[0]));
                                    setCookie("__rotic-bot", getCookie("__rotic-bot") + "button" + "*"  + Object.keys(chat)[0] + "*" + Object.values(chat)[0] +   " + ")
                                })
                            } else {
                                $(".rotic-chat-window").append(appendRemote(converter.makeHtml(res.response.string)));
                                setCookie("__rotic-bot", getCookie("__rotic-bot") + "text" + "*"  + text + " * " + res.response.string + " + ")
                                $("#rotic-text").focus();
                            }
                        }
                    }
                },
                error: function (e) {
                    $(".rotic-chat-window").append(
                        appendRemote("مشکلی در اتصال اینترنت وجود دارد")
                    );
                    setCookie("__rotic-bot", getCookie("__rotic-bot") + "text" + "*" + text + " * " +  decodeURIComponent(" مشکلی در اتصال اینترنت وجود دارد ") + " + ")
                    $("#rotic-text").focus();
                },
            });
        }
    });
    $("#rotic-btn-show").click(function () {
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
                duration: 800,
            },
        });
        if (checkShowed == false) {
            $(".rotic-chatbox").css({
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
            checkShowed = true;
        }
    });
    $(".rotic-close-text").click(function () {
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
        checkShowed = false;
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
                duration: 800,
                delay: 1300,
            },
        });
    });
    $(".rotic-response-button").click(function (){
        const text = $(this).attr("text");
        const link = $(this).attr("link")
        $(".rotic-chat-window").append(appendSelf($(this).attr("text")));
        $(".rotic-chat-window").animate(
            { scrollTop: 2000 },
            "slow"
        );
        $.ajax({
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            dataType: "json",
            crossDomain: true,
            url:
                "https://rotic.ir/api/v3/services/6a105d7f17b029f067615f47b6e6b432/ai",
            data: JSON.stringify({
                data: link.trim(),
                api: "6a105d7f17b029f067615f47b6e6b43211",
            }),
            success: function (res) {
                if (res.status) {
                    if(res.provider.source == "public conversation" || res.provider.source == "private conversation") {
                        if(res.response.buttons) {
                            $(".rotic-chat-window").append(appendRemote($(this).attr("text")));
                            setCookie("__rotic-bot", getCookie("__rotic-bot") + "text" + "*" + text + " * " + res.response.string + " + ")
                            $("#rotic-text").focus();
                            res.response.buttons.forEach(function (chat) {
                                $(".rotic-chat-window").append(appendButton(Object.keys(chat)[0]));
                                setCookie("__rotic-bot", getCookie("__rotic-bot") + "button" + "*"  + Object.keys(chat)[0] + "*" + Object.values(chat)[0] +   " + ")
                            })
                        } else {
                            $(".rotic-chat-window").append(appendRemote($(this).attr("text")));
                            setCookie("__rotic-bot", getCookie("__rotic-bot") + "text" + "*"  + text + " * " + res.response.string + " + ")
                            $("#rotic-text").focus();
                        }
                    }
                }
            },
            error: function (e) {
                $(".rotic-chat-window").append(
                    appendRemote("مشکلی در اتصال اینترنت وجود دارد")
                );
                console.log(text)
                setCookie("__rotic-bot", getCookie("__rotic-bot") + "text" + "*" + text + " * " +  decodeURIComponent(" مشکلی در اتصال اینترنت وجود دارد ") + " + ")
                $("#rotic-text").focus();
            },
        });
    })
});

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";" + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function appendSelf(text) {
    return `
        <article class="rotic-msg-container rotic-msg-self" id="rotic-msg-0">
            <div class="rotic-msg-box">
                <div class="rotic-flr">
                    <div class="rotic-messages">
                        <p>${text}</p>
                    </div>
                </div>
            </div>
        </article>
    `;
}

function appendRemote(text) {
    return `
        <article class="rotic-msg-container rotic-msg-remote" id="rotic-msg-0">
            <div class="rotic-msg-box">
                <div class="rotic-flr">
                    <div class="rotic-messages">
                        <p>${text}</p>
                    </div>
                </div>
            </div>
        </article>
    `;
}

function appendButton(text, link) {
    return `
        <article class="rotic-msg-container rotic-msg-remote" id="rotic-msg-0">
            <button text="${text}" link="${link}"  class="btn btn-border btn-circle rotic-response-button">
            ${text}
            </button>
        </article>
    `;
}


function appendChatbox() {
    return `
  <div class="rotic-toggle">
    <div id="rotic-btn-show">
      <img src="https://rotic.ir/images/icon/kavina.jpg" id="rotic-image"/>
    </div>
    <section class="rotic-chatbox">
      <div class="rotic-close-box">
        <img src="https://rotic.ir/images/logo/Theme.png" alt="rotic" class="rotic-image-logo__img"> <p class="rotic-image-logo__p">powered by </p>
        <div class="rotic-close-text">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" fill="#5FC5C4" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="#000" /></svg>
        </div>
      </div>
      <section class="rotic-chat-window"></section>
      <form class="rotic-chat-input" onsubmit="return false;">
        <input id="rotic-text" type="text" autocomplete="on" placeholder="پیامتان را تایپ کنید">
        <button id="rotic-btn">
          <svg id="rotic-svg" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path fill="#5FC5C4" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </form>
    </section>
    <style>
      @font-face {
        font-family: 'IranSans';
        src: url("http://mincdn.ir/font/IranSans/IRANSansWeb.woff") format("woff");
        font-weight: normal; 
      }
      html,
      body {
        direction: rtl;
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        font-family: IRANSans
      }
      ::-webkit-scrollbar {
        width: 4px;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #5FC5C4;
        border-radius: 2px;
      }
      @media only screen and (max-width: 768px) {
        .rotic-chatbox {
          right: 0 !important;
          width: 100% !important;
          height: 100% !important;
          bottom: -624px !important;
        }
      }
      @media only screen and (min-width: 768px) {
        .rotic-chatbox {
          right: 36px !important;
          width: 300px !important;
          height: 495px !important;
          bottom: -600px !important;
        }
      }
      .rotic-chatbox {
        z-index: 9999999;
        position: fixed;
        bottom: -600px;
        opacity: 0;
        right: 36px;
        width: 300px;
        height: 495px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 5px 5px 20px lightgray;
        visibility: hidden;
        padding: 0 !important;
      }
      .rotic-close-box {
        position: fixed;
        z-index: 999;
        top: 0;
        right: 0;
        height: 40px !important;
        width: 100%;
        background: white;
        border-top: 1px solid #5BC5CB;
      }
      .rotic-close-text {
        position: fixed;
        z-index: 9999;
        top: 20px;
        right: 0px;
        transform: translate(-50%, -50%);
        color:black;
        font-weight: 500;
        font-size: 24px;
      }
      .rotic-close-text:hover {
        cursor: pointer;
      }
      .rotic-chat-window {
        flex: auto;
        height: 492px !important;
        background: #fff;
        overflow: auto;
        margin-top: 47px;
        padding: 0 0 0 0;
        scrollbar-color: #5FC5C4;
        scrollbar-width: 4px;
      }
      .rotic-chat-input {
        flex: 0 0 auto;
        height: 60px;
        background: #fff;
        border-top: 1px solid #5BC5CB;
        margin-bottom: 0;
      }
      .rotic-chat-input input {
      font-family: IRANSans;
        height: 60px;
        line-height: 60px;
        outline: 0 none;
        border: none;
        width: calc(100% - 70px);
        color: black;
        text-indent: 10px;
        font-size: 12pt;
        padding: 0 10px 0 0;
        background: #fff;
      }
      .rotic-chat-input button {
        float: left;
        outline: 0 none;
        border: none;
        background: rgba(255, 255, 255, 0.25);
        height: 40px;
        width: 40px;
        border-radius: 50%;
        padding: 2px 0 0 0;
        margin: 10px;
        transition: all 0.15s ease-in-out;
      }
      .rotic-chat-input input[good] + button {
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
        background: #5BC5CB;
      }
      .rotic-chat-input input[good] + button:hover {
        box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
      .rotic-chat-input input[good] + button path {
        fill: white;
      }
      .rotic-msg-container {
        position: relative;
        display: inline-block;
        width: 100%;
        margin: 0px 0 10px 0;
        padding: 0;
      }
      .rotic-msg-box {
        line-height: 1.5;
        display: flex;
        background: #5b5e6c;
        color: white;
        padding: 0px 24px 0 24px;
        margin-left: 12px;
        border-radius: 0px 6px 6px 6px;
        max-width: 253px !important;
        width: auto;
        float: left;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
      }
      .rotic-user-img {
        display: inline-block;
        border-radius: 50%;
        height: 40px;
        width: 40px;
        background: #5BC5CB;
        margin: 0 10px 10px 0;
      }
      .rotic-msg:first-of-type {
        margin-top: 8px;
      }
      .rotic-flr {
        flex: 1 0 auto;
        display: flex;
        flex-direction: column;
        width: calc(100% - 50px);
      }
      .rotic-flr a {
      display: block;
        color: #5BC5CB;
        text-decoration: none;
      }
      .rotic-flr p{
        max-width: 205px;
        width: auto;
        font-size: 11pt;
        line-height: 13pt;
        color: white;
        margin: 15px 0 15px 0;
      }
      .rotic-messages {
        flex: 1 0 auto;
      }
      .rotic-msg {
        width: auto;
        font-size: 11pt;
        line-height: 13pt;
        color: white;
        margin: 0 0 15px 0;
      }
      .rotic-msg:first-of-type {
        margin-top: 8px;
      }
      .rotic-timestamp {
        color: rgba(0, 0, 0, 0.38);
        font-size: 8pt;
        margin-bottom: 10px;
      }
      .rotic-username {
        margin-right: 3px;
      }
      .rotic-posttime {
        margin-left: 3px;
      }
      .rotic-msg-self .rotic-msg-box {
        border-radius: 6px 0px 6px 6px;
        margin-right: 12px;
        background-image: linear-gradient(to bottom, #5EC5C4 , #4CC6EB);
        color: white !important;
        float: right;
      }
      .rotic-msg-self .rotic-user-img {
        margin: 0 0 10px 10px;
      }
      .rotic-msg-self .rotic-msg {
        text-align: right;
      }
      .rotic-msg-self .rotic-timestamp {
        text-align: right;
      }
      #rotic-btn-show {
        z-index: 99999;
        position: fixed;
        background: none;
        border: none;
        bottom: 30px;
        border-radius: 50%;
        right: 30px;
        box-shadow: 10px 10px 30px lightgray;
      }
      #rotic-image {
        height: 72px;
        width: 72px;
        border-radius: 50%;
      }
      #rotic-btn-show:hover {
        cursor: pointer;
      }
      #rotic-svg {
        transform: rotate(180deg);
      }
      #rotic-svg:hover {
        cursor: pointer;
      }
      .rotic-image-logo__img {
        height: 24px;
        position: absolute;
        transform: translate(0, -50%);
        top: 20px;
        left: 70px;
      }
      .rotic-image-logo__p {
        position: absolute;
        top: 20px;
        left: 10px;
        transform: translate(0, -50%);
        font-size: 12px;
        font-weight: lighter;
        margin: 0;
        color: lightgray;
      }
      .rotic-response-button {
        margin-left: 12px;
        float: left;
      }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" integrity="sha512-z4OUqw38qNLpn1libAN9BsoDx6nbNFio5lA6CuTp9NlK83b89hgyCVq+N5FdBJptINztxn1Z3SaKSKUS5UP60Q==" crossorigin="anonymous"></script>
  </div>`;
}
