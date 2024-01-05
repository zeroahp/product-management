// ----------CLIENT-----------------------
import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
// import server from 'json-server';

// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
if (formSendData) {
    formSendData.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = e.target.elements.content.value;

        if (content) {
            socket.emit("CLIENT_SEND_MESSAGE", content);
            e.target.elements.content.value = "";
        }
    })
}

// END CLIENT_SEND_MESSAGE

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    const body = document.querySelector(".chat .inner-body");
    const boxTyping = document.querySelector(".inner-list-typing");

    const div = document.createElement("div");

    let htmlFullName = "";

    if (myId == data.userId) {
        div.classList.add("inner-outgoing");
    } else {
        div.classList.add("inner-incoming");
        htmlFullName = `<div class="inner-name">${data.fullName}</div>`
    }

    div.innerHTML = `
        ${htmlFullName}
        <div class="inner-content">${data.content}</div>
    `;

    body.insertBefore(div, boxTyping);
    body.scrollTop = body.scrollHeight;
})
//END SERVER_RETURN_MESSAGE

//Show typing
var timeout;
const showTyping = () => {
    socket.emit("CLIENT_SEND_TYPING", "show");
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        socket.emit("CLIENT_SEND_TYPING", "hidden");
    }, 3000);
}

//show popup
const buttonIcon = document.querySelector(".button-icon");
if (buttonIcon) {
    const tooltip = document.querySelector(".tooltip");
    Popper.createPopper(buttonIcon, tooltip);
    buttonIcon.onclick = () => {
        //thêm hoặc loại bỏ lớp "shown".
        tooltip.classList.toggle("shown");
    };
};
//End show popup


//emoji

const emojiPicker = document.querySelector('emoji-picker')
if (emojiPicker) {
    const inputChat = document.querySelector(".chat .inner-form input[name='content']");
    emojiPicker.addEventListener("emoji-click", (event) => {
        const icon = event.detail.unicode;
        inputChat.value = inputChat.value + icon;

        //setSelectionRange()
        const end = inputChat.value.length;
        inputChat.setSelectionRange(end, end);
        inputChat.focus();
        showTyping();
    });

    inputChat.addEventListener("keyup", () => {
        showTyping();
    });
}
//end emoji


//SERVER_RETURN_TYPING
const elementListTyping = document.querySelector(".chat .inner-list-typing");
if (elementListTyping) {
    socket.on("SERVER_RETURN_TYPING", (data) => {

        const existTyping = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
        if (data.type == "show") {
            if (!existTyping) {
                const boxTyping = document.createElement("div");
                boxTyping.classList.add("box-typing");
                boxTyping.setAttribute("user-id", data.userId);

                boxTyping.innerHTML = `
                    <div class="inner-name">${data.fullName}</div>
                    <div class="inner-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                `;
                elementListTyping.appendChild(boxTyping);
                bodyChat.scrollTop = bodyChat.scrollHeight;

            }
        } else {
            // const RemoveTyping = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
            if (existTyping) {
                elementListTyping.removeChild(existTyping)
            }
        }

    });
}
//END SERVER_RETURN_TYPING

//Scroll chat to bottom when reload
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight;
}
//End Scroll chat to bottom
