// ----------CLIENT-----------------------
import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
// import server from 'json-server';

// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
if (formSendData) {
    formSendData.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = e.target.elements.content.value;
        const images = upload.cachedFileArray || [];
        if (content || images.length > 0) {

            console.log(images);
            socket.emit("CLIENT_SEND_MESSAGE", {
                content: content,
                images: images
            });

            e.target.elements.content.value = "";
            upload.resetPreviewPanel(); // clear all selected images
            socket.emit("CLIENT_SEND_TYPING", "hidden");
        }
    })
}

// END CLIENT_SEND_MESSAGE

// SERVER_RETURN_MESSAGE

//send images
const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-image', {
    multiple: true,
    maxFileCount: 6
});
//end send image


socket.on("SERVER_RETURN_MESSAGE", (data) => {
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    const body = document.querySelector(".chat .inner-body");
    const boxTyping = document.querySelector(".inner-list-typing");

    const div = document.createElement("div");

    let htmlFullName = "";
    let htmlContent = "";
    let htmlImages = "";

    if (myId == data.userId) {
        div.classList.add("inner-outgoing");
    } else {
        div.classList.add("inner-incoming");
        htmlFullName = `<div class="inner-name">${data.fullName}</div>`
    }

    if (data.content) {
        htmlContent = `
            <div class="inner-content">${data.content}</div>        
        `;
    }

    if(data.images) {
        htmlImages += `<div class="inner-images">`;
        for (const item of data.images) {
            htmlImages += `
                <img src=${item} alt="image">`;
        }
        htmlImages += `</div>`;

    }

    div.innerHTML = `
        ${htmlFullName}
        ${htmlContent}
        ${htmlImages}
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