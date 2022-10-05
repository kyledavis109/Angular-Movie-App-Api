const { makeReq } = require('./helperFunctions.js');
const express = require('express');
const app = express();
app.use(express.json())
require('dotenv').config();

// Route for getting trending movies of the week.
app.get('/trending', async (req, res) => {
    try {
        const url = `https://api.themoviedb.org/3/trending/week/day?api_key=${process.env.API_KEY}`;
        const results = await makeReq(url, 'GET');
        return res.status(200).json(results.results[0].title);
    } catch(err) {
        console.log(err)
        return res.status(500).send('Server failed to fetch trending movies');
    };
});

// Start the server listening for requests.
app.listen(process.env.PORT, async () => {
    console.log('Server is running...');
});