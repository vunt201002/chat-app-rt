const app = require('./app');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const dotenv= require("dotenv");
const path = require('path');

dotenv.config({ path: "./config.env" });

// process.on("uncaughtException", (err) => {
//     console.log(err);
//     console.log("UNCAUGHT Exception! Shutting down ...");
//     // Exit Code 1 indicates that a container shut down,
//     // either because of an application failure.
//     process.exit(1);
// });

const http = require('http');
const User = require('./models/user');
const FriendRequest = require('./models/friendRequest');
const OneToOneMessage = require('./models/OneToOneMessage');
const server = http.createServer(app);

const io = new Server(
    server,
    {
        cors: {
            origin: "http://localhost:3000",
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        }
    },
);

const port = process.env.PORT || 8000;

const db = process.env.DBURI;

mongoose
    .connect(
        db,
        {
            /* The underlying MongoDB driver has deprecated
             * their current connection string parser.
             * Because this is a major change, they added
             * the useNewUrlParser flag to allow users to
             * fall back to the old parser if they find a
             * bug in the new parser.
            */
            // useNewUrlParser: true,
            

            /**
             *  Again previously MongoDB used an ensureIndex
             * function call to ensure that Indexes exist and,
             * if they didn't, to create one. This too was
             * deprecated in favour of createIndex . the useCreateIndex
             * option ensures that you are using the new function calls.
            */
            // useCreateIndex: true,

            /**
             * findAndModify is deprecated. Use findOneAndUpdate,
             * findOneAndReplace or findOneAndDelete instead.
             */
            // useFindAndModify: false, 

            /**
             * Set to true to opt in to using the MongoDB driver's
             * new connection management engine. You should set
             * this option to true , except for the unlikely case
             * that it prevents you from maintaining a stable connection.
             */
            // useUnifiedTopology: true, 
        }
    )
    .then(con => {
        console.log('Connected to mongoDB');
    })
    .catch(err => {
        console.log(err);
    })

server.listen(port, () => {
    console.log("Server is running on port " + port);
});

