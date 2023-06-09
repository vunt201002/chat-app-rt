const app = require('./app');
const mongoose = require('mongoose');

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
const server = http.createServer(app);
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

// process.on("unhandledRejection", (err) => {
//     console.log(err);
//     console.log("UNHANDLED REJECTION! Shutting down ...");
//     server.close(() => {
//         //  Exit Code 1 indicates that a container shut down,
//         // either because of an application failure.
//         process.exit(1); 
//     });
// });
