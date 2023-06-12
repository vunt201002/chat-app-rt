const app = require('./app');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

const dotenv= require("dotenv");
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
        const user_id = socket.handshake.query("user_id");      // user id

        const socket_id = socket.id;        // socket id

        console.log(`User connected: ${socket_id}`);

        if (Boolean(user_id)) {
            await User.findByIdAndUpdate(
                user_id,
                {
                    socket_id,
                }
            );
        }

        // socket event listener here
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
                io.to(to_user.socket_id.emit('new_friend_request'), {
                    message: "New friend request receive"
                });
                // emit event "request_send"
                io.to(from_user.socket_id).emit("request_send", {
                    message: "Request send successfully"
                });
            },
        );

        socket.on(
            "accept_request",
            async (data) => {
                // fetch the request doc from data
                const request_doc = await FriendRequest.findById(data.request_id);

                console.log(request_doc);

                // fetch sender and receiver doc
                const sender = await User.findById(request_doc.sender);
                const receiver = await User.findById(request_doc.recipient);

                // update friend
                sender.friends.push(request_doc.recipient);
                receiver.friends.push(request_doc.sender);

                // save change
                await receiver.save({ new: true, validateModifiedOnly: true });
                await sender.save({ new: true, validateModifiedOnly: true });

                await FriendRequest.findByIdAndDelete(data.request_id);

                io.on(sender.socket_id).emit(
                    "request_accepted",
                    {
                        message: "Friend request accepted"
                    }
                );
                io.on(receiver.socket_id).emit(
                    "request_accepted",
                    {
                        message: "Friend request accepted"
                    }
                );
            }
        );

        socket.on(
            "end",
            function () {
                console.log("Closing connection");
                socket.disconnect(0);
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
