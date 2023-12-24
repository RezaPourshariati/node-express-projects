// 21: Middleware Setup
const express = require('express');
const app = express();

//  req => middleware => res

// Express middleware are functions that execute during the request to the server.
// each middleware has access to request and response object.

const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method, url, time);
    next();
};

app.get('/', logger, (req, res) => {
    res.send('Home');
});

app.get('/about', logger, (req, res) => {
    res.send('About');
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000....');
});
