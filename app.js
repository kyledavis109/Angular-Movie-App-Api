const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
app.use(express.json())
require('dotenv').config();
const fetch = require('node-fetch');

async function getToken() {
    try {
        const url = `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.API_KEY}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status !== 200) {
            throw await response.json();
        };
        const results = await response.json();
        // return results.request_token;
        console.log(results.request_token)
        console.log(results.expires_at)
    } catch(err) {
        console.log(err)
        throw 'Failed to get request token.';
    };
}

getToken()