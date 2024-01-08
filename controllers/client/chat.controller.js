const Chat = require("../../models/chat_model");
const User = require("../../models/user.model");

const chatSocket = require("../../sockets/client/chat.socket");
module.exports.index = async (req, res) => {
    
    //socket.io
    chatSocket(res);

    const chats = await Chat.find({
        deleted: false,
    });

    for(const chat of chats){
        const infoUser = await User.findOne({
            _id: chat.user_id
        }).select("fullName");

        chat.infoUser = infoUser;
    }

    res.render("client/Page/Chat/index.pug", {
        pageTitle: "Message",
        chats: chats
    })    
}