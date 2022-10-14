const { makeReq } = require('./helperFunctions.js');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(express.json())
require('dotenv').config();
const cors = require('cors');
app.use(cors());
app.use(cors({origin: "*"}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Route for getting trending TV shows of the day's data.
app.get('/topTvToday', async (req, res) => {
    try {
        const url = `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.API_KEY}`;
        const results = await makeReq(url, 'GET');
        return res.status(200).json(results.results);
    } catch(err) {
        console.log(err)
        return res.status(500).send('Server failed to fetch top TV shows images.');
    };
})

// Route for getting trending movies of the day's data.
app.get('/topMoviesToday', async (req, res) => {
    try {
        const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.API_KEY}`;
        const results = await makeReq(url, 'GET');
        return res.status(200).json(results.results);
    } catch(err) {
        console.log(err)
        return res.status(500).send('Server failed to fetch top movies images.');
    };
})

// let authOptions = {
//     type: 'OAuth2',
//         user: process.env.EMAIL,
//         pass: process.env.WORD,
//         clientId: process.env.OAUTH_CLIENT_ID,
//         clientSecret: process.env.OAUTH_CLIENT_SECRET,
//         refreshToken: process.env.OAUTH_REFRESH_TOKEN
// }

// Setup credentials to interact with nodemailer.
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: '',
        pass: '',
        clientId: '',
        clientSecret: '',
        refreshToken: ''
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

// Start the server listening for requests.
app.listen(process.env.PORT, async () => {
    console.log('Server is running...');
});