io.on(
    'connection',
    async (socket) => {
        // console.log(JSON.stringify(socket.handshake.query));
        const user_id = socket.handshake.query["user_id"];      // user id

        const socket_id = socket.id;        // socket id

        console.log(`User connected: ${socket_id}`);

        if (Boolean(user_id)) {
            await User.findByIdAndUpdate(
                user_id,
                {
                    socket_id,
                    status: "Online"
                }
            );
        }

        // socket event listener here

        // frient request
        socket.on(
            "friend_request",
            async (data) => {
                // recipient
                const to_user = await User.findById(data.to).select("socket_id");
                // sender
                const from_user = await User.findById(data.from).select("socket_id");

                // create a friend request
                await FriendRequest.create({
                    sender: data.from,
                    recipient: data.to
                });

                // emit event "new_friend_request"
                io.to(to_user.socket_id).emit('new_friend_request', {
                    message: "New friend request receive"
                });
                // emit event "request_send"
                io.to(from_user.socket_id).emit("request_send", {
                    message: "Request send successfully"
                });
            },
        );

        socket.on("accept_request", async (data) => {
            // accept friend request => add ref of each other in friends array
            console.log(data);
            const request_doc = await FriendRequest.findById(data.request_id);
        
            console.log(request_doc);
        
            const sender = await User.findById(request_doc.sender);
            const receiver = await User.findById(request_doc.recipient);
        
            sender.friends.push(request_doc.recipient);
            receiver.friends.push(request_doc.sender);
        
            await receiver.save({ new: true, validateModifiedOnly: true });
            await sender.save({ new: true, validateModifiedOnly: true });
        
            await FriendRequest.findByIdAndDelete(data.request_id);
        
            // delete this request doc
            // emit event to both of them
        
            // emit event request accepted to both
            io.to(sender?.socket_id).emit("request_accepted", {
              message: "Friend Request Accepted",
            });
            io.to(receiver?.socket_id).emit("request_accepted", {
              message: "Friend Request Accepted",
            });
        });

        socket.on(
            "end",
            async (data) => {
                console.log("Closing connection");

                // find the user and set status to offline
                if (data.user_id) {
                    await User.findByIdAndUpdate(
                        data.user_id,
                        {
                            status: "Offline"
                        }
                    );
                }

                // broadcast user disconnected


                socket.disconnect(0);
            }
        );

        // start direct message
        socket.on(
            "get_direct_conversations",
            async ({ user_id }, callback) => {
                const existing_conversation = await OneToOneMessage
                    .find 
                    (
                        {
                            participants: { $all: [user_id] }
                        }
                    )
                    .populate
                    (
                        "participants",
                        "firstName lastName _id email status"
                    );
                console.log(existing_conversation);

                callback(existing_conversation);
            }
        );

        // start a new comversation
        socket.on(
            "start_conversation",
            async (data) => {
                // data like: { to, from }
                const { to, from } = data;

                // check if there is any existing conversation
                const existing_conversation = await OneToOneMessage
                    .find({
                        participants: { $size: 2, $all: [to, from] }
                    })
                    .populate(
                        "participants",
                        "firstName lastName _id email status"
                    );
                
                console.log(existing_conversation[0], "Existing conversation");

                // if there is no existing conversation
                // now create a new OneToOneMessage
                if (existing_conversation.length === 0) {
                    let new_chat = await OneToOneMessage.create({
                        participants: [to, from],
                    });

                    new_chat = await OneToOneMessage
                        .findById(new_chat._id)
                        .populate(
                            "participants",
                            "firstName lastName _id email status"
                        );
                    console.log(new_chat);

                    socket.emit(
                        "start_chat",
                        new_chat
                    );
                }

                // if there is existing conversation
                else {
                    socket.emit(
                        "start_chat",
                        existing_conversation[0]
                    );
                }
            }
        );

        // get messages
        socket.on(
            "get_messages",
            async (data, callback) => {
                const { messages } =  await OneToOneMessage
                    .findById(data.conversation_id)
                    .select("messages");

                callback(messages);
            }
        );

        // text/link message
        socket.on(
            'text_message',
            async (data) => {
                // data now like: { to, from, message, conversation_id, type }
                console.log("Received text/link message", data);

                const { to, from, message, conversation_id, type } = data;

                const to_user = await User.findById(to);
                const from_user = await User.findById(from);

                const new_message = {
                    to,
                    from,
                    type,
                    text: message,
                    create_at: Date.now(),
                };

                // create a new conversation if does not
                // exist yet or add new message
                const chat =  await OneToOneMessage.findById(conversation_id);
                chat.messages.push(new_message);
                
                // save to db
                await chat.save({  });


                // emit new message => to user
                // create a room for these user, then subscribe
                // both of these user into the room. If we emit
                // any event to the user of that room, all users
                // are going to be get that.
                // But now we use the socket id and emit individual
                // event.
                io.to(to_user.socket_id).emit("new_message", {
                    conversation_id,
                    message: new_message
                });

                // emit new message => from user
                io.to(from_user.socket_id).emit("new_message", {
                    conversation_id,
                    message: new_message
                });
            }
        );

        // media/doc message
        socket.on(
            "file_message",
            data => {
                // data now like: { to, from, text, file }
                console.log("Received file message", data);

                // get the file extension
                const fileExtension = path.extname(data.file.name);

                // generate an unique file name
                const fileName = `${Date.now()}_${Math.floor(Math.random() * 10000)}${fileExtension}`;

                // upload file

                // create a new conversation if does not
                // exist yet or add new message

                // save to db

                // emit incoming message => to user

                // emit outgoing message => from user
            }
        );

    },
);

// process.on("unhandledRejection", (err) => {
//     console.log(err);
//     console.log("UNHANDLED REJECTION! Shutting down ...");
//     server.close(() => {
//         //  Exit Code 1 indicates that a container shut down,
//         // either because of an application failure.
//         process.exit(1); 
//     });
// });
