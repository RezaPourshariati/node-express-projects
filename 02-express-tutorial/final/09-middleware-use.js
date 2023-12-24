// 23: APP.USE
// 24: Multiple Middleware Functions
const express = require('express');
const app = express();
const logger = require('../logger');
const authorize = require('../authorize');

// req => middleware => res


// app.use(logger); // this is correct, also we can set for first argument a path.

app.use('/', [logger, authorize]); // <--- for when we want to apply logger() in ALL of our routes. with app.use(logger)
// although, we can add a path as first argument! then all the path after a specific path will be affected.
// app.use always expecting middleware as arguments!
// api/home/about/products

app.get('/', (req, res) => {
    res.send('Home');
});

app.get('/about', (req, res) => {
    res.send('About');
});

app.get('/api/products', (req, res) => {
    res.send('Products');
});

app.get('/api/items', (req, res) => {
    console.log(req.user);
    res.send('Items');
});

app.listen(5000, () => {
    console.log('Server is listening on port 5000....');
});
