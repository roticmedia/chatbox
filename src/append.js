function appendSelf(text, id) {
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

function appendRemoteNoBtn(text, id) {
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

function appendRemote(text, id) {
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
        <div class="rotic-feedback" uuid=${id}> 
            <button type="button" class="btn btn-success btn-feedback-true">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
            </button> 
            <button type="button" class="btn btn-danger btn-feedback-false">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
        </div>
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
</div>
<div id="rotic-btn-show">
    <img src="https://rotic.ir/images/icon/kavina.jpg" id="rotic-image"/>
</div>
<style>
        @font-face {
            font-family: 'IranSans';
            src: url('https://rotic.ir/fonts/IrSansMedium/IRANSansFaNum-Medium.eot');
            src: url('https://rotic.ir/fonts/IrSansMedium/IRANSansFaNum-Medium.eot?#iefix') format('embedded-opentype'),
            url('https://rotic.ir/fonts/IrSansMedium/IRANSansFaNum-Medium.woff2') format('woff2'),
            url('https://rotic.ir/fonts/IrSansMedium/IRANSansFaNum-Medium.woff') format('woff'),
            url('https://rotic.ir/fonts/IrSansMedium/IRANSansFaNum-Medium.ttf') format('truetype'),
            url('https://rotic.ir/fonts/IrSansMedium/IRANSansFaNum-Medium.svg#AIranianSans') format('svg');
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
        overflow-x: hidden;
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
        opacity: 0.2;
        padding: 0px 24px 0 24px;
        margin-left: 0px;
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
      .rotic-feedback {
        padding: 0;
        margin-bottom: 10px;
        font-size: 10px;
      }
      .btn-feedback-false {
        margin-left: 0px;
        font-size: 10px;
        opacity: 0.2;
      }
      .btn-feedback-true {
        font-size: 10px;
        margin-left: 9px;
        opacity: 0.2;
      }
    </style>`;
}

module.exports ={
    appendButton,
    appendChatbox,
    appendRemote,
    appendSelf,
    appendRemoteNoBtn
}