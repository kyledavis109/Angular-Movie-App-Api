const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
app.use(express.json())
require('dotenv').config();
const fetch = require('node-fetch');
const { makeReq } = require('./helperFunctions.js');

app.get('/trending', async (req, res) => {
    try {
        const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.API_KEY}`;
        const results = await makeReq(url, 'GET');
        return res.status(200).json(results.results[0].title);
    } catch(err) {
        console.log(err)
        return res.status(500).send('Server failed to fetch trending movies');
    };
});