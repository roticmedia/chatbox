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

function paperClip() {
    return `
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
\t viewBox="0 0 324.98 324.98" style="enable-background:new 0 0 324.98 324.98;" xml:space="preserve">
<g>
\t<g>
\t\t<path d="M124.552,321.113c-2.593,0-5.187-0.978-7.18-2.94c-4.029-3.966-4.081-10.446-0.115-14.476l170.595-173.331
\t\t\tc22.177-22.534,22.27-59.105,0.205-81.524l-7.685-7.809c-10.596-10.766-24.692-16.694-39.692-16.694
\t\t\tc-15.115,0-29.349,6.006-40.082,16.91L31.038,211.664c-14.098,14.322-14.158,37.63-0.099,51.916l5.313,5.398
\t\t\tc7.083,7.197,17.031,11.325,27.293,11.325c9.582,0,18.376-3.574,24.764-10.064l152.214-154.656
\t\t\tc5.733-5.826,5.767-15.273,0.072-21.059l-2.837-2.884c-2.69-2.733-6.264-4.238-10.062-4.238c-3.838,0-7.461,1.534-10.202,4.318
\t\t\tL76.805,234.671c-3.966,4.028-10.446,4.08-14.476,0.115c-4.029-3.965-4.081-10.446-0.115-14.476l140.691-142.95
\t\t\tc6.62-6.726,15.425-10.43,24.792-10.43c9.327,0,18.082,3.676,24.652,10.351l2.837,2.885c13.487,13.701,13.454,36.032-0.073,49.776
\t\t\tL102.901,284.599c-10.267,10.431-24.242,16.176-39.354,16.176c-15.711,0-30.976-6.355-41.884-17.438l-5.313-5.397
\t\t\tc-21.854-22.205-21.792-58.395,0.138-80.677l169.56-170.414c14.572-14.807,33.988-22.982,54.633-22.982
\t\t\tc20.529,0,39.808,8.1,54.282,22.807l7.685,7.809c29.856,30.337,29.764,79.792-0.207,110.244L131.847,318.057
\t\t\tC129.844,320.092,127.198,321.113,124.552,321.113z"/>
\t</g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
    `
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
            <div class="rotic-msg-box-noAnimation">
                <div class="rotic-flr">
                    <div class="rotic-messages">
                        <p>${text}</p>
                    </div>
                </div>
            </div>
        </article>
        <div class="rotic-resolve">پاسخمو نگرفتم</div>
    `;
}

function Button(text, link, id) {
    return `
        <article class="rotic-msg-container rotic-msg-remote"  id="rotic-msg-0">
            <button text="${text}" link="${link}"  class="rotic-response-button" uuid=${id}>
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
    return `
        <div uuid=${id} class="rotic-response-image-container">
            <img class="rotic-response-image" src="${data}" />
        </div>
    `
}

function ImageSelf(data, id) {
    return `
        <div uuid=${id} class="rotic-response-image-container-self">
            <img class="rotic-response-image" src="${data}" />
        </div>
    `
}

function ImageNoAnimation(data, id) {
    return `
        <div uuid=${id} class="rotic-response-image-container-noAnimation">
            <img class="rotic-response-image" src="data:image/png;base64,${data}" />
        </div>
    `
}

function Loading(id) {
    return `
    <div style="width: 100%; height: 36px; margin-bottom: 10px" class="rotic-loading-container" uuid="${id}">
        <div class="rotic-loading-message" uuid="${id}">
            <div class="rotic-loading-message1"></div>
            <div class="rotic-loading-message2"></div>
            <div class="rotic-loading-message3"></div>
            <div class="rotic-loading-message4"></div>
        </div>
    </div>    
    `
}

function ProgressBar(id) {
    return `
        <div style="margin-bottom: 10px; transform: rotateY(180deg)" class="rotic-progress-container" uuid="${id}">
            <div style="transform: rotateY(180deg); font-size: 12px; color: white; margin-bottom: 7px">در حال آپلود</div>
        </div> 
    `
}

