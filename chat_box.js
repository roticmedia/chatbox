
$(document).ready(function () {
    $("body").append(appendChatbox());
    var checkShowed = false;
    $("#btn").click(function () {
        if ($("#text").val().trim()) {
            $(".chat-window").append(appendSelf($("#text").val()));
            var text = $("#text").val().trim();
            $("#text").val("");
            $(".chat-window").animate({scrollTop: $(document).height()}, "slow");
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
                        $(".chat-window").append(appendRemote(res.response));
                        $("#text").focus();
                    }
                },
                error: function (e) {
                    $(".chat-window").append(appendRemote("مشکلی در اتصال اینترنت وجود دارد"));
                    $("#text").focus();
                },
            });
        }
    });
    $("#btn-show").click(function () {
        anime({
            targets: "#btn-show",
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
            $(".chatbox").css({
                visibility: "visible",
            });
            anime({
                targets: ".chatbox",
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
    $(".close-text").click(function () {
        anime({
            targets: ".chatbox",
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
            targets: "#btn-show",
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
});

function appendSelf(text) {
    return `    
        <article class="msg-container msg-self" id="msg-0">
            <div class="msg-box">
                <div class="flr">
                    <div class="messages">
                        <p class="msg" id="msg-1">${text}</p>
                    </div>
                </div>
            </div>
        </article>
    `;
}

function appendRemote(text) {
    return `    
        <article class="msg-container msg-remote" id="msg-0">
            <div class="msg-box">
                <div class="flr">
                    <div class="messages">
                        <p class="msg" id="msg-1">${text}</p>
                    </div>
                </div>
            </div>
        </article>
    `;
}

function appendChatbox() {
    return `
  <div class="toggle">   
    <div id="btn-show">
      <img src="https://rotic.ir/images/icon/kavina.jpg" id="image"/>
    </div>
    <section class="chatbox">
      <div class="close-box"> 
        <div class="close-text">
           <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="#fff" /></svg></div>
      </div>
      <section class="chat-window"></section>
      <form class="chat-input" onsubmit="return false;">
        <input id="text" type="text" autocomplete="on" placeholder="پیامتان را تایپ کنید">
        <button id="btn">
          <svg id="svg" style="width:36px;height:36px" viewbox="0 0 24 24">
            <path fill="rgba(0,0,0,.38)" d="M17,12L12,17V14H8V10H12V7L17,12M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z"></path>
          </svg>
        </button>
      </form>
    </section>
    <style>
    
    @font-face {
  font-family: 'IranSans';
  src: url("http://mincdn.ir/font/IranSans/IRANSansWeb.woff") format("woff");
  font-weight: normal; }

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
    background-color: #4c4c6a;
    border-radius: 2px;
  }
  @media only screen and (max-width: 768px) {
    .chatbox {
      right: 0 !important;
      width: 100% !important;
      height: 100% !important;
      bottom: -624px !important;
    }
  }
  @media only screen and (min-width: 768px) {
    .chatbox {
      right: 36px !important;
      width: 300px !important;
      height: 495px !important;
      bottom: -600px !important;
    }
  }
  .chatbox {
    position: fixed;
    bottom: -600px;
    opacity: 0;
    right: 36px;
    width: 300px;
    height: 495px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
    visibility: hidden;
  }
  .close-box {
    height: 40px;
    background: #40434e;
    border-top: 1px solid #2671ff;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
  }
  .close-text {
    position: absolute;
    top: 20px;
    right: 5px;
    transform: translate(-50%, -50%);
    color:white;
    font-weight: 500;
    font-size: 24px;
  }
  .close-text:hover {
    cursor: pointer;
  }
  .chat-window {
    flex: auto;
    max-height: calc(100% - 115px);
    background: #2f323b;
    overflow: auto;
    padding-top: 12px;
  }
  .chat-input {
    flex: 0 0 auto;
    height: 60px;
    background: #40434e;
    border-top: 1px solid #2671ff;
    margin-bottom: 0;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
  }
  .chat-input input {
  font-family: IRANSans;
    height: 60px;
    line-height: 60px;
    outline: 0 none;
    border: none;
    width: calc(100% - 70px);
    color: white;
    text-indent: 10px;
    font-size: 12pt;
    padding: 0 10px 0 0;
    background: #40434e;
  }
  .chat-input button {
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
  .chat-input input[good] + button {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
    background: #2671ff;
  }
  .chat-input input[good] + button:hover {
    box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .chat-input input[good] + button path {
    fill: white;
  }
  .msg-container {
    position: relative;
    display: inline-block;
    width: 100%;
    margin: 0 0 10px 0;
    padding: 0;
  }
  .msg-box {
    word-break: break-all;
    line-height: 1.5;
    display: flex;
    background: #5b5e6c;
    padding: 10px 24px 0 24px;
    margin-left: 12px;
    border-radius: 0px 6px 6px 6px;
    max-width: 80%;
    width: auto;
    float: left;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
  }
  .user-img {
    display: inline-block;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    background: #2671ff;
    margin: 0 10px 10px 0;
  }
  .flr {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    width: calc(100% - 50px);
  }
  .messages {
    flex: 1 0 auto;
  }
  .msg {
    display: inline-block;
    font-size: 11pt;
    line-height: 13pt;
    color: rgba(255, 255, 255, 0.7);
    margin: 0 0 15px 0;
  }
  .msg:first-of-type {
    margin-top: 8px;
  }
  .timestamp {
    color: rgba(0, 0, 0, 0.38);
    font-size: 8pt;
    margin-bottom: 10px;
  }
  .username {
    margin-right: 3px;
  }
  .posttime {
    margin-left: 3px;
  }
  .msg-self .msg-box {
    border-radius: 6px 0px 6px 6px;
    margin-right: 12px;
    background: #2671ff;
    float: right;
  }
  .msg-self .user-img {
    margin: 0 0 10px 10px;
  }
  .msg-self .msg {
    text-align: right;
  }
  .msg-self .timestamp {
    text-align: right;
  }
  #btn-show {
    z-index: 2;
    position: fixed;
    background: none;
    border: none;
    bottom: 36px;
    right: 84px;
  }
   #image {
   height: 72px;
   width: 72px;
   border-radius: 50%;
  }
  #btn-show:hover {
    cursor: pointer;
  }
  #svg {
  transform: rotate(180deg);
  }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" integrity="sha512-z4OUqw38qNLpn1libAN9BsoDx6nbNFio5lA6CuTp9NlK83b89hgyCVq+N5FdBJptINztxn1Z3SaKSKUS5UP60Q==" crossorigin="anonymous"></script>
  </div>`
}
