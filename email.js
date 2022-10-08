const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
// const cors = require('cors');
const app = express();
dotenv.config();
// app.use(cors({origin: "*"}));
app.use(bodyParser.json());
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept, Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

// Route for sending emails using nodemailer library.
app.post('/sendEmail', (req, res) => {

    try {
        console.log(req.body, 'data of form');
        const nodemailer = require("nodemailer");

        // Validate request object.
        const emailReq = req.body;
        if (emailReq === null || emailReq === undefined) {
            return res.status(400).send('emailReq request body required.');
        } else if (typeof emailReq !== 'object') {
            return res.status(400).send('emailReq request must be an object.');
        } else if (emailReq === '') {
            return res.status(400).send('emailReq request object must not be empty.');
        };

    // Setup credentials to interact with nodemailer.
    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com', // Use preferred email service. Documentation at https://nodemailer.com/about/.
        service: 'outlook',
        secureConnection: false,
        tls: {
            ciphers: 'SSLv3'
        },
        port: 587,
        pool: true,
        maxConnections: true,
        maxMessages: true,
        auth: {
            user: req.body.emailAddress, // Add email address.
            pass: req.body.password // Add email address account password.
        }
    })

    // For sending a message(s) as an email(s).
    const textEmail = {
        from: 'John Doe <yourEmail@email.com>', // Add name and email address.
        to: 'kyledavis109@gmail.com',
        subject: req.body.emailSubject,
        text: req.body.emailMessage,
    };

    // Verifies connection configuration.
    transporter.verify((err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Server is ready to take our messages.');
        }
    });

    // Runs the sendmail method of nodemailer to send the text email(s).
    transporter.sendMail(textEmail, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({
                message: 'Email successfully sent!'
            })
        }
    });

    } catch(err) {
        console.log(err);
        return res.status(500).send('Server failed to send email.');
    };
});