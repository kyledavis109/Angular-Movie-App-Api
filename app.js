const { makeReq } = require('./helperFunctions.js');
const express = require('express');
const app = express();
app.use(express.json())
require('dotenv').config();
const cors = require('cors');
app.use(cors({origin: "*"}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Route for getting trending TV shows of the day's titles.
app.get('/topTvTodayTitles', async (req, res) => {
    try {
        const url = `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.API_KEY}`;
        const results = await makeReq(url, 'GET');
        return res.status(200).json(results.results);
    } catch(err) {
        console.log(err)
        return res.status(500).send('Server failed to fetch trending movies');
    };
});

// Route for getting trending movies of the day's titles.
app.get('/topMoviesTodayTitles', async (req, res) => {
    try {
        const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.API_KEY}`;
        const results = await makeReq(url, 'GET');
        return res.status(200).json(results.results);
    } catch(err) {
        console.log(err)
        return res.status(500).send('Server failed to fetch trending movies');
    };
});

// Route for getting trending TV shows of the day's poster images.
app.get('/topTvTodayImages', async (req, res) => {
    try {
        const url = `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.API_KEY}`;
        const results = await makeReq(url, 'GET');
        return res.status(200).json(results.results);
    } catch(err) {
        console.log(err)
        return res.status(500).send('Server failed to fetch trending movies');
    };
})

// Route for getting trending movies of the day's poster images.
app.get('/topMoviesTodayImages', async (req, res) => {
    try {
        const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.API_KEY}`;
        const results = await makeReq(url, 'GET');
        return res.status(200).json(results.results);
    } catch(err) {
        console.log(err)
        return res.status(500).send('Server failed to fetch trending movies');
    };
})

// Start the server listening for requests.
app.listen(process.env.PORT, async () => {
    console.log('Server is running...');
});