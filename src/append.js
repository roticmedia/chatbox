
function Self(text, id) {
    return `
        <article class="rotic-msg-container rotic-msg-self" id="rotic-msg-0" uuid=${id}>
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

function RemoteNoBtn(text, id) {
    return `
        <article class="rotic-msg-container rotic-msg-remote" id="rotic-msg-0" uuid=${id}>
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

function RemoteNoBtnNoAnimation(text) {
    return `
        <article class="rotic-msg-container rotic-msg-remote" id="rotic-msg-0">
            <div class="rotic-msg-box-noAnimation">
                <div class="rotic-flr">
                    <div class="rotic-messages">
                        <p>${text}</p>
                    </div>
                </div>
            </div>
        </article>
    `;
}

function Remote(text, id) {
    return `
        <article class="rotic-msg-container rotic-msg-remote" id="rotic-msg-0" uuid=${id}>
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

function  Button(text, link, id) {
    return `
        <article class="rotic-msg-container rotic-msg-remote" uuid=${id} id="rotic-msg-0">
            <button text="${text}" link="${link}"  class="rotic-response-button">
            ${text}
            </button>
        </article>
    `;
}

function ButtonNoAnimation(text, link) {
    return `
        <article class="rotic-msg-container rotic-msg-remote" id="rotic-msg-0">
            <button text="${text}" link="${link}"  class="rotic-response-button-noAnimation">
            ${text}
            </button>
        </article>
    `;
}

function Toast(text, x, y) {
    return `
        <div class="rotic-chatbox-toast" style="bottom: ${y}px; left: ${x}px">
            ${text}
        </div>
    `
}

function Image(data, id) {
    return`
        <div uuid=${id} class="rotic-response-image-container">
            <img class="rotic-response-image" src="data:image/png;base64,${data}" />
        </div>
    `
}

function ImageNoAnimation(data, id) {
    return`
        <div uuid=${id} class="rotic-response-image-container-noAnimation">
            <img class="rotic-response-image" src="data:image/png;base64,${data}" />
        </div>
    `
}

function Chatbox() {
    return `<div class="rotic-chatbox"> 
    <div class="rotic-close-box">
        <a href="https://rotic.ir/fa-ir" id="rotic-image-logo-link" target="_blank"><img src="https://rotic.ir/images/logo/Theme.png" alt="rotic" class="rotic-image-logo__img"></a> 
        <p class="rotic-image-logo__p">powered by </p>
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
</div>
<div id="rotic-btn-show">
    <img src="https://rotic.ir/images/icon/kavina.jpg" id="rotic-image"/>
</div>
<style>
         @font-face {
            font-family: 'IranSans';
            font-weight: normal;
            font-style: normal;
        }
        
        @media only screen and (max-width: 768px) {
            .rotic-chatbox {
                width: 100% !important;
                height: 100% !important;
                bottom: -624px !important;
                right: 0;
                border-radius: 0;
            }
        }
        @media only screen and (min-width: 768px) {
            .rotic-chatbox {
                width: 300px !important;
                height: 553px !important;
                bottom: -600px !important;
                border-radius: 5px;
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
            outline: none;
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
          height: calc(100% - 110px) !important;
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
        overflow-x: hidden;
        padding-top: 47px;
        padding: 0 0 0 0;
        scrollbar-color: #5fc5c4;
        scrollbar-width: 4px;
        
        
      }
      .rotic-chat-window::-webkit-scrollbar {
          width: 4px;
      }
      .rotic-chat-window::-webkit-scrollbar-thumb {
          background-color: #5fc5c4;
          border-radius: 2px;
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
        opacity: 0.2;
        padding: 0px 24px 0 24px;
        margin-left: 0px;
        border-radius: 0px 6px 6px 6px;
        max-width: 253px !important;
        width: auto;
        float: left;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
      }
      .rotic-msg-box-noAnimation {
        word-break: break-word;
        line-height: 1.5;
        display: flex;
        background: #5b5e6c;
        color: white;
        opacity: 1;
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
        direction: rtl;
        text-align: justify;
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
        margin-right: 0;
        opacity: 0.2;
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
      .rotic-response-button-noAnimation {
        font-family: IRANSans;
        margin-left: 12px;
        float: left;
      }
      .rotic-container {
        width: 100%;
        height: 100%;
      }
      .rotic-response-button {
        margin-left: 0px;
        opacity: 0.2;
        margin-right: 12px;
        max-height: 253px;
        word-break: break-word;
        font-size: 10pt;
        line-height: 1.5;
        background: gray;
        color: white;
        padding: 10px 30px;
        border-radius: 5px;
        min-width: 100px;
        box-shadow: 0 5px 10px lightgrey;
        cursor: pointer;
        border: solid 0 white;
      }
      .rotic-response-button:hover {
        background: darkgray;
        transition: background 200ms ease-in;
      }
      .rotic-response-button {
        transition: all 200ms ease-out;
      }
      .rotic-response-button-noAnimation {
        margin-left: 16px;
        margin-right: 12px;
        max-height: 253px;
        word-break: break-word;
        font-size: 10pt;
        line-height: 1.5;
        background: gray;
        color: white;
        padding: 10px 30px;
        border-radius: 5px;
        min-width: 100px;
        box-shadow: 0 5px 10px lightgrey;
        cursor: pointer;
        border: solid 0 white;
      }
      .rotic-response-button-noAnimation:hover {
        background: darkgray;
        transition: background 200ms ease-in;
      }
      .rotic-response-button-noAnimation {
        transition: all 200ms ease-out;
      }
      .rotic-resolve {
        padding: 0;
        font-size: 6px;
        font-weight: lighter;
        color: gray;
        direction: ltr;
        margin: 0 0 10px 24px;
        font-size: 10px;
      }
      .rotic-resolve:hover {
        cursor: pointer;
      }
      .rotic-chatbox-toast {
        position: fixed;
        background: #5bc5cb;
        padding: 7px 20px;
        color: white;
        font-family: IranSans;
        font-size: 13px;
        min-width: 100px;
        text-align: center;
        opacity: 0.2;
        border-radius: 0px 6px 6px 6px;
        -webkit-box-shadow: 0px 5px 40px rgba(0, 0, 0, 0.16); 
        box-shadow: 0px 5px 40px rgba(0, 0, 0, 0.16);
        z-index:  9998;
      }
      .rotic-chatbox-toast:hover {
        cursor: pointer;
      }
      .rotic-response-image {
        width: 100%;
        border-radius: 6px 6px 6px 6px;
        user-select: none;
      }
      .rotic-response-image-container {
        direction: ltr;
        margin-left: 0px;
        margin-bottom: 10px;
        padding: 10px;
        display: inline-block;
        opacity: 0.2;
        max-width: 90%;
        float: left;
        background: #5b5e6c;
        border-radius: 0px 6px 6px 6px;
      }
      .rotic-response-image-container-noAnimation {
        direction: ltr;
        margin-left: 16px;
        margin-bottom: 10px;
        padding: 10px;
        display: inline-block;
        max-width: 90%;
        float: left;
        background: #5b5e6c;
        border-radius: 0px 6px 6px 6px;
      }
    </style>`;
}

module.exports ={
    Button,
    Chatbox,
    Remote,
    Self,
    RemoteNoBtn,
    RemoteNoBtnNoAnimation,
    Toast,
    Image,
    ButtonNoAnimation,
    ImageNoAnimation
}