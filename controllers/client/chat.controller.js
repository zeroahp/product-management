const Chat = require("../../models/chat_model");
const User = require("../../models/user.model");

const uploadToCloudinary = require("../../helpers/uploadToCloudinary") 

module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;

    //socket.io
    _io.once('connection', (socket) => {
        socket.on("CLIENT_SEND_MESSAGE", async (data) => {

            let images = [];
            for(const imageBuffer of data.images){
                const link = await uploadToCloudinary.uploadCloudinary(imageBuffer);
                images.push(link);
            }

            console.log("array image", images);

            const chat = new Chat({
                user_id: userId,
                content: data.content,
                images: images
            })

            await chat.save();

            //send data to client
            _io.emit("SERVER_RETURN_MESSAGE", {
                userId: userId,
                fullName: fullName,
                content: data.content,
                images: images
            });
            
        });

        socket.on("CLIENT_SEND_TYPING", (type) => {
            socket.broadcast.emit("SERVER_RETURN_TYPING", {
                userId: userId,
                fullName: fullName,
                type: type,
            })
        })
    });
    

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