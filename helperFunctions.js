const fetch = require('node-fetch');

// Function that makes API request.
async function makeReq(url, method) {
    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    return await response.json();
};

module.exports = {
    makeReq,
};

    // async function getToken() {
    //     try {
    //         const url = `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.API_KEY}`;
    //         const results = await makeReq(url, 'GET');
    //         return res.status(200).json(results.request_token);
    //         console.log(results.request_token)
    //         console.log(results.expires_at)
    //     } catch(err) {
    //         console.log(err)
    //         return res.status(500).send('Server failed to request token');
    //     };
    // };