function upload (id, name) {
    return `
        <div class="rotic-upload-container" uuid="${id}">
            <div>
                <span>${name}</span>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" version="1.1" x="0px" y="0px"><title>1.3</title><desc>Created with Sketch.</desc><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g fill-rule="nonzero" fill="#ffffff"><path d="M14,19 L36,19 L42,24 L86,24 L86,81 L14,81 L14,19 Z M83,36 L83,27 L40.9138502,27 L34.9138502,22 L17,22 L17,36 L83,36 L83,36 Z M83,39 L83,39 L17,39 L17,78 L83,78 L83,39 Z"/></g></g></svg>
            </div>
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
      <div id="rotic-scroll">پیام خوانده نشده دارید!</div>
      <form class="rotic-chat-input" onsubmit="return false;">
        <input
          id="rotic-text"
          type="text"
          autocomplete="off"
          placeholder="پیامتان را تایپ کنید"
        />
        <div class="rotic-upload">
            ${paperClip()}
            <input type="file" id="rotic-input-file" style="opacity: 0.0 !important; position: absolute !important; bottom: 15px !important; left: 15px !important; width: 30px !important; height: 30px !important;"/>
        </div>
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
        padding: 0;
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
        width: calc(100% - 100px);
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
        margin: 10px 10px 10px 0;
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
        pointer-events: none;
        user-select: none;
      }
      .rotic-response-image-container {
        direction: ltr;
        margin-left: 0px;
        margin-bottom: 10px;
        padding: 10px;
        display: inline-block;
        opacity: 0.2;
        max-width: 80%;
        float: left;
        background: #5b5e6c;
        border-radius: 0px 6px 6px 6px;
      }
      .rotic-response-image-container-self {
        direction: ltr;
        margin-right: 16px;
        margin-bottom: 10px;
        padding: 10px;
        display: inline-block;
        max-width: 80%;
        background: #5ec5c4;
        border-radius: 6px 0px 6px 6px;
      }
      .rotic-response-image-container-noAnimation {
        direction: ltr;
        margin-left: 16px;
        margin-bottom: 10px;
        padding: 10px;
        display: inline-block;
        max-width: 80%;
        float: left;
        background: #5b5e6c;
        border-radius: 0px 6px 6px 6px;
      }
      .rotic-loading-message {
        position:relative;
        margin: 0 0 10px 0px;
        opacity: 0.2;
        padding: 15px 24px;
        float: left;
        background: #5b5e6c;
        border-radius: 0px 6px 6px 6px;
      }
     .rotic-loading-message div {
        height: 6px;
        width: 6px;
        border-radius:50%;
        float:left;
        margin: 0 3px;
        background: white;
    }
    .rotic-loading-message1 {
        -moz-animation: bounce 2.5s infinite ease-in-out;
        -webkit-animation: bounce 2.5s infinite ease-in-out;
    }
    .rotic-loading-message2 {
        -moz-animation: bounce 2.5s infinite ease-in-out;
        -webkit-animation: bounce 2.5s infinite ease-in-out;
        -webkit-animation-delay: 0.5s;
        animation-delay: 0.5s;
    }
    .rotic-loading-message3 {
        -moz-animation: bounce 2.5s infinite ease-in-out;
        -webkit-animation: bounce 2.5s infinite ease-in-out;
        -webkit-animation-delay: 1s;
        animation-delay: 1s;
    }
    .rotic-loading-message4 {
        -moz-animation: bounce 2.5s infinite ease-in-out;
        -webkit-animation: bounce 2.5s infinite ease-in-out;
        -webkit-animation-delay: 1.5s;
        animation-delay: 1.5s;
    }
    @-moz-keyframes bounce {
        0%,15% {-moz-transform: translate(0,0);}
        30% {-moz-transform: translate(0,-4px);}
        50%, 100% {-moz-transform: translate(0,0);};
    }
    @-webkit-keyframes bounce {
        0%,20% {-webkit-transform: translate(0,0);}
        30% {-webkit-transform: translate(0,-4px);}
        50%, 100% {-webkit-transform: translate(0,0);};
    }
    .rotic-upload {
        height: 40px;
        width: 40px;
        float: left;
        margin: 10px 0 10px 10px;
        border-radius: 50%;
    }
    .rotic-upload svg {
        margin: 7px;
        height: 25px;
        width: 25px;
        fill: #5bc5cb;
    }
    #rotic-input-file:hover {
        cursor: pointer;
    }
    .rotic-progress-container {
        background: #5ec5c4;
        border-radius: 0px 6px 6px 6px;
        max-width: 80%;
        padding: 5px 10px 15px 10px;
        opacity: 0.2;
    }
    .rotic-upload-container {
        height: 40px;
        width: 100%;
        margin: 0 0 10px 0;
    }
    .rotic-upload-container div{
        height: 40px;
        background: #5bc5cb;
        max-width: 90%;
        border-radius: 6px 0 6px 6px;
        margin: 0 16px 0 0;
        font-size: 11px;
        color: white;
        width: auto;
        position: relative;
    }
    .rotic-upload-container div span{
        position: absolute;
        left: 10px;
        top: 10px;
        white-space: nowrap;
        overflow: hidden;
        direction: ltr;
        max-width: 85%;
        text-overflow: ellipsis;
    }
    .rotic-upload-container svg{
        position: absolute;
        top: 5px;
        right: 5px;
        height: 30px;
        border-radius: 6px 0 6px 6px;
        background: #5bc5cb;
    }
    #rotic-scroll {
        position: fixed;
        bottom: 60px;
        right: 100px;
        height: 20px;
        width: 100px;
        border-radius: 6px;
        transform: translateX(50%);
        display: none;
        opacity: 0.2;
        background: #69C5C6;
        font-size: 9px;
        color: white;
        text-align: center;
        vertical-align: middle;
        line-height: 20px;
        font-weight: lighter;
        box-shadow: 0px 0px 63px -7px rgba(166,166,166,1);
    }
    #rotic-scroll:hover {
        cursor: pointer;
    }
    </style>`;
}

module.exports = {
    Button,
    Chatbox,
    Remote,
    Self,
    RemoteNoBtn,
    RemoteNoBtnNoAnimation,
    Toast,
    Image,
    ButtonNoAnimation,
    ImageNoAnimation,
    Loading,
    ImageSelf,
    ProgressBar,
    upload
}