
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
        <img src="https://rotic.ir/images/logo/Theme.png" alt="rotic" class="image-logo__img"> <p class="image-logo__p">powered by </p>
        <div class="close-text">
           <svg xmlns="http://www.w3.org/2000/svg" height="24" fill="#5FC5C4" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="#000" /></svg></div>
      </div>
      <section class="chat-window"></section>
      <form class="chat-input" onsubmit="return false;">
        <input id="text" type="text" autocomplete="on" placeholder="پیامتان را تایپ کنید">
        <button id="btn">
          <svg id="svg" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path fill="#5FC5C4" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
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
    background-color: #5FC5C4;
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
    box-shadow: 5px 5px 20px lightgray;
    visibility: hidden;
  }
  .close-box {
    height: 40px;
    background: white
    border-top: 1px solid #5BC5CB;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28);
  }
  .close-text {
    position: absolute;
    top: 20px;
    right: 0px;
    transform: translate(-50%, -50%);
    color:black;
    font-weight: 500;
    font-size: 24px;
  }
  .close-text:hover {
    cursor: pointer;
  }
  .chat-window {
    flex: auto;
    max-height: calc(100% - 115px);
    background: #fff;
    overflow: auto;
    padding-top: 12px;
  }
  .chat-input {
    flex: 0 0 auto;
    height: 60px;
    background: #fff;
    border-top: 1px solid #5BC5CB;
    margin-bottom: 0;
  }
  .chat-input input {
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
    background: #5BC5CB;
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
    color: white;
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
    background: #5BC5CB;
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
    color: white;
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
    background-image: linear-gradient(to bottom, #5EC5C4 , #4CC6EB);
    color: white !important;
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
    bottom: 30px;
    border-radius: 50%;
    right: 30px;
    box-shadow: 10px 10px 30px lightgray;
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
  #svg:hover {
    cursor: pointer;
  }
  .image-logo__img {
    height: 24px;
    position: absolute;
    transform: translate(0, -50%); 
    top: 20px;
    left: 70px;
  }
  .image-logo__p {
    position: absolute;
    top: 20px;
    left: 10px;
    transform: translate(0, -50%); 
    font-size: 12px;
    font-weight: lighter;
    margin: 0;
    color: lightgray;
  }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" integrity="sha512-z4OUqw38qNLpn1libAN9BsoDx6nbNFio5lA6CuTp9NlK83b89hgyCVq+N5FdBJptINztxn1Z3SaKSKUS5UP60Q==" crossorigin="anonymous"></script>
  </div>`
}
