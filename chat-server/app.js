// mail atlas: tranbat933@gmail.com

const express = require('express');


// HTTP request logger middleware for node.js
const morgan = require('morgan');


// Basic rate-limiting middleware for Express. Use to limit repeated
//requests to public APIs and/or endpoints such as password reset.
const rateLimit = require('express-rate-limit');


// Helmet helps you secure your Express apps by 
// etting various HTTP headers. It's not a
// silver bullet, but it can help!
const helmet = require('helmet');

// These headers are set in response by helmet

// Content-Security-Policy: default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
// Cross-Origin-Embedder-Policy: require-corp
// Cross-Origin-Opener-Policy: same-origin
// Cross-Origin-Resource-Policy: same-origin
// Origin-Agent-Cluster: ?1
// Referrer-Policy: no-referrer
// Strict-Transport-Security: max-age=15552000; includeSubDomains
// X-Content-Type-Options: nosniff
// X-DNS-Prefetch-Control: off
// X-Download-Options: noopen
// X-Frame-Options: SAMEORIGIN
// X-Permitted-Cross-Domain-Policies: none
// X-XSS-Protection: 0


// This module searches for any keys in objects that
// begin with a $ sign or contain a ., from req.body, req.query or req.params.
const mongosanitize = require('express-mongo-sanitize');

// By default, $ and . characters are removed completely
// from user-supplied input in the following places:
// - req.body
// - req.params
// - req.headers
// - req.query


// Node.js body parsing middleware.
const bodyParser = require('body-parser');


// Node.js Connect middleware to sanitize user input
// coming from POST body, GET queries, and url params.
const xss = require('xss');


// CORS is a node.js package for providing a Connect/Express
// middleware that can be used to enable CORS with various options.
const cors = require('cors');


// Parse Cookie header and populate req.cookies with
// an object keyed by the cookie names.
const cookieParser = require("cookie-parser");


//// Simple cookie-based session middleware
const session = require("cookie-session");

const dotenv = require('dotenv');


// use all route
const routes = require('./routes/index');

const app = express();

dotenv.config({ path: './config.env' });

app.use(express.json({
    limit: '10kb',
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(mongosanitize());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}));

app.use(
    session({
      secret: "keyboard cat",
      proxy: true,
      resave: true,
      saveUnintialized: true,
      cookie: {
        secure: false,
      },
    })
);

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const limiter = rateLimit({
    max: 3000,
    windowMs: 60 * 60 * 1000, // 1h
    message: 'Too many request. Please try again later.',
});

app.use('/tawk', limiter);

app.use(
    express.urlencoded({
      extended: true,
    })
); // Returns middleware that only parses urlencoded bodies

// app.use(xss());

app.use(routes);

module.exports = app;