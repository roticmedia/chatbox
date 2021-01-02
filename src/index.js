const $ = require("jquery");
const showdown = require("showdown")

var $rotic = $.noConflict();

class rotic {
  constructor() {
    this.isSetUser = false;
    this.left = getCookie("__rotic-setting-left")
    this.userData = {
      userName: null,
      phoneNumber: null,
      otherData: null
    }
  }
  setUser(userName, phoneNumber, otherData) {
    this.isSetUser = true;
    this.userData = {
      userName,
      phoneNumber,
      otherData
    }
  }
  changeLeft(amount) {
    setCookie("__rotic-setting-left", amount)
  }
}

$rotic(document).ready(function () {
  $rotic("body").append(appendChatbox());
  let Rotic = new rotic();

  if (Rotic.left) {
    $rotic(".rotic-chatbox").css("left", Rotic.left)
  }

  var checkShowed = false;
  $rotic("#rotic-btn-show").click(function () {
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
    if (checkShowed == false) {
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
      checkShowed = true;
    }
  });
  $rotic(".rotic-close-text").click(function () {
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
        duration: 900,
        delay: 1300,
      },
    });
  });
  function playSelfMessage() {
    let audio = document.getElementById("rotic-audio-self-message");
    audio.play();
  }
  var chats = getCookie("__rotic-bot");
  showdown.setOption("openLinksInNewWindow", "true");
  var converter = new showdown.Converter();
  let count = 0;
  if (chats !== "") {
    chats.split("+").forEach(function (chat) {
      if (chats.split("+").length - count <= 15) {
        var splitedChat = chat.split("*");
        if (splitedChat[2] !== undefined) {
          if (splitedChat[0] === "text") {
            $rotic(".rotic-chat-window").append(
                appendSelf(converter.makeHtml(splitedChat[1]))
            );
            $rotic(".rotic-chat-window").append(
                appendRemote(converter.makeHtml(splitedChat[2]))
            );
          } else if (splitedChat[0] === "button") {
            $rotic(".rotic-chat-window").append(
                appendButton(splitedChat[1], splitedChat[2])
            );
          }
        }
      }
      count++;
    });
    $rotic(".rotic-chat-window").scrollTop(10000000000000);
  }
  $rotic("#rotic-btn").click(function () {
    if ($rotic("#rotic-text").val().trim()) {
      playSelfMessage();
      $rotic(".rotic-chat-window").append(appendSelf($rotic("#rotic-text").val()));
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
              playSelfMessage();
              $rotic(".rotic-chat-window").append(
                  appendRemote(converter.makeHtml(res.response))
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
              playSelfMessage();
              $rotic(".rotic-chat-window").append(
                  appendRemote(converter.makeHtml(res.response))
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
          }
        },
        error: function (e) {
          playSelfMessage()
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
    const text = $rotic(e.target).text();
    playSelfMessage()
    $rotic(".rotic-chat-window").append(appendSelf($rotic(e.target).text()));
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
            playSelfMessage();
            $rotic(".rotic-chat-window").append(appendRemote(res.response));
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
            playSelfMessage();
            $rotic(".rotic-chat-window").append(appendRemote(res.response));
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
        }
      },
      error: function (e) {
        playSelfMessage()
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

function setCookie(cname, cvalue) {
  document.cookie =
      cname + "=" + cvalue + ";" + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
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
            <button text="${text}" link="${link}"  class="btn btn-info rotic-response-button">
            ${text}
            </button>
        </article>
    `;
}

function appendChatbox() {
  return `<div class="rotic-chatbox"> 
    <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
            integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
            crossorigin="anonymous"
    />
    <script
            src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
            integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
            crossorigin="anonymous"
    ></script>
    <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
            crossorigin="anonymous"
    ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" integrity="sha512-z4OUqw38qNLpn1libAN9BsoDx6nbNFio5lA6CuTp9NlK83b89hgyCVq+N5FdBJptINztxn1Z3SaKSKUS5UP60Q==" crossorigin="anonymous"></script>
    <script
            src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.1/showdown.min.js"
            integrity="sha512-L03kznCrNOfVxOUovR6ESfCz9Gfny7gihUX/huVbQB9zjODtYpxaVtIaAkpetoiyV2eqWbvxMH9fiSv5enX7bw=="
            crossorigin="anonymous"
    ></script>
    <div class="rotic-close-box">
        <img src="https://rotic.ir/images/logo/Theme.png" alt="rotic" class="rotic-image-logo__img"> <p class="rotic-image-logo__p">powered by </p>
        <div class="rotic-close-text">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" fill="#5FC5C4" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="#000" /></svg>
        </div>
    </div>
     <div class="rotic-container">
      <section class="rotic-chat-window"></section>
      <form class="rotic-chat-input" onsubmit="return false;">
        <input
          id="rotic-text"
          type="text"
          autocomplete="off"
          placeholder="پیامتان را تایپ کنید"
        />
        <button id="rotic-btn">
          <svg
            id="rotic-svg"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="#5FC5C4" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
    <audio src="../assets/self-message.mp3" id="rotic-audio-self-message"></audio>
</div>
<div id="rotic-btn-show">
    <img src="https://rotic.ir/images/icon/kavina.jpg" id="rotic-image"/>
</div>
<style>
        @font-face {
            font-family: 'IranSans';
            src: url("http://mincdn.ir/font/IranSans/IRANSansWeb.woff") format("woff");
            font-weight: normal;
        }

        @media only screen and (max-width: 768px) {
            .rotic-chatbox {
                width: 100% !important;
                height: 100% !important;
                bottom: -624px !important;
                right: 0;
            }
        }
        @media only screen and (min-width: 768px) {
            .rotic-chatbox {
                width: 300px !important;
                height: 553px !important;
                bottom: -600px !important;
            }
        }
        .rotic-chatbox {
            z-index: 9999999;
            position: fixed;
            bottom: -600px;
            opacity: 0;
            left: 20px;
            width: 300px;
            height: 553px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 5px 5px 20px lightgray;
            font-family: IranSans ;
            visibility: hidden;
            padding: 0 !important;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        #rotic-btn-show {
            z-index: 99;
            position: fixed;
            background: none;
            border: none;
            bottom: 30px;
            border-radius: 50%;
            left: 36px;
            box-shadow: 0px 0px 30px lightgray;
        }
        #rotic-image {
            height: 60px;
            width: 60px;
            border-radius: 50%;
            user-drag: none; 
            user-select: none;
            -moz-user-select: none;
            -webkit-user-drag: none;
            -webkit-user-select: none;
            -ms-user-select: none;
        }
        #rotic-btn-show:hover {
            cursor: pointer;
        }
        .rotic-close-box {
            position: fixed;
            z-index: 999;
            top: 0;
            right: 0;
            height: 51px !important;
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
        .rotic-image-logo__img {
            height: 24px;
            position: absolute;
            transform: translate(0, -50%);
            top: 20px;
            left: 70px;
            user-drag: none; 
            user-select: none;
            -moz-user-select: none;
            -webkit-user-drag: none;
            -webkit-user-select: none;
            -ms-user-select: none;
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
        .rotic-iframe-chatbox {
            font-family: IranSans;
            position: fixed;
            top: 51px;
            right: 0;
            width: 100%;
            height: 100%;
        }
         @media only screen and (max-width: 768px) {
        .rotic-container {
          right: 0 !important;
          width: 100% !important;
          height: 100% !important;
          bottom: -624px !important;
        }
        .rotic-chat-window {
          height: calc(100% - 115px) !important;
        }
      }
      @media only screen and (min-width: 768px) {
        .rotic-container {
            
          width: 300px !important;
          height: 594px !important;
          bottom: -600px !important;
        }
      }
      html,
      body {
        direction: rtl;
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        font-family: IranSans;
      }
      ::-webkit-scrollbar {
        width: 4px;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #5fc5c4;
        border-radius: 2px;
      }
      .rotic-container {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: 553px;
        margin-top: 51px;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      .rotic-chat-window {
        position: fixed;
        bottom: 60px;
        flex: auto;
        width: 100%;
        height: calc(100% - 110px);
        background: #fff;
        overflow: auto;
        padding-top: 47px;
        padding: 0 0 0 0;
        scrollbar-color: #5fc5c4;
        scrollbar-width: 4px;
      }
      .rotic-chat-input {
        width: 100%;
        position: fixed;
        bottom: 0px;
        flex: 0 0 auto;
        height: 60px;
        background: #fff;
        border-top: 1px solid #5bc5cb;
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
        font-size: 11pt;
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
        background: #5bc5cb;
      }
      .rotic-chat-input input[good] + button:hover {
        box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2),
          0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
        word-break: break-word;
        line-height: 1.5;
        display: flex;
        background: #5b5e6c;
        color: white;
        padding: 0px 24px 0 24px;
        margin-left: 16px;
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
        background: #5bc5cb;
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
        color: #5bc5cb;
        text-decoration: none;
      }
      .rotic-flr p {
        max-width: 205px;
        width: auto;
        font-size: 10pt;
        line-height: 13pt;
        color: white;
        margin: 10px 0 10px 0;
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
        margin-right: 16px;
        background-image: linear-gradient(to bottom, #5ec5c4, #4cc6eb);
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

      #rotic-svg {
        transform: rotate(180deg);
      }
      #rotic-svg:hover {
        cursor: pointer;
      }
      .rotic-response-button {
        font-family: IRANSans;
        margin-left: 12px;
        float: left;
      }
      .rotic-container {
        width: 100%;
        height: 100%;
      }
      .rotic-response-button {
        margin-left: 16px;
        margin-right: 12px;
        max-height: 253px;
        word-break: break-word;
        font-size: 10pt;
        line-height: 1.5;
      }
    </style>`;
}
