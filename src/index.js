const $ = require("jquery");
const showdown = require("showdown")

var $rotic = $.noConflict();

const helper = require("./helper")
const { appendRemote, appendSelf, appendChatbox, appendButton } = require("./append");
const { setCookie, getCookie } = require("./cookie")
const Goftino = require("./thirdParty/Goftino")

showdown.setOption("openLinksInNewWindow", "true");
var converter = new showdown.Converter();

class rotic {
  constructor() {
    try {
      this.setting = JSON.parse(getCookie("__rotic-setting"))
    } catch (err) {
      this.setting = null;
    }
    this.userData = null;
  }
  setUser(userName, phoneNumber, otherData) {
    this.userData = {
      userName,
      phoneNumber,
      otherData
    }
  }
  changeLeft(amount) {
    this.setting.left = amount;
    setCookie("__rotic-setting", JSON.stringify({
      ...this.setting,
      left: amount
    }))
    if (this.setting.left) {
      $rotic(".rotic-chatbox").css("left", amount)
    }
  }
  setInit() {
    if (getCookie("__rotic-bot") === "") {
      helper.initRequest();
    }
  }
}

window.Rotic = new rotic();

const startEvent = new Event("rotic-start")



$rotic(document).ready(function () {
  $rotic("body").append(appendChatbox());


  window.dispatchEvent(startEvent);
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

  var chats = getCookie("__rotic-bot");

  if (chats !== "") {
    chats.split("+").forEach(function (chat) {
        var splitedChat = chat.split("*");
        if (splitedChat[2] !== undefined) {
          if (splitedChat[0] === "text") {
            console.log(splitedChat[2].trim())
            if (splitedChat[1].trim() !== " ") {
              $rotic(".rotic-chat-window").append(
                  appendSelf(converter.makeHtml(splitedChat[1]))
              );
            }
            if (splitedChat[2].trim() !== "null") {
              $rotic(".rotic-chat-window").append(
                  appendRemote(converter.makeHtml(splitedChat[2]))
              );
            }

          } else if (splitedChat[0] === "button") {
            $rotic(".rotic-chat-window").append(
                appendButton(splitedChat[1], splitedChat[2])
            );
          }
        }
    });
    $rotic(".rotic-chat-window").scrollTop(10000000000000);
  }
  $rotic("#rotic-btn").click(function () {
    if ($rotic("#rotic-text").val().trim()) {
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
          } else {
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
        },
        error: function (e) {
          alert(1)
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
        } else {
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

