const express = require('express');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Setup credentials to interact with nodemailer.
let transporter = nodemailer.createTransport({
    service: 'gmail', // Use preferred email service. Documentation at https://nodemailer.com/about/.
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        PASSWORD: process.env.PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
    port: 587,
    pool: true,
    maxConnections: true,
    maxMessages: true,
});

// Verifies connection configuration.
transporter.verify((err, success) => {
    err ? console.log(err) : console.log(`${success}! Server is ready to take messages!`)
});

app.post('/sendEmail', function (req, res) {
    let mailOptions =  {
        from: req.body.emailAddress,
        to: process.env.EMAIL,
        subject: req.body.emailSubject,
        text: req.body.emailMessage
    }

    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            res.json({
                status: 'fail'
            });
        } else {
            console.log('Email sent successfully');
            res.json({
                status: 'success'
            });
        }
    });
});